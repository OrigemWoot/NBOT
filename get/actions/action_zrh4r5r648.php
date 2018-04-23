<?php
/*
	Check Active Narcis BOT
*/

Header('Access-Control-Allow-Origin: *');
require "mysqlDB55.php";

$room = urldecode($_POST['Room']);
$password = $_POST['Key'];

if($room AND $password)
{
	$row = mysqli_fetch_assoc($mysqli->query("SELECT * FROM activated_bots WHERE room = '{$room}' AND password = '{$password}'"));
	if($row['bot']){
		echo "OK ".$row['lang']." ".
		$row['bot']." ".
		$row['settings_voteskipcount']." ".
		$row['settings_songlimit']." ".
		$row['settings_roulettetime']." ".
		$row['settings_historylimit']." ".
		$row['msg_grab']." ".
		$row['msg_welcome']." ".
		$row['msg_stats']." ".
		$row['permissions']." ".
		$row['tr']." ".
		$row['dclimit']." ".
		str_replace(" ", "-_-_-", $row['WelcomeMessageMSG'])." ".
		$row["wlfilter"]." ".
		$row["autodc"]." ".
		$row["commandlog"]." ".
		$row["hidecommands"]." ".
		str_replace(" ", "-_-_-", $row["motd"])." ".
		str_replace(" ", "-_-_-", $row["cookie_cmds"])." ".
		str_replace(" ", "-_-_-", $row["cookie_words"])." ".
		$row["talk_file"]." ".
		$row["emote_check"]." ".
		$row["ai_type"]; 
	} else {
		echo "Failed";
	}
} else {
	echo "Hello world!"; 
}

?>