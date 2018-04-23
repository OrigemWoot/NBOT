<?php
ini_set("display_errors", 1);
require "get/actions/mysqlDB55.php";

$langs_query 	=	$mysqli->query("SELECT langName FROM nbot_langs WHERE status = '2' AND type = 'public' ORDER BY langName");
while ($langs_key = mysqli_fetch_object($langs_query)) {
	$langs[] = $langs_key->langName;
}
$langy = implode(", ", $langs);
?><div class="padding">
		<div style="text-align:center">
			<h1>What is nBOT?</h1>
			<img src="/img/plug_logo.png" style="height:150px;"><br>
			<p style="font-size:20px">
				• nBOT is a moderation chatbot for PLUG.DJ.<br>
				• nBOT helps others follow community rules.<br>
				• nBOT is your virtual dog :D<br><br>
				• Available languages:
			</p>
			<o>
				<?php echo $langy; ?></b>
			</p>
		</div>
		
		<div class="inline">
		<h2>Customizable!</h2>
			<p>
				Only with NarcisBOT (nBOT) you can customize:<br><br>
				- Welcome message<br>
				- Stats message<br>
				- Grab message<br>
				- Grab message<br>
				- Command trigger<br>
				- Command permission
				- Max. history limit songs<br>
				- Max. song limit<br>
				- Limit for disconnected DJ<br>
				- nBOT name<br>
				- Language<br>
				- Votes for voteskip<br>
				- Time for roulette<br>
				- Roulette text<br>
				- Facebook page
			</p>
		<b>...and more!</b>
	</div><div class="inline tryit">
			<p><a href="/nbot/installation.html" class="nButton">Try it!</a></p>
		</div>

</div>