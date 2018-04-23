<?php
$file = "/var/www/html/online-download/videos/playlists/".$_GET["file"].".zip";

header('Content-type:  application/zip');
header('Content-Length: ' . filesize($file));
header('Content-Disposition: attachment; filename='.$_GET["file"].".zip");

readfile($file);
//unlink($file);


?>