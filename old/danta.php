<?php

session_start();

$fn = $_GET['fn'];
$params = (object)$_GET['params'];

if(!isset($_SESSION['contents'])) {
    $_SESSION['contents'] = file_get_contents($params->url);
}
$contents = $_SESSION['contents'];

$response = null;

switch($fn) {
    case 'get_regex':
        $matches = array();
        $response = array();
        
        foreach($params->regex as $regex) {
            preg_match($regex, $contents, $matches);
            $response[] = $matches;
        }
        break;
}

echo json_encode($response);
exit;
