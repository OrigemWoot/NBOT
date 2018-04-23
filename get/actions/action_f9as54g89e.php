<?php
/*
Get facebook page
*/
header('Access-Control-Allow-Origin: *'); 

$gettype = addslashes(htmlspecialchars($_POST['g']));
		require "mysqlDB55.php";

	$bot = $_POST['BotName'];
	$version = $_POST['Version'];
	$room = urldecode($_POST['Room']);
	$password = $_POST['Key'];

	if($room AND $password)
	{

		if($gettype == "fb"){


				$row = mysqli_fetch_assoc($mysqli->query("SELECT FacebookPage FROM activated_bots WHERE room = '{$room}' AND password = '{$password}'"));
				if($row['FacebookPage']){
					echo $row['FacebookPage']; 
				} else {
					$room = str_replace("http://plug.dj", "", $room);
				}


		} elseif($gettype == "rules"){

				$row = mysqli_fetch_assoc($mysqli->query("SELECT RulesPage FROM activated_bots WHERE room = '{$room}' AND password = '{$password}'"));
				if($row['RulesPage']){
					echo $row['RulesPage']; 
				}

		}
	} else {
		echo "Fatal error"; 
	}
?>