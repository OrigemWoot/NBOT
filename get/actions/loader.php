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

		$nbot["language"] = $row['lang'];
		$nbot["nbotName"] = $row['bot'];
		$nbot["voteskipCount"] = $row['settings_voteskipcount'];
		$nbot["songLimit"] = $row['settings_songlimit'];
		$nbot["rouletteTime"] = $row['settings_roulettetime'];
		$nbot["historyLimit"] = $row['settings_historylimit'];
		$nbot["msgGrabEngine"] = $row['msg_grab'];
		$nbot["msgWelcomeEngine"] = $row['msg_welcome'];
		$nbot["msgStatsEngine"] = $row['msg_stats'];
		$nbot["commandPermissions"] = $row['permissions'];
		$nbot["commandTrigger"] = $row['tr'];
		$nbot["dcLimit"] = $row['dclimit'];
		$nbot["welcomeMessage"] = str_replace(" ", "-_-_-", $row['WelcomeMessageMSG']);
		$nbot["waitListFilter"] = $row['wlfilter'];
		$nbot["autoDc"] = $row['autodc'];
		$nbot["commandLog"] = $row['commandlog'];
		$nbot["hideCommands"] = $row['hidecommands'];
		$nbot["motd"] = str_replace(" ", "-_-_-", $row["motd"]);
		$nbot["cookieCommands"] = str_replace(" ", "-_-_-", $row["cookie_cmds"]);
		$nbot["cookieWords"] = str_replace(" ", "-_-_-", $row["cookie_words"]);
		$nbot["talkFile"] = $row["talk_file"];
		$nbot["emoteEngine"] = $row["emote_check"];
		$nbot["aiType"] = $row["ai_type"];
		$nbot["badWords"] = $row["badwords"];
		$nbot["badWordsEngine"] = $row["badwordsEngine"];

		echo json_encode($nbot);
	} else {
		echo "Failed";
	}
} else {
	echo "Hello world!"; 
}

?>