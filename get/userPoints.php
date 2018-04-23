<?php
/*
 get user points
 */
header('Access-Control-Allow-Origin: https://plug.dj');
require "actions/mysqlDB55.php";

$uid = htmlspecialchars(addslashes(strip_tags($_GET['userID'])));

if($uid)
{
	$points = mysqli_fetch_assoc($mysqli->query("SELECT points FROM points WHERE uid = '{$uid}' "));
	echo $points["points"]; 
}
?>