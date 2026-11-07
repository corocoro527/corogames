#!/usr/bin/env python3
"""Chromium UI checks for local static site; no external CDN requests."""
import contextlib
import http.server
import pathlib
import socketserver
import threading
from playwright.sync_api import sync_playwright

ROOT=pathlib.Path(__file__).resolve().parent
class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self,*args,**kwargs): super().__init__(*args,directory=str(ROOT),**kwargs)
    def log_message(self,*args): pass
class Server(socketserver.ThreadingTCPServer): allow_reuse_address=True

def main():
    with Server(("127.0.0.1",0),Handler) as server:
        thread=threading.Thread(target=server.serve_forever,daemon=True)
        thread.start()
        base=f"http://127.0.0.1:{server.server_address[1]}"
        with sync_playwright() as pw:
            browser=pw.chromium.launch(headless=True)
            for device in ("desktop","mobile"):
                context=browser.new_context(viewport={"width":1280 if device=="desktop" else 390,"height":800 if device=="desktop" else 844},is_mobile=device=="mobile",has_touch=device=="mobile")
                blocked=[]
                def route_handler(route):
                    if not route.request.url.startswith(base):
                        blocked.append(route.request.url)
                        route.abort()
                    else: route.continue_()
                context.route("**/*",route_handler)
                page=context.new_page()
                page.goto(base+"/index.html?offline=1")
                page.locator(".card").first.wait_for()
                assert page.locator(".card").count()==12
                assert "12作品" in page.locator("#status").inner_text()
                assert page.locator(".card a").first.get_attribute("href").endswith("offline=1")
                page.goto(base+"/reader.html?id=16&offline=1")
                page.locator("#pages img, #pages div").first.wait_for()
                assert page.locator("#pages img, #pages div").count()==209
                assert "209ページ" in page.locator("#status").inner_text()
                page.locator("#next").click()
                assert page.locator("#episode").input_value()!="16"
                assert "offline=1" in page.url
                assert not blocked,f"Unexpected external requests: {blocked[:5]}"
                assert page.evaluate("document.documentElement.scrollWidth <= window.innerWidth + 1"),"Horizontal overflow"
                context.close()
                print(f"PASS: {device} catalog, 209-page reader, navigation, strict offline requests")
            browser.close()
        server.shutdown()
if __name__=="__main__":main()
