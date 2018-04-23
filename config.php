<?php
header("Access-Control-Allow-Origin: *");

$h 		=	"localhost";
$u 		=	"id752914_nbot";
$p 		=	"televizor2";
$db 	=	"id752914_nbot"; //database name

$mysqli 	= 	new mysqli($h, $u, $p, $db, 0);
$mysqli->query("SET NAMES utf8");
$nBots 		=	mysqli_fetch_object($mysqli->query("SELECT * FROM activated_bots"));
$nSongs		=	mysqli_fetch_object($mysqli->query("SELECT * FROM song_history ORDER BY id DESC"));
$nSongsLast7days	=	mysqli_fetch_object($mysqli->query("SELECT COUNT(*) as sl FROM song_history ORDER BY id DESC"));
$nSongsLast 		=	mysqli_fetch_object($mysqli->query("SELECT author,title,w,g,m,dj,id FROM song_history ORDER BY id DESC LIMIT 1"));

$woots7Days	=	mysqli_fetch_object($mysqli->query("SELECT SUM(w) as tw FROM song_history"))->tw;
$grabs7Days	=	mysqli_fetch_object($mysqli->query("SELECT SUM(g) as tg FROM song_history"))->tg;
$mehs7Days	=	mysqli_fetch_object($mysqli->query("SELECT SUM(m) as tm FROM song_history"))->tm;
$totalWoots 	=	mysqli_fetch_object($mysqli->query("SELECT SUM(woots) as woots FROM activated_bots"))->woots;
$TotalActivatedBots 	=	mysqli_fetch_object($mysqli->query("SELECT COUNT(*) as c FROM activated_bots"))->c;

$lastSongName 	=	$nSongsLast->author." - ".$nSongsLast->title;
$lastSongDJ		=	$nSongsLast->dj;
$lastSongID		=	$nSongsLast->id;
$before7Days 		=	date("Y-m-d H:i:s", (time()-604800));
?>