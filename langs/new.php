<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title>nBOT New Language</title>
	<link href='https://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700&subset=latin,latin-ext' rel='stylesheet' type='text/css'>	
	<script type="text/javascript" src="//code.jquery.com/jquery-latest.js"></script>

	<style>
	* { font-family: 'Open Sans', sans-serif !important;  
	box-sizing:border-box;-moz-box-sizing:border-box;}
	html, body { margin: 0; padding:0;}
	h1, h2, h3, h4 {
		color:#222;
		margin: 5px;
	}
	h3, h4 {
		color:#444;
		font-weight:100;
	}
	body { background:#7DCBFF;}
	#container {background:#ddd; line-height:23px;width:90%; margin: 0 auto;padding:30px 0px;overflow:hidden;}
	input[type=text] {
	 border:none;
	 background:#fff;color:#222;min-width:80%; padding:5px 0px 5px 10px; display:inline-block; resize:none; overflow:hidden; height:25px; outline:none; font-size:15px;}
	
	pre {cursor:cell; background:#f0f0f0; padding: 10px;color:black;border-top:1px solid grey; border-bottom:1px solid grey; }
	input[type=text], pre { font-size:15px;}
	.string { color: darkblue;}
	.key { color: darkred;display:inline-block;}
	#error {
		position: fixed;
		bottom:50px;
		right:30px;
		width:50%;
		padding:15px;
		color:white;
		background:darkred;
		display: none;
		z-index:100;
		font-size:14px;
	}
	#vysledok {
		clear:both;
		background:#222;
		color:#eee;
		font-size:25px;
		text-align:center;
		padding:10px 30px;
		display:none;
	}


.myButton {
	-moz-box-shadow:inset 0px 1px 0px 0px #54a3f7;
	-webkit-box-shadow:inset 0px 1px 0px 0px #54a3f7;
	box-shadow:inset 0px 1px 0px 0px #54a3f7;
	background:-webkit-gradient(linear, left top, left bottom, color-stop(0.05, #007dc1), color-stop(1, #0061a7));
	background:-moz-linear-gradient(top, #007dc1 5%, #0061a7 100%);
	background:-webkit-linear-gradient(top, #007dc1 5%, #0061a7 100%);
	background:-o-linear-gradient(top, #007dc1 5%, #0061a7 100%);
	background:-ms-linear-gradient(top, #007dc1 5%, #0061a7 100%);
	background:linear-gradient(to bottom, #007dc1 5%, #0061a7 100%);
	filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#007dc1', endColorstr='#0061a7',GradientType=0);
	background-color:#007dc1;
	-moz-border-radius:3px;
	-webkit-border-radius:3px;
	border-radius:3px;
	border:1px solid #124d77;
	display:inline-block;
	cursor:pointer;
	color:#ffffff;
	font-family:arial;
	font-size:21px;
	padding:16px 62px;
	text-decoration:none;
	text-shadow:0px 1px 0px #154682;
}
.myButton:hover {
	background:-webkit-gradient(linear, left top, left bottom, color-stop(0.05, #0061a7), color-stop(1, #007dc1));
	background:-moz-linear-gradient(top, #0061a7 5%, #007dc1 100%);
	background:-webkit-linear-gradient(top, #0061a7 5%, #007dc1 100%);
	background:-o-linear-gradient(top, #0061a7 5%, #007dc1 100%);
	background:-ms-linear-gradient(top, #0061a7 5%, #007dc1 100%);
	background:linear-gradient(to bottom, #0061a7 5%, #007dc1 100%);
	filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#0061a7', endColorstr='#007dc1',GradientType=0);
	background-color:#0061a7;
}
.myButton:active {
	position:relative;
	top:1px;
}

	</style>
	<?php
    header('Access-Control-Allow-Origin: https://plug.dj');
	if($_GET["code"]){
		echo '<script>';
		$source 	= file_get_contents("private/".$_GET["code"].".json");
		echo 'var defaultLang = '.substr($source, 0, -1).', 
		"bw_1": "Bad words filter",
		"bw_2": "Separate each word with space. Example: <b>word1 word2 word3</b>",
		"bw_3": "Start typing your bad words here...",
		"bw_4": "%%MENTION%% no swear!"
		};';
		echo '</script>';
		$buttonText 	=	"Update my language";
		$hiddenButton 	=	"<input type=\"hidden\" name=\"updateCode\" value=\"".htmlspecialchars($_GET["code"])."\">";
	} else {
		echo '<script>';
		$source 	= file_get_contents("en.json");
		echo 'var defaultLang = '.$source.';';
		echo '</script>';	
		$buttonText 	=	"Generate new language";
		$hiddenButton 	=	"";
	}
	?>

	<script>
	function syntaxHighlight(json) {
	    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
	    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
	        var cls = 'number';
	        if (/^"/.test(match)) {
	            if (/:$/.test(match)) {
	                cls = 'key';
	            } else {
	                cls = 'string';
	            }
	        } else if (/true|false/.test(match)) {
	            cls = 'boolean';
	        } else if (/null/.test(match)) {
	            cls = 'null';
	        }
	        return '<span class="' + cls + '">' + match + '</span>';
	    });
	}


function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}
	function divClicked() {
	    var divHtml = $(this).html().replace("\"", "").replace("\"", "");
	    var thisclass = $(this).attr("class");;
	    var editableText = $("<input type=\"text\" data-class=\""+thisclass+"\" />");
	    editableText.val(divHtml);
	    $(this).replaceWith(editableText);
	    editableText.focus();
	    // setup the blur event for this new textarea
	    editableText.blur(editableTextBlurred);
	}

	function editableTextBlurred() {
	    var html = $(this).val();
	    var thisclass = $(this).attr("data-class");
	    var viewableText = $("<span class=\""+thisclass+"\">");
	    viewableText.html("\""+html+"\"");
	    $(this).replaceWith(viewableText);
	    // setup the click event for this new div
	    viewableText.click(divClicked);
	    if(IsJsonString($("pre").text()) !== true){
	    	$("#error").show().html("<b>Warning</b> Invalid JSON syntax. Language will note be saved.");
	    } else {
	    	$("#error").hide();
	    }
	}




	var defaultLangStr = JSON.stringify(defaultLang, undefined, 4);
	$(document).ready(function(){

		$("#defaultLang").html("<pre>"+syntaxHighlight(defaultLangStr)+"</pre>");
		$("span.string").click(divClicked);

		$("#saveLanguage").click(function(){
			var langSource = $("pre").text();
			var tento = $(this).hide();
			$("pre").slideUp();
			$.post("https://source.nbot.eu/langs/new_save.php", {
				source: langSource,
				updateCode: "<?php echo $_GET['code']; ?>"
			}, function(data){
				$(".afterHide").hide();
				$("#afterSend").show();
				$("#vysledok").show();
				$("#vysledok").html("@n="+data+".json");
			});

		});
	});
	</script>
</head>
<body>

	<div id="container">
	<center>
		<img src="../img/logo.png" height="100">
		<h2>LANGUAGE GENERATOR</h2><br>
		
		<h3 class="afterHide">Dynamic words</h3>
		<h4 class="afterHide">%%NBOTNAME%% - automatically replaced with bot name</h4>
		<h4 class="afterHide">%%CMDTRIGGER%% - automatically replaced with command trigger</h4>
		<h4 class="afterHide">%%DCPOSITION%% - automatically replaced with disconnected position</h4>
		<h4 class="afterHide">%%DUEL_PLAYER1%% and %%DUEL_PLAYER2%% - this you can use only in duel command language when opponent accepted duel</h4>
		<h4 class="afterHide"><strong>How to?</strong></h4>
		<iframe class="afterHide" width="420" height="315" src="https://www.youtube.com/embed/nKIjIEOKI7s?rel=0&amp;controls=0&amp;showinfo=0" frameborder="0" allowfullscreen></iframe>
	</center>

		<div id="defaultLang"></div>
		<center>
				<input type="submit" value=" <?=$buttonText?> " class="myButton" id="saveLanguage"><br>
				<?=$hiddenButton?>
				<span id="vysledok"></span><br><br>
				<h3 id="afterSend" style="display:none">Paste this code to your community description</h3>

		</center>

	</div>
	<div id="error"></div>
</body>
</html>