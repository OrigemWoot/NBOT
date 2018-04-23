<?php
/*
check banned song
*/
header('Access-Control-Allow-Origin: *'); 

require "mysqlDB55.php";

$room = $_POST['url'];
$videoKey = $_POST['videoKey'];

if($room && $videoKey)
{
	$row = mysqli_fetch_assoc($mysqli->query("SELECT id FROM banned_songs WHERE videoKey = '$videoKey' AND room = '$room'"));
	if($row['id']){
		echo "banned"; 
	}
} 
?>