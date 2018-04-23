<?php
header('Access-Control-Allow-Origin: https://plug.dj');
$langSource = $_POST['source'];
if(isset($_POST["updateCode"]) AND strlen($_POST["updateCode"]) >3){
	$s 	=	$_POST["updateCode"];
} else {
	$s = substr(str_shuffle(str_repeat("0123456789abcdefghijklmnopqrstuvwxyz", 5)), 0, 5);

}

$file = fopen("private/".$s.".json", "w");
fwrite($file, $langSource);
fclose($file);
echo $s;
?>