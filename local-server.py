#!/usr/bin/env python3
"""
JASNAUSKAITE.LT — Local Development Server
===========================================
Replaces PHP locally so you can test everything without installing PHP.
Simply run:  python3 local-server.py
Or double-click start.command
"""
import http.server, json, os, re, secrets, shutil, socketserver, threading, time, webbrowser
from datetime import datetime
from urllib.parse import parse_qs, urlparse

PORT       = 8080
BASE       = os.path.dirname(os.path.abspath(__file__))
DATA       = os.path.join(BASE, 'data')
IMAGES     = os.path.join(BASE, 'images')
ADMIN_PW   = 'inide2025admin'   # ← change to match admin/config.php
MK_PW      = 'jasna2025kit'     # ← change to match media-kit/config.php
sessions   = {}                  # in-memory session store

MIME = {
    '.html':'.html','.css':'text/css','.js':'application/javascript',
    '.json':'application/json','.png':'image/png','.jpg':'image/jpeg',
    '.jpeg':'image/jpeg','.webp':'image/webp','.gif':'image/gif',
    '.ico':'image/x-icon','.svg':'image/svg+xml',
    '.woff2':'font/woff2','.woff':'font/woff','.ttf':'font/ttf',
}
MIME = {
    '.html': 'text/html; charset=utf-8',
    '.css':  'text/css',
    '.js':   'application/javascript',
    '.json': 'application/json',
    '.png':  'image/png',
    '.jpg':  'image/jpeg', '.jpeg': 'image/jpeg',
    '.webp': 'image/webp', '.gif':  'image/gif',
    '.ico':  'image/x-icon', '.svg': 'image/svg+xml',
    '.woff2':'font/woff2', '.woff':'font/woff', '.ttf':'font/ttf',
}

# ── JSON helpers ──────────────────────────────────────────────────────────────
def rjson(name):
    try:
        with open(os.path.join(DATA, f'{name}.json'), 'r', encoding='utf-8') as f:
            return json.load(f)
    except Exception:
        return {}

