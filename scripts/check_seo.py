#!/usr/bin/env python3
"""Check sitemap-listed pages for SEO regressions. Run from repository root."""
from pathlib import Path
import re
import sys
import xml.etree.ElementTree as ET
from html.parser import HTMLParser
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parents[1]
HOST = "koropopgames.com"

class HeadParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.robots = []
        self.canonicals = []
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == "meta" and a.get("name", "").lower() == "robots":
            self.robots.append(a.get("content", "").lower())
        if tag == "link" and "canonical" in a.get("rel", "").lower().split():
            self.canonicals.append(a.get("href", ""))

def main():
    errors = []
    sitemap = ROOT / "sitemap.xml"
    tree = ET.parse(sitemap)
    ns = {"s": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    urls = [node.text.strip() for node in tree.findall(".//s:loc", ns) if node.text]
    if not urls:
        errors.append("sitemap.xml contains no URLs")
    seen = set()
    for url in urls:
        if url in seen:
            errors.append(f"Duplicate sitemap URL: {url}")
        seen.add(url)
        parsed = urlparse(url)
        if parsed.scheme != "https" or parsed.netloc != HOST or parsed.query or parsed.fragment:
            errors.append(f"Unexpected sitemap URL: {url}")
            continue
        relative = parsed.path.lstrip("/") or "index.html"
        if ".." in Path(relative).parts:
            errors.append(f"Unsafe sitemap path: {url}")
            continue
        file = ROOT / relative
        if not file.is_file():
            errors.append(f"Missing sitemap page: {relative}")
            continue
        html = file.read_text(encoding="utf-8")
        parser = HeadParser()
        parser.feed(html)
        if not parser.canonicals:
            errors.append(f"Missing canonical: {relative}")
        elif len(parser.canonicals) != 1 or parser.canonicals[0] != url:
            errors.append(f"Canonical mismatch: {relative}: {parser.canonicals}")
        if any("noindex" in value for value in parser.robots):
            errors.append(f"Noindex page in sitemap: {relative}")
        if not re.search(r"<title(?:\\s[^>]*)?>\\s*[^<\\s]", html, re.I):
            errors.append(f"Missing title: {relative}")
    print(f"Checked {len(urls)} sitemap URLs; {len(errors)} error(s).")
    for err in errors:
        print("ERROR:", err)
    return 1 if errors else 0

if __name__ == "__main__":
    sys.exit(main())
