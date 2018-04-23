<?php
header("Access-Control-Allow-Origin: *");
$c 	=	$_POST['community'];
require "get/actions/mysqlDB55.php";

$community_exist = mysqli_fetch_object($mysqli->query("SELECT id FROM activated_bots WHERE room = '$c' "))->id;
if($community_exist){
	$communityPassword = mysqli_fetch_object($mysqli->query("SELECT password FROM activated_bots WHERE room = '$c' "))->password;
	if($communityPassword){
		echo "ok";	
	} else {
		echo "register";
	}
	
} else {
	echo "fail";
}
?>