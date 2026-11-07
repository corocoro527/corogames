#!/usr/bin/env python3
"""Validate MANGA ZERO catalog and episode metadata without network access."""
import json
from pathlib import Path
ROOT=Path(__file__).resolve().parent
def load(p): return json.loads((ROOT/p).read_text(encoding="utf-8"))
def main():
    works=load("public-catalog.json")["works"]
    episodes=load("episodes-original.json")+load("episodes-remaining.json")
    ids=[e["id"] for e in episodes]
    for eid,spans in {16:[(1,100),(101,200),(201,209)],17:[(1,100),(101,199)],18:[(1,100),(101,200),(201,221)]}.items():
        pages=[]
        for a,b in spans:
            part=load(f"volumes/episode-{eid}-pages-{a}-{b}.json")
            assert len(part)==b-a+1,(eid,a,b,len(part))
            pages.extend(part)
        assert len(pages)==spans[-1][1]
        assert all(x.get("image") for x in pages)
        assert [int(x["page"]) for x in pages]==list(range(1,spans[-1][1]+1)),eid
        ids.append(eid)
    assert len(ids)==len(set(ids))==24
    listed=[ep["id"] for w in works for ep in w["episodes"]]
    assert sorted(ids)==sorted(listed),(set(ids)-set(listed),set(listed)-set(ids))
    empty=[ep["id"] for ep in episodes if not ep.get("images")]
    assert all(w.get("cover_url") for w in works), "Missing cover image"
    assert all(w.get("slug") and w.get("title") for w in works)
    assert all(ep.get("slug") and ep.get("title") for ep in episodes)
    reader=(ROOT/"reader.html").read_text(encoding="utf-8")
    catalog_html=(ROOT/"index.html").read_text(encoding="utf-8")
    assert "asset-manifest.json" in reader and "asset-manifest.json" in catalog_html
    assert "reader.html?id=" in catalog_html
    assert "offline=1" in reader and "offline=1" in catalog_html
    assert "assetMap[u]||(offline?" in reader, "Reader offline mode must disable CDN fallback"
    assert "(offline?'':" in catalog_html, "Catalog offline mode must disable CDN fallback"
    assert 'id="prev"' in reader and 'id="next"' in reader
    assert "verify_offline.py" in (ROOT/"README.md").read_text(encoding="utf-8")
    if empty: print(f"WARNING: episodes without image pages: {empty}")
    print(f"PASS: {len(works)} works, {len(ids)} episode records, complete volume chunks; {len(empty)} episodes have no image pages")
if __name__=="__main__":main()
