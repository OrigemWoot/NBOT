<?php
/*
save song to database
*/
header('Access-Control-Allow-Origin: *'); 
require "mysqlDB55.php";

$author = addslashes($_POST['eAuthor']);
$title = addslashes($_POST['eTitle']);
$dj = addslashes($_POST['eDJ']);
$room = addslashes($_POST['eURL']);
$stats = explode(",", $_POST['stats']);
$songKey = addslashes($_POST['songKey']);
$ip = $_SERVER['REMOTE_ADDR'];
$djid 	=	addslashes(htmlspecialchars($_POST["eUid"]));

$w = $stats[0];
$g = $stats[1];
$m = $stats[2];


$points 	=	($w*3)+($g*10);
$roomname = addslashes($_POST['eRoomName']);
$time = time();

if($author && $title && $dj)
{
		$row = mysqli_fetch_assoc($mysqli->query("SELECT * FROM activated_bots WHERE room = '$room'"));
		if($row['room']){
			$mysqli->query("INSERT INTO song_history (title,author,dj,time,room,roomName,w,g,m,songKey,ip) VALUES ('{$title}', '{$author}', '{$dj}', '{$time}','{$room}','{$roomname}','{$w}','{$g}','{$m}','{$songKey}','$ip')");
		
			if($djid){
				$row2 = mysqli_fetch_assoc($mysqli->query("SELECT * FROM points WHERE uid = '$djid'"));
				
				if($row2["uid"]){
					$mysqli->query("UPDATE points SET points = points + $points, uname = '{$dj}' WHERE uid = '{$djid}' ");				
				} else {
					$mysqli->query("INSERT INTO points (uid,points,uname) VALUES ('{$djid}', '{$points}', '{$dj}')");				
				}
			}
		echo "OK";
		} else {
			echo "Access denied";
		}
} 
?>