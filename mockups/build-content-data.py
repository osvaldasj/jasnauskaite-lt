#!/usr/bin/env python3
"""
Iš Reelize turinio DB (localhost:3002/api/content) paima TIKRUS postus per
brendą + temines kategorijas, parsisiunčia thumbnail'us į images/db/ ir
sugeneruoja wall masyvus + DB scalars.

KEY (2026-06-13): wall'ai naudoja RECENCY-BLEND (recent postai pakyla, ne tik
all-time viral) + DEDUP tarp profilio walls (Organic + teminiai + Partnerships
nesidubliuoja → telefone nebėra tų pačių reel'ų kartojimo). Brendų walls — savo
geriausi (su blend), atskirai. Distinct covers parenkami rebuild_mockup.py.

Naudojimas: python3 build-content-data.py
"""
import json, os, urllib.request, urllib.parse, sys

API = "http://localhost:3002"
OUT_IMG = os.path.join(os.path.dirname(__file__), "images", "db")
os.makedirs(OUT_IMG, exist_ok=True)
PER_UNIT = 15

def fetch(params, n=120):
    p = dict(params); p["pageSize"] = n
    url = API + "/api/content?" + urllib.parse.urlencode(p)
    with urllib.request.urlopen(url, timeout=25) as r:
        return [it for it in json.load(r).get("items", []) if it.get("permalink")]

def fetch_brand(brand, n=80):
    return fetch({"brand": brand, "sortBy": "views", "sortDir": "desc"}, n)

def dl_thumb(uid):
    path = os.path.join(OUT_IMG, uid + ".jpg")
    rel = "images/db/" + uid + ".jpg"
    if os.path.exists(path) and os.path.getsize(path) > 1000:
        return rel
    try:
        with urllib.request.urlopen(API + "/api/content/thumb/" + uid, timeout=20) as r:
            data = r.read()
        if len(data) > 1000:
            open(path, "wb").write(data); return rel
    except Exception as e:
        print(f"  ! thumb fail {uid}: {e}", file=sys.stderr)
    return None

def fmt(n):
    n = n or 0
    if n >= 1_000_000: return f"{n/1_000_000:.1f}M".replace(".0M", "M")
    if n >= 1_000: return f"{n/1_000:.0f}K"
    return str(n)

CAT = {"Kelionės": "TRAVEL", "Outfitai": "FASHION", "Pora": "COUPLE",
       "Renginiai": "EVENTS", "Šeima": "FAMILY", "Beauty": "BEAUTY",
       "Lifestyle": "LIFESTYLE", "Maistas": "FOOD", "FMCG": "LIFESTYLE"}
def pick_cat(cats):
    for c in (cats or []):
        if c in CAT: return CAT[c]
    return "LIFESTYLE"

# Recency-blend: recent postai gauna multiplikatorių, kad pakiltų greta viral
def blended_key(it):
    v = it.get("views") or 0
    d = (it.get("dateISO") or "")[:7]
    mult = 1.9 if d >= "2026-01" else 1.5 if d >= "2025-07" else 1.2 if d >= "2025-01" else 1.0
    return v * mult

def to_wall(items, used=None, with_cat=False, n=PER_UNIT, blend=True):
    pool = sorted(items, key=blended_key, reverse=True) if blend else items
    wall = []
    for it in pool:
        if len(wall) >= n: break
        if used is not None and it["uid"] in used: continue
        rel = dl_thumb(it["uid"])
        if not rel: continue
        row = [rel, fmt(it.get("views")), it.get("permalink")]
        if with_cat: row.append(pick_cat(it.get("categories")))
        wall.append(row)
        if used is not None: used.add(it["uid"])
    return wall

units = {}
USED = set()  # bendras profilio walls dedup (Organic + teminiai + Partnerships)

# ---- 1. Organic (flagship) — top non-branded, blended ----
allitems = fetch({"sortBy": "views", "sortDir": "desc"}, 500)
org = [it for it in allitems if not it.get("isBranded") and not it.get("brand")]
units["Organic"] = to_wall(org, used=USED, with_cat=True)
print(f"{'Organic':18} sienoje={len(units['Organic'])}")

# ---- 2. Teminiai (IG-only, dedup vs Organic + tarpusavyje) ----
for label, cat in [("Travel", "Kelionės"), ("Fashion", "Outfitai"), ("Couple", "Pora"), ("Events", "Renginiai")]:
    items = fetch({"category": cat, "platform": "instagram", "sortBy": "views", "sortDir": "desc"})
    units[label] = to_wall(items, used=USED)
    print(f"{label:18} sienoje={len(units[label])} (po dedup)")

# ---- 3. Partnerships — top branded (visi brendai), dedup vs profilio ----
top_ig = fetch({"platform": "instagram", "sortBy": "views", "sortDir": "desc"}, 300)
part = [it for it in top_ig if it.get("isBranded") and (it.get("brand") or "").strip()]
units["Partnerships"] = to_wall(part, used=USED)
print(f"{'Partnerships':18} sienoje={len(units['Partnerships'])}")

# ---- 4. Brendai — savo geriausi (blended, BE dedup; brendo case rodo brendo top) ----
for brand in ["Mionetto", "Hellmann", "Nissan", "Maxima"]:
    units[brand] = to_wall(fetch_brand(brand))
    print(f"{brand:18} sienoje={len(units[brand])}")

akr = fetch_brand("Akropolis", 120)
style = [it for it in akr if "Outfitai" in (it.get("categories") or [])]
creative = [it for it in akr if "Outfitai" not in (it.get("categories") or [])]
units["Akropolis (creative)"] = to_wall(creative)
units["Akropolis (style)"] = to_wall(style)
print(f"{'Akropolis':18} creative={len(units['Akropolis (creative)'])} style={len(units['Akropolis (style)'])}")

out = os.path.join(os.path.dirname(__file__), "content-data.generated.txt")
with open(out, "w") as f:
    for k, w in units.items():
        f.write(f"// {k} ({len(w)} postų)\n{json.dumps(w, ensure_ascii=False)}\n\n")
print(f"\n→ {out}\n→ thumbnail'ai: {OUT_IMG}/ (viso {len(os.listdir(OUT_IMG))})")

# ---- AUTO DB scalars ----
from collections import Counter
ALL = fetch({}, 5000)
branded = [it for it in ALL if it.get("isBranded") and (it.get("brand") or "").strip()]
bc = Counter((it.get("brand") or "").strip() for it in branded)
top_org = max((it.get("views") or 0 for it in ALL if not it.get("isBranded") and not it.get("brand")), default=0)
print("\n═══ AUTO DB scalars ═══")
print(f"    brandedPosts:'{len(branded)}',")
print(f"    repeatPartners:'{len([1 for b, n in bc.items() if n >= 3])}',")
print(f"    topReel:'{fmt(top_org)}',")
