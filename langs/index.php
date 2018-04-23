<meta charset="utf-8">
<pre><?php
header('Access-Control-Allow-Origin: https://plug.dj');
$pattern = [
	"offline",
	"startSuccess"	,
	"startPermissionError",
	"startCommunityBanned",
	"error_mute",
	"error_ban",
	"error_set_roulette_time",
	"error_set_songlimit_1",
	"error_set_songlimit_2",
	"error_hidecommands",
	"error_skiphistory",
	"error_dc",
	"help",
	"room_stats",
	"lang_changed",
	"roll",
	"voteskip_1",
	"voteskip_2",
	"grab_detected",
	"dc_success",
	"skip_long_song",
	"song_in_history",
	"song_banned",
	"roulette_1",
	"roulette_2",
	"roulette_3",
	"roulette_4",
	"roulette_5",
	"roulette_6",
	"success",
	"failed",
	"unknown"
];
require "../config.php";

$lng = $_REQUEST['lang'];
$query = $mysqli->query("SELECT * FROM nbot_langs WHERE lang = '$lng'");
while($res = mysqli_fetch_object($query)){

	$source = $res->source;

	$source_array = explode("; ", $source);

	$jsonSource["".$pattern[0].""] = $source_array[1];
	$jsonSource["".$pattern[1].""] = $source_array[2];
	$jsonSource["".$pattern[2].""] = $source_array[3];
	$jsonSource["".$pattern[3].""] = $source_array[4];
	$jsonSource["".$pattern[4].""] = $source_array[5];
	$jsonSource["".$pattern[5].""] = $source_array[8];
	$jsonSource["".$pattern[6].""] = $source_array[33];
	$jsonSource["".$pattern[7].""] = $source_array[35];
	$jsonSource["".$pattern[8].""] = $source_array[36];
	$jsonSource["".$pattern[9].""] = $source_array[38];
	$jsonSource["".$pattern[10].""] = $source_array[39];
	$jsonSource["".$pattern[11].""] = $source_array[52];
	$jsonSource["".$pattern[12].""] = $source_array[9];
	$jsonSource["".$pattern[13].""] = $source_array[40];
	$jsonSource["".$pattern[14].""] = $source_array[47];
	$jsonSource["".$pattern[15].""] = $source_array[51];
	$jsonSource["".$pattern[16].""] = $source_array[10];
	$jsonSource["".$pattern[17].""] = $source_array[11];
	$jsonSource["".$pattern[18].""] = $source_array[41];
	$jsonSource["".$pattern[19].""] = $source_array[54];
	$jsonSource["".$pattern[20].""] = $source_array[43];
	$jsonSource["".$pattern[21].""] = $source_array[44];
	$jsonSource["".$pattern[22].""] = $source_array[46];
	$jsonSource["".$pattern[23].""] = $source_array[13];
	$jsonSource["".$pattern[24].""] = $source_array[14];
	$jsonSource["".$pattern[25].""] = $source_array[15];
	$jsonSource["".$pattern[26].""] = $source_array[16];
	$jsonSource["".$pattern[27].""] = $source_array[17];
	$jsonSource["".$pattern[28].""] = $source_array[45];
	$jsonSource["".$pattern[29].""] = $source_array[48];
	$jsonSource["".$pattern[30].""] = $source_array[49];
	$jsonSource["".$pattern[31].""] = $source_array[28];
}

echo "{<br>";
foreach ($jsonSource as $key => $value) {
	echo "	\"".$key."\": ".$value.",<br>";
}
echo "}"

?>