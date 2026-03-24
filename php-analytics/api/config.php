<?php
/**
 * Analytics Configuration
 */

define('DB_PATH', __DIR__ . '/../data/analytics.db');
define('SITE_URL', 'https://jasnauskaite.lt');
define('DASHBOARD_PASSWORD_HASH', password_hash('jasnauskaite2026', PASSWORD_DEFAULT));
define('ALLOWED_ORIGINS', [
    'https://jasnauskaite.lt',
    'https://www.jasnauskaite.lt',
    'http://localhost:3000',
]);
define('RATE_LIMIT_MAX', 100);
define('RATE_LIMIT_WINDOW', 3600);
