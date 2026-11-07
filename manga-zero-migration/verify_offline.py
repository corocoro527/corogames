#!/usr/bin/env python3
"""Verify an extracted MANGA ZERO offline package without contacting Floot."""
import hashlib
import json
import pathlib
import sys

ROOT=pathlib.Path(__file__).resolve().parent
def load(name):
    return json.loads((ROOT/name).read_text(encoding="utf-8"))
def main():
    sys.path.insert(0,str(ROOT))
    from backup_assets import references
    expected=set(references())
    manifest=load("asset-manifest.json")["assets"]
    report=load("asset-backup-report.json")
    assert not report["errors"],f'Backup reported {len(report["errors"])} download failures'
    assert set(manifest)==expected,f'Missing {len(expected-set(manifest))}, unexpected {len(set(manifest)-expected)} images'
    saved={x["source"]:x for x in report["saved"]}
    assert set(saved)==expected,"Report and original references differ"
    total=0
    for source,relative in manifest.items():
        path=(ROOT/relative).resolve()
        assert path.is_relative_to(ROOT.resolve()),f"Unsafe path: {relative}"
        assert path.is_file(),f"Missing image: {relative}"
        data=path.read_bytes()
        assert data and len(data)==saved[source]["bytes"],f"Wrong image size: {relative}"
        assert hashlib.sha256(data).hexdigest()==saved[source]["sha256"],f"Hash mismatch: {relative}"
        total+=len(data)
    for required in ("index.html","reader.html","public-catalog.json","episodes-original.json","episodes-remaining.json"):
        assert (ROOT/required).is_file(),f"Missing site file: {required}"
    print(f"PASS: fully local offline package, {len(expected)} verified images, {total:,} image bytes")
if __name__=="__main__":
    main()
