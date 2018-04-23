<div class="padding">

	<h1>Commands</h1>
	<h2>General</h2>
	<ul class="commands">

		<li><a>help</a></li>

		<li><a>manager</a></li>
		<li><a>bouncer</a></li>
		<li><a>resident</a></li>
		<li><a>cohost</a></li>
		<li><a>reload</a></li>

		<li><a>die</a></li>

		<li><a>mute</a></li>
		<li><a>unmute</a></li>

		<li><a>ban</a></li>
		<li><a>skip</a></li>
		<li><a>tryagain</a></li>

		<li><a>msg</a></li>
		<li><a>set</a></li>
		<li><a>swap</a></li>
		<li><a>move</a></li>
		<li><a>dc</a></li>
		<li><a>hidecommands</a></li>
		<li><a>skiphistory</a></li>
		<li><a>roomstats</a></li>

	</ul>

	<h2>Waitlsit, DJ, SONG</h2>
	<ul class="commands">
		<li><a>lock</a></li>
		<li><a>unlock</a></li>
		<li><a>clearwaitlist</a></li>

		<li><a>bot woot</a></li>

		<li><a>songban</a></li>
		<li><a>songunban</a></li>

		<li><a>voteskip</a></li>
	</ul>

	<h2>Other</h2>
	<ul class="commands">
		<li><a>roll</a></li>
		<li><a>afks</a></li>
		<li><a>ping</a></li>
		<li><a>autowoot</a></li>
		<li><a>clearchat</a></li>
		<li><a>roulette</a></li>
		<li><a>autoroulette</a></li>
		<li><a>stoproulette</a></li>
		<li><a>play</a></li>
		<li><a>players</a></li>
		<li><a>filter</a></li>
		<li><a>wlfilter</a></li>
		<li><a>fb</a></li>
		<li><a>rules</a></li>

	</ul>

	<div class="command">
		<h3 id="help">Help</h3>
		<span>Show help</span>
		<i>help</i>
	</div>
	
	<div class="command">
		<h3 id="manager">manager</h3>
		<span>Add new manager</span>
		<i>manager @user</i>
	</div>
	
	<div class="command">
		<h3 id="bouncer">bouncer</h3>
		<span>Add new bouncer</span>
		<i>bouncer @user</i>
	</div>
	
	<div class="command">
		<h3 id="resident">resident</h3>
		<span>Add new resident dj</span>
		<i>resident @user</i>
	</div>
	
	<div class="command">
		<h3 id="cohost">cohost</h3>
		<span>Add new co-host</span>
		<i>cohost @user</i>
	</div>
	
	<div class="command">
		<h3 id="reload">reload</h3>
		<span>Reload nBOT</span>
		<i>reload</i>
	</div>
	
	<div class="command">
		<h3 id="die">die</h3>
		<span>Turn off nBOT</span>
		<i>die</i>
	</div>
	
	<div class="command">
		<h3 id="mute">mute</h3>
		<span>Mute user</span>
		<i>mute @user 15/30/45</i>
	</div>
	
	<div class="command">
		<h3 id="unmute">unmute</h3>
		<span>Unmute user</span>
		<i>unmute @user</i>
	</div>
	
	<div class="command">
		<h3 id="ban">ban</h3>
		<span>Ban user</span>
		<i>ban @user 1/24/perma</i>
	</div>
	
	<div class="command">
		<h3 id="skip">skip</h3>
		<span>Skip current song</span>
		<i>skip</i>
	</div>
	
	<div class="command">
		<h3 id="tryagain">tryagain</h3>
		<span>Lock, Skip, Add skipped user to WaitList, Move skipped user to 1, Unlock</span>
		<i>tryagain</i>
	</div>
	
	<div class="command">
		<h3 id="msg">msg</h3>
		<span>On/Off messages (welcome, grab, stats)</span>
		<i>msg webcome/grab/stats on/off</i>
	</div>
	
	<div class="command">
		<h3 id="set">set</h3>
		<span>Set community settings<br>
			<ul>
				<li>
					historylimit [1-50]
				</li>
				<li>
					welcomemessage [message]
				</li>
				<li>
					voteskipcount [1-9999]
				</li>
				<li>
					roulettetime [seconds]
				</li>
				<li>
					dclimit [hours]
				</li>
				<li>
					cmdtrigger
				</li>
				<li>
					fb [FACEBOOK_PAGE_URL]
				</li>
				<li>
					rules [RULES_PAGE_URL]
				</li>
				<li>
					lang [LANGUAGE_CODE]
				</li>
				<li>
					cp [USER / BOUNCER / MANAGER / COHOST / HOST]
				</li>
				<li>
					botname [NAME]
				</li>
				<li>
					songlimit [SECONDS]
				</li>
			</ul>
		</span>
		<i>set [option1] [option2]</i>
	</div>
	
	<div class="command">
		<h3 id="swap">swap</h3>
		<span>Swap two users in waitlist. Use swap 1 2 or swap @user1 @user2 or combine.</span>
		<i>swap 8 5</i>
	</div>
	
	<div class="command">
		<h3 id="move">move</h3>
		<span>Move DJ in waitlist</span>
		<i>move @user 1</i>
	</div>
	
	<div class="command">
		<h3 id="dc">dc</h3>
		<span>Move you to position where you disconnected</span>
		<i>dc</i>
	</div>
	
	<div class="command">
		<h3 id="hidecommands">hidecommands</h3>
		<span>Hide commands (<b>off recommended</b>)</span>
		<i>hidecommands on/off</i>
	</div>
	
	<div class="command">
		<h3 id="skiphistory">skiphistory</h3>
		<span>Skip song if is in history?</span>
		<i>skiphistory on/off</i>
	</div>
	
	<div class="command">
		<h3 id="roomstats">roomstats</h3>
		<span>Show community stats from nBOT starts</span>
		<i>roomstats</i>
	</div>
	
	<div class="command">
		<h3 id="lock">lock</h3>
		<span>Lock DJ booth</span>
		<i>lock</i>
	</div>
	
	<div class="command">
		<h3 id="unlock">unlock</h3>
		<span>Unlock DJ booth</span>
		<i>unlock</i>
	</div>
	
	<div class="command">
		<h3 id="clearwaitlist">clearwaitlist</h3>
		<span>Clear waitlist</span>
		<i>clearwaitlist</i>
	</div>
	
	<div class="command">
		<h3 id="botwoot">bot woot</h3>
		<span>nBOT dance!</span>
		<i>bot woot</i>
	</div>
	
	<div class="command">
		<h3 id="songban">songban</h3>
		<span>Ban current song</span>
		<i>songban</i>
	</div>
	
	<div class="command">
		<h3 id="songunban">songunban</h3>
		<span>Unban song (comming soon)</span>
		<i>songunban BAN_ID</i>
	</div>
	
	<div class="command">
		<h3 id="voteskip">voteskip</h3>
		<span>Vote for skip. (same as meh)</span>
		<i>voteskip</i>
	</div>
	
	<div class="command">
		<h3 id="roll">roll</h3>
		<span>Write random number (0-100)</span>
		<i>roll</i>
	</div>
	
	<div class="command">
		<h3 id="afks">afks</h3>
		<span>Write AFK users</span>
		<i>afks</i>
	</div>
	
	<div class="command">
		<h3 id="ping">Ping</h3>
		<span>PING www.plug.dj</span>
		<i>ping</i>
	</div>
	
	<div class="command">
		<h3 id="autowoot">autowoot</h3>
		<span>comming soon</span>
		<i>comming soon</i>
	</div>
	
	<div class="command">
		<h3 id="clearchat">clearchat</h3>
		<span>Clear chat</span>
		<i>clearchat</i>
	</div>
	
	<div class="command">
		<h3 id="roulette">roulette</h3>
		<span>Spin roulette!</span>
		<i>roulette</i>
	</div>
	
	<div class="command">
		<h3 id="autoroulette">autoroulette</h3>
		<span>Spin roulette every X minutes</span>
		<i>autoroulette 20</i>
	</div>
	
	<div class="command">
		<h3 id="stoproulette">stoproulette</h3>
		<span>Stop roulette</span>
		<i>stoproulette</i>
	</div>
	
	<div class="command">
		<h3 id="play">play</h3>
		<span>Join to roulette</span>
		<i>play</i>
	</div>
	
	<div class="command">
		<h3 id="players">players</h3>
		<span>Show roulette players</span>
		<i>players</i>
	</div>
	
	<div class="command">
		<h3 id="filter">filter</h3>
		<span>Song filter ON/OFF</span>
		<i>filter on/off </i>
	</div>
	
	<div class="command">
		<h3 id="wlfilter">wlfilter</h3>
		<span>WaitList filter on/off</span>
		<i>wlfilter on/off</i>
	</div>
	
	<div class="command">
		<h3 id="fb">fb</h3>
		<span>Show link to facebook</span>
		<i>fb</i>
	</div>
	
	<div class="command">
		<h3 id="rules">rules</h3>
		<span>Show link to rules</span>
		<i>rules</i>
	</div>
</div>