#!/usr/bin/env python3
"""
Iš Reelize turinio DB (localhost:3002/api/content) paima TIKRUS postus per
brendą (Akropolis suskaldo į kūrybines kampanijas vs stilių), parsisiunčia
unikalius thumbnail'us į images/db/ ir sugeneruoja wall masyvus + DB scalars.

Naudojimas: python3 build-content-data.py
Deploy: paleisti prieš build'ą — thumbnail'ai įkeliami į static export.

═══ KAIP ATNAUJINTI variant-e-phone-pro.html KAI DB PASIKEIČIA ═══
1. python3 build-content-data.py   → content-data.generated.txt + AUTO scalars
2. Įkelk naujus wall masyvus į DATA.cases[].wall (+ made breakdown).
3. Įkelk AUTO scalars (žemiau atspausdinti) į DATA.db {} bloką.
4. MANUAL skaičiai (followers, totalViews, engagement) — NE iš šio DB,
   keisk ranka iš IG insights / media kit. Atnaujink db.lastSynced datą.
Visi DB-priklausomi HTML elementai pažymėti  data-db="key"  (auto-fill iš db{}).
"""
import json, os, urllib.request, urllib.parse, sys

API = "http://localhost:3002"
OUT_IMG = os.path.join(os.path.dirname(__file__), "images", "db")
os.makedirs(OUT_IMG, exist_ok=True)
PER_UNIT = 15  # kiek postų pull'inti (9 grid'ui + likę popup'ui)

def fetch_brand(brand, n=80):
    url = API + "/api/content?" + urllib.parse.urlencode(
        {"brand": brand, "sortBy": "views", "sortDir": "desc", "pageSize": n})
    with urllib.request.urlopen(url, timeout=20) as r:
        return [it for it in json.load(r).get("items", []) if it.get("permalink")]

def dl_thumb(uid):
    path = os.path.join(OUT_IMG, uid + ".jpg")
    rel = "images/db/" + uid + ".jpg"
    if os.path.exists(path) and os.path.getsize(path) > 1000:
        return rel
    try:
        with urllib.request.urlopen(API + "/api/content/thumb/" + uid, timeout=20) as r:
            data = r.read()
        if len(data) > 1000:
            open(path, "wb").write(data)
            return rel
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

def to_wall(items, with_cat=False):
    wall = []
    for it in items[:PER_UNIT]:
        rel = dl_thumb(it["uid"])
        if not rel: continue
        row = [rel, fmt(it.get("views")), it.get("permalink")]
        if with_cat: row.append(pick_cat(it.get("categories")))
        wall.append(row)
    return wall

units = {}

# ---- Paprasti brendai ----
for brand in ["Mionetto", "Hellmann", "Nissan", "Maxima"]:
    items = fetch_brand(brand)
    units[brand] = to_wall(items)
    print(f"{brand:18} postų DB={len(items):3} sienoje={len(units[brand])}")

# ---- Akropolis: skaldom į kūrybines kampanijas vs stilių ----
akr = fetch_brand("Akropolis", 120)
style = [it for it in akr if "Outfitai" in (it.get("categories") or [])]
creative = [it for it in akr if "Outfitai" not in (it.get("categories") or [])]
units["Akropolis (creative)"] = to_wall(creative)
units["Akropolis (style)"] = to_wall(style)
print(f"{'Akropolis CREATIVE':18} DB={len(creative):3} sienoje={len(units['Akropolis (creative)'])}")
print(f"{'Akropolis STYLE':18} DB={len(style):3} sienoje={len(units['Akropolis (style)'])}")

# ---- Organic: top non-branded, įvairios kategorijos ----
url = API + "/api/content?" + urllib.parse.urlencode({"sortBy": "views", "sortDir": "desc", "pageSize": 400})
allitems = json.load(urllib.request.urlopen(url, timeout=20)).get("items", [])
org = [it for it in allitems if not it.get("isBranded") and not it.get("brand") and it.get("permalink")]
owall = []
for it in org[:PER_UNIT]:
    rel = dl_thumb(it["uid"])
    if not rel: continue
    owall.append([rel, fmt(it.get("views")), it.get("permalink"), pick_cat(it.get("categories"))])
units["Organic"] = owall
print(f"{'Organic':18} sienoje={len(owall)} kat={[w[3] for w in owall]}")

out = os.path.join(os.path.dirname(__file__), "content-data.generated.txt")
with open(out, "w") as f:
    for k, w in units.items():
        f.write(f"// {k} ({len(w)} postų)\n{json.dumps(w, ensure_ascii=False)}\n\n")
print(f"\n→ {out}\n→ thumbnail'ai: {OUT_IMG}/ (viso {len(os.listdir(OUT_IMG))})")

# ---- AUTO DB scalars → įkelk į DATA.db {} bloką variant-e-phone-pro.html ----
from collections import Counter
ALL = json.load(urllib.request.urlopen(
    API + "/api/content?" + urllib.parse.urlencode({"pageSize": 5000}), timeout=30)).get("items", [])
branded = [it for it in ALL if it.get("isBranded") and (it.get("brand") or "").strip()]
bc = Counter((it.get("brand") or "").strip() for it in branded)
top_org = max((it.get("views") or 0 for it in ALL
               if not it.get("isBranded") and not it.get("brand")), default=0)
print("\n═══ AUTO DB scalars → įkelk į DATA.db {} (variant-e-phone-pro.html) ═══")
print(f"    brandedPosts:'{len(branded)}',")
print(f"    repeatPartners:'{len([1 for b, n in bc.items() if n >= 3])}',   // brendai su 3+ postais")
print(f"    topReel:'{fmt(top_org)}',   // geriausias organinis reel")
print( "    // brandCount/brandPartners/otherBrands → iš allBrands (cleaned) sąrašo")
print( "    // MANUAL (NE iš DB, ranka): followers, totalViews, engagement, platformAvg")
print( "    // → atnaujinus db{}, pakeisk ir db.lastSynced datą")
