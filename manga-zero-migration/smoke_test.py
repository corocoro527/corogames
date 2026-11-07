#!/usr/bin/env python3
"""Local HTTP smoke test for static MANGA ZERO; no external network requests."""
import contextlib
import http.server
import json
import pathlib
import socketserver
import threading
import urllib.request

ROOT=pathlib.Path(__file__).resolve().parent
class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self,*args,**kwargs):
        super().__init__(*args,directory=str(ROOT),**kwargs)
    def log_message(self,*args): pass
class Server(socketserver.ThreadingTCPServer):
    allow_reuse_address=True

def main():
    with Server(("127.0.0.1",0),Handler) as server:
        thread=threading.Thread(target=server.serve_forever,daemon=True)
        thread.start()
        base=f"http://127.0.0.1:{server.server_address[1]}"
        def get(path):
            with urllib.request.urlopen(base+path,timeout=10) as response:
                assert response.status==200,(path,response.status)
                return response.read()
        catalog=json.loads(get("/public-catalog.json"))
        assert len(catalog["works"])==12
        assert sum(len(w["episodes"]) for w in catalog["works"])==24
        assert b"MANGA ZERO" in get("/index.html?offline=1")
        assert b"MANGA ZERO" in get("/reader.html?id=16&offline=1")
        for path in ("episodes-original.json","episodes-remaining.json"):
            assert isinstance(json.loads(get("/"+path)),list)
        for ep,spans in {16:[(1,100),(101,200),(201,209)],17:[(1,100),(101,199)],18:[(1,100),(101,200),(201,221)]}.items():
            for a,b in spans:
                pages=json.loads(get(f"/volumes/episode-{ep}-pages-{a}-{b}.json"))
                assert len(pages)==b-a+1
        server.shutdown()
    print("PASS: local HTTP serves catalog, reader, 24 episodes and all volume chunks")
if __name__=="__main__": main()
