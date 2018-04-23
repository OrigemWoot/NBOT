<?php
header("Access-Control-Allow-Origin: *");


require "get/actions/mysqlDB55.php";
$password1 	=	addslashes(htmlspecialchars($_POST['password1']));
$password2 	=	addslashes(htmlspecialchars($_POST['password2']));
$community 	=	addslashes(htmlspecialchars($_POST['community']));

if($password1 AND $password2){
	if($password2 == $password1){
		$communityPassword = mysqli_fetch_object($mysqli->query("SELECT password FROM activated_bots WHERE room = '$community' "))->password;
		if($communityPassword == ""){
			$mysqli->query("UPDATE activated_bots SET password = '$password1' WHERE room = '$community' ");
			echo "ok";
		}
	}	
}

?>