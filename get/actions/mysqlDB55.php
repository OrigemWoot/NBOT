<?php

header('Access-Control-Allow-Origin: *'); 


 $host = "localhost";
 $user = "id752914_nbot";
 $pass = "televizor2";
 $db = "id752914_nbot"; //database name

$mysqli = new mysqli($host,$user,$pass,$db, 0);
$mysqli->query("SET NAMES `utf8`");

?>