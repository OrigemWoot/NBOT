<?php
header('Access-Control-Allow-Origin: https://plug.dj'); 

$name = rand(0,9999);
$name2 = time();
$videoKey = addslashes($_POST['video']);
$duration = addslashes($_POST['duration']);
$room_key = addslashes($_POST['key']);
$id = addslashes($_POST['id']);
$price 	= round(($duration*0.09), 2);

if($_GET["dv"]){
	require "../config.php";

	$vkey = addslashes($_GET["dv"]);

	$mysqli->query("DELETE FROM current_downloading WHERE videoKey = '$vkey'");
	die();
}

if($videoKey AND $room_key){
	require "../config.php";

	$row = mysqli_fetch_object($mysqli->query("SELECT room FROM activated_bots WHERE password = '$room_key' "))->room;
	if($row){
		if(!is_numeric($videoKey)){
			$current_downloading_row = mysqli_fetch_object($mysqli->query("SELECT id FROM current_downloading WHERE videoKey = '$videoKey' "))->id;

			if($current_downloading_row != ""){
				die("[Response from server] Error! Try again later.");
				exit();
				
			}
			$mysqli->query("INSERT INTO current_downloading (videoKey) VALUES ('$videoKey') ");

			if(file_exists("videos/".$videoKey.".mp3")){
				
				$mysqli->query("UPDATE points SET points = points - $price WHERE uid = '$id' ");
				$mysqli->query("DELETE FROM current_downloading WHERE videoKey = '$videoKey'");

				echo "[Response from server] Download complete! Link https://source.nbot.eu/online-download/videos/".$videoKey.".mp3 (right click and \"Save as\")";

			} else {
				$mysqli->query("UPDATE points SET points = points - $price WHERE uid = '$id' ");
				

				exec("youtube-dl ".$videoKey." --audio-format=mp3 --extract-audio -o '/var/www/html/online-download/videos/".$videoKey.".%(ext)s'");
				echo "[Response from server] Download complete! Link https://source.nbot.eu/online-download/videos/".$videoKey.".mp3 (right click and \"Save as\")";
				
			}	
		} else { die("[Response from server] Soundcloud songs isnt supported."); }
	} else { die(); }
} else { die(); }
?>