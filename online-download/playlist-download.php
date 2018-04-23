<?php
header('Access-Control-Allow-Origin: https://plug.dj'); 

function Delete($path)
{
    if (is_dir($path) === true)
    {
        $files = array_diff(scandir($path), array('.', '..'));

        foreach ($files as $file)
        {
            Delete(realpath($path) . '/' . $file);
        }

        return rmdir($path);
    }

    else if (is_file($path) === true)
    {
        return unlink($path);
    }

    return false;
}

$id = $_POST["folder_fix"]-872465153218;
$duration = $_POST["duration"];

$videoKey = $_POST['video'];
$playlist = $_POST["playlist"];
$autor = htmlspecialchars(str_replace("/", "", str_replace("'", "", str_replace('"', '', str_replace("\\", "", addslashes($_POST['autor']))))));
$titulok = htmlspecialchars(str_replace("/", "", str_replace("'", "", str_replace('"', '', str_replace("\\", "", addslashes($_POST['titulok']))))));
$name = $autor." - ".$titulok;
$poradie = $_POST["poradie"];

if($videoKey && $playlist && $autor && $titulok && $id && $duration){
	$price = round(($duration*0.4), 2);
	require "../config.php";

		if(!is_numeric($videoKey)){

				exec("youtube-dl ".$videoKey." --audio-format=mp3 --extract-audio -o '/var/www/html/online-download/videos/playlists/".$playlist."/".$name.".%(ext)s'");
				$data["sprava"] = "<span style=\"color:#F4F992\">Done! Preparing next song to download...</span>";
				
				$mysqli->query("UPDATE points SET points = points - $price WHERE uid = '$id' ");

		} else { 
			$data["sprava"] = "<span style=\"color:#F99292\">Soundcloud not supported</span>";
		}


} else { 
	if(isset($_POST["download"])){
		exec("zip -r '/var/www/html/online-download/videos/playlists/".$playlist.".zip' '/var/www/html/online-download/videos/playlists/".$playlist."/'");
		$data["sprava"] = "Download url: <a href=\" https://source.nbot.eu/online-download/videos/playlists/".$playlist.".zip\" target=\"_blank\">https://source.nbot.eu/online-download/videos/playlists/".$playlist.".zip</a>";
	}

	if(isset($_POST["fix"])){
		Delete("/var/www/html/online-download/videos/playlists/".$playlist);
	}
}

echo json_encode($data);
?>