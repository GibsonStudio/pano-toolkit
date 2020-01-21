<?php

unset($db);
global $db;

$db = new PDO ('mysql:host=localhost;dbname=panoramas;', "panoUser", "passw0rd");

?>
