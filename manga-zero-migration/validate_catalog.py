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
        ids.append(eid)
    assert len(ids)==len(set(ids))==24
    listed=[ep["id"] for w in works for ep in w["episodes"]]
    assert sorted(ids)==sorted(listed),(set(ids)-set(listed),set(listed)-set(ids))
    empty=[ep["id"] for ep in episodes if not ep.get("images")]
    if empty: print(f"WARNING: episodes without image pages: {empty}")
    print(f"PASS: {len(works)} works, {len(ids)} episode records, complete volume chunks; {len(empty)} episodes have no image pages")
if __name__=="__main__":main()
