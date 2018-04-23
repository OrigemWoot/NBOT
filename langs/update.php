<?php
header('Access-Control-Allow-Origin: *'); 

$data = $_POST['data'];

$json = "{";
for ($i=0; $i < count($data)-1; $i++) { 
	if($data[$i]["value"] == ""){
		$data[$i]["value"] = " ";
	}
	if($data[$i]["name"] == ""){
		die("Nice try :*");
	}
	$json .= "\"".htmlspecialchars(str_replace("\"", "", $data[$i]["name"]))."\":\"".htmlspecialchars(str_replace("\"", "", $data[$i]["value"]))."\",";
}

$json = substr($json, 0, -1);
$json .= "}";

$langCode = $data[count($data)-1]["value"];

$file = fopen("private/".$langCode.".json", "w");
fwrite($file, $json);
fclose($file);

echo "Language has been updated! If you see old language, try press F5. If you still see old language, you must clear cache.";

?>