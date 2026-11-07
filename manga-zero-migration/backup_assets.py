#!/usr/bin/env python3
"""Download MANGA ZERO public manga assets from Floot CDN.
Run from repository root: python3 manga-zero-migration/backup_assets.py
Only public manga references are processed; user/private data is excluded.
"""
import json, pathlib, hashlib, urllib.request, time, sys
from urllib.parse import urlparse
BASE=pathlib.Path(__file__).resolve().parent
DEST=BASE/"backup-assets"
ROOT="https://manga-zero.floot.app"
def load(name): return json.loads((BASE/name).read_text(encoding="utf-8"))
def references():
    catalog=load("public-catalog.json")
    for w in catalog["works"]:
        if w.get("cover_url"): yield w["cover_url"]
    for name in ("episodes-original.json","episodes-remaining.json"):
        for ep in load(name):
            yield from (u for u in ep.get("images",[]) if u)
    for ep,limits in {16:[(1,100),(101,200),(201,209)],17:[(1,100),(101,199)],18:[(1,100),(101,200),(201,221)]}.items():
        for start,end in limits:
            for p in load(f"volumes/episode-{ep}-pages-{start}-{end}.json"):
                if p.get("image"): yield p["image"]
def main():
    DEST.mkdir(parents=True,exist_ok=True)
    urls=sorted(set(references()))
    report=[];errors=[]
    for i,url in enumerate(urls,1):
        if url.startswith("/_cdn/static/"):
            filename=url.removeprefix("/_cdn/static/")
            src=ROOT+url
        elif url.startswith("https://"):
            filename="external-"+hashlib.sha256(url.encode()).hexdigest()[:16]+"-"+pathlib.PurePosixPath(urlparse(url).path).name
            src=url
        else:
            errors.append({"url":url,"error":"unsupported URL"});continue
        if "/" in filename or not filename: errors.append({"url":url,"error":"unsafe filename"});continue
        dest=DEST/filename
        try:
            if not dest.exists() or dest.stat().st_size==0:
                req=urllib.request.Request(src,headers={"User-Agent":"MangaZeroMigrationBackup/1.0"})
                with urllib.request.urlopen(req,timeout=40) as resp:
                    data=resp.read()
                    if not resp.headers.get("content-type","").startswith("image/"):raise ValueError("not an image")
                dest.write_bytes(data)
                time.sleep(.08)
            b=dest.read_bytes()
            report.append({"source":url,"file":filename,"bytes":len(b),"sha256":hashlib.sha256(b).hexdigest()})
        except Exception as exc: errors.append({"url":url,"error":str(exc)})
        if i%50==0: print(f"{i}/{len(urls)} downloaded; errors={len(errors)}",flush=True)
    (BASE/"asset-backup-report.json").write_text(json.dumps({"totalUniqueReferences":len(urls),"saved":report,"errors":errors},ensure_ascii=False,indent=2),encoding="utf-8")
    print(f"Done: {len(report)} images, {len(errors)} errors")
    return 1 if errors else 0
if __name__=="__main__":sys.exit(main())
