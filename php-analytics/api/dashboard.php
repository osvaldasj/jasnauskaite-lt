<?php
/**
 * Analytics Dashboard
 * Password-protected, shows all metrics.
 */

require_once __DIR__ . '/config.php';

session_start();

// Handle login
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['password'])) {
    if (password_verify($_POST['password'], DASHBOARD_PASSWORD_HASH)) {
        $_SESSION['authenticated'] = true;
    } else {
        $loginError = 'Neteisingas slaptazodis';
    }
}

// Handle logout
if (isset($_GET['logout'])) {
    session_destroy();
    header('Location: dashboard.php');
    exit;
}

// Check auth
if (!isset($_SESSION['authenticated']) || !$_SESSION['authenticated']) {
    showLoginPage($loginError ?? null);
    exit;
}

// Handle API requests
if (isset($_GET['api'])) {
    header('Content-Type: application/json');
    $db = new SQLite3(DB_PATH, SQLITE3_OPEN_READONLY);
    $db->enableExceptions(true);

    $period = $_GET['period'] ?? '7d';
    $dateFilter = match($period) {
        'today' => "date(created_at) = date('now')",
        '7d' => "created_at >= datetime('now', '-7 days')",
        '30d' => "created_at >= datetime('now', '-30 days')",
        'all' => '1=1',
        default => "created_at >= datetime('now', '-7 days')",
    };

    $action = $_GET['api'];
    switch ($action) {
        case 'overview':
            $r = [];
            // Total pageviews
            $stmt = $db->prepare("SELECT COUNT(*) as c FROM events WHERE event_type='pageview' AND $dateFilter");
            $r['pageviews'] = $stmt->execute()->fetchArray(SQLITE3_ASSOC)['c'];

            // Unique visitors
            $stmt = $db->prepare("SELECT COUNT(DISTINCT visitor_id) as c FROM events WHERE event_type='pageview' AND $dateFilter");
            $r['visitors'] = $stmt->execute()->fetchArray(SQLITE3_ASSOC)['c'];

            // Total events
            $stmt = $db->prepare("SELECT COUNT(*) as c FROM events WHERE $dateFilter");
            $r['total_events'] = $stmt->execute()->fetchArray(SQLITE3_ASSOC)['c'];

            // Avg scroll depth
            $stmt = $db->prepare("SELECT ROUND(AVG(scroll_depth)) as c FROM events WHERE event_type='scroll_depth' AND $dateFilter");
            $r['avg_scroll'] = $stmt->execute()->fetchArray(SQLITE3_ASSOC)['c'] ?? 0;

            echo json_encode($r);
            break;

        case 'pages':
            $stmt = $db->prepare("SELECT page_url, COUNT(*) as views, COUNT(DISTINCT visitor_id) as visitors
                FROM events WHERE event_type='pageview' AND $dateFilter
                GROUP BY page_url ORDER BY views DESC LIMIT 20");
            $rows = [];
            $result = $stmt->execute();
            while ($row = $result->fetchArray(SQLITE3_ASSOC)) $rows[] = $row;
            echo json_encode($rows);
            break;

        case 'referrers':
            $stmt = $db->prepare("SELECT referrer, COUNT(*) as visits
                FROM events WHERE event_type='pageview' AND referrer != '' AND $dateFilter
                GROUP BY referrer ORDER BY visits DESC LIMIT 20");
            $rows = [];
            $result = $stmt->execute();
            while ($row = $result->fetchArray(SQLITE3_ASSOC)) $rows[] = $row;
            echo json_encode($rows);
            break;

        case 'devices':
            $stmt = $db->prepare("SELECT
                CASE WHEN screen_width <= 768 THEN 'Mobile' WHEN screen_width <= 1024 THEN 'Tablet' ELSE 'Desktop' END as device,
                COUNT(*) as count
                FROM events WHERE event_type='pageview' AND screen_width > 0 AND $dateFilter
                GROUP BY device ORDER BY count DESC");
            $rows = [];
            $result = $stmt->execute();
            while ($row = $result->fetchArray(SQLITE3_ASSOC)) $rows[] = $row;
            echo json_encode($rows);
            break;

        case 'scroll':
            $stmt = $db->prepare("SELECT page_url, ROUND(AVG(scroll_depth)) as avg_depth, COUNT(*) as samples
                FROM events WHERE event_type='scroll_depth' AND $dateFilter
                GROUP BY page_url ORDER BY avg_depth DESC LIMIT 20");
            $rows = [];
            $result = $stmt->execute();
            while ($row = $result->fetchArray(SQLITE3_ASSOC)) $rows[] = $row;
            echo json_encode($rows);
            break;

        case 'forms':
            $stmt = $db->prepare("SELECT form_name, event_type, step_number, COUNT(*) as count
                FROM events WHERE event_type IN ('form_start','form_step','form_complete','form_abandon') AND $dateFilter
                GROUP BY form_name, event_type, step_number ORDER BY form_name, event_type, step_number");
            $rows = [];
            $result = $stmt->execute();
            while ($row = $result->fetchArray(SQLITE3_ASSOC)) $rows[] = $row;

            // Restructure into funnels
            $funnels = [];
            foreach ($rows as $row) {
                $name = $row['form_name'];
                if (!isset($funnels[$name])) $funnels[$name] = ['starts' => 0, 'steps' => [], 'completes' => 0, 'abandons' => 0];
                switch ($row['event_type']) {
                    case 'form_start': $funnels[$name]['starts'] = $row['count']; break;
                    case 'form_step': $funnels[$name]['steps'][$row['step_number']] = $row['count']; break;
                    case 'form_complete': $funnels[$name]['completes'] = $row['count']; break;
                    case 'form_abandon': $funnels[$name]['abandons'] = $row['count']; break;
                }
            }
            echo json_encode($funnels);
            break;

        case 'timeline':
            $groupBy = $period === 'today' ? "strftime('%H:00', created_at)" : "date(created_at)";
            $stmt = $db->prepare("SELECT $groupBy as period, COUNT(*) as views, COUNT(DISTINCT visitor_id) as visitors
                FROM events WHERE event_type='pageview' AND $dateFilter
                GROUP BY period ORDER BY period");
            $rows = [];
            $result = $stmt->execute();
            while ($row = $result->fetchArray(SQLITE3_ASSOC)) $rows[] = $row;
            echo json_encode($rows);
            break;

        default:
            echo json_encode(['error' => 'Unknown action']);
    }
    $db->close();
    exit;
}

// Show dashboard HTML
showDashboard();

function showLoginPage(?string $error): void {
?>
<!DOCTYPE html>
<html lang="lt">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Analytics - Prisijungimas</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700&family=Inter:wght@400;500;600&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Inter', sans-serif; background: #f8f9fa; min-height: 100vh; display: flex; align-items: center; justify-content: center; }
        .login-box { background: #fff; border-radius: 16px; padding: 48px; box-shadow: 0 4px 24px rgba(0,0,0,.08); max-width: 400px; width: 100%; }
        .login-box h1 { font-family: 'Outfit', sans-serif; font-size: 24px; margin-bottom: 8px;
            background: linear-gradient(135deg, #833AB4, #C13584, #F77737); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .login-box p { color: #666; margin-bottom: 24px; font-size: 14px; }
        .login-box input { width: 100%; padding: 12px 16px; border: 1px solid #e0e0e0; border-radius: 8px; font-size: 14px; font-family: 'Inter', sans-serif; margin-bottom: 16px; }
        .login-box input:focus { outline: none; border-color: #C13584; }
        .login-box button { width: 100%; padding: 12px; border: none; border-radius: 8px; color: #fff; font-size: 14px; font-weight: 600; cursor: pointer;
            background: linear-gradient(135deg, #833AB4, #C13584, #F77737); font-family: 'Inter', sans-serif; }
        .login-box button:hover { opacity: .9; }
        .error { color: #e74c3c; font-size: 13px; margin-bottom: 12px; }
    </style>
</head>
<body>
    <div class="login-box">
        <h1>Analytics</h1>
        <p>jasnauskaite.lt</p>
        <?php if ($error): ?><div class="error"><?= htmlspecialchars($error) ?></div><?php endif; ?>
        <form method="POST">
            <input type="password" name="password" placeholder="Slaptazodis" required autofocus>
            <button type="submit">Prisijungti</button>
        </form>
    </div>
</body>
</html>
<?php
}

function showDashboard(): void {
?>
<!DOCTYPE html>
<html lang="lt">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Analytics - jasnauskaite.lt</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700&family=Inter:wght@400;500;600&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Inter', sans-serif; background: #f8f9fa; color: #1A1A1A; }
        .header { background: #fff; border-bottom: 1px solid #e5e5e0; padding: 16px 24px; display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; z-index: 10; }
        .header h1 { font-family: 'Outfit', sans-serif; font-size: 22px;
            background: linear-gradient(135deg, #833AB4, #C13584, #F77737); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .header-right { display: flex; align-items: center; gap: 12px; }
        .period-btn { padding: 6px 14px; border: 1px solid #e0e0e0; border-radius: 6px; background: #fff; cursor: pointer; font-size: 13px; font-family: 'Inter', sans-serif; }
        .period-btn.active { background: linear-gradient(135deg, #833AB4, #C13584, #F77737); color: #fff; border-color: transparent; }
        .logout-btn { padding: 6px 14px; border: 1px solid #e0e0e0; border-radius: 6px; background: #fff; cursor: pointer; font-size: 13px; color: #666; text-decoration: none; font-family: 'Inter', sans-serif; }
        .container { max-width: 1200px; margin: 0 auto; padding: 24px; }
        .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 24px; }
        .stat-card { background: #fff; border-radius: 12px; padding: 20px; box-shadow: 0 1px 4px rgba(0,0,0,.04); }
        .stat-card .label { font-size: 12px; color: #888; text-transform: uppercase; letter-spacing: .5px; margin-bottom: 4px; }
        .stat-card .value { font-family: 'Outfit', sans-serif; font-size: 32px; font-weight: 700; }
        .card { background: #fff; border-radius: 12px; padding: 24px; box-shadow: 0 1px 4px rgba(0,0,0,.04); margin-bottom: 20px; }
        .card h2 { font-family: 'Outfit', sans-serif; font-size: 16px; font-weight: 600; margin-bottom: 16px; color: #1A1A1A; }
        .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        @media (max-width: 768px) { .two-col { grid-template-columns: 1fr; } }
        table { width: 100%; border-collapse: collapse; font-size: 14px; }
        th { text-align: left; padding: 8px 12px; border-bottom: 2px solid #f0f0f0; font-weight: 600; color: #666; font-size: 12px; text-transform: uppercase; }
        td { padding: 8px 12px; border-bottom: 1px solid #f8f8f8; }
        tr:hover td { background: #fafafa; }
        .bar-wrap { height: 8px; background: #f0f0f0; border-radius: 4px; overflow: hidden; }
        .bar-fill { height: 100%; border-radius: 4px; background: linear-gradient(90deg, #833AB4, #C13584, #F77737); }
        .funnel { display: flex; flex-direction: column; gap: 8px; }
        .funnel-step { display: flex; align-items: center; gap: 12px; }
        .funnel-label { width: 120px; font-size: 13px; white-space: nowrap; }
        .funnel-bar-wrap { flex: 1; }
        .funnel-count { width: 60px; text-align: right; font-size: 13px; font-weight: 600; }
        .timeline-chart { display: flex; align-items: flex-end; gap: 2px; height: 120px; padding-top: 8px; }
        .timeline-bar { flex: 1; min-width: 4px; border-radius: 2px 2px 0 0; background: linear-gradient(180deg, #833AB4, #C13584); cursor: pointer; position: relative; }
        .timeline-bar:hover { opacity: .8; }
        .timeline-bar .tooltip { display: none; position: absolute; bottom: 100%; left: 50%; transform: translateX(-50%);
            background: #1A1A1A; color: #fff; padding: 4px 8px; border-radius: 4px; font-size: 11px; white-space: nowrap; margin-bottom: 4px; }
        .timeline-bar:hover .tooltip { display: block; }
        .device-chart { display: flex; gap: 16px; align-items: center; }
        .device-donut { width: 100px; height: 100px; border-radius: 50%; position: relative; }
        .device-legend { display: flex; flex-direction: column; gap: 6px; }
        .device-legend-item { display: flex; align-items: center; gap: 8px; font-size: 13px; }
        .device-legend-dot { width: 10px; height: 10px; border-radius: 50%; }
        .empty { text-align: center; padding: 40px; color: #999; font-size: 14px; }
        .loading { text-align: center; padding: 20px; color: #999; }
    </style>
</head>
<body>
    <div class="header">
        <h1>Analytics</h1>
        <div class="header-right">
            <button class="period-btn" data-period="today">Siandien</button>
            <button class="period-btn active" data-period="7d">7 dienos</button>
            <button class="period-btn" data-period="30d">30 dienu</button>
            <button class="period-btn" data-period="all">Visi</button>
            <a href="?logout=1" class="logout-btn">Atsijungti</a>
        </div>
    </div>
    <div class="container">
        <div class="stats-grid">
            <div class="stat-card"><div class="label">Perziuros</div><div class="value" id="stat-pageviews">-</div></div>
            <div class="stat-card"><div class="label">Unikalus lankytojai</div><div class="value" id="stat-visitors">-</div></div>
            <div class="stat-card"><div class="label">Visi ivykiai</div><div class="value" id="stat-events">-</div></div>
            <div class="stat-card"><div class="label">Vid. scroll gylis</div><div class="value" id="stat-scroll">-</div></div>
        </div>

        <div class="card">
            <h2>Lankomumas</h2>
            <div id="timeline" class="timeline-chart"><div class="loading">Kraunama...</div></div>
        </div>

        <div class="two-col">
            <div class="card">
                <h2>Populiariausi puslapiai</h2>
                <div id="pages"><div class="loading">Kraunama...</div></div>
            </div>
            <div class="card">
                <h2>Saltiniai</h2>
                <div id="referrers"><div class="loading">Kraunama...</div></div>
            </div>
        </div>

        <div class="two-col">
            <div class="card">
                <h2>Irenginiai</h2>
                <div id="devices"><div class="loading">Kraunama...</div></div>
            </div>
            <div class="card">
                <h2>Scroll gylis pagal puslapi</h2>
                <div id="scroll"><div class="loading">Kraunama...</div></div>
            </div>
        </div>

        <div class="card">
            <h2>Formu konversijos</h2>
            <div id="forms"><div class="loading">Kraunama...</div></div>
        </div>
    </div>

    <script>
    (function() {
        let currentPeriod = '7d';

        document.querySelectorAll('.period-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.period-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentPeriod = btn.dataset.period;
                loadAll();
            });
        });

        function api(action) {
            return fetch('dashboard.php?api=' + action + '&period=' + currentPeriod)
                .then(r => r.json());
        }

        function loadAll() {
            // Overview
            api('overview').then(d => {
                document.getElementById('stat-pageviews').textContent = d.pageviews.toLocaleString();
                document.getElementById('stat-visitors').textContent = d.visitors.toLocaleString();
                document.getElementById('stat-events').textContent = d.total_events.toLocaleString();
                document.getElementById('stat-scroll').textContent = (d.avg_scroll || 0) + '%';
            });

            // Timeline
            api('timeline').then(data => {
                const el = document.getElementById('timeline');
                if (!data.length) { el.innerHTML = '<div class="empty">Nera duomenu</div>'; return; }
                const max = Math.max(...data.map(d => d.views));
                el.innerHTML = data.map(d => {
                    const h = max > 0 ? Math.max(4, (d.views / max) * 112) : 4;
                    return '<div class="timeline-bar" style="height:' + h + 'px"><div class="tooltip">' +
                        d.period + ': ' + d.views + ' perz., ' + d.visitors + ' lank.</div></div>';
                }).join('');
            });

            // Pages
            api('pages').then(data => {
                const el = document.getElementById('pages');
                if (!data.length) { el.innerHTML = '<div class="empty">Nera duomenu</div>'; return; }
                const max = data[0].views;
                el.innerHTML = '<table><thead><tr><th>Puslapis</th><th>Perziuros</th><th>Lankytojai</th><th></th></tr></thead><tbody>' +
                    data.map(d => '<tr><td>' + escHtml(d.page_url || '/') + '</td><td>' + d.views +
                        '</td><td>' + d.visitors + '</td><td><div class="bar-wrap"><div class="bar-fill" style="width:' +
                        (d.views/max*100) + '%"></div></div></td></tr>').join('') + '</tbody></table>';
            });

            // Referrers
            api('referrers').then(data => {
                const el = document.getElementById('referrers');
                if (!data.length) { el.innerHTML = '<div class="empty">Nera duomenu</div>'; return; }
                const max = data[0].visits;
                el.innerHTML = '<table><thead><tr><th>Saltinis</th><th>Apsilankymai</th><th></th></tr></thead><tbody>' +
                    data.map(d => '<tr><td>' + escHtml(d.referrer) + '</td><td>' + d.visits +
                        '</td><td><div class="bar-wrap"><div class="bar-fill" style="width:' +
                        (d.visits/max*100) + '%"></div></div></td></tr>').join('') + '</tbody></table>';
            });

            // Devices
            api('devices').then(data => {
                const el = document.getElementById('devices');
                if (!data.length) { el.innerHTML = '<div class="empty">Nera duomenu</div>'; return; }
                const total = data.reduce((s, d) => s + d.count, 0);
                const colors = { Mobile: '#C13584', Tablet: '#833AB4', Desktop: '#F77737' };
                let gradient = [], acc = 0;
                data.forEach(d => {
                    const pct = d.count / total * 100;
                    gradient.push((colors[d.device]||'#ccc') + ' ' + acc + '% ' + (acc+pct) + '%');
                    acc += pct;
                });
                el.innerHTML = '<div class="device-chart">' +
                    '<div class="device-donut" style="background:conic-gradient(' + gradient.join(',') + ')"></div>' +
                    '<div class="device-legend">' + data.map(d =>
                        '<div class="device-legend-item"><div class="device-legend-dot" style="background:' +
                        (colors[d.device]||'#ccc') + '"></div>' + d.device + ' — ' + d.count +
                        ' (' + Math.round(d.count/total*100) + '%)</div>').join('') + '</div></div>';
            });

            // Scroll
            api('scroll').then(data => {
                const el = document.getElementById('scroll');
                if (!data.length) { el.innerHTML = '<div class="empty">Nera duomenu</div>'; return; }
                el.innerHTML = '<table><thead><tr><th>Puslapis</th><th>Vid. gylis</th><th>Pavyzdziai</th><th></th></tr></thead><tbody>' +
                    data.map(d => '<tr><td>' + escHtml(d.page_url || '/') + '</td><td>' + d.avg_depth +
                        '%</td><td>' + d.samples + '</td><td><div class="bar-wrap"><div class="bar-fill" style="width:' +
                        d.avg_depth + '%"></div></div></td></tr>').join('') + '</tbody></table>';
            });

            // Forms
            api('forms').then(data => {
                const el = document.getElementById('forms');
                const keys = Object.keys(data);
                if (!keys.length) { el.innerHTML = '<div class="empty">Nera formu duomenu</div>'; return; }
                el.innerHTML = keys.map(name => {
                    const f = data[name];
                    const maxVal = Math.max(f.starts, 1);
                    let html = '<h3 style="font-family:Outfit;font-size:14px;margin-bottom:12px;margin-top:8px">' + escHtml(name) + '</h3><div class="funnel">';
                    html += funnelRow('Pradejo', f.starts, maxVal);
                    const steps = Object.keys(f.steps).sort((a,b) => a-b);
                    steps.forEach(s => { html += funnelRow('Zingsnis ' + s, f.steps[s], maxVal); });
                    html += funnelRow('Uzbaige', f.completes, maxVal);
                    html += funnelRow('Atsisake', f.abandons, maxVal);
                    html += '</div>';
                    return html;
                }).join('');
            });
        }

        function funnelRow(label, count, max) {
            return '<div class="funnel-step"><div class="funnel-label">' + label +
                '</div><div class="funnel-bar-wrap"><div class="bar-wrap"><div class="bar-fill" style="width:' +
                (count/max*100) + '%"></div></div></div><div class="funnel-count">' + count + '</div></div>';
        }

        function escHtml(s) {
            const d = document.createElement('div');
            d.textContent = s;
            return d.innerHTML;
        }

        loadAll();
    })();
    </script>
</body>
</html>
<?php
}
