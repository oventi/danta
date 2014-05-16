<?php

//error_reporting(0);
//ini_set('display_errors', 0);

$fn = $_POST['fn'];
$data = array();

switch ($fn) {
    case 'fn1':
        break;
    default:
}

header("Content-type: application/json");
echo json_encode($data); exit;
