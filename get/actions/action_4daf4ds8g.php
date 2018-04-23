<?php
/*
update room settings
*/
header('Access-Control-Allow-Origin: *'); 
require "mysqlDB55.php";

function findSimilarWordInArray($word, $array) {

    foreach ($array as $key=>$value) {
        if (strpos( strtolower($value), strtolower($word)) !== false) {
            return true;
        } // if
    } // foreach

}

function endsWith($haystack, $needle) {
    // search forward starting from end minus needle length characters
    return $needle === "" || (($temp = strlen($haystack) - strlen($needle)) >= 0 && strpos($haystack, $needle, $temp) !== FALSE);
}

$room = $_POST['roomUrl'];
$key = $_POST['key'];
$lang = $_POST['lang'];
$botname = $_POST['mybotname'];

$set_historylimit = $_POST['set_historylimit'];
$set_voteskipcount = $_POST['set_voteskipcount'];
$set_roulettetime = $_POST['set_roulettetime'];
$set_dclimit = $_POST['set_dclimit'];
$set_bwEngine = $_POST["set_bwEngine"];

$set_emote_chat = $_POST["set_emote_chat"];
if($set_emote_chat){
	$set_emote_chat = "/em";
}

if(isset($_POST["set_ai_file"])){

	if(filter_var($_POST["set_ai_file"], FILTER_VALIDATE_URL) && endsWith($_POST["set_ai_file"], ".json") == true){
		
		$set_ai_file = $_POST["set_ai_file"];
		$set_ai_type = "private";

	} else {

		$set_ai_file = "https://rawgit.com/CikerDeveloper/NBOT/master/default_ai.json";
		$set_ai_type = "public";
	}

}

if(isset($_POST["badwords"])){
	$badwords = strtolower(preg_replace('/\s+/', ' ', preg_replace("/[^\p{L}\d\s]/u", "", $_POST["badwords"])));
}


if($set_dclimit > 8760){
	$set_dclimit = 8760;
}

$set_songlimit = $_POST['set_songlimit'];
$set_trigger = $_POST['set_tr'];

$set_fb = strip_tags(addslashes($_POST['set_fb']));
$set_fb = substr($set_fb, 8);

$set_rules = strip_tags(addslashes($_POST['set_rules']));
$set_rules = substr($set_rules, 11);


$set_welcomemessage = addslashes(substr($_POST['set_welcomeMessage'], 1));
$set_welcomemessage = str_replace("set welcomemessage ", "", $set_welcomemessage);

$set_motd = addslashes(substr($_POST['set_motd'], 10));
$set_motd = str_replace("|", "", $set_motd);

if($set_motd){
	$set_motd_number = explode(" ", $set_motd)[0];
	if(is_numeric($set_motd_number)){
		$set_motd_message = substr($set_motd, 2);
		$set_motd_set = $set_motd_number."|".$set_motd_message;
	} else {
		die();
	}
}

$msg_welcome = $_POST['msg_welcome'];
$msg_grab = $_POST['msg_grab'];
$msg_stats = $_POST['msg_stats'];
$set_autodc = $_POST['set_autodc'];
$set_wlfilter = $_POST['set_wlfilter'];

$set_hidecommands = $_POST['set_hidecommands'];
$set_chatlog = $_POST['set_commandlog'];


$cp_command = $_POST['command'];
$cp_permission = $_POST['permission'];

$song_title = $_POST['eTitle'];
$song_author = $_POST['eAuthor'];

if($msg_welcome == "on"){ 
	$msg_welcome_set = "1"; 
} elseif($msg_welcome == "off"){ 
	$msg_welcome_set = "0"; 
}

if($msg_grab == "on"){
	 $msg_grab_set = "1"; 
} elseif($msg_grab == "off"){ 
	$msg_grab_set = "0";
}

if($msg_stats == "on"){ 
	$msg_stats_set = "1"; 
} elseif($msg_stats == "off"){ 
	$msg_stats_set = "0"; 
}

if($set_autodc == "on"){ 
	$set_autodc_set = "1"; 
} elseif($set_autodc == "off"){ 
	$set_autodc_set = "0"; 
}

if($set_wlfilter == "on"){ 
	$set_wlfilter_set = "1"; 
} elseif($set_wlfilter == "off"){ 
	$set_wlfilter_set = "0"; 
}

if($set_chatlog == "on"){ 
	$set_chatlog_set = "1"; 
} elseif($set_chatlog == "off"){ 
	$set_chatlog_set = "0"; 
}

if($set_hidecommands == "on"){ 
	$set_hidecommands_set = "1"; 
} elseif($set_hidecommands == "off"){ 
	$set_hidecommands_set = "0"; 
}

if($set_historylimit > "51"){ 
	$set_historylimit = "50"; 
}

