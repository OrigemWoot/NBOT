<?php
$h 		=	"localhost";
$u 		=	"nbot";
$p 		=	"televizor2";
$db 		=	"nbot"; //database name

$mysqli 	= 	new mysqli($h, $u, $p, $db, 0);
$mysqli->query("SET NAMES utf8");

$time = time(); 
$musibyt = $time-(43200*3);
$musibyt_song = $time-604800; // 7 days

$mysqli->query("DELETE FROM song_history WHERE time < '$musibyt_song'");

/* Delete from wait list */
$qry = $mysqli->query("SELECT room,time,id FROM globadl_waitlist");

while($res = mysqli_fetch_object($qry)){

	$hash = urldecode($res->room);

	$t = $res->time;
	$id = $res->id;

	$dclimit_h = mysqli_fetch_object($mysqli->query("SELECT dclimit,room FROM activated_bots WHERE room = '$hash' "))->dclimit;
	$dclimit_m = $dclimit_h*60;
	$dclimit_s = $dclimit_m*60;

	$pocetSekundOdOdopjenia = $time-$t;
	$rozdiel = $t+$dclimit_s;

	if($pocetSekundOdOdopjenia > $dclimit_s){
		$mysqli->query("DELETE FROM globadl_waitlist WHERE id = '$id'");
	}
}
?>