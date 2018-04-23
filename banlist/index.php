<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title>nBOT2 Banlist</title>
	<link rel="stylesheet" href="/banlist/css/style.css">
	<script src="https://code.jquery.com/jquery-latest.min.js" type="text/javascript"></script>
	<script type="text/javascript">
		$(document).ready(function(){
;
		var timer;
		$('.searchPut').keyup(function(){
			clearTimeout(timer);
			var ms = 200;
			var HlavnaKategoria, Kategoria, Podkategoria;
			SearchWord = encodeURIComponent($('.searchPut').val());

			timer = setTimeout(function(){
				$('#results').load('/banlist/getSearch.php?w='+SearchWord);
			}, ms);
		});


	});
	</script>
</head>

<body>
	<table class="bansTable" cellspacing="0">
		<tr>
			<td colspan="2"><img class="logo" src="../img/logo.png" height="100"><h1 class="slogan">BANLIST</h1></td>
		</tr>
		<tr>
			<td class="search" colspan="2">
				<input type="text" class="searchPut" maxlengtg="150" placeholder="Search song title / author OR write Community URL">
			</td>
		</tr>
		<tr class="thead">
			<td>Unban code</td>
			<td>Song name</td>
		</tr>
		<tbody id="results">
	<?php
		require "../config.php";
		$bs_query 	=	$mysqli->query("SELECT * FROM banned_songs ORDER BY id DESC LIMIT 50");
		while($banned_songs 	=	mysqli_fetch_array($bs_query)){
			echo "<tr><td class=\"id\">".$banned_songs["id"]."</td><td class=\"songName\">".urldecode($banned_songs["author"])."<br><span>".urldecode($banned_songs["title"])."</span></td></tr>";
		}
		
	?>
	</tbody>
</table>
</body>
</html>