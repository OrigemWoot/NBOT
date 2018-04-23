<?php
header('Access-Control-Allow-Origin: https://plug.dj');
require "actions/mysqlDB55.php";
if($_POST){

	$roomKey = addslashes($_POST['key']);
	$roomUrl = addslashes(urldecode($_POST['community']));
	if($roomUrl){
		$CommunityArray = mysqli_fetch_array($mysqli->query("SELECT * FROM activated_bots WHERE password = '$roomKey' AND room = '$roomUrl'"));
	} else {
		$CommunityArray = mysqli_fetch_array($mysqli->query("SELECT * FROM activated_bots WHERE password = '$roomKey' "));

	}

	$CommunityLanguage = $CommunityArray['lang'];

	if($CommunityLanguage){

		echo $CommunityLanguage;
	}

} 

?>