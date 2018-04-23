<?php
	require "config.php";
?><!DOCTYPE html>
<html lang="en">
<head>

	<title>Origem Bot</title>

	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<meta name="copyright" content="Origem Woot"/>
	<meta name="author" content="Origem Woot"/>
	<meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Origem Bot, the fastest, most sophisticated with lot cmds. Packed with features, easy to use, fits in perfectly with plug.dj's design!">
	<meta name="Keywords" content="origem, music, edm, electronic, dance, radiance, plug.dj, plug, plugcubed, litebot, script, blacklist, overplayed, events, parties, youtube, facebooktwitter, social, community, rock, genres, fun, friendly, family, plug.dj, plug, dj, rcs, script, origem community script, extension, extensions, bookmark">	<link rel="icon" href="https://www.origem-woot.tk/favicon.ico?v=2" />
	<link rel="icon" type="image/x-icon" href="https://www.origem-woot.tk/favicon.ico" />
	<meta property="fb:app_id" content="1762105387451233" />
	<meta property="og:title" content="Origem Bot - Next Generation Plug DJ Bots"/>
	<meta property="og:image" content="http://i.imgur.com/KFkeGA5.jpg"/>
	<meta property="og:url" content="https://origem-bot.tk/"/>
	<meta property="og:site_name" content="Origem Bot - Next Generation Plug DJ Bots"/>
	<meta property="og:type" content="website" />
	<meta property="og:locale" content="en_US" />
	<meta property="og:description" content="Origem Bot, the fastest, most sophisticated with lot cmds. Packed with features, easy to use, fits in perfectly with plug.dj's design!"/>
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:site" content="@partydjofficial" />
	<meta name="twitter:title" content="Origem Bot - Next Generation Plug DJ Bots" />
	<meta name="twitter:description" content="Origem Bot, the fastest, most sophisticated with lot cmds. Packed with features, easy to use, fits in perfectly with plug.dj's design!" />
	<meta name="twitter:image" content="http://i.imgur.com/KFkeGA5.jpg" />
	<link href="https://plus.google.com/b/117870014010254032564/" rel="publisher" />    
	<meta http-equiv="content-language" content="en-us">
	<meta name="viewport" content="width=device-width, initial-scale=1"/>
	<meta name="theme-color" content="#734ba9">
	<link rel="stylesheet" type="text/css" href="/css/system.css" />

	<script src="https://code.jquery.com/jquery-latest.min.js" type="text/javascript"></script>
	<script type="text/javascript" src="/js/nbot.js"></script>
	<script src="/js/jquery.nicescroll.min.js"></script>
	<script src="/js/jquery.innerfade.js"></script>
</head>
<body>
<div id="fb-root"></div>

  <script>
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '1762105387451233',
      xfbml      : true,
      version    : 'v2.5'
    });
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
</script>
<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-91669656-1', 'auto');
  ga('send', 'pageview');

</script>

<div class="facebook_kontajner">

<div class="fb_header">Facebook page</div>

<div class="fb-page" data-href="https://www.facebook.com/origemwootnew" data-small-header="false" data-adapt-container-width="false" data-hide-cover="false" data-show-facepile="false" data-show-posts="false"><div class="fb-xfbml-parse-ignore"><blockquote cite="https://www.facebook.com/partydjwoot"><a href="https://www.facebook.com/partydjwoot">Origem Bot</a></blockquote></div></div>
</div>
<div id="smallLoader"></div>

	<div id="home" class="block">
		<div id="header"></div>
		<div id="content">
			<div class="homescroll">
				<div>Origem Bot is the best virtual moderator (chat-bot)<br>for your <b>plug.dj</b> community</div>
				<div>Total <b><?=number_format($nSongs->id, 0, "", " ")?></b> songs<br>has been played</div>
				<div><b><?=number_format($nSongsLast7days->sl, 0, "", " ")?></b> songs<br>has been played within last 7 days <br><small>(from <?=$before7Days?>)</small></div>
				<div><b><?=$lastSongName?></b><br>this song has been played just now</div>
				<div><b><?=number_format($totalWoots, 0, "", " ")?></b> woots<br>DJ's received from 2015</div>
				<div><b><?=number_format($woots7Days, 0, "", " ")?></b> woots, <b><?=number_format($grabs7Days, 0, "", " ")?></b> grabs and <b><?=number_format($mehs7Days, 0, "", " ")?></b> mehs<br>Origem Bot record within last 7 days</div>
			</div>
		</div>
		<div id="navigation">
			<a class="link" id="features" href="/features.html">Features</a>
			<a class="link" id="installation" href="/installation.html">Installation</a>
			<a class="link" id="commands" href="/commands.html">Commands</a>
			<a class="link" id="contact" href="#" onClick="javascript:window.location.href='https://www.origem-woot.tk/'">Origem Woot</a>
		</div>
	</div>

	<div id="target"></div>

</body>
</html>