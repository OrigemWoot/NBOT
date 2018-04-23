<?php
function sublinhamos($text, $words) {
    $wordsArray = array();
    $markedWords = array();
    // explode the phrase in words
    $wordsArray = explode(' ', $words); 

    foreach ($wordsArray as $k => $word) {
      $markedWords[$k]='<mark>'.$word.'</mark>';
    }

    $text = str_ireplace($wordsArray, $markedWords, $text);

    //right trows results
    return $text;
}

require "../config.php";
$w = addslashes($_GET['w']);
$w = str_replace("%20", " ", $w);
if(strlen($w) > 2){


$query = $mysqli->query("SELECT * FROM banned_songs 
WHERE author LIKE '%$w%'
OR title LIKE '%$w%' 
OR room LIKE '%$w%' 
ORDER BY id DESC");
$rows = mysqli_num_rows($query);

if($rows < 1){
        echo "<tr><td colspan=\"3\" style=\"text-align:center;font-size:18px\">No results found</td></tr>";
} else {

        while($banned_songs     =   mysqli_fetch_array($query)){
                echo "<tr><td class=\"id\">$i ".$banned_songs["id"]."</td><td class=\"songName\">".sublinhamos(urldecode($banned_songs["author"]), $w)."<br><span>".sublinhamos(urldecode($banned_songs["title"]), $w)."</span></td></tr>";
        }
}

} else {

            echo "<tr><td colspan=\"3\" style=\"text-align:center;font-size:18px\">Too short search word</td></tr>";

}

?>