<?php
session_name('jk_admin_auth');
session_start();
require_once __DIR__ . '/config.php';

header('Content-Type: application/json; charset=utf-8');

// Auth
if (empty($_SESSION['admin_ok'])) {
    http_response_code(401);
    exit(json_encode(['ok' => false, 'msg' => 'Not authenticated']));
}

$section = $_POST['section'] ?? '';
$allowed = ['links', 'texts', 'projects', 'stats'];
if (!in_array($section, $allowed)) {
    exit(json_encode(['ok' => false, 'msg' => 'Invalid section']));
}

$file = DATA_DIR . $section . '.json';
$current = file_exists($file) ? json_decode(file_get_contents($file), true) : [];

switch ($section) {

    // ---- LINKS ----
    case 'links':
        $buttons = [];
        $raw = json_decode($_POST['data'] ?? '[]', true);
        foreach ($raw as $i => $b) {
            $buttons[] = [
                'id'     => (int)($b['id'] ?? $i + 1),
                'label'  => trim(strip_tags($b['label'] ?? '')),
                'url'    => trim($b['url'] ?? ''),
                'icon'   => preg_replace('/[^a-z0-9 \-]/', '', $b['icon'] ?? 'fas fa-link'),
                'style'  => preg_replace('/[^a-z0-9\-]/', '', $b['style'] ?? 'collab'),
                'active' => (bool)($b['active'] ?? true),
            ];
        }
        $save = ['buttons' => $buttons];
        break;

    // ---- TEXTS ----
    case 'texts':
        $raw = json_decode($_POST['data'] ?? '{}', true);
        $save = [
            'hero' => [
                'name'      => trim(strip_tags($raw['hero']['name']      ?? '')),
                'handle'    => trim(strip_tags($raw['hero']['handle']    ?? '')),
                'niche'     => trim(strip_tags($raw['hero']['niche']     ?? '')),
                'followers' => trim(strip_tags($raw['hero']['followers'] ?? '')),
                'posts'     => trim(strip_tags($raw['hero']['posts']     ?? '')),
                'er'        => trim(strip_tags($raw['hero']['er']        ?? '')),
            ],
            'about' => [
                'title' => trim(strip_tags($raw['about']['title'] ?? '')),
                'text1' => trim(strip_tags($raw['about']['text1'] ?? '')),
                'text2' => trim(strip_tags($raw['about']['text2'] ?? '')),
                'tags'  => array_map('trim', array_filter(explode(',', strip_tags($raw['about']['tags'] ?? '')))),
            ],
            'collab' => [
                'title' => trim(strip_tags($raw['collab']['title'] ?? '')),
                'text'  => trim(strip_tags($raw['collab']['text']  ?? '')),
            ],
        ];
        break;

    // ---- PROJECTS ----
    case 'projects':
        $raw = json_decode($_POST['data'] ?? '[]', true);
        $projects = [];
        foreach ($raw as $i => $p) {
            $projects[] = [
                'id'           => (int)($p['id'] ?? $i + 1),
                'title'        => trim(strip_tags($p['title']       ?? '')),
                'category'     => preg_replace('/[^a-z]/', '', strtolower($p['category'] ?? 'lifestyle')),
                'brand'        => trim(strip_tags($p['brand']       ?? '')),
                'brand_logo'   => preg_replace('/[^a-zA-Z0-9_\-\.]/', '', $p['brand_logo'] ?? ''),
                'image'        => preg_replace('/[^a-zA-Z0-9_\-\.]/', '', $p['image']      ?? ''),
                'description'  => trim(strip_tags($p['description'] ?? '')),
                'metric1_icon' => preg_replace('/[^a-z0-9 \-]/', '', $p['metric1_icon'] ?? 'fas fa-eye'),
                'metric1_value'=> trim(strip_tags($p['metric1_value'] ?? '')),
                'metric2_icon' => preg_replace('/[^a-z0-9 \-]/', '', $p['metric2_icon'] ?? 'fas fa-heart'),
                'metric2_value'=> trim(strip_tags($p['metric2_value'] ?? '')),
                'active'       => (bool)($p['active'] ?? true),
            ];
        }
        $save = ['projects' => $projects];
        break;

    // ---- STATS ----
    case 'stats':
        $raw = json_decode($_POST['data'] ?? '{}', true);
        $save = $current; // keep existing structure

        // Update flat IG/TT/YT numbers
        foreach (['instagram','tiktok','youtube'] as $platform) {
            if (isset($raw[$platform]) && is_array($raw[$platform])) {
                foreach ($raw[$platform] as $k => $v) {
                    $save[$platform][$k] = trim(strip_tags($v));
                }
            }
        }
        // Packages
        if (isset($raw['packages']) && is_array($raw['packages'])) {
            $pkgs = [];
            foreach ($raw['packages'] as $p) {
                $pkgs[] = [
                    'id'       => (int)($p['id'] ?? 0),
                    'tag'      => trim(strip_tags($p['tag']   ?? '')),
                    'name'     => trim(strip_tags($p['name']  ?? '')),
                    'price'    => trim(strip_tags($p['price'] ?? '')),
                    'period'   => trim(strip_tags($p['period'] ?? '')),
                    'items'    => array_map('trim', array_filter(array_map('strip_tags', (array)($p['items'] ?? [])))),
                    'note'     => trim(strip_tags($p['note']  ?? '')),
                    'featured' => (bool)($p['featured'] ?? false),
                ];
            }
            $save['packages'] = $pkgs;
        }
        // Audience
        if (isset($raw['audience'])) {
            $aud = $raw['audience'];
            $save['audience']['gender_female'] = (int)($aud['gender_female'] ?? 75);
            $save['audience']['gender_male']   = 100 - $save['audience']['gender_female'];
            foreach (['age', 'locations'] as $group) {
                if (isset($aud[$group]) && is_array($aud[$group])) {
                    $save['audience'][$group] = array_map(fn($r) => [
                        'label' => trim(strip_tags($r['label'] ?? '')),
                        'pct'   => max(0, min(100, (int)($r['pct'] ?? 0))),
                    ], $aud[$group]);
                }
            }
        }
        break;

    default:
        exit(json_encode(['ok' => false, 'msg' => 'Unknown section']));
}

file_put_contents($file, json_encode($save, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
exit(json_encode(['ok' => true, 'msg' => 'Saved!']));