if($room AND $key)
{
		$row = mysqli_fetch_assoc($mysqli->query("SELECT * FROM activated_bots WHERE room = '{$room}' AND password = '{$key}'") );
		if($row['room']){
			if($lang){
				$mysqli->query("UPDATE activated_bots SET lang='{$lang}' WHERE room = '{$room}' AND password = '{$key}'") ;
			} elseif($botname){
				$mysqli->query("UPDATE activated_bots SET bot='{$botname}' WHERE room = '{$room}' AND password = '{$key}'") ;
			
			} elseif($set_historylimit){
				$mysqli->query("UPDATE activated_bots SET settings_historylimit='{$set_historylimit}' WHERE room = '{$room}' AND password = '{$key}'") ;
			
			} elseif($set_voteskipcount){
				$mysqli->query("UPDATE activated_bots SET settings_voteskipcount='{$set_voteskipcount}' WHERE room = '{$room}' AND password = '{$key}'") ;
			
			} elseif($set_roulettetime){
				$mysqli->query("UPDATE activated_bots SET settings_roulettetime='{$set_roulettetime}' WHERE room = '{$room}' AND password = '{$key}'") ;
			
			} elseif(isset($_POST["set_ai_file"])){
				$mysqli->query("UPDATE activated_bots SET talk_file='{$set_ai_file}', ai_type = '{$set_ai_type}' WHERE room = '{$room}' AND password = '{$key}'") ;
			
			} elseif(isset($_POST["set_emote_chat"])){
				$mysqli->query("UPDATE activated_bots SET emote_check='{$set_emote_chat}' WHERE room = '{$room}' AND password = '{$key}'") ;
			
			} elseif(isset($_POST["badwords"])){
				$mysqli->query("UPDATE activated_bots SET badwords='{$badwords}' WHERE room = '{$room}' AND password = '{$key}'") ;
			
			} elseif($set_songlimit){
				$mysqli->query("UPDATE activated_bots SET settings_songlimit='{$set_songlimit}' WHERE room = '{$room}' AND password = '{$key}'") ;
			
			} elseif($set_bwEngine){
				$mysqli->query("UPDATE activated_bots SET badwordsEngine='{$set_bwEngine}' WHERE room = '{$room}' AND password = '{$key}'") ;
			
			} elseif($set_dclimit){
				$mysqli->query("UPDATE activated_bots SET dclimit='{$set_dclimit}' WHERE room = '{$room}' AND password = '{$key}'") ;
			
			} elseif($msg_welcome){
				$mysqli->query("UPDATE activated_bots SET msg_welcome='{$msg_welcome_set}' WHERE room = '{$room}' AND password = '{$key}'") ;
			
			} elseif($msg_grab){
				$mysqli->query("UPDATE activated_bots SET msg_grab='{$msg_grab_set}' WHERE room = '{$room}' AND password = '{$key}'") ;
			
			} elseif($msg_stats){
				$mysqli->query("UPDATE activated_bots SET msg_stats='{$msg_stats_set}' WHERE room = '{$room}' AND password = '{$key}'") ;
			
			} elseif($set_trigger){
				$mysqli->query("UPDATE activated_bots SET tr='{$set_trigger}' WHERE room = '{$room}' AND password = '{$key}'") ;
			
			} elseif($set_fb){
				$mysqli->query("UPDATE activated_bots SET FacebookPage='{$set_fb}' WHERE room = '{$room}' AND password = '{$key}'") ;

			} elseif($set_rules){
				$mysqli->query("UPDATE activated_bots SET RulesPage='{$set_rules}' WHERE room = '{$room}' AND password = '{$key}'") ;
			
			} elseif($set_autodc){
				$mysqli->query("UPDATE activated_bots SET autodc='{$set_autodc_set}' WHERE room = '{$room}' AND password = '{$key}'") ;
			
			} elseif($set_chatlog){
				$mysqli->query("UPDATE activated_bots SET commandlog='{$set_chatlog_set}' WHERE room = '{$room}' AND password = '{$key}'") ;
			
			} elseif($set_hidecommands){
				$mysqli->query("UPDATE activated_bots SET hidecommands='{$set_hidecommands_set}' WHERE room = '{$room}' AND password = '{$key}'") ;
			
			} elseif($set_motd){
				$mysqli->query("UPDATE activated_bots SET motd='{$set_motd_set}' WHERE room = '{$room}' AND password = '{$key}'") ;
			
			} elseif($set_wlfilter){
				$mysqli->query("UPDATE activated_bots SET wlfilter='{$set_wlfilter_set}' WHERE room = '{$room}' AND password = '{$key}'") ;
			
			} elseif($set_welcomemessage){
				$mysqli->query("UPDATE activated_bots SET WelcomeMessageMSG='{$set_welcomemessage}' WHERE room = '{$room}' AND password = '{$key}'") ;
			
			} elseif($song_author AND $song_title){
				$mysqli->query("UPDATE activated_bots SET LiveSong='{$song_author} - {$song_title}' WHERE room = '{$room}' AND password = '{$key}'") ;
			}

			if($cp_command){
				$myPermissions = mysqli_fetch_object($mysqli->query("SELECT permissions FROM activated_bots WHERE room = '{$room}' AND password = '{$key}' "))->permissions;
				$myPermissions_Array = explode(",", $myPermissions);
				$cpcmd = str_replace("!", "", $cp_command);
				if(findSimilarWordInArray($cpcmd, $myPermissions_Array) === true){

					for ($i=0; $i < count($myPermissions_Array); $i++) { 
						$getCommand = explode("=", $myPermissions_Array[$i])[0];
						if($cpcmd == $getCommand) {
							$myPermissions_Array[$i] = $cpcmd."=".$cp_permission;
							$tentosameni = $myPermissions_Array[$i];
						} 	
					}
					$newPermissions = implode(",", $myPermissions_Array);
					$mysqli->query("UPDATE activated_bots SET permissions = '$newPermissions' WHERE room = '{$room}' AND password = '{$key}' ");
					
				}
			} 

		}



} 
?>