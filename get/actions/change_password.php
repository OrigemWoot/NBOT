<?php
/*
	Change password
*/

Header('Access-Control-Allow-Origin: *');
require "mysqlDB55.php";

$community 	=	$_POST["community"];
$key 			=	$_POST["key"];
$newkey 		=	$mysqli->real_escape_string($_POST["newkey"]);

if($community AND $key AND $newkey)
{
	$row = mysqli_fetch_assoc($mysqli->query("SELECT * FROM activated_bots WHERE room = '{$community}' AND password = '{$key}'"));

	if($row){
		$mysqli->query("UPDATE activated_bots SET password = '{$newkey}' WHERE room = '{$community}' ");
	}
}
?>