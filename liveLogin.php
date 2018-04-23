<?php
header("Access-Control-Allow-Origin: *");


require "get/actions/mysqlDB55.php";
$password 	=	addslashes(htmlspecialchars($_POST['password']));
$community 	=	addslashes(htmlspecialchars($_POST['community']));


$pdb 	=	mysqli_fetch_object($mysqli->query("SELECT password FROM activated_bots WHERE room = '$community'"))->password;
if($password == $pdb){
	echo "ok";
}
?>