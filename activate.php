<?php
require "get/actions/mysqlDB55.php";

$langsQuery = $mysqli->query("SELECT * FROM nbot_langs ORDER BY langName");

?>

	<?php
	if($_POST){
		$error = "";
		$room = addslashes($_POST['url']);
		$captcha = addslashes(htmlspecialchars($_POST['captcha']));

		if($captcha == "2017"){
			if(strpos($room,'https://plug.dj/') !== false){

				$row = mysqli_fetch_assoc($mysqli->query("SELECT id FROM activated_bots WHERE room = '$room'"));
				if($row['id']){
					$error = "Community $room is already activated!";
				} else {


					$botName		= addslashes(htmlspecialchars($_POST['name']));
					$hash			= addslashes(htmlspecialchars($_POST["hash"]));
					$botName 		= str_replace(" ", "_", $botName);
					$language 		= addslashes(htmlspecialchars($_POST['language']));
					$voteskipCount 	= addslashes(htmlspecialchars($_POST['voteskipCount']));
					$songLimit 		= addslashes(htmlspecialchars($_POST['songLimit']));
					$rouletteTime 	= addslashes(htmlspecialchars($_POST['rouletteTime']));
					$historyLimit 		= addslashes(htmlspecialchars($_POST['historyLimit']));
					$grab 			= addslashes(htmlspecialchars($_POST['grab']));
					$welcome 		= addslashes(htmlspecialchars($_POST['welcome']));
					$stats 			= addslashes(htmlspecialchars($_POST['stats']));
					$cmdTrigger 		= addslashes(htmlspecialchars($_POST['cmdTrigger']));
					$fbPage 		= addslashes(htmlspecialchars($_POST['fbPage']));
					$rules 			= addslashes(htmlspecialchars($_POST['rules']));
					$dcLimit 		= addslashes(htmlspecialchars($_POST['dcLimit']));
					$welcomeMessage 	= addslashes(htmlspecialchars($_POST['welcomeMessage']));


					$mysqli->query("INSERT INTO 
						activated_bots(bot,
						version,
						room,
						password,
						lang,
						settings_voteskipcount,
						settings_songlimit,
						settings_roulettetime,
						settings_historylimit,
						msg_grab,
						msg_welcome,
						msg_stats,
						tr,
						FacebookPage,
						RulesPage,
						dclimit,
						WelcomeMessageMSG) 
						VALUES ('$botName',
						'1',
						'$room',
						'$hash',
						'$language',
						'$voteskipCount',
						'$songLimit',
						'$rouletteTime',
						'$historyLimit',
						'$grab',
						'$welcome',
						'$stats',
						'$cmdTrigger',
						'$fbPage',
						'$rules',
						'$dcLimit',
						'$welcomeMessage')") or die($mysqli->error);
					$success = "1";
					$error = "Community <b>$room</b> has been successfully activated!";
				}

			} else {
				$error = "Invalid room";
			}
		} else {
			$error = "Current year isnt ".$captcha;
		}

		echo $error;
		exit();

	}
	?>
	<div class="target-padding activation">
	<h1>Activation</h1>
	<div id="console"></div> <!-- console -->
		<form method="POST" id="activateForm">
			<table cellspacing="0" cellpadding="0" width="100%">
				<tr>
					<th width="50%">Required data</th>
					<th><a id="toggleOptionallyData" href="#">Show/Hide</a> Optionally data</th>
				</tr>
				<tr>
					<td valign="top">
						<p>Full URL<span style="color:red">*</span></p> <input  type="text" name="url" class="field">
						<p>Community password<span style="color:red">*</span></p> <input  type="text" name="hash" class="field">
						<p>Which year is now?<span style="color:red">*</span></p> <input maxlength="4" type="text" name="captcha" class="field">
					</td>
					<td valign="top" class="optional">

						<p>nBOT Name</p> <input  type="text" name="name" class="field2" value="NarcisBOT">
						<p>Language</p> <select class="field2" name="language">
						
						<?php 
						while($langsKey = mysqli_fetch_object($langsQuery)){
							$langName = $langsKey->langName;
							if($langName == "English"){
								$q = "selected=\"selected\""; 
							} else { 
								$q = ""; 
							}

							echo "<option value=\"".$langsKey->lang."\" $q>".$langName."</option>";
						}
						?>
						</select>

						<p>Max !voteskip votes</p>
							<input  type="text" name="voteskipCount" class="field2" value="10">
						<p>Limit per song (seconds)</p>
							<input  type="text" name="songLimit" class="field2" value="420">
						<p>Roulette limit (seconds)</p>
							<input  type="text" name="rouletteTime" class="field2" value="30">
						<p>Song history limit (songs)</p>
							<input  type="text" name="historyLimit" class="field2" value="50">

						<p>Grab message (when someone grab song)</p> 
						<select name="grab" class="field2">
							<option value="0">Off</option>
							<option value="1" selected="selected">On</option>
						</select>

						<p>Welcome message (when someone join)</p>
						<select name="welcome" class="field2">
							<option value="0">Off</option>
							<option value="1" selected="selected">On</option>
						</select>

		        				<p>Show stats (when song end)</p>
						<select name="stats" class="field2">
							<option value="0">Off</option>
							<option value="1" selected="selected">On</option>
						</select>

						<p>Command trigger</p>
							<input  type="text" name="cmdTrigger" class="field2" value="!" maxlength="1">
						<p>Facebook page</p>
							<input  type="text" name="fbPage" class="field2" placeholder="http://">
						<p>Rules page (or text)</p>
							<input  type="text" name="rules" class="field2">
						<p>Limit for !dc (hours)</p>
							<input  type="text" name="dcLimit" class="field2" value="48">
						<p>Welcome message (@ = @mention)</p>
							<input  type="text" name="welcomeMessage" class="field2" value="Hello @ how are you?">
					</td>
				</tr>
				<tr>
					<td colspan="2">
						<br>         
						<input type="submit" class="nButton" value="Activate" style="width:200px">
					</td>
				</tr>
			</table>
		</form>
</div>