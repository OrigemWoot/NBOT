<?php
/*
 Ban Song
 */
header('Access-Control-Allow-Origin: *'); 
require "mysqlDB55.php";

$autor = $_POST['name'];
$title = $_POST['title'];
$url = $_POST['eURL'];
$key = $_POST['key'];
$videoKey = $_POST['videoKey'];

if($autor && $title && $url && $videoKey && $key)
{
	$row1 = mysqli_fetch_assoc($mysqli->query("SELECT * FROM activated_bots WHERE room = '{$url}' AND password = '{$key}'"));
	if($row1['room']){
		$row = mysqli_fetch_assoc($mysqli->query("SELECT id FROM banned_songs WHERE videoKey = '$videoKey' AND room = '$url'"));
		if($row['id']){
			echo "This song is already banned!"; 
		} else {
			$mysqli->query("INSERT INTO banned_songs (author,title,room,videoKey) VALUES ('$autor', '$title', '$url','$videoKey')");
			echo "This song has been banned successfully."; 
		}
	} else {
		echo "Failed code 1";
	}
} else {
	echo "Failed code 2"; 
}
?>