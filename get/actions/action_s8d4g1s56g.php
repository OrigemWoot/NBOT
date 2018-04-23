<?php
/*
 Save global waitlist
*/
header('Access-Control-Allow-Origin: *'); 
require "mysqlDB55.php";

$datawaitlist = $_POST['WaitList'];
$room = $_POST['Room'];
$key = $_POST['Key'];




for ($i=0; $i < count($datawaitlist); $i++) { 
	$dataArr = explode(",", $datawaitlist[$i]);

	$who = $dataArr[0];
	$position = $dataArr[1];
	$community = $dataArr[2];
	$rname = $dataArr[3];
	$dj = $dataArr[4];

	if($who AND $position AND $community)
	{
		
			
			$time = time();	
			$inWaitListInThisRoom = mysqli_fetch_object($mysqli->query("SELECT rname FROM globadl_waitlist WHERE name = '$who' AND room = '$room' "))->rname;
			if($inWaitListInThisRoom){
				
				$mysqli->query("UPDATE globadl_waitlist SET position = '$position', time = '$time'  WHERE name = '$who' AND room = '$room' ");
			} else {
				
				$mysqli->query("INSERT INTO globadl_waitlist (name,room,position,rname,time) VALUES ('$who', '$room', '$position', '$rname','$time')");
			}
	$mysqli->query("DELETE FROM globadl_waitlist WHERE name = '$dj' AND room = '$room' ");
	
	} 
}
?>