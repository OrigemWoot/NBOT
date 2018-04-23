<?php
header('Access-Control-Allow-Origin: https://plug.dj');
require "actions/mysqlDB55.php";
if($_POST){



$roomKey = $_POST['key'];

$CommunityArray = mysqli_fetch_array($mysqli->query("SELECT * FROM activated_bots WHERE password = '$roomKey'"));

$CommunityLanguage = $CommunityArray['lang'];

if($CommunityLanguage){

	$LangArray = mysqli_fetch_array($mysqli->query("SELECT * FROM nbot_langs WHERE lang = '$CommunityLanguage'"));
	if($LangArray['source']){
		echo $LangArray['source'];
	} else {
		echo "Your language isnt translated. Please visit https://nbot-nakituminajasi.c9users.io/n/translate.php";
	}

} else {
	echo "key: ".$roomKey;
	echo "lang: ".$CommunityLanguage;
}

} 
if(isset($_GET['k'])){
	$roomkey = addslashes($_GET['k']);
	$roomURL_array = mysqli_fetch_array($mysqli->query("SELECT room FROM activated_bots 	WHERE password = '$roomkey'"));
	$roomURL = $roomURL_array['room'];

	$q = $mysqli->query("SELECT lang FROM nbot_langs ");

	while($LangArray = mysqli_fetch_array($q)){
		$langs[] = $LangArray['lang'];
	}

	echo implode(",", $langs);
	echo "--";
}
?>