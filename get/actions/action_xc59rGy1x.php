<?php
header('Access-Control-Allow-Origin: *'); 

require "mysqlDB55.php";


$room 		=	$mysqli->real_escape_string($_POST["room"]);
$password 	=	$mysqli->real_escape_string($_POST["password"]);

$isActive 	=	mysqli_fetch_object($mysqli->query("SELECT id FROM activated_bots WHERE room = '$room' AND password = '$password' "))->id;
$data 		=	$_POST["data"];

if($isActive){

$disabled_commands = Array("help", "resident", "manager", "bouncer", "cohost", "reload", "die", "mute", "unmute", "ban", "skip", "tryagain", "msg", "set", "swap", "move", "dc", "autodc", "hidecommands", "skiphistory", "roomstats", "download", "commandlog",
	"lock", "unlock", "clearwaitlist", "bot woot", "bot", "songban", "songunban", "voteskip",
	"roll", "afks", "ping", "autowoot", "clearchat", "roulette", "autoroulette", "stoproulette", "play", "players", "filter", "wlfilter", "fb", "rules", "duel", "accept");

	$poslednyCommand = 0;
	for ($i=0; $i < count($data); $i++) { 
		
		$typ 	=	$data[$i]["name"];

		if($typ == "command"){
				$poslednyCommand = preg_replace("/[^A-Za-z0-9]/","", $data[$i]["value"]);
				if(!in_array($poslednyCommand, $disabled_commands)){
					$commands[] = preg_replace("/[^A-Za-z0-9]/","", $data[$i]["value"]);
				}

		} else {

				$values[$poslednyCommand][] = str_replace(array("%", '"', "\\", "'", "#"), "", $data[$i]["value"]);
		}
			

			$command_array["commands"][]	=	$data[$i]["name"];	
			$command_array["values"][]		=	$data[$i]["value"];	

	}





	for ($e=0; $e < count($command_array["commands"]); $e++) { 
		$cmd 	=	$command_array["commands"][$e];
		$val 	=	$command_array["values"][$e];

		if($cmd != $val){
			
			$build["command"][] = $cmd;
			$build["value"][] = $val;
		}
	}


	for ($i=0; $i < count($commands); $i++) { 
		if(!in_array($commands[$i], $disabled_commands)){
			$stringyValues[] = implode(" %% ", $values[$commands[$i]]);
		}
	}

	$cmds 	= implode(" %% ", $commands);
	$vals 	= implode(" %%%% ", $stringyValues);

	$mysqli->query("UPDATE activated_bots SET cookie_cmds = '$cmds', cookie_words = '$vals' WHERE room = '$room' ");

} else {
	echo "Access denied";
}
?>