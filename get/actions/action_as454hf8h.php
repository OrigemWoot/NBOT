<?php
/*
Unban son,g
*/
header('Access-Control-Allow-Origin: *'); 
require "mysqlDB55.php";

$songcode = $_POST['SongCode'];
$url = $_POST['eURL'];
$key = $_POST['key'];


if($songcode && $url && $key)
{
	$verifyrow = mysqli_fetch_assoc($mysqli->query("SELECT id FROM activated_bots WHERE password = '$key' AND room = '$url'"));
	if($verifyrow['id']){

			$row = mysqli_fetch_assoc($mysqli->query("SELECT id FROM banned_songs WHERE room = '$url' AND id = '$songcode'"));
			if($row['id']){
				$mysqli->query("DELETE FROM banned_songs WHERE room = '$url' AND id = '$songcode'");
				echo "Song code $songcode has been unbanned!"; 
			} else {
				echo "Song with this key des not exists."; 
			}

	} else {
		echo "Failed code 1: $songcode $key";
	}
} else {
	echo "Failed code 2"; 
}
?>