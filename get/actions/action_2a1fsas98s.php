<?php
/*
update room stats
*/
header('Access-Control-Allow-Origin: *'); 
require "mysqlDB55.php";

$woots = htmlspecialchars($_POST['woots']);
$grabs = htmlspecialchars($_POST['grabs']);
$mehs = htmlspecialchars($_POST['mehs']);
$room = $_POST['eURL'];
$time = time();

if( ($woots != "") AND ($grabs != "") AND ($mehs != "") AND ($room != ""))
{
		$row = mysqli_fetch_assoc($mysqli->query("SELECT * FROM activated_bots WHERE room = '{$room}'"));
		if($row['room']){
			$roomstats = mysqli_fetch_assoc($mysqli->query("SELECT woots,grabs,mehs FROM activated_bots WHERE room = '{$room}'"));

			$room_woots  = $roomstats['woots'];
			$room_grabs  = $roomstats['grabs'];
			$room_mehs  = $roomstats['mehs'];

			$new_woots = $room_woots + $woots;
			$new_grabs = $room_grabs + $grabs;
			$new_mehs = $room_mehs + $mehs;

			$newstats = $new_woots.",".$new_grabs.",".$new_mehs;

			if($mysqli->query("UPDATE activated_bots SET woots='{$new_woots}', mehs = '{$new_mehs}', grabs = '{$new_grabs}' WHERE room = '{$room}'")){
				echo "0000";
			}
		} else {
			echo "000";
		}
} else {
	echo "00";
}
?>