<?php
/*
get waitlist position
*/
header('Access-Control-Allow-Origin: *'); 
require "mysqlDB55.php";

$kto = $_POST['W'];
$kde = $_POST['Key'];
$community_enc = $_POST['Community'];
$community = urlencode($_POST['Community']);

	if($kto && $kde)
	{
		$row1 = mysqli_fetch_assoc($mysqli->query("SELECT * FROM activated_bots WHERE room = '{$community_enc}'"));
		if($row1['room']){
			
			$time = time();
			$dbData = $mysqli->query("SELECT * FROM globadl_waitlist WHERE name = '$kto' AND room = '$community'");	
			$dbDataR = mysqli_fetch_object($dbData);
			$GlobalWaitList_time = $dbDataR->time;
			$GlobalWaitList_position = $dbDataR->position;
			$GlobalWaitList_rname = $dbDataR->rname;
			$GlobalWaitList_name = $dbDataR->name;

			if($GlobalWaitList_time){
				echo date("Y-m-d H:i:s", $GlobalWaitList_time).",".$GlobalWaitList_position.",".$GlobalWaitList_name;
			} else {
				echo "Failed";
			}
			
		} 
	} 

?>