def wjson(name, data):
    os.makedirs(DATA, exist_ok=True)
    target = os.path.join(DATA, f'{name}.json')
    # Backup existing file before overwriting
    if os.path.isfile(target):
        backup_dir = os.path.join(DATA, 'backups')
        os.makedirs(backup_dir, exist_ok=True)
        ts = datetime.now().strftime('%Y%m%d_%H%M%S')
        shutil.copy2(target, os.path.join(backup_dir, f'{name}_{ts}.json'))
        # Keep only last 10 backups per section to save disk space
        pattern = f'{name}_'
        all_bk = sorted([f for f in os.listdir(backup_dir) if f.startswith(pattern)])
        for old in all_bk[:-10]:
            os.remove(os.path.join(backup_dir, old))
    with open(target, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

# ── Session helpers ───────────────────────────────────────────────────────────
def get_sess(cookie, kind):
    if not cookie: return None
    for part in cookie.split(';'):
        k, _, v = part.strip().partition('=')
        if k == f'jk_{kind}_tok':
            s = sessions.get(v.strip())
            if s and s['t'] == kind and time.time() - s['ts'] < 86400:
                return s
    return None

def new_sess(kind):
    tok = secrets.token_hex(32)
    sessions[tok] = {'t': kind, 'ts': time.time()}
    return tok

# ── Multipart / form-data parser ──────────────────────────────────────────────
def parse_form(body, ct):
    """Returns (fields: dict, files: dict). Files: {name: {filename, data}}"""
    fields, files = {}, {}
    if 'application/x-www-form-urlencoded' in ct:
        for k, v in parse_qs(body.decode('utf-8', errors='replace')).items():
            fields[k] = v[0] if len(v) == 1 else v
        return fields, files
    if 'multipart/form-data' in ct:
        m = re.search(r'boundary=(\S+)', ct)
        if not m: return fields, files
        bound = m.group(1).strip('"').encode()
        for part in body.split(b'--' + bound):
            if b'Content-Disposition' not in part: continue
            he = part.find(b'\r\n\r\n')
            if he < 0: continue
            hdr = part[:he].decode('utf-8', errors='ignore')
            val = part[he+4:]
            if val.endswith(b'\r\n'): val = val[:-2]
            nm = re.search(r'name="([^"]+)"', hdr)
            fn = re.search(r'filename="([^"]*)"', hdr)
            if not nm: continue
            name = nm.group(1)
            if fn:
                files[name] = {'filename': fn.group(1), 'data': val}
            else:
                fields[name] = val.decode('utf-8', errors='replace')
    return fields, files

# ── Request handler ───────────────────────────────────────────────────────────
class H(http.server.BaseHTTPRequestHandler):
    def log_message(self, *a): pass   # suppress logs

    # ── helpers ──
    def cook(self):  return self.headers.get('Cookie', '')
    def body(self):
        n = int(self.headers.get('Content-Length', 0))
        return self.rfile.read(n) if n else b''
    def ct(self):    return self.headers.get('Content-Type', '')

    def out_html(self, html, st=200):
        b = html.encode('utf-8')
        self.send_response(st)
        self.send_header('Content-Type', 'text/html; charset=utf-8')
        self.send_header('Content-Length', str(len(b)))
        self.end_headers(); self.wfile.write(b)

    def out_json(self, data, st=200):
        b = json.dumps(data, ensure_ascii=False).encode('utf-8')
        self.send_response(st)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Content-Length', str(len(b)))
        self.end_headers(); self.wfile.write(b)

    def redir(self, loc, ck=None):
        self.send_response(302)
        if ck: self.send_header('Set-Cookie', ck)
        self.send_header('Location', loc)
        self.end_headers()

    def static(self, p):
        full = os.path.realpath(os.path.join(BASE, p.lstrip('/')))
        base_real = os.path.realpath(BASE)
        if not full.startswith(base_real):
            self.out_html('<h1>403 Forbidden</h1>', 403); return
        # Block direct access to data/*.json and config files
        rel = os.path.relpath(full, base_real)
        if rel.startswith('data' + os.sep):   # block entire /data/ directory
            self.out_html('<h1>403 Forbidden</h1>', 403); return
        if os.path.basename(full) in ('config.php', 'local-server.py'):
            self.out_html('<h1>403 Forbidden</h1>', 403); return
        if not os.path.isfile(full):
            self.out_html(f'<h1>404 — {p}</h1>', 404); return
        ext  = os.path.splitext(full)[1].lower()
        mime = MIME.get(ext, 'application/octet-stream')
        with open(full, 'rb') as f: b = f.read()
        self.send_response(200)
        self.send_header('Content-Type', mime)
        self.send_header('Content-Length', str(len(b)))
        self.end_headers(); self.wfile.write(b)

    # ── GET ──
    def do_GET(self):
        p = urlparse(self.path).path.rstrip('/')
        c = self.cook()

        if p in ('', '/index.php', '/index.html'):
            self.static('index.html')

        elif p in ('/admin', '/admin/index.php'):
            if get_sess(c, 'admin'):
                self.static('admin/local.html')
            else:
                self.out_html(login_page('admin', ''))

        elif p == '/admin/data':
            if not get_sess(c, 'admin'):
                self.out_json({'ok': False}, 401); return
            self.out_json({
                'links':    rjson('links'),
                'texts':    rjson('texts'),
                'projects': rjson('projects'),
                'stats':    rjson('stats'),
            })

        elif p == '/admin/logout':
            self.redir('/admin', 'jk_admin_tok=; Path=/; Max-Age=0')

        elif p in ('/media-kit', '/media-kit/index.php'):
            if get_sess(c, 'mk'):
                self.redir('/media-kit/kit.php')
            else:
                self.out_html(login_page('mk', ''))

        elif p == '/media-kit/kit.php':
            if get_sess(c, 'mk'):
                self.static('media-kit/local-kit.html')
            else:
                self.redir('/media-kit/index.php')

        elif p == '/media-kit/logout.php':
            self.redir('/media-kit/index.php', 'jk_mk_tok=; Path=/; Max-Age=0')

        elif p == '/media-kit/data':
            if not get_sess(c, 'mk'):
                self.out_json({'ok': False}, 401); return
            self.out_json(rjson('stats'))

        else:
            self.static(p)

    # ── POST ──
    def do_POST(self):
        p   = urlparse(self.path).path.rstrip('/')
        c   = self.cook()
        raw = self.body()
        ct  = self.ct()
        fields, files = parse_form(raw, ct)

        # ── Admin login ──
        if p in ('/admin', '/admin/index.php'):
            pw = fields.get('password', '')
            if pw == ADMIN_PW:
                tok = new_sess('admin')
                self.redir('/admin', f'jk_admin_tok={tok}; Path=/; HttpOnly')
            else:
                self.out_html(login_page('admin', 'Incorrect password.'))

        # ── Media Kit login ──
        elif p in ('/media-kit', '/media-kit/index.php'):
            pw = fields.get('password', '')
            if pw == MK_PW:
                tok = new_sess('mk')
                self.redir('/media-kit/kit.php', f'jk_mk_tok={tok}; Path=/; HttpOnly')
            else:
                self.out_html(login_page('mk', 'Incorrect password.'))

        # ── Admin save ──
        elif p == '/admin/save.php':
            if not get_sess(c, 'admin'):
                self.out_json({'ok': False, 'msg': 'Not authenticated'}, 401); return
            section  = fields.get('section', '')
            raw_data = fields.get('data', '{}')
            if section not in ('links', 'texts', 'projects', 'stats'):
                self.out_json({'ok': False, 'msg': 'Invalid section'}); return
            try:
                data = json.loads(raw_data)
                if section == 'stats':
                    existing = rjson('stats')
                    # Deep-merge platforms
                    for k in ('instagram', 'tiktok', 'youtube'):
                        if k in data and isinstance(data[k], dict):
                            existing.setdefault(k, {}).update(data[k])
                    if 'packages' in data:
                        existing['packages'] = data['packages']
                    if 'audience' in data:
                        aud = data['audience']
                        existing.setdefault('audience', {})
                        gf = int(aud.get('gender_female', existing['audience'].get('gender_female', 75)))
                        existing['audience']['gender_female'] = gf
                        existing['audience']['gender_male']   = 100 - gf
                        for grp in ('age', 'locations'):
                            if grp in aud: existing['audience'][grp] = aud[grp]
                    data = existing
                wjson(section, data)
                self.out_json({'ok': True})
            except Exception as e:
                self.out_json({'ok': False, 'msg': str(e)})

        # ── Admin upload ──
        elif p == '/admin/upload.php':
            if not get_sess(c, 'admin'):
                self.out_json({'ok': False, 'msg': 'Not authenticated'}, 401); return
            f = files.get('file')
            if not f:
                self.out_json({'ok': False, 'msg': 'No file received'}); return
            upload_type = fields.get('type', 'projects')
            filename    = f['filename']
            filedata    = f['data']
            ext = os.path.splitext(filename)[1].lower().lstrip('.')
            if ext not in ('jpg','jpeg','png','gif','webp'):
                self.out_json({'ok': False, 'msg': 'Invalid file type'}); return
            if len(filedata) > 8 * 1024 * 1024:
                self.out_json({'ok': False, 'msg': 'File too large (max 8MB)'}); return
            dirs = {'projects': os.path.join(IMAGES,'projects'),
                    'brands':   os.path.join(IMAGES,'brands')}
            save_dir = dirs.get(upload_type, IMAGES)
            os.makedirs(save_dir, exist_ok=True)
            if upload_type in ('profile', 'about'):
                save_name = f'{upload_type}.{ext}'
            else:
                import random
                save_name = f'img_{int(time.time())}_{random.randint(1000,9999)}.{ext}'
            with open(os.path.join(save_dir, save_name), 'wb') as out:
                out.write(filedata)
            self.out_json({'ok': True, 'filename': save_name, 'msg': 'Uploaded!'})

        # ── Contact form (local: just acknowledge) ──
        elif p == '/contact.php':
            self.out_json({'success': True,
                           'message': '✅ [Local mode] Form received. Emails are not sent locally.'})
        else:
            self.out_json({'ok': False, 'msg': f'Not found: {p}'}, 404)


# ── Login page templates ──────────────────────────────────────────────────────
def login_page(kind, error):
    err_html = f'<div class="err"><i class="fas fa-triangle-exclamation"></i> {error}</div>' if error else ''
    if kind == 'admin':
        return f'''<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Admin — Inidė Jasnauskaitė</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
<style>*{{box-sizing:border-box;margin:0;padding:0}}body{{font-family:'Inter',sans-serif;background:#0a0a0a;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px;position:relative;overflow:hidden}}body::before{{content:'';position:absolute;inset:0;background:linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888);opacity:.07;pointer-events:none}}.box{{background:#fff;border-radius:20px;padding:44px 36px;max-width:380px;width:100%;box-shadow:0 20px 60px rgba(0,0,0,.3);position:relative;z-index:1}}.icon{{width:64px;height:64px;border-radius:50%;background:linear-gradient(45deg,#f09433,#bc1888);display:flex;align-items:center;justify-content:center;margin:0 auto 18px;font-size:24px;color:#fff;box-shadow:0 6px 24px rgba(188,24,136,.3)}}h1{{font-size:22px;font-weight:700;text-align:center;margin-bottom:6px}}p{{font-size:13px;color:#6b7280;text-align:center;margin-bottom:6px}}.badge{{background:#fef3c7;color:#92400e;font-size:11px;font-weight:600;padding:4px 12px;border-radius:99px;display:block;text-align:center;margin:0 auto 20px;width:fit-content}}label{{font-size:13px;font-weight:600;display:block;margin-bottom:5px}}input{{width:100%;padding:10px 14px;border:1.5px solid #e5e7eb;border-radius:8px;font-size:14px;outline:none;font-family:inherit;transition:border-color .2s;margin-bottom:16px}}input:focus{{border-color:#bc1888;box-shadow:0 0 0 3px rgba(188,24,136,.1)}}button{{width:100%;padding:12px;background:linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888);color:#fff;border:none;border-radius:99px;font-size:15px;font-weight:600;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px}}.err{{background:#fff0f0;border:1px solid #fca5a5;border-radius:8px;padding:10px 14px;font-size:13px;color:#b91c1c;margin-bottom:16px;display:flex;align-items:center;gap:8px}}.back{{text-align:center;font-size:12px;color:#aaa;margin-top:18px}}.back a{{color:#bc1888}}</style>
</head><body><div class="box">
<div class="icon"><i class="fas fa-shield-halved"></i></div>
<h1>Admin Panel</h1><p>Inidė Jasnauskaitė · Website Manager</p>
<span class="badge">🔧 Local Testing Mode</span>
{err_html}
<form method="POST" action="/admin"><label for="pw">Password</label>
<input type="password" id="pw" name="password" placeholder="Enter admin password…" required autofocus>
<button type="submit"><i class="fas fa-unlock"></i> Sign In</button></form>
<p class="back"><a href="/">← Back to website</a></p>
</div></body></html>'''
    else:
        return f'''<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Media Kit Access — Inidė Jasnauskaitė</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
<style>*{{box-sizing:border-box;margin:0;padding:0}}body{{font-family:'Inter',sans-serif;background:#0a0a0a;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px;position:relative;overflow:hidden}}body::before{{content:'';position:absolute;inset:0;background:linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888);opacity:.06;pointer-events:none}}.box{{background:#fff;border-radius:24px;padding:48px 40px;max-width:420px;width:100%;position:relative;z-index:1;box-shadow:0 20px 60px rgba(0,0,0,.35)}}.lock{{width:70px;height:70px;border-radius:50%;background:linear-gradient(45deg,#f09433,#bc1888);display:flex;align-items:center;justify-content:center;margin:0 auto 20px;font-size:26px;color:#fff;box-shadow:0 8px 28px rgba(188,24,136,.35)}}h1{{font-family:'Playfair Display',serif;font-size:24px;text-align:center;color:#262626;margin-bottom:8px}}p{{font-size:14px;color:#737373;text-align:center;margin-bottom:28px}}label{{font-size:13px;font-weight:600;color:#262626;display:block;margin-bottom:6px}}input{{width:100%;padding:12px 16px;border:1.5px solid #DBDBDB;border-radius:8px;font-size:14px;outline:none;transition:border-color .2s;margin-bottom:16px}}input:focus{{border-color:#bc1888;box-shadow:0 0 0 3px rgba(188,24,136,.1)}}button{{width:100%;padding:13px;background:linear-gradient(45deg,#f09433,#bc1888);color:#fff;border:none;border-radius:9999px;font-size:15px;font-weight:600;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px}}.err{{background:#fff0f0;border:1px solid #f5c0c0;border-radius:8px;padding:11px 14px;font-size:13px;color:#c62828;margin-bottom:16px;display:flex;align-items:center;gap:8px}}.back{{display:block;text-align:center;margin-top:20px;font-size:13px;color:#8E8E8E}}.back a{{color:#bc1888;font-weight:500}}</style>
</head><body><div class="box">
<div class="lock"><i class="fas fa-lock"></i></div>
<h1>Media Kit Access</h1>
<p>Enter the password provided by Inidė to view the full media kit, analytics and rate card.</p>
{err_html}
<form method="POST" action="/media-kit/index.php"><label for="pw">Password</label>
<input type="password" id="pw" name="password" placeholder="Enter password…" required autofocus>
<button type="submit"><i class="fas fa-unlock"></i> Access Media Kit</button></form>
<p class="back">Don't have a password? <a href="/#media-kit">Request access</a></p>
</div></body></html>'''


# ── Start ─────────────────────────────────────────────────────────────────────
def _open():
    time.sleep(0.8)
    webbrowser.open(f'http://localhost:{PORT}')

threading.Thread(target=_open, daemon=True).start()

print(f'\n{"─"*52}')
print('🚀  JASNAUSKAITE.LT — Local Development Server')
print(f'{"─"*52}')
print(f'📱  Main site:   http://localhost:{PORT}')
print(f'🔧  Admin:       http://localhost:{PORT}/admin')
print(f'🔒  Media Kit:   http://localhost:{PORT}/media-kit/index.php')
print(f'{"─"*52}')
print('    Press Ctrl+C to stop\n')

socketserver.TCPServer.allow_reuse_address = True
with socketserver.TCPServer(('', PORT), H) as httpd:
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print('\n✅ Server stopped.')
