<?php
session_name('jk_mk_auth');
session_start();
session_destroy();
header('Location: index.php');
exit;
