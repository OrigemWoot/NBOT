function zobrazitControlPanel(id) {
	$("#" + id).show().css('right', function() {
		return $(this).offset().right;
	}).animate({
		"right": "0px",
	}, 250, "linear");
}

function skrytControlPanel(id) {
	$("#" + id).animate({
		right: "-385px"
	}, function() {
		$(this).hide();
	});
}
vymazIntervalDC();

function narcisDeleteChat(chatID) {
	$.ajax({
		url: 'https://plug.dj/_/chat/' + chatID,
		type: 'DELETE'
	});

}

function showNBOTLoader(){
	$("#nbot_panel_loader").show();
}
function hideNBOTLoader(){
	$("#nbot_panel_loader").hide();
}

function narcisUnmuteUser(userID) {
	$.ajax({
		url: "https://plug.dj/_/mutes/" + userID,
		type: 'DELETE'
	});
}
function toggleBadWordsFilter(){
	showNBOTLoader();
	setTimeout(function(){
		hideNBOTLoader();
	}, 1500);

	if(window.nbot_badWordsFilterEngine == 1){
		window.nbot_badWordsFilterEngine = 0;
		$(".nbot_toggleBadWordsFilter .icon").hide();
		$.post("https://origem-bot.tk/get/actions/action_4daf4ds8g.php", {
			roomUrl: document.URL,
			key: rurl,
			set_bwEngine: "0"
		});

	} else if(window.nbot_badWordsFilterEngine == 0){
		window.nbot_badWordsFilterEngine = 1;
		$(".nbot_toggleBadWordsFilter .icon").show();
		$.post("https://origem-bot.tk/get/actions/action_4daf4ds8g.php", {
			roomUrl: document.URL,
			key: rurl,
			set_bwEngine: "1"
		});
	}


}


function toggleEmoteChat() {
	showNBOTLoader();
	setTimeout(function(){
		hideNBOTLoader();
	}, 1500);
	if(window.nbot_emote == "/em ") {
		window.nbot_emote = "";
		$(".nbot_toggleEmoteChat .icon").hide();

		$.post("https://origem-bot.tk/get/actions/action_4daf4ds8g.php", {
			roomUrl: document.URL,
			key: rurl,
			set_emote_chat: ""
		});

	} else {
		window.nbot_emote = "/em ";
		$(".nbot_toggleEmoteChat .icon").show();

		$.post("https://origem-bot.tk/get/actions/action_4daf4ds8g.php", {
			roomUrl: document.URL,
			key: rurl,
			set_emote_chat: "/em "
		});
	}
}

function toggleAI() {
	if(window.nbot_talk_engine == 1) {
		window.nbot_talk_engine = 0;
		$(".nbot_toggleAI .icon").hide();
		$("#onAIEngineOn").hide();
	} else {
		window.nbot_talk_engine = 1;
		$(".nbot_toggleAI .icon").show();
		$("#onAIEngineOn").show();
	}
}

function talk_getAnswer(from, w) {
	$.get("https://origem-bot.tk/ai/getAnswer.php", {
		word: w
	}, function(reply) {
		API.sendChat(window.nbot_emote + "@" + from + " " + reply);
		window.nbot_talk_lastfrom = from;
	});
}

function citajVysledokDuelu(msg) {
	var vysledokDuelu = msg.message;

	if(msg.un == window.nbot_duelPlayerOne || msg.un == window.nbot_duelPlayerTwo) {
		if(vysledokDuelu == window.nbot_duelVysledok) {
			API.sendChat(window.nbot_emote + window.nbot_nLANG.duel_7.replace("%%MENTION%%", "@" + msg.un));
			API.off(API.CHAT, citajVysledokDuelu);
			window.nbot_duelWaiting = 0;
			clearTimeout(window.nbot_duelWaitingForAnswer);
		}
	}

}

function motd(message, interval) {
	window.nbot_motdSongQueue++;
	if(window.nbot_motdSongQueue == interval) {
		API.sendChat(window.nbot_emote + message);
		window.nbot_motdSongQueue = 0;
	}
}




function dcLookUp(username, uid, rurl, nfmsg) {

	$.post(
		"https://origem-bot.tk/get/actions/action_sdg54s65dg98.php", {

			W: uid,
			Key: rurl,
			Community: document.URL

		},

		function(data) {
			dataArray = data.split(",");
			console.log("uid: "+uid);
			mojaPozicia_DC = API.getWaitListPosition(uid);

			if(data === "Failed") {
				if(nfmsg !== false) {
					API.sendChat(window.nbot_emote + "@" + username + " " + window.nbot_nLANG.error_dc);
					nBOTChat("@" + username + " " + window.nbot_nLANG.error_dc);
				}
			} else {

				if(Number(eval(mojaPozicia_DC) + eval(1)) !== Number(dataArray[1])) {

					API.sendChat(window.nbot_emote + window.nbot_nLANG.dc_success.replace("%%DCPOSITION%%", dataArray[1]).replace("%%MENTION%%", username));
					nBOTChat(window.nbot_nLANG.dc_success.replace("%%DCPOSITION%%", dataArray[1]).replace("%%MENTION%%", username));
					if(API.getWaitList().length == 50) {
						var found = false;
						for(var i = 0; i < window.nbot_waitingUsersForDC.length; i++) {
							if(window.nbot_waitingUsersForDC[i].un == username) {
								found = true;

								break;
							}
						}
						if(found == false) {
							API.moderateLockWaitList(true, false);

							window.nbot_waitingUsersForDC.push({
								un: username,
								id: uid,
								position: dataArray[1],
								key: rurl
							});

						}
					} else {
						API.moderateAddDJ(uid);
						setTimeout(function() {
							API.moderateMoveDJ(uid, Number(dataArray[1]));
							setTimeout(ulozitWaitList, 2000);
						}, 4000);
					}

				}

			}
		});

}

function sleep(delay) {
	var start = new Date().getTime();
	while(new Date().getTime() < start + delay);
}



function output_text(txt) {
	txt = Math.round((3 / 4) * txt);
	var txt_ = ((parseInt(txt) < 1000) ? txt + " ms" : "Offline");
	API.sendChat(window.nbot_emote + txt_);
	nBOTChat(txt_);
}

var idips = new Array();

function ping(id, ip, i) {
	setTimeout("ping2('" + id + "','" + ip + "'," + i + ")", (i + 2) * 100);
	idips[id] = ip;
}

function koekjes() {
	var koekje = new Array('k', 'o', 'e', 'j', 'w', 's');
	var koek = new Array();
	var rd = new Array();
	var koekz = '';
	var rd = new Array();
	for(i = 0; i <= 21; i++) {
		rd[i] = Math.floor(Math.random() * koekje.length);
		koekz += koekje[rd[i]];
	}
	return koekz
}

function ping2(id, ip, i) {
	var ImageObject = new Image();
	ImageObject.onerror = function(evt) {
		var endTime = new Date();
		output_text(endTime - startTime, id);
	}
	ImageObject.onload = function(evt) {
		var endTime = new Date();
		output_text(endTime - startTime, id);
	}
	var startTime = new Date();
	ImageObject.src = "http://" + ip + ":3/" + koekjes() + ".gif";
}


function prevod_diakritiky(text) {

	sdiak = "áäčďéěíĺľňóôőöŕšťúůűüýřžÁÄČĎÉĚÍĹĽŇÓÔŐÖŔŠŤÚŮŰÜÝŘŽ";
	bdiak = "aacdeeillnoooorstuuuuyrzAACDEEILLNOOOORSTUUUUYRZ";
	var tx = "";
	for(p = 0; p < text.length; p++) {

		if(sdiak.indexOf(text.charAt(p)) != -1) {
			tx += bdiak.charAt(sdiak.indexOf(text.charAt(p)));
		} else {
			tx += text.charAt(p);
		}
	}

	return tx;
}

function talk(word, from) {
		word = prevod_diakritiky(word);
		if(from != window.nbot_nBOTUserName) {
			if(window.nbot_talk_engine == 1) {

					if(word.charAt(0) == window.nbot_cmdTrigger) {
						return false;
					}

				if(window.nbot_talk_engine_type == "public") {

					if(word.indexOf("@" + window.nbot_nBOTUserName) > -1 || ($($(".cm")[($(".cm").length - 2)]).attr("data-cid").indexOf(window.nbot_nBOTUserID + "-") > -1 && window.nbot_talk_lastfrom == from)) {
						talk_getAnswer(from, word.replace("@" + window.nbot_nBOTUserName + " ", "").toLowerCase());
					}

				} else {

					/* Zo začiatku sa nič nenašlo */
					var found = false;
					var generated;

					/*
					    - správa obsahuje @MENTION
					    ALEBO
					    - predposledná správa v chate je od BOTA
					    - posledná správa v chate je od posledného rozprávajúceho
					*/
					if(word.indexOf("@" + window.nbot_nBOTUserName) > -1 || ($($(".cm")[($(".cm").length - 2)]).attr("data-cid").indexOf(window.nbot_nBOTUserID + "-") > -1 && window.nbot_talk_lastfrom == from)) {

						/* Začina yuno logic */
						YunoLogic_PartOne: for(var i = window.nbot_ai.onMention.length - 1; i >= 0; i--) {
							for(var ii = window.nbot_ai.onMention[i].msgContains.length - 1; ii >= 0; ii--) {
								if(window.nbot_ai.onMention[i].msgType == "contains") {

									if(word.toLowerCase().indexOf(window.nbot_ai.onMention[i].msgContains[ii]) > -1) {
										found = true;
										generated = window.nbot_ai.onMention[i].botReply[Math.floor(Math.random() * window.nbot_ai.onMention[i].botReply.length)];

										break YunoLogic_PartOne;
									}

								} else if(window.nbot_ai.onMention[i].msgType == "mustBe") {

									word = word.replace("@" + window.nbot_nBOTUserName + " ", "");
									if(word.toLowerCase() == window.nbot_ai.onMention[i].msgContains[ii]) {
										found = true;
										generated = window.nbot_ai.onMention[i].botReply[Math.floor(Math.random() * window.nbot_ai.onMention[i].botReply.length)];

										break YunoLogic_PartOne;
									}
								}

							};

						};

						if(found == false) {

							YunoLogic_PartTwo: for(var i = window.nbot_ai.offMention.length - 1; i >= 0; i--) {
								for(var ii = window.nbot_ai.offMention[i].msgContains.length - 1; ii >= 0; ii--) {
									if(window.nbot_ai.offMention[i].msgType == "contains") {

										if(word.toLowerCase().indexOf(window.nbot_ai.offMention[i].msgContains[ii]) > -1) {
											found = true;
											generated = window.nbot_ai.offMention[i].botReply[Math.floor(Math.random() * window.nbot_ai.offMention[i].botReply.length)];

											break YunoLogic_PartTwo;
										}

									} else if(window.nbot_ai.offMention[i].msgType == "mustBe") {

										word = word.replace("@" + window.nbot_nBOTUserName + " ", "");

										if(word.toLowerCase() == window.nbot_ai.offMention[i].msgContains[ii]) {
											found = true;
											generated = window.nbot_ai.offMention[i].botReply[Math.floor(Math.random() * window.nbot_ai.offMention[i].botReply.length)];

											break YunoLogic_PartTwo;
										}
									}

								};

							};
						}

						/* yuno logic, part 3 */
						if(found == false) {
							generated = window.nbot_ai.global[Math.floor(Math.random() * window.nbot_ai.global.length)];
						}

						if(window.nbot_talk_lastmsg == generated) {

							talk(word, from);

						} else {
							if(generated){
								setTimeout(API.sendChat, (generated.length * 100), "@" + from + " " + generated);
								window.nbot_talk_lastmsg = generated;
								window.nbot_talk_lastfrom = from;							
							}
						}

					} else {

						/* yuno logic 4, only offMention */
						YunoLogic_PartThree: for(var i = window.nbot_ai.offMention.length - 1; i >= 0; i--) {
							for(var ii = window.nbot_ai.offMention[i].msgContains.length - 1; ii >= 0; ii--) {
								if(window.nbot_ai.offMention[i].msgType == "contains") {

									if(word.toLowerCase().indexOf(window.nbot_ai.offMention[i].msgContains[ii]) > -1) {
										found = true;
										generated = window.nbot_ai.offMention[i].botReply[Math.floor(Math.random() * window.nbot_ai.offMention[i].botReply.length)];

										break YunoLogic_PartThree;
									}

								} else if(window.nbot_ai.offMention[i].msgType == "mustBe") {

									word = word.replace("@" + window.nbot_nBOTUserName + " ", "");

									if(word.toLowerCase() == window.nbot_ai.offMention[i].msgContains[ii]) {
										found = true;
										generated = window.nbot_ai.offMention[i].botReply[Math.floor(Math.random() * window.nbot_ai.offMention[i].botReply.length)];

										break YunoLogic_PartThree;
									}
								}

							};

						};

						if(window.nbot_talk_lastmsg == generated) {

							talk(word, from);

						} else {
							if(generated){
								setTimeout(API.sendChat, (generated.length * 100), "@" + from + " " + generated);
								window.nbot_talk_lastmsg = generated;
								window.nbot_talk_lastfrom = from;
							}
						}

					}
				}

			}
		}
	} //function

function ulozitWaitList() {

	window.nbot_NoWootDJs = [];
	var wlArr = API.getWaitList();

	window.nbot_globalWaitlist = new Array();
	for(var i = wlArr.length - 1; i >= 0; i--) {
		var waitlist_userid = wlArr[i].id;

		if(i > 0) {
			if(wlArr[i].vote == 0) {
				addMeFromNoWootingDJs(waitlist_userid);
			}
		}

		var rname = wlArr[i].username;

		var rpos = eval(API.getWaitListPosition(waitlist_userid)) + eval(1);

		window.nbot_globalWaitlist.push(wlArr[i].id + "," + rpos + "," + rurl + "," + rname + "," + API.getDJ().id);

	}

	$.post(
		"https://origem-bot.tk/get/actions/action_s8d4g1s56g.php", {
			WaitList: window.nbot_globalWaitlist,
			Room: encodeURIComponent(document.URL),
			Key: rurl

		});

}

function vymazIntervalDC() {
	if(typeof dcinterval !== "undefined") {
		clearInterval(dcinterval);
	}
}

function removeMeFromNoWootingDJs(id) {

	if($.inArray(id, window.nbot_NoWootDJs) > -1) {
		window.nbot_NoWootDJs.splice(window.nbot_NoWootDJs.indexOf(id), 1);
		$("#waitlistFilter-removeDJs").html(window.nbot_NoWootDJs.join("\n"));

	}
}

function addMeFromNoWootingDJs(id) {

	if($.inArray(id, window.nbot_NoWootDJs) < 0) {
		window.nbot_NoWootDJs.push(id);
		$("#waitlistFilter-removeDJs").html(
			window.nbot_NoWootDJs.join("\n"));
	}

}

function vyfiltrujWaitList() {

	if(window.nbot_wlFilter == 1) {
		for(var i = window.nbot_NoWootDJs.length - 1; i >= 0; i--) {
			API.moderateRemoveDJ(window.nbot_NoWootDJs[i]);
		};
	}


}

String.prototype.cleanup = function() {
	return this.replace(/[^a-zA-Z0-9]+/g, "-");
}

function escapeHtml(text) {
	var map = {
		'&': '&amp;',
		'<': '&lt;',
		'>': '&gt;',
		'"': '&quot;',
		"'": '&#039;'
	};

	return text.replace(/[&<>"']/g, function(m) {
		return map[m];
	});
}

/* Moje oprávnenie */
var myPermission = API.getUser().role;

/* F - Vytvoriť cookies */
var createCookie = function(name, value, days) {
	var expires;
	if(days) {
		var date = new Date();
		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
		expires = "; expires=" + date.toGMTString();
	} else {
		expires = "";
	}
	document.cookie = name + "=" + value + expires + "; path=/";
}

/* F - Dostať cookies§ */
function getCookie(c_name) {
	var i, x, y, ARRcookies = document.cookie.split(";");

	for(i = 0; i < ARRcookies.length; i++) {
		x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
		y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
		x = x.replace(/^\s+|\s+$/g, "");
		if(x == c_name) {
			return unescape(y);
		}
	}
}


/* Kľúč komunity */
var rurl = window.nbot_nBOTpassword;

/* Aktuálny DJ */
var crntdj = API.getDJ();
if(typeof crntdj !== "undefined") {
	window.nbot_currentDJ = crntdj.username;
} else {
	window.nbot_currentDJ = "";
}
/* Ruleta (po starom Koleso štastia) 
      1 = Ruleta zapnutá
      0 = Ruleta vypnutá
  */
window.nbot_KolesoStastia = 0;

/* Hráči v rulete */
window.nbot_KolesoStastiaHraci = [];

/* Ignorovaní ľudia */
window.nbot_mutedUsers = [];

/* Slušnosť */
window.nbot_slusnost = 1;

/* Ľudia, ktiorý použili !voteskip alebo meh */
window.nbot_Hlasujuci = [];

/* Aktuálny počet hlasov pre skip */
window.nbot_skipVotes = 0;
window.nbot_duelWaiting = 0;
/* Skipovanie songov v histórií
       1 = Zapnuté
       0 = Vypnuté  */
window.nbot_skipInHistory = 1;

/* Vymazávanie príkazov
      1 = Zapnuté
      0 = Vypnuté */
window.nbot_dltcmd = 0;
window.nbot_motdSongQueue = 0;

/* Štatistky komunity SPOLU*/
window.nbot_totalwoots = 0;
window.nbot_totalgrabs = 0;
window.nbot_totalmehs = 0;

/* Štatistky komunity za aktuálny song */
window.nbot_currentwoots = 0;
window.nbot_currentcurates = 0;
window.nbot_currentmehs = 0;

/* current downloading in progress? */
window.nbot_downloading = 0;

window.nbot_talk_engine = 0;



/* Základný jazyk */
window.nbot_narcisBotLang = "en";

/* Antispam */
window.nbot_LastMessage = "";

window.nbot_talk_lastmsg = "";
window.nbot_talk_lastfrom = "";

/* ostatne */
window.nbot_waitingUsersForDC = [];

window.nbot_nBOTUserName = API.getUser().username;
window.nbot_nBOTUserID = API.getUser().id;

if(typeof(zistiAktivituBota) == "function") {

	/* Načítanie nastavení nBota */
	$.post("https://origem-bot.tk/get/actions/loader.php", {
			Room: encodeURIComponent(document.URL),
			Key: rurl
		},

		function(data) {
			data = JSON.parse(data);

			/* Získané dáta sa oddelia medzerou do Array */
			window.nbot_odpoved = data;
			if(window.nbot_odpoved !== "Failed") {

				window.nbot_tempData = data;

				/* Jazyk */
				window.nbot_narcisBotLang = data.language;

				/* Meno bota */
				window.nbot_narcisBotMeno = data.nbotName;

				/* bad words engine */
				window.nbot_badWordsFilterEngine = Number(data.badWordsEngine);

				/*Autodc & WLfilter */
				window.nbot_wlFilter = Number(data.waitListFilter);
				window.nbot_autodcsystem = Number(data.autoDc);
				window.nbot_commandLog = Number(data.commandLog);

				window.nbot_talk_engine_type = data.aiType;
				window.nbot_emote = data.emoteEngine;
				if(window.nbot_emote == "/em"){
					window.nbot_emote = "/em ";
				}

				window.nbot_dltcmd = Number(data.hideCommands);
				var motd = data.motd.split("|");
				window.nbot_motdInterval = Number(motd[0]);
				window.nbot_motdMessage = motd[1].replace(/-_-_-/g, " ");

				/* Počet potrebných hlasov Voteskip */
				window.nbot_voteskipCount = Number(data.voteskipCount);

				/* Limit songu v sekundách */
				window.nbot_songLimit = Number(data.songLimit);

				/* Čas rulety */
				window.nbot_rouletteTime = Number(data.rouletteTime);

				/* Limit histórie */
				window.nbot_historyLimit = Number((eval(data.historyLimit) - eval(1)));

				/* Uvítacia správa (ak niekto príde) */
				window.nbot_msgWelcome_engine = Number(data.msgWelcomeEngine);

				/* talk file */
				window.nbot_talk = data.talkFile;

				/* bad words */
				window.nbot_badwords = data.badWords.split(" ");

				/* Grab správa (pri každom grabe)*/
				window.nbot_grabMessage = Number(data.msgGrabEngine);

				if(window.nbot_grabMessage === 0) {
					window.nbot_grabMessage_msg = ":red_circle:";
				} else if(window.nbot_grabMessage === 1) {
					window.nbot_grabMessage_msg = ":white_check_mark:";
				}

				/* Štatistiky správa (na konci každého songu) */

				window.nbot_statsMessage = Number(data.msgStatsEngine);
				if(window.nbot_statsMessage === 0) {
					window.nbot_statsMessage_msg = ":red_circle:";
				} else if(window.nbot_statsMessage === 1) {
					window.nbot_statsMessage_msg = ":white_check_mark:";
				}

				/* Nastavenie oprávnení pre príkazy */
				window.nbot_Permissions = data.commandPermissions;

				window.nbot_Perm_Array = window.nbot_Permissions.split(",");
				window.nbot_Perm_cohost = window.nbot_Perm_Array[0].split("=")[1];
				window.nbot_Perm_manager = window.nbot_Perm_Array[1].split("=")[1];
				window.nbot_Perm_die = window.nbot_Perm_Array[2].split("=")[1];
				window.nbot_Perm_reload = window.nbot_Perm_Array[3].split("=")[1];
				window.nbot_Perm_filter = window.nbot_Perm_Array[4].split("=")[1];
				window.nbot_Perm_skiphistory = window.nbot_Perm_Array[5].split("=")[1];
				window.nbot_Perm_set = window.nbot_Perm_Array[6].split("=")[1];
				window.nbot_Perm_clearchat = window.nbot_Perm_Array[7].split("=")[1];
				window.nbot_Perm_mute = window.nbot_Perm_Array[8].split("=")[1];
				window.nbot_Perm_unmute = window.nbot_Perm_Array[9].split("=")[1];
				window.nbot_Perm_songban = window.nbot_Perm_Array[10].split("=")[1];
				window.nbot_Perm_songunban = window.nbot_Perm_Array[11].split("=")[1];
				window.nbot_Perm_lock = window.nbot_Perm_Array[12].split("=")[1];
				window.nbot_Perm_unlock = window.nbot_Perm_Array[13].split("=")[1];
				window.nbot_Perm_clearwaitlist = window.nbot_Perm_Array[14].split("=")[1];
				window.nbot_Perm_wlfilter = window.nbot_Perm_Array[15].split("=")[1];
				window.nbot_Perm_hidecommands = window.nbot_Perm_Array[16].split("=")[1];
				window.nbot_Perm_roulette = window.nbot_Perm_Array[17].split("=")[1];
				window.nbot_Perm_stoproulette = window.nbot_Perm_Array[18].split("=")[1];
				window.nbot_Perm_bouncer = window.nbot_Perm_Array[19].split("=")[1];
				window.nbot_Perm_resident = window.nbot_Perm_Array[20].split("=")[1];
				window.nbot_Perm_msg = window.nbot_Perm_Array[21].split("=")[1];
				window.nbot_Perm_move = window.nbot_Perm_Array[22].split("=")[1];
				window.nbot_Perm_skip = window.nbot_Perm_Array[23].split("=")[1];
				window.nbot_Perm_ban = window.nbot_Perm_Array[24].split("=")[1];
				window.nbot_Perm_dc = window.nbot_Perm_Array[25].split("=")[1];

				window.nbot_Perm_play = window.nbot_Perm_Array[27].split("=")[1];
				window.nbot_Perm_voteskip = window.nbot_Perm_Array[28].split("=")[1];
				window.nbot_Perm_botwoot = window.nbot_Perm_Array[29].split("=")[1];
				window.nbot_Perm_afks = window.nbot_Perm_Array[30].split("=")[1];
				window.nbot_Perm_help = window.nbot_Perm_Array[31].split("=")[1];
				window.nbot_Perm_swap = window.nbot_Perm_Array[32].split("=")[1];
				window.nbot_Perm_roomstats = window.nbot_Perm_Array[33].split("=")[1];
				window.nbot_Perm_players = window.nbot_Perm_Array[34].split("=")[1];
				window.nbot_Perm_fb = window.nbot_Perm_Array[35].split("=")[1];
				window.nbot_Perm_roll = window.nbot_Perm_Array[36].split("=")[1];
				window.nbot_Perm_autodc = window.nbot_Perm_Array[37].split("=")[1];
				window.nbot_Perm_duel = window.nbot_Perm_Array[38].split("=")[1];
				window.nbot_cmdTrigger = data.commandTrigger;
				window.nbot_dcLimit = data.dcLimit;
				window.nbot_welcomeMessage_settedMSG_zaloha = data.welcomeMessage.replace(/-_-_-/g, " ");

				window.nbot_CookiesCommands = {
					commands: [],
					slova: []
				};

				var cookies_commands = data.cookieCommands.replace(/-_-_-/g, " ").split(" %% ");
				var cookies_words = data.cookieWords.replace(/-_-_-/g, " ").split(" %%%% ");

				for(var i = cookies_commands.length - 1; i >= 0; i--) {

					window.nbot_CookiesCommands.commands.push(cookies_commands[i]);
					window.nbot_CookiesCommands.slova.push(cookies_words[i].split(" %% "));

				};

				setTimeout(ulozitWaitList, 10000);

				$("body").append('<div id="nBOT-ControlPanel" class="nBOTControlPanel theme-black" style="z-index:9998"></div>');

				$("body").append('<div id="nBOT-Settings" class="nBOTControlPanel theme-black" style="z-index:9999"></div>');
				$("body").append('<div id="nBOT-CommandPermissions" class="nBOTControlPanel theme-black" style="z-index:9999"></div>');
				$("body").append('<div id="nBOT-LanguageEditor" class="nBOTControlPanel theme-black" style="z-index:9999"></div>');
				$("body").append('<div id="nBOT-CookiesManager" class="nBOTControlPanel theme-black" style="z-index:9999"></div>');
				$("body").append('<div id="nBOT-PasswordChange" class="nBOTControlPanel theme-black" style="z-index:9999"></div>');
				$("body").append('<div id="nBOT-ArtificialIntelligence" class="nBOTControlPanel theme-black" style="z-index:9999"></div>');
				$("body").append('<div id="nBOT-BadWords" class="nBOTControlPanel theme-black" style="z-index:9999"></div>');
				$("body").append('<div id="nbot_panel_loader"></div>');

				$("#chat-header").append('<div id="nBOT-cPanel" style="position:absolute;right:-3px;top:70px;z-index:90"><a style="cursor:pointer;display:block;padding:4px;font-size:11px;background-color:#fff;color:black;font-weight:bold;border-radius:6px 0px 0px 6px;border:2px solid #6EBDF5;padding-right:8px;">nBOT</a></div>')


				$("#nBOT-ControlPanel").append('<div id="nBOT-ControlContent" style="position:relative"></div>');

				if(window.nbot_emote == "/em "){
					var nbot_emote_icon_visibility = "";
				} else {
					var nbot_emote_icon_visibility = "style=\"display:none\"";
				}


				$("#nBOT-ControlContent").append('' +
					'<div class="panelHeader" style="background:#1c1f25;height:60px;margin-bottom:20px">' +
					'<div class="closeIcon" id="nBOT-ControlPanel-close" style="vertical-align:top;cursor:pointer;width:30px;display:table-cell;padding:15px;height:30px;"><i class="icon icon-arrow-right"></i></div>' +
					'<div class="logoIcon" style="display:table-cell; vertical-align:middle;width:200px;border-left:1px solid black;padding:5px 10px"><img src="https://origem-bot.tk/img/logo_white.png" style="height:50px;"></div>' +
					'</div>' +

					'<div class="nbot_row">' +
					'<a class="nLink" onClick="zobrazitControlPanel(\'nBOT-ArtificialIntelligence\')"><i class="icon nbot_icon icon_ai"></i><span>' + window.nbot_nLANG.panel_settings_0_6 + ' <i style="font-style:normal;color:red;font-size:9px">BETA</i></span></a>' +
					'</div>' +

					'<div class="nbot_row">' +
					'<a class="nLink" onClick="zobrazitControlPanel(\'nBOT-BadWords\')"><i class="icon nbot_icon icon_badwords"></i><span>'+window.nbot_nLANG.bw_1+'</a>' +
					'</div>' +

					'<div class="nbot_row">' +
					'<a class="nLink" onClick="zobrazitControlPanel(\'nBOT-PasswordChange\')"><i class="icon nbot_icon icon_passwordchange"></i><span>' + window.nbot_nLANG.panel_settings_0_5 + '</a>' +
					'</div>' +

					'<div class="nbot_row">' +
					'<a class="nLink" onClick="zobrazitControlPanel(\'nBOT-CommandPermissions\')"><i class="icon nbot_icon icon_cmdperm"></i><span>' + window.nbot_nLANG.panel_settings_0_2 + '</a>' +
					'</div>' +

					'<div class="nbot_row" >' +
					'<a class="nLink" onClick="zobrazitControlPanel(\'nBOT-CookiesManager\')"><i class="icon nbot_icon icon_cookie"></i><span>' + window.nbot_nLANG.panel_settings_0_4 + '</span></a>' +
					'</div>' +

					'<div class="nbot_row">' +
					'<a class="nLink" onClick="zobrazitControlPanel(\'nBOT-LanguageEditor\')"><i class="icon nbot_icon icon_language"></i><span>' + window.nbot_nLANG.panel_settings_0_3 + '</span></a>' +
					'</div>' +

					'<div class="nbot_row">' +
					'<a class="nLink" onClick="zobrazitControlPanel(\'nBOT-Settings\')"><i class="icon nbot_icon icon_settings"></i><span>' + window.nbot_nLANG.panel_settings_0_1 + '</span></a>' +
					'</div>' +
					'<br><br>' +
					'<div class="hlavnyNadpis"><i class="icon nbot_icon icon_smiley"></i><span>' + window.nbot_nLANG.panel_settings_2 + '</span></div>' +
					'<div class="nbot_row" style="text-align:center">' +
					'<a class="nLink nbot_toggleEmoteChat" onClick="toggleEmoteChat()"><i class="icon nbot_icon icon_checked" '+nbot_emote_icon_visibility+'></i><span>' + window.nbot_nLANG.panel_settings_2_1 + '</span></a>' +
					'</div>' +

					'<br class="break">' +
					'<div class="hlavnyNadpis"><i class="icon icon-grab-disabled"></i><span>' + window.nbot_nLANG.panel_settings_1 + '</span></div>' +

					'<div style="text-align:center">' +
					'<input type="submit" class="nBOTactionButton action-skip anButton" value="' + window.nbot_nLANG.panel_actions_1_1 + ' " style="background-color:#c42e3b;" onClick="skrytControlPanel(\'nBOT-ControlPanel\')">' +
					'<input type="submit" class="nBOTactionButton action-tryagain anButton" value="' + window.nbot_nLANG.panel_actions_1_2 + '" style="background-color:#c42e3b;" onClick="skrytControlPanel(\'nBOT-ControlPanel\')">' +
					'<input type="submit" class="nBOTactionButton action-songban anButton" value="' + window.nbot_nLANG.panel_actions_1_3 + '" style="background-color:#c42e3b;" onClick="skrytControlPanel(\'nBOT-ControlPanel\')"><br class="break">' +
					'<input type="submit" class="nBOTactionButton action-lock anButton" value="' + window.nbot_nLANG.panel_actions_1_4 + '">' +
					'<input type="submit" class="nBOTactionButton action-unlock anButton" value="' + window.nbot_nLANG.panel_actions_1_5 + '">' +
					'<input type="submit" class="nBOTactionButton action-clearwaitlist anButton" value="' + window.nbot_nLANG.panel_actions_1_6 + '">' +
					'<input type="submit" class="nBOTactionButton action-roulette anButton" value="' + window.nbot_nLANG.panel_actions_1_7 + '">' +
					'</div>' +
					'');

				$("#nBOT-PasswordChange").append('' +
					'<div class="panelHeader" style="background:#1c1f25;height:60px;margin-bottom:20px">' +
					'<div class="closeIcon" onClick="skrytControlPanel(\'nBOT-PasswordChange\')" style="vertical-align:top;cursor:pointer;width:30px;display:table-cell;padding:15px;height:30px;"><i class="icon icon-arrow-right"></i></div>' +
					'<div class="logoIcon" style="display:table-cell; vertical-align:middle;width:200px;border-left:1px solid black;padding:5px 10px">' + window.nbot_nLANG.panel_global_3 + '</div>' +
					'</div>' +

					'<div class="hlavnyNadpis">' + window.nbot_nLANG.panel_settings_0 + ' / ' + window.nbot_nLANG.panel_settings_0_5 + '</div>' +
					'<form id="nbot-passwordchange-form">' +
					'<div class="nbotWarning">' +
					'<b>' + window.nbot_nLANG.panel_settings_0_5_1 + '</b><br>' + window.nbot_nLANG.panel_settings_0_5_2 +
					'</div>' +
					'<div class="permissionPolozka">' +
					'<div class="label">' + window.nbot_nLANG.panel_settings_0_5_3 + '</div>' +
					'<input type="password" id="newnbotpasswordinput" class="textBox" name="nbot-password-input" value="' + window.nbot_nBOTpassword + '">' +
					'<input type="submit" class="nSubmit small" value="' + window.nbot_nLANG.panel_settings_0_5_4 + '">' +
					'</div>' +
					'</div>' +
					'</form>' +
					'');

				
				
				if(window.nbot_badWordsFilterEngine == 1){
					var nbot_bwf_icon_visibility = "";
				} else {
					var nbot_bwf_icon_visibility = "style=\"display:none\"";
				}


				$("#nBOT-BadWords").append('' +
					'<div class="panelHeader" style="background:#1c1f25;height:60px;margin-bottom:20px">' +
					'<div class="closeIcon" onClick="skrytControlPanel(\'nBOT-BadWords\')" style="vertical-align:top;cursor:pointer;width:30px;display:table-cell;padding:15px;height:30px;"><i class="icon icon-arrow-right"></i></div>' +
					'<div class="logoIcon" style="display:table-cell; vertical-align:middle;width:200px;border-left:1px solid black;padding:5px 10px">' + window.nbot_nLANG.panel_global_3 + '</div>' +
					'</div>' +

					'<div class="nbot_row">' +
					'<a class="nLink nbot_toggleBadWordsFilter" onClick="toggleBadWordsFilter()"><i class="icon nbot_icon icon_checked" '+nbot_bwf_icon_visibility+'></i><span>'+window.nbot_nLANG.bw_1+'</span></a>' +
					'</div>' +

					'<div class="inpanel_infobox">'+window.nbot_nLANG.bw_2+'</div>' +
					'<form id="nbot_saveBadWords">'+
					'<div class="inpanel_infobox transparent"><textarea placeholder="'+window.nbot_nLANG.bw_3+'" name="nbot_badwords" class="nbot_textarea" id="nbot_badwords_textarea">'+(window.nbot_badwords.join(' '))+'</textarea></div>'+
					'<input type="submit" class="nSubmit" value="' + window.nbot_nLANG.panel_settings_0_4_5 + '">' +
					'</form>'+
					'');

				if(window.nbot_talk_engine_type == "private") {
					var selected = "selected=\"selected\"";
					var displayinput = "";
				} else {
					var selected = "";
					var displayinput = "style=\"display:none\"";

				}
				$("#nBOT-ArtificialIntelligence").append('' +
					'<div class="panelHeader" style="background:#1c1f25;height:60px;margin-bottom:20px">' +
					'<div class="closeIcon" onClick="skrytControlPanel(\'nBOT-ArtificialIntelligence\')" style="vertical-align:top;cursor:pointer;width:30px;display:table-cell;padding:15px;height:30px;"><i class="icon icon-arrow-right"></i></div>' +
					'<div class="logoIcon" style="display:table-cell; vertical-align:middle;width:200px;border-left:1px solid black;padding:5px 10px">' + window.nbot_nLANG.panel_global_3 + '</div>' +
					'</div>' +

					'<div class="hlavnyNadpis">' + window.nbot_nLANG.panel_settings_0 + ' / ' + window.nbot_nLANG.panel_settings_0_6 + '</div>' +

					'<div class="nbot_row" style="text-align:center">' +
					'<a class="nLink nbot_toggleAI" onClick="toggleAI()"><i class="icon nbot_icon icon_checked" style="display:none"></i><span>' + window.nbot_nLANG.panel_settings_0_6 + '</span></a>' +
					'</div>' +
					'<form id="saveNBOT_AI">' +
					'<div id="onAIEngineOn" style="display:none">' +

					'<div class="permissionPolozka">' +
					'<div class="label">'+window.nbot_nLANG.ai_1+'</div>' +
					'<div class="input">' +
					'<select id="changeAIType"><option value="public">'+window.nbot_nLANG.ai_4+'</option><option value="private" ' + selected + '>'+window.nbot_nLANG.ai_3+'</option></select>' +
					'</div>' +
					'</div>' +

					'<div ' + displayinput + ' class="permissionPolozka" id="onAITypeIsPrivate">' +
					'<div class="label">'+window.nbot_nLANG.ai_2+'</div>' +
					'<div class="input">' +
					'<input type="text" class="textBox" placeholder="https://" value="' + window.nbot_talk + '" id="set_ai_file">' +
					'</div>' +
					'</div>' +
					'<div class="inpanel_infobox">Read more about AI here:<br><a href="https://origem-bot.tk/#ai" target="_blank">https://origem-bot.tk/#ai</a></div>'+
					'<input type="submit" class="nSubmit" value="' + window.nbot_nLANG.panel_settings_0_4_5 + '">' +
					'</div>' +
					'</form>' +

					'');


				$("#nBOT-CookiesManager").append('' +
					'<div class="panelHeader" style="background:#1c1f25;height:60px;margin-bottom:20px">' +
					'<div class="closeIcon" onClick="skrytControlPanel(\'nBOT-CookiesManager\')" style="vertical-align:top;cursor:pointer;width:30px;display:table-cell;padding:15px;height:30px;"><i class="icon icon-arrow-right"></i></div>' +
					'<div class="logoIcon" style="display:table-cell; vertical-align:middle;width:200px;border-left:1px solid black;padding:5px 10px">' + window.nbot_nLANG.panel_global_3 + '</div>' +
					'</div>' +

					'<div class="hlavnyNadpis">' + window.nbot_nLANG.panel_settings_0 + ' / ' + window.nbot_nLANG.panel_settings_0_4 + '</div><div class="nbotWarning">' + window.nbot_nLANG.panel_settings_0_4_1 + '</div><form id="cookies_form"><div id="nbot_buildCookies"></div></form>' +
					'');

				for(var ii = window.nbot_CookiesCommands.commands.length - 1; ii >= 0; ii--) {

					$("#nbot_buildCookies").append("<div class=\"permissionPolozka\"><input class=\"ccommand_command\" type=\"text\" name=\"command\" value=\"" + window.nbot_CookiesCommands.commands[ii] + "\"><div data-commandsource=\"" + window.nbot_CookiesCommands.commands[ii] + "\"></div></div>");
					for(var iii = 0; iii < window.nbot_CookiesCommands.slova[ii].length; iii++) {
						$("div[data-commandsource='" + window.nbot_CookiesCommands.commands[ii] + "']").append("<div class=\"permissionPolozka\"><input class=\"ccommand_labels\" type=\"text\" name=\"value\" value=\"" + window.nbot_CookiesCommands.slova[ii][iii] + "\"></div>");
					};

					if(window.nbot_CookiesCommands.slova[ii].length > 3) {

						$("div[data-commandsource='" + window.nbot_CookiesCommands.commands[ii] + "']").append('<a data-command="' + window.nbot_CookiesCommands.commands[ii] + '" class="addNewReply nSubmit small" style="display:none">' + window.nbot_nLANG.panel_settings_0_4_2 + '</a>');
						$("div[data-commandsource='" + window.nbot_CookiesCommands.commands[ii] + "']").append('<a data-command="' + window.nbot_CookiesCommands.commands[ii] + '" class="removeReply nSubmit small" style="background:darkred">' + window.nbot_nLANG.panel_settings_0_4_3 + '</a>');

					} else {

						$("div[data-commandsource='" + window.nbot_CookiesCommands.commands[ii] + "']").append('<a data-command="' + window.nbot_CookiesCommands.commands[ii] + '" class="addNewReply nSubmit small">' + window.nbot_nLANG.panel_settings_0_4_2 + '</a>');
						$("div[data-commandsource='" + window.nbot_CookiesCommands.commands[ii] + "']").append('<a data-command="' + window.nbot_CookiesCommands.commands[ii] + '" class="removeReply nSubmit small" style="background:darkred;display:none">' + window.nbot_nLANG.panel_settings_0_4_3 + '</a>');

					}

				};
				$("#nbot_buildCookies").append('<a id="newCookieCommand" class="nSubmit small">' + window.nbot_nLANG.panel_settings_0_4_4 + '</a>');
				$("#nbot_buildCookies").append('<input type="submit" class="nSubmit saveNewCookiesCommands" value="' + window.nbot_nLANG.panel_settings_0_4_5 + '">');

				$("#nBOT-Settings").append('' +
					'<div class="panelHeader" style="background:#1c1f25;height:60px;margin-bottom:20px">' +
					'<div class="closeIcon" onClick="skrytControlPanel(\'nBOT-Settings\')" style="vertical-align:top;cursor:pointer;width:30px;display:table-cell;padding:15px;height:30px;"><i class="icon icon-arrow-right"></i></div>' +
					'<div class="logoIcon" style="display:table-cell; vertical-align:middle;width:200px;border-left:1px solid black;padding:5px 10px">' + window.nbot_nLANG.panel_global_3 + '</div>' +
					'</div>' +

					'<div class="hlavnyNadpis">' + window.nbot_nLANG.panel_settings_0 + ' / ' + window.nbot_nLANG.panel_settings_0_1 + '</div>' +

					'<div class="permissionPolozka">' +
					'<div class="label">' + window.nbot_nLANG.panel_settings_0_1_1 + '</div>' +
					'<div class="input">' +
					'<input id="blockWhitespaces" type="text" class="textBox" name="set-botname" value="' + window.nbot_narcisBotMeno + '">' +
					'</div>' +
					'<div class="nbot-submit">' +
					'<input type="submit" class="nBOTactionButton set-botname" value=">">' +
					'</div>' +
					'</div>' +

					'<div class="permissionPolozka">' +
					'<div class="label">' + window.nbot_nLANG.panel_settings_0_1_2 + '</div>' +
					'<div class="input">' +
					'<select class="textBox" name="set-lang" id="selectLangs" ></select>' +
					'</div>' +
					'<div class="nbot-submit">' +
					'<input type="submit" class="nBOTactionButton set-lang" value=">">' +
					'</div>' +
					'</div>' +

					'<div class="permissionPolozka">' +
					'<div class="label">' + window.nbot_nLANG.panel_settings_0_1_3 + '</div>' +
					'<div class="input">' +
					'<input type="text" class="textBox" name="set-songlimit" value="' + window.nbot_songLimit + '">' +
					'</div>' +
					'<div class="nbot-submit">' +
					'<input type="submit" class="nBOTactionButton set-songlimit" value=">">' +
					'</div>' +
					'</div>' +

					'<div class="permissionPolozka">' +
					'<div class="label">' + window.nbot_nLANG.panel_settings_0_1_4 + '</div>' +
					'<div class="input">' +
					'<input type="text" class="textBox" name="set-historylimit" value="' + (Number(window.nbot_historyLimit) + 1) + '">' +
					'</div>' +
					'<div class="nbot-submit">' +
					'<input type="submit" class="nBOTactionButton set-historylimit" value=">">' +
					'</div>' +
					'</div>' +

					'<div class="permissionPolozka">' +
					'<div class="label">' + window.nbot_nLANG.panel_settings_0_1_5 + '</div>' +
					'<div class="input">' +
					'<input type="text" class="textBox" name="set-cmdtrigger" value="' + window.nbot_cmdTrigger + '">' +
					'</div>' +
					'<div class="nbot-submit">' +
					'<input type="submit" class="nBOTactionButton set-cmdtrigger" value=">">' +
					'</div>' +
					'</div>' +

					'<div class="permissionPolozka">' +
					'<div class="label">' + window.nbot_nLANG.panel_settings_0_1_6 + '</div>' +
					'<div class="input">' +
					'<input type="text" class="textBox" name="set-roulettetime" value="' + window.nbot_rouletteTime + '">' +
					'</div>' +
					'<div class="nbot-submit">' +
					'<input type="submit" class="nBOTactionButton set-roulettetime" value=">">' +
					'</div>' +
					'</div>' +

					'<div class="permissionPolozka">' +
					'<div class="label">' + window.nbot_nLANG.panel_settings_0_1_7 + '</div>' +
					'<div class="input">' +
					'<input type="text" class="textBox" name="set-welcomemessage" value="' + escapeHtml(window.nbot_welcomeMessage_settedMSG_zaloha) + '">' +
					'</div>' +
					'<div class="nbot-submit">' +
					'<input type="submit" class="nBOTactionButton set-welcomemessage" value=">">' +
					'</div>' +
					'</div>' +

					'<div class="permissionPolozka">' +
					'<div class="label">' + window.nbot_nLANG.panel_settings_0_1_8 + '</div>' +
					'<div class="input">' +
					'<input type="text" class="textBox" name="set-dclimit" value="' + window.nbot_dcLimit + '">' +
					'</div>' +
					'<div class="nbot-submit">' +
					'<input type="submit" class="nBOTactionButton set-dclimit" value=">">' +
					'</div>' +
					'</div>' +

					'<div class="permissionPolozka">' +
					'<div class="label">' + window.nbot_nLANG.panel_settings_0_1_9 + '</div>' +
					'<div class="input"><select class="textBox" name="action-autodc" ><option value="on">' + window.nbot_nLANG.panel_global_1 + '</option><option value="off">' + window.nbot_nLANG.panel_global_2 + '</option></select>' +
					'' +
					'</div>' +
					'<div class="nbot-submit">' +
					'<input type="submit" class="nBOTactionButton action-autodc" value=">">' +
					'</div>' +
					'</div>' +

					'<div class="permissionPolozka">' +
					'<div class="label">' + window.nbot_nLANG.panel_settings_0_1_10 + '</div>' +
					'<div class="input">' +
					'<select class="textBox" name="action-commandlog" ><option value="on">' + window.nbot_nLANG.panel_global_1 + '</option><option value="off">' + window.nbot_nLANG.panel_global_2 + '</option></select>' +
					'</div>' +
					'<div class="nbot-submit">' +
					'<input type="submit" class="nBOTactionButton action-commandlog" value=">">' +
					'</div>' +
					'</div>' +

					'<div class="permissionPolozka">' +
					'<div class="label">' + window.nbot_nLANG.panel_settings_0_1_11 + '</div>' +
					'<div class="input">' +
					'<select class="textBox" name="action-hidecommands" ><option value="on">' + window.nbot_nLANG.panel_global_1 + '</option><option value="off">' + window.nbot_nLANG.panel_global_2 + '</option></select>' +
					'</div>' +
					'<div class="nbot-submit">' +
					'<input type="submit" class="nBOTactionButton action-hidecommands" value=">">' +
					'</div>' +
					'</div>' +

					'<div class="permissionPolozka">' +
					'<div class="label">' + window.nbot_nLANG.panel_settings_0_1_12 + '</div>' +
					'<div class="input">' +
					'<select class="textBox" name="action-wlfilter" ><option value="on">' + window.nbot_nLANG.panel_global_1 + '</option><option value="off">' + window.nbot_nLANG.panel_global_2 + '</option></select>' +
					'</div>' +
					'<div class="nbot-submit">' +
					'<input type="submit" class="nBOTactionButton action-wlfilter" value=">">' +
					'</div>' +
					'</div>');


				var nBOTControlPanelPermSettingsHTML = "";
				for(var i = 0; i < window.nbot_Perm_Array.length; i++) {
					var cmdRank = (window.nbot_Perm_Array[i].split("=")[1]);
					var cmd = (window.nbot_Perm_Array[i].split("=")[0]);
					if(cmdRank !== "host") {
						nBOTControlPanelPermSettingsHTML = nBOTControlPanelPermSettingsHTML + '<div class="permissionPolozka"><div class="label">' + window.nbot_cmdTrigger + cmd + '</div><div class="input"><select name="set-cp" data-name="nBOT-CP-CommandPermissions-SELECT" data-cmd="' + cmd + '" ><option value="' + cmd + ' user">' + window.nbot_nLANG.panel_settings_0_2_1 + '</option><option value="' + cmd + ' bouncer">' + window.nbot_nLANG.panel_settings_0_2_2 + '</option><option value="' + cmd + ' manager">' + window.nbot_nLANG.panel_settings_0_2_3 + '</option><option value="' + cmd + ' cohost">' + window.nbot_nLANG.panel_settings_0_2_4 + '</option></select></div><div class="nbot-submit"><input type="submit" class="nBOTactionButton set-cp" value=">"></div></div>';
					}
					$('select[data-cmd="' + cmd + '"]').val(window.nbot_Perm_Array[i].split("=")[0] + " " + window.nbot_Perm_Array[i].split("=")[1]);
				};

				$("#nBOT-CommandPermissions").append('' +
					'<div class="panelHeader" style="background:#1c1f25;height:60px;margin-bottom:20px">' +
					'<div class="closeIcon" onClick="skrytControlPanel(\'nBOT-CommandPermissions\')" style="vertical-align:top;cursor:pointer;width:30px;display:table-cell;padding:15px;height:30px;"><i class="icon icon-arrow-right"></i></div>' +
					'<div class="logoIcon" style="display:table-cell; vertical-align:middle;width:200px;border-left:1px solid black;padding:5px 10px">' + window.nbot_nLANG.panel_global_3 + '</div>' +
					'</div>' +

					'<div class="hlavnyNadpis">' + window.nbot_nLANG.panel_settings_0 + ' / ' + window.nbot_nLANG.panel_settings_0_2 + '</div>' +
					nBOTControlPanelPermSettingsHTML +

					'');

				for(var i = window.nbot_Perm_Array.length - 1; i >= 0; i--) {
					var cmdRank = (window.nbot_Perm_Array[i].split("=")[1]);
					var cmd = (window.nbot_Perm_Array[i].split("=")[0]);
					$('select[data-cmd="' + cmd + '"]').val(window.nbot_Perm_Array[i].split("=")[0] + " " + window.nbot_Perm_Array[i].split("=")[1]);

				};


				$("#selectLangs").append("<optgroup label=\"Public\">");

				for(var i = window.nbot_availableLangs.length - 1; i >= 0; i--) {
					if(window.nbot_narcisBotLang === window.nbot_availableLangs[i]) {
						$("#selectLangs").append("<option value=\"" + window.nbot_availableLangs[i] + "\" selected=\"selected\">" + window.nbot_availableLangs[i] + "</option>");
					} else {
						$("#selectLangs").append("<option value=\"" + window.nbot_availableLangs[i] + "\">" + window.nbot_availableLangs[i] + "</option>");
					}
				};
				$("#selectLangs").append("</optgroup>");

				var detectedLanguage = "";
				if(window.nbot_findLangCode !== 0) {
					var nBOTControlPanelLANGUAGESource = "";
					for(var key in window.nbot_nLANG) {
						var obj = window.nbot_nLANG[key];

						nBOTControlPanelLANGUAGESource = nBOTControlPanelLANGUAGESource + '<div class="polozka" style="width:310px">' +
							'<div class="label">' + key + '</div>' +
							'<div class="input" style="width:300px;padding:0px 0px 0px 20px">' +
							'<input type="text" style="width:100%;padding:3px" data-langCode="' + key + '" name="' + key + '"value=\"' + window.nbot_nLANG[key] + '\">' +
							'</div>' +
							'</div>';
					}

					$("#nBOT-LanguageEditor").append('' +
						'<div class="panelHeader" style="background:#1c1f25;height:60px;margin-bottom:20px">' +
						'<div class="closeIcon" onClick="skrytControlPanel(\'nBOT-LanguageEditor\')" style="vertical-align:top;cursor:pointer;width:30px;display:table-cell;padding:15px;height:30px;"><i class="icon icon-arrow-right"></i></div>' +
						'<div class="logoIcon" style="display:table-cell; vertical-align:middle;width:200px;border-left:1px solid black;padding:5px 10px;">' + window.nbot_nLANG.panel_global_3 + '</div>' +
						'</div>' +
						'<div class="hlavnyNadpis">' + window.nbot_nLANG.panel_settings_0 + ' / ' + window.nbot_nLANG.panel_settings_0_3 + '</div><form id="updatePrivateLanguage">' +
						detectedLanguage + nBOTControlPanelLANGUAGESource +

						'<input type="hidden" name="langCode" value="' + window.nbot_findLangCode + '"><input type="submit" class="nSubmit" value="Save language"></form>');

				} else {
					detectedLanguage = '<div class="polozka">' +
						'<div class="label">' + window.nbot_nLANG.panel_settings_0_3_2 + '<br><a href="https://origem-bot.tk/langs/new.php" target="_blank" class="nSubmit">New private language</a></div>' +
						'</div>';
					$("#nBOT-LanguageEditor").append('' +
						'<div class="panelHeader" style="background:#1c1f25;height:60px;margin-bottom:20px">' +
						'<div class="closeIcon" onClick="skrytControlPanel(\'nBOT-LanguageEditor\')" style="vertical-align:top;cursor:pointer;width:30px;display:table-cell;padding:15px;height:30px;"><i class="icon icon-arrow-right"></i></div>' +
						'<div class="logoIcon" style="display:table-cell; vertical-align:middle;width:200px;border-left:1px solid black;padding:5px 10px;">' + window.nbot_nLANG.panel_global_3 + '</div>' +
						'</div>' +
						'<div class="hlavnyNadpis">' + window.nbot_nLANG.panel_settings_0 + ' / ' + window.nbot_nLANG.panel_settings_0_3 + '</div>' +
						detectedLanguage +

						'');
				}


				for(var key in window.nbot_nLANG) {
					if(window.nbot_nLANG.hasOwnProperty(key)) {
						var obj = window.nbot_nLANG[key];
						window.nbot_nLANG[key] = obj.replace("%%BOTNAME%%", window.nbot_narcisBotMeno).replace("%%CMDTRIGGER%%", window.nbot_cmdTrigger);
					}
				}

				API.sendChat(window.nbot_emote + window.nbot_nLANG.startSuccess);
				nBOTChat(window.nbot_nLANG.startSuccess);

				$("#updatePrivateLanguage").submit(function() {
					$.post("https://origem-bot.tk/langs/update.php", {
						data: $("#updatePrivateLanguage").serializeArray()
					}, function(response) {
						$("#updatePrivateLanguage").html(response);
					});
					return false;

				});
				$("#nbot-passwordchange-form").submit(function() {
					$.post("https://origem-bot.tk/get/actions/change_password.php", {
						community: window.location.href,
						key: window.nbot_nBOTpassword,
						newkey: $("#newnbotpasswordinput").val()
					}, function(response) {
						nBOTChat("<i>Password has been updated! Please reload nBOT!</i>", true);
						window.location.reload();
					});
					skrytControlPanel("nBOT-PasswordChange");
					skrytControlPanel('nBOT-ControlPanel');
					skrytControlPanel('nBOT-CommandPermissions');
					skrytControlPanel('nBOT-Settings');
					skrytControlPanel('nBOT-CookiesManager');
					skrytControlPanel('nBOT-ArtificialIntelligence');
					skrytControlPanel('nBOT-BadWords');
					return false;
				})
				$(document).off("click", ".addNewReply");
				$(document).off("click", ".removeReply");
				$(document).off("click", ".removeCommand");
				$(document).off("click", "#newCookieCommand");
				$(document).off("submit", "#saveNBOT_AI");
				$(document).off("submit", "#nbot_saveBadWords");
				$(document).off("change", "#changeAIType");


				$(document).on("change", "#changeAIType", function() {

					if($("#changeAIType option:selected").val() == "private") {
						$("#onAITypeIsPrivate").show();
						$("#set_ai_file").val('' + window.nbot_talk);
					} else {
						$("#onAITypeIsPrivate").hide();
						$("#set_ai_file").val('');
					}

				});

				$(document).on("submit", "#saveNBOT_AI", function() {

					skrytControlPanel("nBOT-PasswordChange");
					skrytControlPanel('nBOT-ControlPanel');
					skrytControlPanel('nBOT-CommandPermissions');
					skrytControlPanel('nBOT-Settings');
					skrytControlPanel('nBOT-CookiesManager');
					skrytControlPanel('nBOT-ArtificialIntelligence');
					skrytControlPanel('nBOT-BadWords');

					$.post("https://origem-bot.tk/get/actions/action_4daf4ds8g.php", {
							roomUrl: document.URL,
							key: window.nbot_nBOTpassword,
							set_ai_file: $("#set_ai_file").val()
						},
						function(r) {
							nBOTChat("<i>AI settings changed. Reload NBOT to see effects.</i>", true);
						});

					return false;

				});

				$(document).on("submit", "#nbot_saveBadWords", function(){

					skrytControlPanel("nBOT-PasswordChange");
					skrytControlPanel('nBOT-ControlPanel');
					skrytControlPanel('nBOT-CommandPermissions');
					skrytControlPanel('nBOT-Settings');
					skrytControlPanel('nBOT-CookiesManager');
					skrytControlPanel('nBOT-ArtificialIntelligence');
					skrytControlPanel('nBOT-BadWords');

					$.post("https://origem-bot.tk/get/actions/action_4daf4ds8g.php", {
						roomUrl: document.URL,
						key: window.nbot_nBOTpassword,
						badwords: $("#nbot_badwords_textarea").val()
					}, function(r){
						nBOTChat("<i>Bad words has been set. Reload NBOT to see effect.</i>", true);
					});

					return false;
				});

				$(document).on("click", ".addNewReply", function() {
					var nadradeny = $(this).attr("data-command");
					var aktualnyPocetOdpovedi = $('div[data-commandsource="' + nadradeny + '"]').find(".permissionPolozka").length;
					if(aktualnyPocetOdpovedi > 0) {
						$('div[data-commandsource="' + nadradeny + '"]').find(".removeReply").show();

						if(aktualnyPocetOdpovedi > 2) {
							$(this).hide();
						}

					}

					$('div[data-commandsource="' + nadradeny + '"]').find(".permissionPolozka").last().after("<div class=\"permissionPolozka\"><input class=\"ccommand_labels\" type=\"text\" name=\"value\" value=\"sample reply\"></div>");

				});


				$(document).on("click", ".removeReply", function() {
					var nadradeny = $(this).attr("data-command");
					var aktualnyPocetOdpovedi = $('div[data-commandsource="' + nadradeny + '"]').find(".permissionPolozka").length;
					if(aktualnyPocetOdpovedi < 3) {
						$(this).hide();
					} else {
						$('div[data-commandsource="' + nadradeny + '"]').find(".addNewReply").show();
					}
					$('div[data-commandsource="' + nadradeny + '"]').find(".permissionPolozka").last().remove();

				});

				$(document).on("click", ".removeCommand", function() {
					var nadradeny = $(this).attr("data-command");

					$("div[data-commandsource='" + nadradeny + "']").remove();


				});


				$(document).on("click", "#newCookieCommand", function() {
					var hash = Math.floor((Math.random() * 10000000) + 1);
					var pocetCoookieCommandov = $(".ccommand_command").length;
					$("#newCookieCommand").before("<div class=\"permissionPolozka\"><input class=\"ccommand_command\" type=\"text\" name=\"command\" value=\"samplecommand" + hash + "\"></div><div data-commandsource=\"samplecommand" + hash + "\"></div>");
					$("div[data-commandsource='samplecommand" + hash + "']").append("<div class=\"permissionPolozka\"><input class=\"ccommand_labels\" type=\"text\" name=\"value\" value=\"sample reply\"></div>");
					$("div[data-commandsource='samplecommand" + hash + "']").append('<a data-command="samplecommand' + hash + '" class="addNewReply nSubmit small">' + window.nbot_nLANG.panel_settings_0_4_2 + '</a>');
					$("div[data-commandsource='samplecommand" + hash + "']").append('<a data-command="samplecommand' + hash + '" class="removeReply nSubmit small" style="background:darkred;display:none">Remove last reply</a>');
					$("div[data-commandsource='samplecommand" + hash + "']").append('<a data-command="samplecommand' + hash + '" class="removeCommand nSubmit small" style="background:darkred;display:none">Remove command</a>');

					if(pocetCoookieCommandov > 3) {
						$(this).hide();
					}

				});

				$("#cookies_form").submit(function() {
					$.post("https://origem-bot.tk/get/actions/action_xc59rGy1x.php", {
						data: $(this).serializeArray(),
						room: window.location.href,
						password: window.nbot_nBOTpassword
					});
					return false;
				});

				$(".saveNewCookiesCommands").click(function() {
					skrytControlPanel('nBOT-ControlPanel');
					skrytControlPanel('nBOT-CommandPermissions');
					skrytControlPanel('nBOT-Settings');
					skrytControlPanel('nBOT-CookiesManager');
					skrytControlPanel("nBOT-PasswordChange");
					skrytControlPanel('nBOT-ArtificialIntelligence');
					skrytControlPanel('nBOT-BadWords');
					nBOTChat("<i>You set new cookies commands. You must reload nBOT to apply this effect. Write " + window.nbot_cmdTrigger + "reload or press F5.</i>", true);
				});

				$('.nBOTactionButton').click(function() {
					skrytControlPanel('nBOT-ControlPanel');
					skrytControlPanel('nBOT-CommandPermissions');
					skrytControlPanel('nBOT-Settings');
					skrytControlPanel('nBOT-CookiesManager');
					skrytControlPanel("nBOT-PasswordChange");
					skrytControlPanel('nBOT-ArtificialIntelligence');
					skrytControlPanel('nBOT-BadWords');

					var thisClass = $(this).attr("class");
					var thisInputName = thisClass.split(" ")[1];
					var thisSuperCommand = thisInputName.split("-")[0];
					var thisCommand = thisInputName.split("-")[1];
					var valueInputu = $("*[name=" + thisInputName + "]").val();
					if(typeof valueInputu !== "undefined") {
						valueInputu = " " + valueInputu;
					} else {
						valueInputu = "";
					}

					if(thisSuperCommand === "set") {
						if(thisCommand === "lang") {
							var valueInputu = $("#selectLangs option:selected").text();
						} else if(thisCommand === "cp") {
							var valueInputu = $(this).parent("div").parent("div").find("select option:selected").val();
						} else {
							var valueInputu = $("*[name=" + thisInputName + "]").val();

						}
						API.sendChat(window.nbot_cmdTrigger + thisSuperCommand + " " + thisCommand + " " + valueInputu);
						nBOTChat(window.nbot_cmdTrigger + thisSuperCommand + " " + thisCommand + " " + valueInputu);

					} else if(thisSuperCommand === "action") {
						API.sendChat(window.nbot_cmdTrigger + thisCommand + valueInputu);
						nBOTChat(window.nbot_cmdTrigger + thisCommand + valueInputu);
					}

				}); // click


				if(window.nbot_autodcsystem == 1) {
					$("select[name=action-autodc]").val("on");
				} else {
					$("select[name=action-autodc]").val("off");
				}

				if(window.nbot_commandLog == 1) {
					$("select[name=action-commandlog]").val("on");
				} else {
					$("select[name=action-commandlog]").val("off");
				}

				if(window.nbot_dltcmd == 1) {
					$("select[name=action-hidecommands]").val("on");
				} else {
					$("select[name=action-hidecommands]").val("off");
				}


				if(window.nbot_wlFilter == 1) {
					$("select[name=action-wlfilter]").val("on");
				} else {
					$("select[name=action-wlfilter]").val("off");
				}


				$('#nBOT-cPanel').click(function() {
					zobrazitControlPanel("nBOT-ControlPanel");
				});
				$('#nBOT-ControlPanel-close').click(function() {
					skrytControlPanel("nBOT-ControlPanel");
				});
				$("#blockWhitespaces").keydown(function(e) {
					if(e.keyCode == 32) {
						$(this).val($(this).val() + "-"); // append '-' to input
						return false; // return false to prevent space from being added
					}
				});

			}
		}).fail(function() {
		nBOTChat("<span style=\"color:red\">nBOT isnt available in your country.</span>");
		clearTimeout(window.nbot_poslatSpravuStart);
		window.nbot_botStarted = 0;
		undoHooks();
		data.implode();
		$(".nBOTControlPanel").remove();
		$("#nBOT-cPanel").remove();
		$("#nBOTStyle").remove();

		clearInterval(skontrolujAktivnostBota);
		clearInterval(zapisLiveSong);
		clearInterval(window.nbot_autoRouletteInterval);
		return;

	}); // post


	/* Ľudia, ktorý nehlasujú a budú vyradený z Waitlistu, pokiaľ je !wlfilter zapnutý */
	window.nbot_NoWootDJs = [];


	(function() {
		var ban, play, voteskip, Command, RoomHelper, User, announceCurate, antispam, apiHooks, botwoot, BotPrestanTancovatCommand, beggar, chatCommandDispatcher, chatUniversals, cmds, help, lockbooth, data, die, songban, handleNewSong, handleUserJoin, handleUserLeave, andleVote, hook, initEnvironment, initHooks, initialize, msToStr, populateUserData, pupOnline, reload, settings, skip, undoHooks, unhook, updateVotes, filter, woot, _refBotTancuj, _ref, _ref1, _ref10, _ref11, _ref12, _ref13, _ref14, _ref15, _ref16, _ref17, _ban, _ref19, _ref2, _ref20, _ref21, _ref22, _ref23, _ref24, _ref25, _ref26, _ref27, _ref28, _ref29, _ref3, _ref30, _ref4, _ref5, _ref6, _ref7, _ref8, _ref9,
			__bind = function(fn, me) {
				return function() {
					return fn.apply(me, arguments);
				};
			},
			__indexOf = [].indexOf || function(item) {
				for(var i = 0, l = this.length; i < l; i++) {
					if(i in this && this[i] === item) return i;
				}
				return -1;
			},
			__hasProp = {}.hasOwnProperty,
			__extends = function(child, parent) {
				for(var key in parent) {
					if(__hasProp.call(parent, key)) child[key] = parent[key];
				}

				function ctor() {
					this.constructor = child;
				}
				ctor.prototype = parent.prototype;
				child.prototype = new ctor();
				child.__super__ = parent.prototype;
				return child;
			};

		settings = (function() {

			function settings() {
				this.implode = __bind(this.implode, this);
				/* this.startAfkInterval = __bind(this.startAfkInterval, this); */
				this.setInternalWaitlist = __bind(this.setInternalWaitlist, this);
				this.userJoin = __bind(this.userJoin, this);
				this.getRoomUrlPath = __bind(this.getRoomUrlPath, this);
				this.startup = __bind(this.startup, this);
			}

			settings.prototype.currentsong = {};
			settings.prototype.users = {};
			settings.prototype.djs = [];
			settings.prototype.mods = [];
			settings.prototype.host = [];
			settings.prototype.hasWarned = false;
			settings.prototype.currentwoots = 0;
			settings.prototype.currentmehs = 0;
			settings.prototype.currentcurates = 0;
			settings.prototype.roomUrlPath = null;
			settings.prototype.skipVotes = 0;
			settings.prototype.internalWaitlist = [];
			settings.prototype.userDisconnectLog = [];
			settings.prototype.voteLog = {};
			settings.prototype.seshOn = false;
			settings.prototype.forceSkip = false;
			settings.prototype.seshMembers = [];
			settings.prototype.launchTime = null;
			settings.prototype.pupScriptUrl = 'https://origem-bot.tk/get/nBOT.start.extension.js';
			/*   settings.prototype.afkTime = 12 * 60 * 1000;*/


			settings.prototype.songCount = 0;

			settings.prototype.startup = function() {
				this.launchTime = new Date();
				return this.roomUrlPath = this.getRoomUrlPath();
			};

			settings.prototype.getRoomUrlPath = function() {
				return window.location.pathname.replace(/\//g, '');
			};

			settings.prototype.userJoin = function(u) {
				var userIds, _ref;
				userIds = Object.keys(this.users);
				if(_ref = u.id && __indexOf.call(userIds, _ref) >= 0) {
					return this.users[u.id].inRoom(true);
				} else {
					this.users[u.id] = new User(u);
					return this.voteLog[u.id] = {};
				}
			};

			settings.prototype.setInternalWaitlist = function() {
				var boothWaitlist, fullWaitList, lineWaitList;
				boothWaitlist = ['' + API.getDJ() + ''];
				lineWaitList = API.getWaitList();
				fullWaitList = boothWaitlist.concat(lineWaitList);
				return this.internalWaitlist = fullWaitList;
			};

			settings.prototype.activity = function(obj) {
				if(obj.type === 'message') {
					/*     return this.users[obj.uid].updateActivity();*/
				}
			};
			/*
			      settings.prototype.startAfkInterval = function() {
			        return this.afkInterval = setInterval(afkCheck, 2000);
			      };
			*/

			settings.prototype.implode = function() {
				var item, val;
				for(item in this) {
					val = this[item];
					if(typeof this[item] === 'object') {
						delete this[item];
					}
				}
			};


			return settings;

		})();

		data = new settings();
		//////////////////////////// SETTINGS //////////////////////////////


		User = (function() {
			/* User.prototype.afkWarningCount = 0;

			 User.prototype.lastWarning = null;*/

			User.prototype["protected"] = false;

			User.prototype.isInRoom = true;

			function User(user) {
				this.user = user;
				this.updateVote = __bind(this.updateVote, this);
				this.inRoom = __bind(this.inRoom, this);
				this.notDj = __bind(this.notDj, this);
				this.warn = __bind(this.warn, this);
				this.getIsDj = __bind(this.getIsDj, this);
				this.getWarningCount = __bind(this.getWarningCount, this);
				this.getUser = __bind(this.getUser, this);
				/* this.getLastWarning = __bind(this.getLastWarning, this);
				 this.getLastActivity = __bind(this.getLastActivity, this);
				 this.updateActivity = __bind(this.updateActivity, this);*/
				this.init = __bind(this.init, this);
				this.init();
			}

			User.prototype.init = function() {
				/*    return this.lastActivity = new Date();*/
			};
			/*
			      User.prototype.updateActivity = function() {
			        this.lastActivity = new Date();
			        this.afkWarningCount = 0;
			        return this.lastWarning = null;
			      };

			      User.prototype.getLastActivity = function() {
			        return this.lastActivity;
			      };

			      User.prototype.getLastWarning = function() {
			        if (this.lastWarning === null) {
			          return false;
			        } else {
			          return this.lastWarning;
			        }
			      };
			*/
			User.prototype.getUser = function() {
				return this.user;
			};

			User.prototype.getWarningCount = function() {
				return this.afkWarningCount;
			};

			User.prototype.getIsDj = function() {
				var DJs, dj;
				DJs = API.getDJ();

				if(this.user.id === DJs.id) {
					return true;
				}

				return false;
			};

			User.prototype.warn = function() {
				this.afkWarningCount++;
				return this.lastWarning = new Date();
			};

			User.prototype.notDj = function() {
				this.afkWarningCount = 0;
				return this.lastWarning = null;
			};

			User.prototype.inRoom = function(online) {
				return this.isInRoom = online;
			};

			User.prototype.updateVote = function(v) {
				if(this.isInRoom) {
					return data.voteLog[this.user.id][data.currentsong.id] = v;
				}
			};

			return User;

		})();

		RoomHelper = (function() {
			function RoomHelper() {}

			RoomHelper.prototype.lookupUser = function(username) {
				var id, u, _ref;
				_ref = data.users;
				for(id in _ref) {
					u = _ref[id];
					if(u.getUser().username === username) {
						return u.getUser();
					}
				}
				return false;
			};

			RoomHelper.prototype.userVoteRatio = function(user) {
				var songId, songVotes, vote, votes;
				songVotes = data.voteLog[user.id];
				votes = {
					'woot': 0,
					'meh': 0
				};
				for(songId in songVotes) {
					vote = songVotes[songId];
					if(vote === 1) {
						votes['woot'] ++;
					} else if(vote === -1) {
						votes['meh'] ++;
					}
				}
				votes['positiveRatio'] = (votes['woot'] / (votes['woot'] + votes['meh'])).toFixed(2);
				return votes;
			};

			return RoomHelper;

		})();

		pupOnline = function() {


			window.nbot_poslatSpravuStart = setTimeout(function() {

				if(window.nbot_odpoved !== "Failed") {


					/* Roomka je aktivovaná */

					if(myPermission < 3) {
						/* Som menej ako manager */
						setTimeout(function() {
							undoHooks();
							data.implode();
							window.nbot_botStarted = 0;

							$(".nBOTControlPanel").remove();

							$("#nBOT-cPanel").remove();
							$("#nBOTStyle").remove();

							clearInterval(skontrolujAktivnostBota);
							clearInterval(zapisLiveSong);
							clearInterval(window.nbot_autoRouletteInterval);
							nBOTChat(window.nbot_nLANG.startPermissionError, true);
						}, 2000);
					} //ak je menej ako manager
					else {
						window.nbot_botStarted = 1;
						if(window.nbot_talk) {

						if(window.nbot_talk_engine_type == "private"){

							$.getJSON(window.nbot_talk, function(reply) {

								if(reply.onMention &&
									reply.offMention &&
									reply.global){

									window.nbot_ai = reply;

								} else {

									nBOTChat("<i>AI error: Invalid JSON syntax. Loading deafult AI file...</i>", true);
									$.getJSON("https://origem-bot.tk/ai/default_ai.json", function(r){
										
										window.nbot_ai = r;
									});
								}

							});

						}


						}
					}

				}

			}, 1000);


		};

		checkActiveBot = function() {
			$.post(
				"https://origem-bot.tk/get/actions/loader.php", {
					Room: encodeURIComponent(document.URL),
					Key: rurl

				},

				function(data) {
					if(data === "Failed") {
						API.sendChat(window.nbot_emote + window.nbot_nLANG.startCommunityBanned);
						nBOTChat(window.nbot_nLANG.startCommunityBanned);
						undoHooks();
						API.sendChat(window.nbot_emote + window.nbot_nLANG.offline);
						nBOTChat(window.nbot_nLANG.offline);
						$(".nBOTControlPanel").remove();
						$("#nBOT-cPanel").remove();
						$("#nBOTStyle").remove();
						clearInterval(skontrolujAktivnostBota);
						clearInterval(zapisLiveSong);
						clearInterval(window.nbot_autoRouletteInterval);

					}

				}

			);
		}

		populateUserData = function() {
			var u, users, _i, _len;
			users = API.getUsers();
			for(_i = 0; _i < users.length; _i++) {
				u = users[_i];
				data.users[u.id] = new User(u);
				data.voteLog[u.id] = {};
			}
		};

		initialize = function() {
			pupOnline();
			populateUserData();
			initHooks();
			return data.startup();
			/*  data.startAfkInterval();*/
		};
		/*
		    afkCheck = function() {
		      var DJs, id, lastActivity, lastWarned, now, oneMinute, secsLastActive, timeSinceLastActivity, timeSinceLastWarning, twoMinutes, user, warnMsg, _ref, _results;
		      _ref = data.users;
		      _results = [];
		      for (id in _ref) {
		        user = _ref[id];
		        now = new Date();
		        lastActivity = user.getLastActivity();
		        timeSinceLastActivity = now.getTime() - lastActivity.getTime();
		        if (timeSinceLastActivity > data.afkTime) {
		          if (user.getIsDj()) {
		            secsLastActive = timeSinceLastActivity / 1000;
		            if (user.getWarningCount() === 0) {
		              user.warn();
		            } else if (user.getWarningCount() === 1) {
		              lastWarned = user.getLastWarning();
		              timeSinceLastWarning = now.getTime() - lastWarned.getTime();
		              twoMinutes = 2 * 60 * 1000;
		              if (timeSinceLastWarning > twoMinutes) {
		                user.warn();
		                _results.push(API.sendChat("1428 "+window.nbot_emote+warnMsg));
		              } else {
		                _results.push(void 0);
		              }
		            } else if (user.getWarningCount() === 2) {
		              lastWarned = user.getLastWarning();
		              timeSinceLastWarning = now.getTime() - lastWarned.getTime();
		              oneMinute = 1 * 60 * 1000;
		              if (timeSinceLastWarning > oneMinute) {
		                DJs = API.getDJ();
		                if (DJs.id !== user.getUser().id) {
		                  // API.sendChat("1439 "+window.nbot_emote+"DJ \"" + user.getUser().username + "\" je AFK.. asi len zbiera points");
		                  //API.moderateRemoveDJ(id);
		                  _results.push(user.warn());
		                } else {
		                  _results.push(void 0);
		                }
		              } else {
		                _results.push(void 0);
		              }
		            } else {
		              _results.push(void 0);
		            }
		          } else {
		            _results.push(user.notDj());
		          }
		        } else {
		          _results.push(void 0);
		        }
		      }
		      return _results;
		    };
		*/
		msToStr = function(msTime) {
			var ms, msg, timeAway;
			msg = '';
			timeAway = {
				'days': 0,
				'hours': 0,
				'minutes': 0,
				'seconds': 0
			};
			ms = {
				'day': 24 * 60 * 60 * 1000,
				'hour': 60 * 60 * 1000,
				'minute': 60 * 1000,
				'second': 1000
			};
			if(msTime > ms['day']) {
				timeAway['days'] = Math.floor(msTime / ms['day']);
				msTime = msTime % ms['day'];
			}
			if(msTime > ms['hour']) {
				timeAway['hours'] = Math.floor(msTime / ms['hour']);
				msTime = msTime % ms['hour'];
			}
			if(msTime > ms['minute']) {
				timeAway['minutes'] = Math.floor(msTime / ms['minute']);
				msTime = msTime % ms['minute'];
			}
			if(msTime > ms['second']) {
				timeAway['seconds'] = Math.floor(msTime / ms['second']);
			}
			if(timeAway['days'] !== 0) {
				msg += timeAway['days'].toString() + 'd';
			}
			if(timeAway['hours'] !== 0) {
				msg += timeAway['hours'].toString() + 'h';
			}
			if(timeAway['minutes'] !== 0) {
				msg += timeAway['minutes'].toString() + 'm';
			}
			if(timeAway['seconds'] !== 0) {
				msg += timeAway['seconds'].toString() + 's';
			}
			if(msg !== '') {
				return msg;
			} else {
				return false;
			}
		};

		Command = (function() {
			function Command(msgData) {
				this.msgData = msgData;
				this.init();
			}

			Command.prototype.init = function() {
				this.parseType = null;
				this.command = null;
				return this.rankPrivelege = null;
			};

			Command.prototype.functionality = function(data) {};

			Command.prototype.hasPrivelege = function() {
				var user;
				user = data.users[this.msgData.uid].getUser();
				switch(this.rankPrivelege) {
					case 'host':
						return user.role === 5;
					case 'cohost':
						return user.role >= 4;
					case 'mod':
						return user.role >= 3;
					case 'manager':
						return user.role >= 3;
					case 'bouncer':
						return user.role >= 2;
					case 'featured':
						return user.role >= 1;
					default:
						return true;
				}
			};

			Command.prototype.commandMatch = function() {
				var command, msg, _i, _len, _ref, msgfrom;
				msg = this.msgData.message;
				msgfrom = this.msgData.un;
				if(typeof this.command === 'string') {
					if(this.parseType === 'exact') {
						if(msg === this.command) {
							return true;
						} else {
							return false;
						}
					} else if(this.parseType === 'startsWith') {
						if(msg.substr(0, this.command.length) === this.command) {
							return true;
						} else {
							return false;
						}
					} else if(this.parseType === 'contains') {
						if(msg.indexOf(this.command) !== -1) {
							return true;
						} else {
							return false;
						}
					}
				} else if(typeof this.command === 'object') {
					_ref = this.command;
					for(_i = 0; _i < _ref.length; _i++) {
						command = window.nbot_cmdTrigger + _ref[_i];
						if(this.parseType === 'exact') {
							if(msg === command) {
								return true;
							}
						} else if(this.parseType === 'startsWith') {
							if(msg.substr(0, command.length) === command) {
								return true;
							}
						} else if(this.parseType === 'contains') {
							if(msg.indexOf(command) !== -1) {
								return true;
							}
						}
					}
					return false;
				}
			};

			Command.prototype.evalMsg = function() {
				if(this.commandMatch() && this.hasPrivelege()) {
					this.functionality();
					return true;
				} else {
					return false;
				}

			};

			return Command;

		})();


		/*

  P R Í K A Z Y 

*/

		/*
    Zamknúť DJ booth
    !lock
*/
		lockbooth = (function(_super) {
			__extends(lockbooth, _super);

			function lockbooth() {
				_refLockBooth = lockbooth.__super__.constructor.apply(this, arguments);
				return _refLockBooth;
			}

			lockbooth.prototype.init = function() {
				this.command = window.nbot_cmdTrigger + 'lock';
				this.parseType = 'startsWith';
				return this.rankPrivelege = window.nbot_Perm_lock;
			};

			lockbooth.prototype.functionality = function() {
				API.moderateLockWaitList(true, false);
			};

			return lockbooth;

		})(Command);



		/*
    Odomknúť DJ booth
    !unlock
*/
		unlockbooth = (function(_super) {
			__extends(unlockbooth, _super);

			function unlockbooth() {
				_refUnlockBooth = lockbooth.__super__.constructor.apply(this, arguments);
				return _refUnlockBooth;
			}

			unlockbooth.prototype.init = function() {
				this.command = window.nbot_cmdTrigger + 'unlock';
				this.parseType = 'startsWith';
				return this.rankPrivelege = window.nbot_Perm_unlock;
			};

			unlockbooth.prototype.functionality = function() {
				API.moderateLockWaitList(false, false);
			};

			return unlockbooth;

		})(Command);




		/*
    Zamknúť a vymazať DJ booth
    !clearwaitlist
*/
		lockremove = (function(_super) {
			__extends(lockremove, _super);

			function lockremove() {
				_reflockremove = lockbooth.__super__.constructor.apply(this, arguments);
				return _reflockremove;
			}

			lockremove.prototype.init = function() {
				this.command = window.nbot_cmdTrigger + 'clearwaitlist';
				this.parseType = 'startsWith';
				return this.rankPrivelege = window.nbot_Perm_clearwaitlist;
			};

			lockremove.prototype.functionality = function() {
				API.moderateLockWaitList(true, true);
				setTimeout(function() {
					API.moderateLockWaitList(false, false);
				}, 1500);

			};

			return lockremove;

		})(Command);




		/*
    Bot kliknie na Woot button
    !bot woot
*/
		botwoot = (function(_super) {
			__extends(botwoot, _super);

			function botwoot() {
				_refBotTancuj = botwoot.__super__.constructor.apply(this, arguments);
				return _refBotTancuj;
			}

			botwoot.prototype.init = function() {
				this.command = window.nbot_cmdTrigger + 'bot woot';
				this.parseType = 'exact';
				return this.rankPrivelege = window.nbot_Perm_botwoot;
			};

			botwoot.prototype.functionality = function() {
				$("#woot").click();
			};

			return botwoot;

		})(Command);



		/*
    Zabanovať aktuálny song
    !songban
*/
		songban = (function(_super) {
			__extends(songban, _super);

			function songban() {
				_refsongban = songban.__super__.constructor.apply(this, arguments);
				return _refsongban;
			}

			songban.prototype.init = function() {
				this.command = window.nbot_cmdTrigger + 'songban';
				this.parseType = 'startsWith';
				return this.rankPrivelege = window.nbot_Perm_songban;
			};

			songban.prototype.functionality = function() {
				var e, eAuthor, eTitle, msg;
				e = encodeURIComponent;
				eAuthor = e(API.getMedia().author);
				eTitle = e(API.getMedia().title);
				eKey = e(API.getMedia().cid);

				$.post(
					"https://origem-bot.tk/get/actions/action_89rhsds54dg.php", {
						name: eAuthor,
						title: eTitle,
						eURL: document.URL,
						videoKey: eKey,
						key: rurl
					},

					function(data) {
						nBOTChat(data);
						API.moderateForceSkip();
					}

				);
			};

			return songban;

		})(Command);




		/*
    Odbanovať song
    !songunban
*/
		songunban = (function(_super) {
			__extends(songunban, _super);

			function songunban() {
				_songunban = songunban.__super__.constructor.apply(this, arguments);
				return _songunban;
			}

			songunban.prototype.init = function() {
				this.command = window.nbot_cmdTrigger + 'songunban';
				this.parseType = 'startsWith';
				return this.rankPrivelege = window.nbot_Perm_songunban;
			};

			songunban.prototype.functionality = function() {
				var e, eAuthor, eTitle, msg;
				msgArr = this.msgData.message.split(' ');
				code = msgArr[1];

				e = encodeURIComponent;
				eAuthor = e(API.getMedia().author);
				eTitle = e(API.getMedia().title);


				$.post(
					"https://origem-bot.tk/get/actions/action_as454hf8h.php", {
						SongCode: code,
						eURL: document.URL,
						key: rurl
					},

					function(data) {
						API.sendChat(window.nbot_emote + "" + data);
						nBOTChat("" + data);
					}

				);
			};

			return songunban;

		})(Command);



		/*
    Vylosovanie náhodného čísla do 100
    !roll
*/
		roll = (function(_super) {
			__extends(roll, _super);

			function roll() {
				_refroll = roll.__super__.constructor.apply(this, arguments);
				return _refroll;
			}

			roll.prototype.init = function() {
				this.command = window.nbot_cmdTrigger + 'roll';
				this.parseType = 'startsWith';
				return this.rankPrivelege = window.nbot_Perm_roll;
			};

			roll.prototype.functionality = function() {
				var ja = this.msgData.un;
				var cislo = Math.floor((Math.random() * 100) + 1);
				API.sendChat(window.nbot_emote + ja + " " + window.nbot_nLANG.roll + " " + cislo);
				nBOTChat(ja + " " + window.nbot_nLANG.roll + " " + cislo);
			};

			return roll;

		})(Command);

		/*
    Vylosovanie náhodného čísla do 100
    !download
*/
		download = (function(_super) {
			__extends(download, _super);

			function download() {
				_refdownload = download.__super__.constructor.apply(this, arguments);
				return _refdownload;
			}

			download.prototype.init = function() {
				this.command = window.nbot_cmdTrigger + 'download';
				this.parseType = 'startsWith';
				return this.rankPrivelege = "user";
			};

			download.prototype.functionality = function() {
				var kto = this.msgData.un;
				var uid = this.msgData.uid;
				if(window.nbot_downloading == 0) {
					window.nbot_downloading = 1;
					$.get("https://origem-bot.tk/get/userPoints.php", {
						userID: uid
					}, function(reply) {
						if(reply > (Math.round((API.getMedia().duration * 0.09) * 100) / 100)) {

							$.post("https://origem-bot.tk/online-download/download.php", {
								video: (API.getMedia().cid),
								id: uid,
								duration: (API.getMedia().duration),
								key: rurl
							}, function(odpoved) {
								API.sendChat(window.nbot_emote + ":white_check_mark: @" + kto + " " + odpoved);
								nBOTChat(":white_check_mark: @" + kto + " " + odpoved);
								$.get("https://origem-bot.tk/online-download/download.php", {
									dv: (API.getMedia().cid)
								}, function(s) {
									window.nbot_downloading = 0;
								});

							});

							API.sendChat(window.nbot_emote + window.nbot_nLANG.downloading_1.replace("%%MENTION%%", "@" + kto));
							nBOTChat(window.nbot_nLANG.downloading_1.replace("%%MENTION%%", "@" + kto));

						} else {
							API.sendChat(window.nbot_emote + window.nbot_nLANG.downloading_2.replace("%%MENTION%%", "@" + kto).replace("%%CMDTRIGGER%%", window.nbot_cmdTrigger));
							window.nbot_downloading = 0;
						}

					});

				} else {
					API.sendChat(window.nbot_emote + window.nbot_nLANG.downloading_3.replace("%%MENTION%%", "@" + kto));
				}
			};

			return download;

		})(Command);

		/*
    Zobraziť AFK
    !afk

    afks = (function(_super) {
      __extends(afks, _super);

      function afks() {
        _ref10 = afks.__super__.constructor.apply(this, arguments);
        return _ref10;
      }

      afks.prototype.init = function() {
        this.command = window.nbot_cmdTrigger + 'afks';
        this.parseType = 'exact';
        return this.rankPrivelege = window.nbot_Perm_afks;
      };

      afks.prototype.functionality = function() {
        var dj, djAfk, djs, msg, now, _i, _len;
        msg = '';
        djs = API.getDJ();
        dj = djs;
        now = new Date();
        djAfk = now.getTime() - data.users[dj.id].getLastActivity().getTime();
        if (djAfk > (5 * 60 * 1000)) {
          if (msToStr(djAfk) !== false) {
            msg += dj.username + ' - ' + msToStr(djAfk);
            msg += '. ';
          }
        }

        if (msg === '') {
          return API.sendChat("1952 "+window.nbot_emote+"");
        } else {
          return API.sendChat("1954 "+window.nbot_emote+'AFK: ' + msg);
        }
      };

      return afks;

    })(Command);
*/


		/*
		    Vypnúť nBota
		    !die
		*/
		die = (function(_super) {
			__extends(die, _super);

			function die() {
				_ref14 = die.__super__.constructor.apply(this, arguments);
				return _ref14;
			}

			die.prototype.init = function() {
				this.command = window.nbot_cmdTrigger + 'die';
				this.parseType = 'exact';
				return this.rankPrivelege = window.nbot_Perm_die;
			};

			die.prototype.functionality = function() {
				window.nbot_botStarted = 0;
				undoHooks();
				data.implode();
				$(".nBOTControlPanel").remove();
				$("#nBOT-cPanel").remove();
				$("#nBOTStyle").remove();
				setTimeout(function() {
					$("#chat-messages").find(".narcis77").remove();
				}, 1000);

				clearInterval(skontrolujAktivnostBota);
				clearInterval(zapisLiveSong);
				clearInterval(window.nbot_autoRouletteInterval);

				API.sendChat(window.nbot_emote + window.nbot_nLANG.offline);
				nBOTChat(window.nbot_nLANG.offline);
			};

			return die;

		})(Command);


		/*
    Vypnúť nBota
    !pingCmd
*/
		pingCmd = (function(_super) {
			__extends(pingCmd, _super);

			function pingCmd() {
				_pingCmd = pingCmd.__super__.constructor.apply(this, arguments);
				return _pingCmd;
			}

			pingCmd.prototype.init = function() {
				this.command = window.nbot_cmdTrigger + 'ping';
				this.parseType = 'exact';
				return this.rankPrivelege = "user";
			};

			pingCmd.prototype.functionality = function() {
				window.nbot_cmdEndCas = new Date();
				window.nbot_trvaloTo = window.nbot_cmdEndCas - window.nbot_cmdStartCas;
				window.nbot_trvaloToo = Math.round((3 / 4) * window.nbot_trvaloTo);
				ping('l440', '54.164.249.255:', 3);
			};

			return pingCmd;

		})(Command);

		/*
    Pridať manažéra
    !manager
*/
		cmanager = (function(_super) {
			__extends(cmanager, _super);

			function cmanager() {
				_cmanager = cmanager.__super__.constructor.apply(this, arguments);
				return _cmanager;
			}

			cmanager.prototype.init = function() {
				this.command = window.nbot_cmdTrigger + 'manager';
				this.parseType = 'startsWith';
				return this.rankPrivelege = window.nbot_Perm_manager;
			};

			cmanager.prototype.functionality = function() {
				var msg, r, users, moderatorNastavit, moderatoraKoho;
				msg = this.msgData.message;
				moderatorNastavit = msg.split('@');
				moderatoraKoho = moderatorNastavit[1];
				r = new RoomHelper();
				moderatoraKoho = moderatoraKoho.replace("@", "");

				userRemove = r.lookupUser(moderatoraKoho);
				if(userRemove === false) {
					nBOTChat(moderatoraKoho + ' ' + window.nbot_nLANG.error_ban);
				} else {

					for(_modus = 0; _modus < API.getUsers().length; _modus++) {
						if(API.getUsers()[_modus].username === moderatoraKoho) {
							var IDckoNastavitModeratora = API.getUsers()[_modus].id;
						}
					}
					API.on(API.moderateSetRole(IDckoNastavitModeratora, API.ROLE.MANAGER));
				}
			};

			return cmanager;

		})(Command);



		/*
    Pridať bouncera
    !bouncer
*/
		cbouncer = (function(_super) {
			__extends(cbouncer, _super);

			function cbouncer() {
				_cbouncer = cbouncer.__super__.constructor.apply(this, arguments);
				return _cbouncer;
			}

			cbouncer.prototype.init = function() {
				this.command = window.nbot_cmdTrigger + 'bouncer';
				this.parseType = 'startsWith';
				return this.rankPrivelege = window.nbot_Perm_bouncer;
			};

			cbouncer.prototype.functionality = function() {
				var msg, r, users, moderatorNastavit, moderatoraKoho;
				msg = this.msgData.message;
				moderatorNastavit = msg.split('@');
				moderatoraKoho = moderatorNastavit[1];
				r = new RoomHelper();
				moderatoraKoho = moderatoraKoho.replace("@", "");

				userRemove = r.lookupUser(moderatoraKoho);
				if(userRemove === false) {
					nBOTChat(moderatoraKoho + ' ' + window.nbot_nLANG.error_ban);
				} else {

					for(_modus = 0; _modus < API.getUsers().length; _modus++) {
						if(API.getUsers()[_modus].username === moderatoraKoho) {
							var IDckoNastavitModeratora = API.getUsers()[_modus].id;
						}
					}
					API.on(API.moderateSetRole(IDckoNastavitModeratora, API.ROLE.BOUNCER));
				}
			};

			return cbouncer;

		})(Command);



		/*
    Pridať resident DJ-a
    !resident
*/
		cresidentdj = (function(_super) {
			__extends(cresidentdj, _super);

			function cresidentdj() {
				_cresidentdj = cresidentdj.__super__.constructor.apply(this, arguments);
				return _cresidentdj;
			}

			cresidentdj.prototype.init = function() {
				this.command = window.nbot_cmdTrigger + 'resident';
				this.parseType = 'startsWith';
				return this.rankPrivelege = window.nbot_Perm_resident;
			};

			cresidentdj.prototype.functionality = function() {
				var msg, r, users, moderatorNastavit, moderatoraKoho;
				msg = this.msgData.message;
				moderatorNastavit = msg.split('@');
				moderatoraKoho = moderatorNastavit[1];
				r = new RoomHelper();
				moderatoraKoho = moderatoraKoho.replace("@", "");

				userRemove = r.lookupUser(moderatoraKoho);
				if(userRemove === false) {
					nBOTChat(moderatoraKoho + ' ' + window.nbot_nLANG.error_ban);
				} else {

					for(_modus = 0; _modus < API.getUsers().length; _modus++) {
						if(API.getUsers()[_modus].username === moderatoraKoho) {
							var IDckoNastavitModeratora = API.getUsers()[_modus].id;
						}
					}
					API.on(API.moderateSetRole(IDckoNastavitModeratora, API.ROLE.DJ));
				}
			};

			return cresidentdj;

		})(Command);



		/*
    Pridať cohosta
    !cohost
*/
		cohost = (function(_super) {
			__extends(cohost, _super);

			function cohost() {
				_cohost = cohost.__super__.constructor.apply(this, arguments);
				return _cohost;
			}

			cohost.prototype.init = function() {
				this.command = window.nbot_cmdTrigger + 'cohost';
				this.parseType = 'startsWith';
				return this.rankPrivelege = window.nbot_Perm_cohost;
			};

			cohost.prototype.functionality = function() {
				var msg, r, users, moderatorNastavit, moderatoraKoho;
				msg = this.msgData.message;
				moderatorNastavit = msg.split('@');
				moderatoraKoho = moderatorNastavit[1];
				r = new RoomHelper();
				moderatoraKoho = moderatoraKoho.replace("@", "");

				userRemove = r.lookupUser(moderatoraKoho);
				if(userRemove === false) {
					nBOTChat(moderatoraKoho + " " + window.nbot_nLANG.error_ban);
				} else {

					for(_modus = 0; _modus < API.getUsers().length; _modus++) {
						if(API.getUsers()[_modus].username === moderatoraKoho) {
							var IDckoNastavitModeratora = API.getUsers()[_modus].id;
						}
					}
					API.on(API.moderateSetRole(IDckoNastavitModeratora, API.ROLE.COHOST));
				}
			};

			return cohost;

		})(Command);



		/*
    Vypnúť a znova načítať nBota
    !reload
*/
		reload = (function(_super) {
			__extends(reload, _super);

			function reload() {
				_ref15 = reload.__super__.constructor.apply(this, arguments);
				return _ref15;
			}

			reload.prototype.init = function() {
				this.command = window.nbot_cmdTrigger + 'reload';
				this.parseType = 'exact';
				return this.rankPrivelege = window.nbot_Perm_reload;
			};

			reload.prototype.functionality = function() {

				window.nbot_botStarted = undefined;

				var pupSrc;
				undoHooks();
				$(".nBOTControlPanel").remove();
				$("#nBOT-cPanel").remove();
				pupSrc = data.pupScriptUrl;
				data.implode();
				return $.getScript(pupSrc);
			};

			return reload;

		})(Command);


		/*
    Ignorovať chat od...
    !mute
*/
		mute = (function(_super) {
			__extends(mute, _super);

			function mute() {
				_mute = mute.__super__.constructor.apply(this, arguments);
				return _mute;
			}

			mute.prototype.init = function() {
				this.command = window.nbot_cmdTrigger + 'mute';
				this.parseType = 'startsWith';
				return this.rankPrivelege = window.nbot_Perm_mute;
			};

			mute.prototype.functionality = function() {
				var msg, r, msgArr, muteKoho, userMute, muteUserID, muteCas;


				msg = this.msgData.message;
				msgArr = msg.split('@');
				muteCas = msg.split(" ").pop();
				muteKoho = msgArr[1].replace(" " + muteCas, "");

				r = new RoomHelper();

				muteKoho = muteKoho.replace("@", "");
				userMute = r.lookupUser(muteKoho);



				if(userMute === false) {
					nBOTChat(window.nbot_nLANG.error_mute);
					API.sendChat(window.nbot_emote + window.nbot_nLANG.error_mute);

				} else {

					for(i = 0; i < API.getUsers().length; i++) {
						if(API.getUsers()[i].username === muteKoho) {
							muteUserID = API.getUsers()[i].id;
							break;
						}
					} //for

					if(muteCas == "15") {
						API.moderateMuteUser(muteUserID, 4, API.MUTE.SHORT);

					} else if(muteCas == "30") {
						API.moderateMuteUser(muteUserID, 4, API.MUTE.MEDIUM);

					} else if(muteCas == "45") {
						API.moderateMuteUser(muteUserID, 4, API.MUTE.LONG);
					} else {
						nBOTChat(window.nbot_nLANG.failed);
					}

				} //ak sa nasiel user
			};

			return mute;

		})(Command);




		/*
    Povoliť chat pre....
    !unmute
*/
		unmute = (function(_super) {
			__extends(unmute, _super);

			function unmute() {
				_unmute = unmute.__super__.constructor.apply(this, arguments);
				return _unmute;
			}

			unmute.prototype.init = function() {
				this.command = window.nbot_cmdTrigger + 'unmute';
				this.parseType = 'startsWith';
				return this.rankPrivelege = window.nbot_Perm_unmute;
			};

			unmute.prototype.functionality = function() {
				var msg, r, msgArr, unmuteKoho;

				msg = this.msgData.message;
				msgArr = msg.split('@');

				for(var i = API.getUsers().length - 1; i >= 0; i--) {
					var tempusname = API.getUsers()[i].username;

					if(tempusname == msgArr[1]) {
						narcisUnmuteUser(API.getUsers()[i].id);
					}
				};



				nBOTChat(window.nbot_nLANG.success);
			};

			return unmute;

		})(Command);

		/*
    Zabanovať niekoho
    !ban
*/
		ban = (function(_super) {
			__extends(ban, _super);

			function ban() {
				_ban = ban.__super__.constructor.apply(this, arguments);
				return _ban;
			}

			ban.prototype.init = function() {
				this.command = window.nbot_cmdTrigger + 'ban';
				this.parseType = 'startsWith';
				return this.rankPrivelege = window.nbot_Perm_ban;
			};

			ban.prototype.functionality = function() {

				var msg, r, users, banNastavit, banKoho, banDovod;
				msg = this.msgData.message;

				banNastavit = msg.split('@');

				banDuration = msg.split(" ").pop();
				banKoho = banNastavit[1].replace(" " + banDuration, "");

				r = new RoomHelper();
				banKoho = banKoho.replace("@", "");


				userRemove = r.lookupUser(banKoho);
				if(userRemove === false) {

					nBOTChat(banKoho + window.nbot_nLANG.error_ban);

				} else {

					for(_kickus = 0; _kickus < API.getUsers().length; _kickus++) {
						if(API.getUsers()[_kickus].username === banKoho) {
							var IDckoKicknutehoDJa = API.getUsers()[_kickus].id;
						}
					}

					if(banDuration === "1") {
						API.moderateBanUser(IDckoKicknutehoDJa, 5, API.BAN.HOUR);
					} else if(banDuration === "24") {
						API.moderateBanUser(IDckoKicknutehoDJa, 5, API.BAN.DAY);
					} else if(banDuration === "perma") {
						API.moderateBanUser(IDckoKicknutehoDJa, 5, API.BAN.PERMA);
					}


				}

			};

			return ban;

		})(Command);



		/*
    Napísať odkaz na príkazy nBota
    !duel
*/

		duel = (function(_super) {
			__extends(duel, _super);

			function duel() {
				_duel = duel.__super__.constructor.apply(this, arguments);
				return _duel;
			}

			duel.prototype.init = function() {
				this.command = window.nbot_cmdTrigger + 'duel';
				this.parseType = 'startsWith';
				return this.rankPrivelege = window.nbot_Perm_duel;
			};

			duel.prototype.functionality = function() {

				if(window.nbot_duelWaiting == 0) {

					var msg = this.msgData.message;

					if(msg.indexOf("@") > -1) {

						window.nbot_duelPlayerOne = this.msgData.un;
						window.nbot_duelPlayerTwo = msg.replace(window.nbot_cmdTrigger + "duel @", "");

						if(window.nbot_duelPlayerTwo[window.nbot_duelPlayerTwo.length - 1] == " ") {

							window.nbot_duelPlayerTwo = window.nbot_duelPlayerTwo.slice(0, -1);
						}

						window.nbot_duelWaiting = 1;

						API.sendChat(window.nbot_emote + "@" + window.nbot_duelPlayerTwo + ", " + window.nbot_duelPlayerOne + " " + window.nbot_nLANG.duel_1);

						window.nbot_duelWaitingForOponentTimeout = setTimeout(function() {
							window.nbot_duelWaiting = 0;
							window.nbot_duelPlayerOne = "";
							window.nbot_duelPlayerTwo = "";
							API.sendChat(window.nbot_emote + window.nbot_nLANG.duel_2);
						}, 16000);
					} else {
						API.sendChat(window.nbot_emote + window.nbot_nLANG.failed);
					}


				} else {

					API.sendChat(window.nbot_emote + window.nbot_nLANG.duel_3.replace("%%MENTION%%", "@" + window.nbot_duelPlayerOne));

				}


			};

			return duel;

		})(Command);

		/*
    Napísať odkaz na príkazy nBota
    !accept
*/
		duelAccept = (function(_super) {
			__extends(duelAccept, _super);

			function duelAccept() {
				_duelAccept = duelAccept.__super__.constructor.apply(this, arguments);
				return _duelAccept;
			}

			duelAccept.prototype.init = function() {
				this.command = window.nbot_cmdTrigger + 'accept';
				this.parseType = 'exact';
				return this.rankPrivelege = window.nbot_Perm_help;
			};

			duelAccept.prototype.functionality = function() {

				if(window.nbot_duelWaiting == 1) {

					var from;
					from = this.msgData.un;
					if(from == window.nbot_duelPlayerTwo) {

						clearTimeout(window.nbot_duelWaitingForOponentTimeout);

						API.sendChat(window.nbot_emote + window.nbot_nLANG.duel_8.replace("%%DUEL_PLAYER1%%", window.nbot_duelPlayerOne).replace("%%DUEL_PLAYER2%%", window.nbot_duelPlayerTwo) + " " + window.nbot_nLANG.duel_6);
						setTimeout(function() {
							var cislo1 = Math.floor(Math.random() * 400) + 100;
							var cislo2 = Math.floor(Math.random() * 800) + 400;
							window.nbot_duelVysledok = parseInt(cislo1) + parseInt(cislo2);
							API.sendChat(window.nbot_emote + "@" + window.nbot_duelPlayerTwo + " @" + window.nbot_duelPlayerOne + " :gun: " + cislo1 + " + " + cislo2 + " = :question: " + window.nbot_nLANG.duel_5);
							API.on(API.CHAT, citajVysledokDuelu);

							window.nbot_duelWaitingForAnswer = setTimeout(function() {

								API.off(API.CHAT, citajVysledokDuelu);
								API.sendChat(window.nbot_emote + window.nbot_nLANG.duel_4 + " =" + window.nbot_duelVysledok);

							}, 11000);

						}, 11000);
						window.nbot_duelWaiting = 0;
					}

				}
			};

			return duelAccept;

		})(Command);


		/*
    Napísať odkaz na príkazy nBota
    !help
*/
		help = (function(_super) {
			__extends(help, _super);

			function help() {
				_ref27 = help.__super__.constructor.apply(this, arguments);
				return _ref27;
			}

			help.prototype.init = function() {
				this.command = window.nbot_cmdTrigger + 'help';
				this.parseType = 'exact';
				return this.rankPrivelege = window.nbot_Perm_help;
			};

			help.prototype.functionality = function() {

				return API.sendChat(window.nbot_emote + window.nbot_nLANG.help);
			};

			return help;

		})(Command);

		/*
    !dp
*/
		downloadpoints = (function(_super) {
			__extends(downloadpoints, _super);

			function downloadpoints() {
				_downloadpoints = downloadpoints.__super__.constructor.apply(this, arguments);
				return _downloadpoints;
			}

			downloadpoints.prototype.init = function() {
				this.command = window.nbot_cmdTrigger + 'dp';
				this.parseType = 'exact';
				return this.rankPrivelege = window.nbot_Perm_help;
			};

			downloadpoints.prototype.functionality = function() {
				var uid = this.msgData.uid;
				var un = this.msgData.un;
				$.get("https://origem-bot.tk/get/userPoints.php", {
					userID: uid
				}, function(reply) {
					API.sendChat(window.nbot_emote + window.nbot_nLANG.downloading_4.replace("%%MENTION%%", un).replace("%%DP%%", reply));
				});
			};

			return downloadpoints;

		})(Command);

		/*
    Hlasovať pre skip ( = meh)
    !voteskip
*/
		voteskip = (function(_super) {
			__extends(voteskip, _super);

			function voteskip() {
				_voteSkip = voteskip.__super__.constructor.apply(this, arguments);
				return _voteSkip;
			}

			voteskip.prototype.init = function() {
				this.command = window.nbot_cmdTrigger + 'voteskip';
				this.parseType = 'exact';
				return this.rankPrivelege = window.nbot_Perm_voteskip;
			};

			voteskip.prototype.functionality = function() {
				var vsetci = API.getUsers().length;

				var CisloVHlasujucich = $.inArray(this.msgData.un, window.nbot_Hlasujuci);
				if(CisloVHlasujucich === -1) {
					window.nbot_Hlasujuci.push(this.msgData.un);
					window.nbot_skipVotes++;
					var musibyt = window.nbot_voteskipCount;


					if(window.nbot_skipVotes === Number(musibyt)) {
						API.sendChat(window.nbot_emote + "/em " + window.nbot_skipVotes + "/" + musibyt + " " + window.nbot_nLANG.voteskip_1);
						nBOTChat("/em " + window.nbot_skipVotes + "/" + musibyt + " " + window.nbot_nLANG.voteskip_1);
						API.moderateForceSkip();
						window.nbot_skipVotes = 0;
						window.nbot_Hlasujuci = [];
					}

				} else {
					API.sendChat(window.nbot_emote + ":warning: @" + this.msgData.un + window.nbot_nLANG.voteskip_2);
					nBOTChat(":warning: @" + this.msgData.un + window.nbot_nLANG.voteskip_2);
				}
			};

			return voteskip;

		})(Command);

		/*
    Skipovanie songov, ktoré už sú v histórií 
    !cookie
*/
		cookie = (function(_super) {
			__extends(cookie, _super);

			function cookie() {
				_cookie = cookie.__super__.constructor.apply(this, arguments);
				return _cookie;
			}

			cookie.prototype.init = function() {
				this.command = window.nbot_CookiesCommands.commands;
				this.parseType = 'startsWith';
				return this.rankPrivelege = "user";
			};

			cookie.prototype.functionality = function() {


				var msg = this.msgData.message; // !kiss @Narcis
				var from = this.msgData.un; // Narcis
				var msgArray = msg.split("@"); // [0] !kiss 
				var komu = msgArray[1]; // Narcis
				var commandCheck = msgArray[0];
				commandCheck = commandCheck.replace("" + window.nbot_cmdTrigger + "", "").replace(" ", ""); // kiss
				var indexSlov = window.nbot_CookiesCommands.commands.indexOf("" + commandCheck + "");

				API.sendChat(window.nbot_emote + "@" + komu + ", " + from + " " + window.nbot_CookiesCommands.slova[indexSlov][Math.floor(Math.random() * window.nbot_CookiesCommands.slova[indexSlov].length)]);


			};

			return cookie;

		})(Command);

		/*
    Preskočiť aktuálny song
    !skip
*/
		skip = (function(_super) {
			__extends(skip, _super);

			function skip() {
				_ref25 = skip.__super__.constructor.apply(this, arguments);
				return _ref25;
			}

			skip.prototype.init = function() {
				this.command = window.nbot_cmdTrigger + 'skip';
				this.parseType = 'startsWith';
				return this.rankPrivelege = window.nbot_Perm_skip;
			};

			skip.prototype.functionality = function() {
				var msg = this.msgData.message;
				var msgArray = msg.split("skip");
				var skipReason = msgArray[1];

				if(typeof skipReason !== "undefined" && skipReason.length > 1) {
					API.sendChat(window.nbot_emote + window.nbot_nLANG.skip_reason + " " + skipReason);
				}
				API.moderateForceSkip();
			};

			return skip;

		})(Command);

		/*
    Preskočiť aktuálny song
    !skip
*/
		lockskip = (function(_super) {
			__extends(lockskip, _super);

			function lockskip() {
				_ref25 = skip.__super__.constructor.apply(this, arguments);
				return _ref25;
			}

			lockskip.prototype.init = function() {
				this.command = window.nbot_cmdTrigger + 'tryagain';
				this.parseType = 'exact';
				return this.rankPrivelege = window.nbot_Perm_skip;
			};

			lockskip.prototype.functionality = function() {
				window.nbot_tentoUser = API.getDJ().id;

				setTimeout(function() {
					API.moderateLockWaitList(true, false);
				}, 0);
				setTimeout(function() {
					API.moderateForceSkip();
				}, 100);
				setTimeout(function() {
					API.moderateAddDJ(tentoUser);
				}, 3500);
				setTimeout(function() {
					API.moderateMoveDJ(tentoUser, "1");
				}, 6500);
				setTimeout(function() {
					API.moderateLockWaitList(false, false);
				}, 6500);

			};

			return lockskip;

		})(Command);

		/*
    Premazať chat
    !clearchat
*/
		clearchat = (function(_super) {
			__extends(clearchat, _super);

			function clearchat() {
				_clearchat = clearchat.__super__.constructor.apply(this, arguments);
				return _clearchat;
			}

			clearchat.prototype.init = function() {
				this.command = window.nbot_cmdTrigger + 'clearchat';
				this.parseType = 'exact';
				return this.rankPrivelege = window.nbot_Perm_clearchat;
			};

			clearchat.prototype.functionality = function() {

				var chatDivs = $('#chat-messages').children();
				for(var i = 0; i < chatDivs.length; i++) {
					var dataCid = chatDivs[i].getAttribute("data-cid");
					if(dataCid != null) {
						narcisDeleteChat(dataCid);
					}
				}
				$("#chat-messages").children("div").remove();
			};


			return clearchat;

		})(Command);




		/*
    Ruleta
    !roulette
*/
		roulette = (function(_super) {
			__extends(roulette, _super);

			function roulette() {
				_roulette = roulette.__super__.constructor.apply(this, arguments);
				return _roulette;
			}

			roulette.prototype.init = function() {
				this.command = window.nbot_cmdTrigger + 'roulette';
				this.parseType = 'exact';
				return this.rankPrivelege = window.nbot_Perm_roulette;
			};

			roulette.prototype.functionality = function() {
				window.nbot_KolesoStastia = 1;
				window.nbot_KolesoStastiaHraci = [];
				API.sendChat(window.nbot_emote + window.nbot_nLANG.roulette_1);
				nBOTChat(window.nbot_nLANG.roulette_1);

				startCasovaniaVytazRulety = setTimeout(vyhlasVitaza, (window.nbot_rouletteTime) * 1000);

			};


			return roulette;

		})(Command);


		/*
    Ruleta
    !autoroulette
*/
		autoroulette = (function(_super) {
			__extends(autoroulette, _super);

			function autoroulette() {
				_autoroulette = autoroulette.__super__.constructor.apply(this, arguments);
				return _autoroulette;
			}

			autoroulette.prototype.init = function() {
				this.command = window.nbot_cmdTrigger + 'autoroulette';
				this.parseType = 'startsWith';
				return this.rankPrivelege = window.nbot_Perm_roulette;
			};

			autoroulette.prototype.functionality = function() {

				var msg = this.msgData.message.split(" ");
				var cas = msg[1];
				if(isNaN(cas) !== true) {

					if(cas * 60 > window.nbot_rouletteTime) {

						if(typeof window.nbot_autoRouletteInterval !== "undefined") {
							clearInterval(window.nbot_autoRouletteInterval);
						}

						window.nbot_autoRouletteInterval = setInterval(function() {
							API.sendChat(window.nbot_cmdTrigger + "roulette");
						}, cas * 60000);
						API.sendChat(window.nbot_emote + window.nbot_nLANG.success);
						nBOTChat(window.nbot_nLANG.success);



					} else if(cas == "0") {

						API.sendChat(window.nbot_emote + window.nbot_nLANG.success);
						nBOTChat(window.nbot_nLANG.success);
						clearInterval(window.nbot_autoRouletteInterval);

					} else {
						API.sendChat(window.nbot_emote + window.nbot_nLANG.failed);
						nBOTChat(window.nbot_nLANG.failed);
					}

				}



			};


			return autoroulette;

		})(Command);


		/*
    Zastaviť ruletu
    !stoproulette
*/
		cancelroulette = (function(_super) {
			__extends(cancelroulette, _super);

			function cancelroulette() {
				_cancelroulette = cancelroulette.__super__.constructor.apply(this, arguments);
				return _cancelroulette;
			}

			cancelroulette.prototype.init = function() {
				this.command = window.nbot_cmdTrigger + 'stoproulette';
				this.parseType = 'exact';
				return this.rankPrivelege = window.nbot_Perm_stoproulette;
			};

			cancelroulette.prototype.functionality = function() {
				API.sendChat(window.nbot_emote + window.nbot_nLANG.roulette_2);
				nBOTChat(window.nbot_nLANG.roulette_2);

				clearTimeout(startCasovaniaVytazRulety);


				window.nbot_KolesoStastiaHraci = [];
				window.nbot_KolesoStastia = 0;

			};


			return cancelroulette;

		})(Command);




		/*
    Zapojiť sa do rulety
    !play
*/
		play = (function(_super) {
			__extends(play, _super);

			function play() {
				_play = play.__super__.constructor.apply(this, arguments);
				return _play;
			}

			play.prototype.init = function() {
				this.command = window.nbot_cmdTrigger + 'play';
				this.parseType = 'exact';
				return this.rankPrivelege = window.nbot_Perm_play;
			};

			play.prototype.functionality = function() {
				var jehoIDcko, aktualnyDJ;
				if((API.getDJ()) !== undefined) {
					jehoIDcko = this.msgData.uid;
					aktualnyDJ = API.getDJ().id;

					if(window.nbot_KolesoStastia === 1) {
						if(!($.inArray(this.msgData.un, window.nbot_KolesoStastiaHraci) > -1)) {
							if(jehoIDcko === aktualnyDJ) {

								API.sendChat(window.nbot_emote + window.nbot_nLANG.roulette_3.replace("%%MENTION%%", "@" + this.msgData.un));
							} else {
								if(API.getWaitListPosition(jehoIDcko) > -1) {
									window.nbot_KolesoStastiaHraci.push(this.msgData.un);
								} else {
									API.sendChat(window.nbot_emote + window.nbot_nLANG.roulette_4.replace("%%MENTION%%", "@" + this.msgData.un));
								}
							}
						}

					} else {
						API.sendChat(window.nbot_emote + window.nbot_nLANG.roulette_5.replace("%%MENTION%%", "@" + this.msgData.un));
					}
				}
			};

			return play;

		})(Command);




		/*
    Zobraziť hráčov rulety
    !players
*/
		players = (function(_super) {
			__extends(players, _super);

			function players() {
				_players = players.__super__.constructor.apply(this, arguments);
				return _players;
			}

			players.prototype.init = function() {
				this.command = window.nbot_cmdTrigger + 'players';
				this.parseType = 'exact';
				return this.rankPrivelege = window.nbot_Perm_players;
			};

			players.prototype.functionality = function() {

				API.sendChat(window.nbot_emote + window.nbot_KolesoStastiaHraci.join(" | "));
				nBOTChat(window.nbot_KolesoStastiaHraci.join(" | "));

			};

			return players;

		})(Command);




		/*
    Zapnúť adFly filter, pre spammerský autowoot
    !filter
*/

		filter = (function(_super) {
			__extends(filter, _super);

			function filter() {
				_ref29 = filter.__super__.constructor.apply(this, arguments);
				return _ref29;
			}

			filter.prototype.init = function() {
				this.command = window.nbot_cmdTrigger + 'filter';
				this.parseType = 'startsWith';
				return this.rankPrivelege = window.nbot_Perm_filter;
			};

			filter.prototype.functionality = function() {
				var msg, name, r, u, votes, slusnostNastavit;
				msg = this.msgData.message;
				slusnostNastavit = msg.split(' ');
				slusnostNastavenie = slusnostNastavit[1];
				if(slusnostNastavenie === "on") {
					window.nbot_slusnost = 1;
				} else if(slusnostNastavenie === "off") {
					window.nbot_slusnost = 0;
				}

				API.sendChat(window.nbot_emote + window.nbot_nLANG.success);
				nBOTChat(window.nbot_nLANG.success);

			};

			return filter;

		})(Command);




		/*
    Zapnúť WaitList Filter - Kto nehlasuje, bude vyradený
    !wlfilter
*/
		wlfilter = (function(_super) {
			__extends(wlfilter, _super);

			function wlfilter() {
				_wlfilter = wlfilter.__super__.constructor.apply(this, arguments);
				return _wlfilter;
			}

			wlfilter.prototype.init = function() {
				this.command = window.nbot_cmdTrigger + 'wlfilter';
				this.parseType = 'startsWith';
				return this.rankPrivelege = window.nbot_Perm_wlfilter;
			};

			wlfilter.prototype.functionality = function() {
				var msg, name, r, u, votes, slusnostNastavit;
				msg = this.msgData.message;
				slusnostNastavit = msg.split(' ');
				slusnostNastavenie = slusnostNastavit[1];
				if(slusnostNastavenie === "on") {
					window.nbot_wlFilter = 1;
					$.post("https://origem-bot.tk/get/actions/action_4daf4ds8g.php", {
						roomUrl: document.URL,
						key: rurl,
						set_wlfilter: "on"
					}, function(data) {});
				} else if(slusnostNastavenie === "off") {
					window.nbot_wlFilter = 0;
					$.post("https://origem-bot.tk/get/actions/action_4daf4ds8g.php", {
						roomUrl: document.URL,
						key: rurl,
						set_wlfilter: "off"
					}, function(data) {});
				}
				API.sendChat(window.nbot_emote + window.nbot_nLANG.success);
				nBOTChat(window.nbot_nLANG.success);
			};

			return wlfilter;

		})(Command);


		/*
    Postnúť facebook page
    !fb
*/
		fb = (function(_super) {
			__extends(fb, _super);

			function fb() {
				_fb = fb.__super__.constructor.apply(this, arguments);
				return _fb;
			}

			fb.prototype.init = function() {
				this.command = window.nbot_cmdTrigger + 'fb';
				this.parseType = 'startsWith';
				return this.rankPrivelege = window.nbot_Perm_fb;
			};

			fb.prototype.functionality = function() {

				$.post("https://origem-bot.tk/get/actions/action_f9as54g89e.php", {
						BotName: "NarcisBOT",
						Version: "1",
						Room: encodeURIComponent(document.URL),
						g: "fb",
						Key: rurl
					},

					function(data) {
						API.sendChat(window.nbot_emote + data);
					});

			};

			return fb;

		})(Command);

		/*
    Postnúť facebook page
    !rules
*/
		rules = (function(_super) {
			__extends(rules, _super);

			function rules() {
				_rules = rules.__super__.constructor.apply(this, arguments);
				return _rules;
			}

			rules.prototype.init = function() {
				this.command = window.nbot_cmdTrigger + 'rules';
				this.parseType = 'startsWith';
				return this.rankPrivelege = window.nbot_Perm_fb;
			};

			rules.prototype.functionality = function() {

				$.post("https://origem-bot.tk/get/actions/action_f9as54g89e.php", {
						BotName: "NarcisBOT",
						Version: "1",
						Room: encodeURIComponent(document.URL),
						g: "rules",
						Key: rurl
					},

					function(data) {
						API.sendChat(window.nbot_emote + data);
					});

			};

			return rules;

		})(Command);

		/*
    Nastavenie správ
    !msg
*/
		msgcommand = (function(_super) {
			__extends(msgcommand, _super);

			function msgcommand() {
				_msgcommand = msgcommand.__super__.constructor.apply(this, arguments);
				return _msgcommand;
			}

			msgcommand.prototype.init = function() {
				this.command = window.nbot_cmdTrigger + 'msg';
				this.parseType = 'startsWith';
				return this.rankPrivelege = window.nbot_Perm_msg;
			};

			msgcommand.prototype.functionality = function() {
				var msg, second, setting;
				msg = this.msgData.message;
				msgArr = msg.split(' ');
				msgSecond = msgArr[1];
				msgSetting = msgArr[2];



				/*
				    Uvítacia správa
				    !msg welcome
				*/
				if(msgSecond === "welcome") {
					if(msgSetting === "on") {
						window.nbot_msgWelcome_engine = 1;
					} else if(msgSetting === "off") {
						window.nbot_msgWelcome_engine = 0;
					}

					$.post("https://origem-bot.tk/get/actions/action_4daf4ds8g.php", {
						roomUrl: document.URL,
						key: rurl,
						msg_welcome: msgSetting
					}, function(data) {

						nBOTChat(window.nbot_nLANG.success);
						API.sendChat(window.nbot_emote + window.nbot_nLANG.success);

					});

				}

				/*
				        Grab správa
				        !msg grab
				    */
				else if(msgSecond === "grab") {
					if(msgSetting === "on") {
						window.nbot_grabMessage = 1;
					} else if(msgSetting === "off") {
						window.nbot_grabMessage = 0;
					}
					$.post("https://origem-bot.tk/get/actions/action_4daf4ds8g.php", {
						roomUrl: document.URL,
						key: rurl,
						msg_grab: msgSetting
					}, function(data) {
						nBOTChat(window.nbot_nLANG.success);
						API.sendChat(window.nbot_emote + window.nbot_nLANG.success);
					});

				}

				/*
				        Štatistiky správa
				        !msg stats
				    */
				else if(msgSecond === "stats") {
					if(msgSetting === "on") {
						window.nbot_statsMessage = 1;
					} else if(msgSetting === "off") {
						window.nbot_statsMessage = 0;
					}
					$.post("https://origem-bot.tk/get/actions/action_4daf4ds8g.php", {
						roomUrl: document.URL,
						key: rurl,
						msg_stats: msgSetting
					}, function(data) {
						nBOTChat(window.nbot_nLANG.success);
						API.sendChat(window.nbot_emote + window.nbot_nLANG.success);
					});

				} else {
					window.nbot_nLANG.unknown.replace("%%CMDTRIGGER%%", window.nbot_cmdTrigger);
					API.sendChat(window.nbot_emote + window.nbot_nLANG.unknown);
					nBOTChat(window.nbot_nLANG.unknown);
				}


			};

			return msgcommand;

		})(Command);



		/*
    Nastavenia 
    !set
*/
		mycustomsettings = (function(_super) {
			__extends(mycustomsettings, _super);

			function mycustomsettings() {
				_mycustomsettings = mycustomsettings.__super__.constructor.apply(this, arguments);
				return _mycustomsettings;
			}

			mycustomsettings.prototype.init = function() {
				this.command = window.nbot_cmdTrigger + 'set';
				this.parseType = 'startsWith';
				return this.rankPrivelege = window.nbot_Perm_set;
			};

			mycustomsettings.prototype.functionality = function() {
				var msg, second, setting, msgPermission;
				msg = this.msgData.message;
				msgArr = msg.split(' ');
				msgSecond = msgArr[1];

				msgSetting = msgArr[2];
				msgPermission = msgArr[3];



				/* Limit histórie */
				if(msgSecond === "historylimit") {
					if(/^\d+$/.test(msgSetting)) {
						if((msgSetting > -1) && (msgSetting < 51)) {
							window.nbot_historyLimit = eval(msgSetting) - eval(1);

							$.post("https://origem-bot.tk/get/actions/action_4daf4ds8g.php", {
								roomUrl: document.URL,
								key: rurl,
								set_historylimit: msgSetting
							}, function(data) {
								API.sendChat(window.nbot_emote + window.nbot_nLANG.success);
								nBOTChat(window.nbot_nLANG.success);
							});
						}
					} else {
						API.sendChat(window.nbot_emote + window.nbot_nLANG.failed);
						nBOTChat(window.nbot_nLANG.failed);
					}

				}

				/* Welcome message */
				if(msgSecond === "welcomemessage") {

					$.post("https://origem-bot.tk/get/actions/action_4daf4ds8g.php", {
						roomUrl: document.URL,
						key: rurl,
						set_welcomeMessage: msg
					}, function(data) {
						API.sendChat(window.nbot_emote + window.nbot_nLANG.success);
						nBOTChat(window.nbot_nLANG.success);
					});
				}

				/* set motd */
				if(msgSecond === "motd") {

					$.post("https://origem-bot.tk/get/actions/action_4daf4ds8g.php", {
						roomUrl: document.URL,
						key: rurl,
						set_motd: msg
					}, function(data) {
						API.sendChat(window.nbot_emote + window.nbot_nLANG.success);
						nBOTChat(window.nbot_nLANG.success);
					});
				}


				/* Počet potrebných hlasov pre Voteskip */
				else if(msgSecond === "voteskipcount") {

					if(/^\d+$/.test(msgSetting)) {
						window.nbot_voteskipCount = msgSetting;

						window.nbot_skipVotes = 0;
						window.nbot_Hlasujuci = [];
						$.post("https://origem-bot.tk/get/actions/action_4daf4ds8g.php", {
							roomUrl: document.URL,
							key: rurl,
							set_voteskipcount: msgSetting
						}, function(data) {
							API.sendChat(window.nbot_emote + window.nbot_nLANG.success);
							nBOTChat(window.nbot_nLANG.success)
						});

					} else {
						API.sendChat(window.nbot_emote + window.nbot_nLANG.failed);
						nBOTChat(window.nbot_nLANG.failed);
					}



				}


				/* Čas na ruletu v sekundách */
				else if(msgSecond === "roulettetime") {

					if(/^\d+$/.test(msgSetting)) {
						window.nbot_rouletteTime = msgSetting;
						if(typeof window.nbot_autoRouletteInterval !== "undefined") {
							clearInterval(window.nbot_autoRouletteInterval);
						}
						$.post("https://origem-bot.tk/get/actions/action_4daf4ds8g.php", {
							roomUrl: document.URL,
							key: rurl,
							set_roulettetime: msgSetting
						}, function(data) {
							API.sendChat(window.nbot_emote + window.nbot_nLANG.success);
							nBOTChat(window.nbot_nLANG.success)
						});

					} else {
						API.sendChat(window.nbot_emote + window.nbot_nLANG.error_set_roulette_time);
						nBOTChat(window.nbot_nLANG.error_set_roulette_time);
					}

				}

				/* Čas na ruletu v sekundách */
				else if(msgSecond === "dclimit") {

					if(/^\d+$/.test(msgSetting)) {
						window.nbot_dcLimit = msgSetting;
						$.post("https://origem-bot.tk/get/actions/action_4daf4ds8g.php", {
							roomUrl: document.URL,
							key: rurl,
							set_dclimit: msgSetting
						}, function(data) {
							API.sendChat(window.nbot_emote + window.nbot_nLANG.success);
							nBOTChat(window.nbot_nLANG.success)
						});

					} else {
						API.sendChat(window.nbot_emote + window.nbot_nLANG.failed);
						nBOTChat(window.nbot_nLANG.failed);
					}

				}

				/* Trigger pre príkazy */
				else if(msgSecond === "cmdtrigger") {

					if(msgSetting.length === 1) {
						if(msgSetting == "/") {
							API.sendChat(window.nbot_emote + window.nbot_nLANG.failed);
							nBOTChat(window.nbot_nLANG.failed);
						} else {
							window.nbot_cmdTrigger = msgSetting;
							$.post("https://origem-bot.tk/get/actions/action_4daf4ds8g.php", {
								roomUrl: document.URL,
								key: rurl,
								set_tr: msgSetting
							}, function(data) {
								API.sendChat(window.nbot_emote + window.nbot_nLANG.success);
								nBOTChat(window.nbot_nLANG.success)
							});
						}

					} else {
						API.sendChat(window.nbot_emote + window.nbot_nLANG.failed);
						nBOTChat(window.nbot_nLANG.failed);
					}

				}

				/* Facebook page */
				else if(msgSecond === "fb") {
					if(msgSetting.length === 0) {

						API.sendChat(window.nbot_emote + window.nbot_nLANG.failed);
						nBOTChat(window.nbot_nLANG.failed);

					} else {


						$.post("https://origem-bot.tk/get/actions/action_4daf4ds8g.php", {
							roomUrl: document.URL,
							key: rurl,
							set_fb: msg
						}, function(data) {

							API.sendChat(window.nbot_emote + window.nbot_nLANG.success);
							nBOTChat(window.nbot_nLANG.success)

						});

					}

				}



				/* Facebook page */
				else if(msgSecond === "rules") {
					if(msgSetting.length === 0) {

						API.sendChat(window.nbot_emote + window.nbot_nLANG.failed);
						nBOTChat(window.nbot_nLANG.failed);

					} else {



						$.post("https://origem-bot.tk/get/actions/action_4daf4ds8g.php", {
							roomUrl: document.URL,
							key: rurl,
							set_rules: msg
						}, function(data) {
							API.sendChat(window.nbot_emote + window.nbot_nLANG.success);
							nBOTChat(window.nbot_nLANG.success);
						});

					}

				}

				/* Nastavenie jazyka */
				else if(msgSecond === "lang") {

					if(($.inArray(msgSetting, window.nbot_availableLangs) !== -1)) {

						window.nbot_narcisBotLang = msgSetting;
						$.post("https://origem-bot.tk/get/actions/action_4daf4ds8g.php", {
							roomUrl: document.URL,
							key: rurl,
							lang: msgSetting
						}, function(data) {
							API.sendChat(window.nbot_emote + window.nbot_nLANG.lang_changed);
							nBOTChat(window.nbot_nLANG.lang_changed);
						});
					} else {
						API.sendChat(window.nbot_emote + window.nbot_nLANG.failed);
					}

				}




				/* Nastavenie oprávnení pre príkazy */
				else if(msgSecond === "cp") {

					if((msgPermission === "cohost") || (msgPermission === "manager") || (msgPermission === "bouncer") || (msgPermission == "user")) {
						$.post("https://origem-bot.tk/get/actions/action_4daf4ds8g.php", {
							roomUrl: document.URL,
							key: rurl,
							command: msgSetting,
							permission: msgPermission
						}, function(data) {
							API.sendChat(window.nbot_emote + window.nbot_nLANG.success);
							nBOTChat(window.nbot_nLANG.success);

						});
					} else {
						API.sendChat(window.nbot_emote + window.nbot_nLANG.failed);
						nBOTChat(window.nbot_nLANG.failed);
					}

				}


				/* Nastavenie mena nBota */
				else if(msgSecond === "botname") {

					var mojbotik = msgSetting.cleanup();

					$.post("https://origem-bot.tk/get/actions/action_4daf4ds8g.php", {
						roomUrl: document.URL,
						key: rurl,
						mybotname: mojbotik
					}, function(data) {
						API.sendChat(window.nbot_emote + window.nbot_nLANG.success);
						nBOTChat(window.nbot_nLANG.success);

					});
					window.nbot_narcisBotMeno = mojbotik;

				}


				/* Nastavenie limitu songu */
				else if(msgSecond === "songlimit") {
					if(/^\d+$/.test(msgSetting)) {
						if(msgSetting > 60) {
							window.nbot_songLimit = msgSetting;
							$.post("https://origem-bot.tk/get/actions/action_4daf4ds8g.php", {
								roomUrl: document.URL,
								key: rurl,
								set_songlimit: window.nbot_songLimit
							}, function(data) {


								API.sendChat(window.nbot_emote + window.nbot_nLANG.success);
								nBOTChat(window.nbot_nLANG.success);
							});

						} else {
							API.sendChat(window.nbot_emote + window.nbot_nLANG.failed);
							nBOTChat(window.nbot_nLANG.failed);
						}

					} else {
						API.sendChat(window.nbot_emote + window.nbot_nLANG.error_set_songlimit_1);
						nBOTChat(window.nbot_nLANG.error_set_songlimit_1);
					}


				}

			};

			return mycustomsettings;

		})(Command);



		/*
    Zistiť aktuálny stav mojich POINTS 
    !swap
*/
		swap = (function(_super) {
			__extends(swap, _super);

			function swap() {
				_swap = swap.__super__.constructor.apply(this, arguments);
				return _swap;
			}

			swap.prototype.init = function() {
				this.command = window.nbot_cmdTrigger + 'swap';
				this.parseType = 'startsWith';
				return this.rankPrivelege = window.nbot_Perm_skip;
			};

			swap.prototype.functionality = function() {

				var message = this.msgData.message.split(" ");

				if(message[1].indexOf("@") !== -1) {
					var dj_prvy_moveType = "username";
				} else {
					var dj_prvy_moveType = "waitlist";
				}

				if(message[2].indexOf("@") !== -1) {
					var dj_druhy_moveType = "username";
				} else {
					var dj_druhy_moveType = "waitlist";
				}

				if(dj_prvy_moveType == "username") {
					var dj_prvy = message[1].replace("@", "");
					for(i = 0; i < API.getUsers().length; i++) {
						if(API.getUsers()[i].username === dj_prvy) {
							var dj_prvy_id = API.getUsers()[i].id;
							break;
						}
					}
					var dj_prvy_position = API.getWaitListPosition(dj_prvy_id) + 1;

				} else if(dj_prvy_moveType == "waitlist") {
					var dj_prvy_id = API.getWaitList()[message[1] - 1].id;
					var dj_prvy_position = message[1];
				}

				if(dj_druhy_moveType == "username") {
					var dj_druhy = message[2].replace("@", "");
					for(i = 0; i < API.getUsers().length; i++) {
						if(API.getUsers()[i].username === dj_druhy) {
							var dj_druhy_id = API.getUsers()[i].id;
							break;
						}
					}
					var dj_druhy_position = API.getWaitListPosition(dj_druhy_id) + 1;

				} else if(dj_druhy_moveType == "waitlist") {

					var dj_druhy_id = API.getWaitList()[message[2] - 1].id;
					var dj_druhy_position = message[2];
				}

				API.moderateMoveDJ(dj_prvy_id, dj_druhy_position);
				API.moderateMoveDJ(dj_druhy_id, dj_prvy_position);
			};

			return swap;

		})(Command);



		/*
    Posunúť DJ-a vo WaitListe 
    !move
*/
		moveDJ = (function(_super) {
			__extends(moveDJ, _super);

			function moveDJ() {
				_moveDJ = moveDJ.__super__.constructor.apply(this, arguments);
				return _moveDJ;
			}

			moveDJ.prototype.init = function() {
				this.command = window.nbot_cmdTrigger + 'move';
				this.parseType = 'startsWith';
				return this.rankPrivelege = window.nbot_Perm_move;
			};

			moveDJ.prototype.functionality = function() {
				var msg, dj, position, tohtomove;
				msg = this.msgData.message;
				msgArr = msg.split(' ');
				dj = msgArr[1].replace("@", "");
				position = Number(msgArr[2]);

				users = API.getUsers();
				var len = users.length;
				for(var i = 0; i < len; ++i) {
					if(users[i].username === dj) {
						tohtomove = "" + users[i].id + "";
					}
				}
				API.moderateMoveDJ(tohtomove, position)
			};

			return moveDJ;

		})(Command);



		/*
    Vrátiť sa späť do WaitListu po stratní spojenia 
    !dc
*/
		timeback = (function(_super) {
			__extends(timeback, _super);

			function timeback() {
				_timeback = timeback.__super__.constructor.apply(this, arguments);
				return _timeback;
			}

			timeback.prototype.init = function() {
				this.command = window.nbot_cmdTrigger + 'dc';
				this.parseType = 'startsWith';
				return this.rankPrivelege = window.nbot_Perm_dc;
			};

			timeback.prototype.functionality = function() {
				var kto, kde, pozicia;
				pocetLudiWoWatitListe = API.getWaitList().length;
				kto = this.msgData.uid;
				ktoNick = this.msgData.un;
				kde = rurl;

				dcLookUp(ktoNick, kto, rurl, true);
			}

			return timeback;

		})(Command);


		/*
    Vypísanie oprávnení pre príkazy 
    !getcp
*/
		getcp = (function(_super) {
			__extends(getcp, _super);

			function getcp() {
				_getcp = getcp.__super__.constructor.apply(this, arguments);
				return _getcp;
			}

			getcp.prototype.init = function() {
				this.command = window.nbot_cmdTrigger + 'getcp';
				this.parseType = 'startsWith';
				return this.rankPrivelege = 'manager';
			};

			getcp.prototype.functionality = function() {
				nBOTChat("<i>!cohost: " + window.nbot_Perm_cohost + "</i>", true);
				nBOTChat("<i>!manager: " + window.nbot_Perm_manager + "</i>", true);
				nBOTChat("<i>!bouncer: " + window.nbot_Perm_bouncer + "</i>", true);
				nBOTChat("<i>!resident: " + window.nbot_Perm_resident + "</i>", true);
				nBOTChat("<i>---------------------------------" + "</i>", true);

				nBOTChat("<i>!filter: " + window.nbot_Perm_filter + "</i>", true);
				nBOTChat("<i>!wlfilter: " + window.nbot_Perm_wlfilter + "</i>", true);
				nBOTChat("<i>!lock: " + window.nbot_Perm_lock + "</i>", true);
				nBOTChat("<i>!unlock: " + window.nbot_Perm_unlock + "</i>", true);
				nBOTChat("<i>!clearwaitlist: " + window.nbot_Perm_clearwaitlist + "</i>", true);
				nBOTChat("<i>---------------------------------" + "</i>", true);

				nBOTChat("<i>!songban: " + window.nbot_Perm_songban + "</i>", true);
				nBOTChat("<i>!songunban: " + window.nbot_Perm_songunban + "</i>", true);
				nBOTChat("<i>!move: " + window.nbot_Perm_move + "</i>", true);
				nBOTChat("<i>!skip: " + window.nbot_Perm_skip + "</i>", true);
				nBOTChat("<i>!ban: " + window.nbot_Perm_ban + "</i>", true);
				nBOTChat("<i>!dc: " + window.nbot_Perm_dc + "</i>", true);
				nBOTChat("<i>!mute: " + window.nbot_Perm_mute + "</i>", true);
				nBOTChat("<i>!unmute: " + window.nbot_Perm_unmute + "</i>", true);
				nBOTChat("<i>!voteskip: " + window.nbot_Perm_voteskip + "</i>", true);
				nBOTChat("<i>---------------------------------" + "</i>", true);

				nBOTChat("<i>!die: " + window.nbot_Perm_die + "</i>", true);
				nBOTChat("<i>!reload: " + window.nbot_Perm_reload + "</i>", true);
				nBOTChat("<i>!skiphistory: " + window.nbot_Perm_skiphistory + "</i>", true);
				nBOTChat("<i>!set: " + window.nbot_Perm_set + "</i>", true);
				nBOTChat("<i>!clearchat: " + window.nbot_Perm_clearchat + "</i>", true);
				nBOTChat("<i>!hidecommands: " + window.nbot_Perm_hidecommands + "</i>", true);
				nBOTChat("<i>---------------------------------" + "</i>", true);

				nBOTChat("<i>!roulette: " + window.nbot_Perm_roulette + "</i>", true);
				nBOTChat("<i>!stoproulette: " + window.nbot_Perm_stoproulette + "</i>", true);
				nBOTChat("<i>!msg: " + window.nbot_Perm_msg + "</i>", true);
				nBOTChat("<i>!play: " + window.nbot_Perm_play + "</i>", true);
				nBOTChat("<i>!bot woot : " + window.nbot_Perm_botwoot + "</i>", true);
				nBOTChat("<i>!afks: " + window.nbot_Perm_afks + "</i>", true);
				nBOTChat("<i>!help: " + window.nbot_Perm_help + "</i>", true);
				nBOTChat("<i>!swap: " + window.nbot_Perm_swap + "</i>", true);
				nBOTChat("<i>!roomstats: " + window.nbot_Perm_roomstats + "</i>", true);
				nBOTChat("<i>!players: " + window.nbot_Perm_players + "</i>", true);
			}

			return getcp;

		})(Command);


		/*
    Skrývanie príkazov 
    !hidecommands
*/
		deletecommand = (function(_super) {
			__extends(deletecommand, _super);

			function deletecommand() {
				_deletecommand = deletecommand.__super__.constructor.apply(this, arguments);
				return _deletecommand;
			}

			deletecommand.prototype.init = function() {
				this.command = window.nbot_cmdTrigger + 'hidecommands';
				this.parseType = 'startsWith';
				return this.rankPrivelege = window.nbot_Perm_hidecommands;
			};

			deletecommand.prototype.functionality = function() {
				var msg, nastavenie;
				msg = this.msgData.message;
				msgArr = msg.split(' ');
				nastavenie = msgArr[1];
				if(nastavenie === "on") {
					nBOTChat(window.nbot_nLANG.success);
					API.sendChat(window.nbot_emote + window.nbot_nLANG.success);
					window.nbot_dltcmd = 1;
					$.post("https://origem-bot.tk/get/actions/action_4daf4ds8g.php", {
						roomUrl: document.URL,
						key: rurl,
						set_hidecommands: "on"
					}, function(data) {});
				} else if(nastavenie == "off") {
					nBOTChat(window.nbot_nLANG.success);
					API.sendChat(window.nbot_emote + window.nbot_nLANG.success);
					window.nbot_dltcmd = 0;
					$.post("https://origem-bot.tk/get/actions/action_4daf4ds8g.php", {
						roomUrl: document.URL,
						key: rurl,
						set_hidecommands: "off"
					}, function(data) {});
				} else {
					API.sendChat(window.nbot_emote + window.nbot_nLANG.error_hidecommands);
					nBOTChat(window.nbot_nLANG.error_hidecommands);
				}
			};

			return deletecommand;

		})(Command);


		/*
    Skipovanie songov, ktoré už sú v histórií 
    !skiphistory
*/
		skipHistory = (function(_super) {
			__extends(skipHistory, _super);

			function skipHistory() {
				_skipHistory = skipHistory.__super__.constructor.apply(this, arguments);
				return _skipHistory;
			}

			skipHistory.prototype.init = function() {
				this.command = window.nbot_cmdTrigger + 'skiphistory';
				this.parseType = 'startsWith';
				return this.rankPrivelege = window.nbot_Perm_skiphistory;
			};

			skipHistory.prototype.functionality = function() {
				var msg, nastavenie;
				msg = this.msgData.message;
				msgArr = msg.split(' ');
				nastavenie = msgArr[1];
				if(nastavenie === "on") {
					nBOTChat(window.nbot_nLANG.success);
					API.sendChat(window.nbot_emote + window.nbot_nLANG.success);
					window.nbot_skipInHistory = 1;
				} else if(nastavenie == "off") {
					nBOTChat(window.nbot_nLANG.success);
					API.sendChat(window.nbot_emote + window.nbot_nLANG.success);
					window.nbot_skipInHistory = 0;
				} else {
					API.sendChat(window.nbot_emote + window.nbot_nLANG.error_skiphistory);
				}
			};

			return skipHistory;

		})(Command);

		/*
    Skipovanie songov, ktoré už sú v histórií 
    !commandlog
*/
		commandlog = (function(_super) {
			__extends(commandlog, _super);

			function commandlog() {
				_commandlog = commandlog.__super__.constructor.apply(this, arguments);
				return _commandlog;
			}

			commandlog.prototype.init = function() {
				this.command = window.nbot_cmdTrigger + 'commandlog';
				this.parseType = 'startsWith';
				return this.rankPrivelege = window.nbot_Perm_autodc;
			};

			commandlog.prototype.functionality = function() {
				var msg, nastavenie;
				msg = this.msgData.message;
				msgArr = msg.split(' ');
				nastavenie = msgArr[1];
				if(nastavenie === "on") {

					nBOTChat(window.nbot_nLANG.success);
					API.sendChat(window.nbot_emote + window.nbot_nLANG.success);
					window.nbot_commandLog = 1;
					$.post("https://origem-bot.tk/get/actions/action_4daf4ds8g.php", {
						roomUrl: document.URL,
						key: rurl,
						set_commandlog: "on"
					}, function(data) {});

				} else if(nastavenie == "off") {

					nBOTChat(window.nbot_nLANG.success);
					API.sendChat(window.nbot_emote + window.nbot_nLANG.success);
					window.nbot_commandLog = 0;
					$.post("https://origem-bot.tk/get/actions/action_4daf4ds8g.php", {
						roomUrl: document.URL,
						key: rurl,
						set_commandlog: "off"
					}, function(data) {});

				} else {

					API.sendChat(window.nbot_emote + window.nbot_nLANG.failed);
					nBOTChat(window.nbot_nLANG.failed);
				}
			};

			return commandlog;

		})(Command);

		/*
    Skipovanie songov, ktoré už sú v histórií 
    !autodc
*/
		autodc = (function(_super) {
			__extends(autodc, _super);

			function autodc() {
				_skipHistory = autodc.__super__.constructor.apply(this, arguments);
				return _skipHistory;
			}

			autodc.prototype.init = function() {
				this.command = window.nbot_cmdTrigger + 'autodc';
				this.parseType = 'startsWith';
				return this.rankPrivelege = window.nbot_Perm_autodc;
			};

			autodc.prototype.functionality = function() {
				var msg, nastavenie;
				msg = this.msgData.message;
				msgArr = msg.split(' ');
				nastavenie = msgArr[1];
				if(nastavenie === "on") {

					nBOTChat(window.nbot_nLANG.success);
					API.sendChat(window.nbot_emote + window.nbot_nLANG.success);
					window.nbot_autodcsystem = 1;
					$.post("https://origem-bot.tk/get/actions/action_4daf4ds8g.php", {
						roomUrl: document.URL,
						key: rurl,
						set_autodc: "on"
					}, function(data) {});

				} else if(nastavenie == "off") {
					nBOTChat(window.nbot_nLANG.success);
					API.sendChat(window.nbot_emote + window.nbot_nLANG.success);
					window.nbot_autodcsystem = 0;
					$.post("https://origem-bot.tk/get/actions/action_4daf4ds8g.php", {
						roomUrl: document.URL,
						key: rurl,
						set_autodc: "off"
					}, function(data) {});
				} else {

					API.sendChat(window.nbot_emote + window.nbot_nLANG.failed);
					nBOTChat(window.nbot_nLANG.failed);
				}
			};

			return autodc;

		})(Command);

		/*
    Štatistika komunity (iba ak sú zapnuté správy štatistík)
    !roomstats
*/
		roomstats = (function(_super) {
			__extends(roomstats, _super);

			function roomstats() {
				_roomstats = roomstats.__super__.constructor.apply(this, arguments);
				return _roomstats;
			}

			roomstats.prototype.init = function() {
				this.command = window.nbot_cmdTrigger + 'roomstats';
				this.parseType = 'exact';
				return this.rankPrivelege = window.nbot_Perm_roomstats;
			};

			roomstats.prototype.functionality = function() {
				API.sendChat(window.nbot_emote + window.nbot_nLANG.room_stats + " :thumbsup:" + window.nbot_totalwoots + " | :star:" + window.nbot_totalgrabs + " | :thumbsdown:" + window.nbot_totalmehs);
				nBOTChat(window.nbot_nLANG.room_stats + " :thumbsup:" + window.nbot_totalwoots + " | :star:" + window.nbot_totalgrabs + " | :thumbsdown:" + window.nbot_totalmehs);
			};

			return roomstats;

		})(Command);




		/*
    Zobrazenie ľudí, ktorý nehlasujú
    !ShowMeUglyDJs
*/
		getNoVotingDJs = (function(_super) {
			__extends(getNoVotingDJs, _super);

			function getNoVotingDJs() {
				_getNoVotingDJs = getNoVotingDJs.__super__.constructor.apply(this, arguments);
				return _getNoVotingDJs;
			}

			getNoVotingDJs.prototype.init = function() {
				this.command = window.nbot_cmdTrigger + 'ShowMeUglyDJs';
				this.parseType = 'exact';
				return this.rankPrivelege = 'cohost';
			};

			getNoVotingDJs.prototype.functionality = function() {

				window.nbot_UglyDJs.length = 0;

				for(var r = window.nbot_NoWootDJs.length - 1; r >= 0; r--) {
					var IdToNick = API.getUser(window.nbot_NoWootDJs[r]).username;
					window.nbot_UglyDJs.push(IdToNick);
				};
				API.sendChat(window.nbot_emote + "Ugly DJ's: " + window.nbot_UglyDJs.join(" | "));
			};

			return getNoVotingDJs;

		})(Command);

		cmds = [downloadpoints, cookie, duel, duelAccept, commandlog, download, autodc, autoroulette, rules, pingCmd, lockskip, fb, roll, getcp, players, getNoVotingDJs, wlfilter, clearchat, roomstats, mute, unmute, mycustomsettings, songunban, skipHistory, deletecommand, timeback, moveDJ, cancelroulette, msgcommand, cohost, cmanager, cbouncer, cresidentdj, swap, ban, songban, lockbooth, unlockbooth, lockremove, filter, voteskip, roulette, play, botwoot, die, reload, skip, help];

		chatCommandDispatcher = function(chat) {
			window.nbot_cmdStartCas = new Date();
			var c, cmd, _i, _len, _results;
			chatUniversals(chat);
			_results = [];

			if(window.nbot_dltcmd === 1) {
				var cmdTimeout = 800;
				if(chat.message.charAt(0) === window.nbot_cmdTrigger) {
					narcisDeleteChat(chat.cid);
					setTimeout(function() {
						nBOTChat("<i>" + chat.un + " used " + chat.message + "</i>");
					}, 500);

				}
			} else {
				var cmdTimeout = 0;
			}

			talk("" + chat.message + "", chat.un);

			setTimeout(function() {


				for(_i = 0; _i < cmds.length; _i++) {
					cmd = cmds[_i];
					c = new cmd(chat);

					if(c.evalMsg()) {

						break;

					} else {

						_results.push(void 0);
					}
				}

			}, cmdTimeout);


			roomName = encodeURIComponent($("#room-name").children().text());


			return _results;
		};

		updateVotes = function(obj) {

			window.nbot_currentwoots = API.getScore().positive;
			window.nbot_currentmehs = API.getScore().negative;
			window.nbot_currentcurates = API.getScore().grabs;
			window.nbot_currentDJ = API.getDJ().username;
		};

		announceCurate = function(obj) {
			if(window.nbot_grabMessage === 1) {
				API.sendChat(window.nbot_emote + "" + obj.user.username + " " + window.nbot_nLANG.grab_detected);
				nBOTChat("" + obj.user.username + " " + window.nbot_nLANG.grab_detected);

			}
		};

		handleUserJoin = function(user) {
			data.userJoin(user);
			/*      data.users[user.id].updateActivity();*/

			if(window.nbot_lastJoinMessage !== user.username) {
				if(window.nbot_msgWelcome_engine === 1) {
					window.nbot_welcomeMessage_settedMSG = window.nbot_welcomeMessage_settedMSG_zaloha.replace("@", "@" + user.username);

					setTimeout(function() {
						API.sendChat(window.nbot_emote + window.nbot_welcomeMessage_settedMSG);
						nBOTChat(window.nbot_welcomeMessage_settedMSG);
					}, 1000);
				}
				window.nbot_lastJoinMessage = user.username;

			}

			if(window.nbot_autodcsystem === 1) {
				dcLookUp(user.username, user.id, rurl, false);
			}


		};

		handleNewSong = function(obj) {
			var songId;

			motd(window.nbot_motdMessage, window.nbot_motdInterval);

			/* Je už song v histórií? */
			isInHistory();

			/* Je song zabanovaný? */
			checkBanned();


			vyfiltrujWaitList();

			/* Aktualizovať WaitList pre !dc */
			setTimeout(ulozitWaitList, 10000);



			/* Vymazanie dát z Voteskip */
			window.nbot_Hlasujuci = [];
			window.nbot_skipVotes = 0;

			/* Ešte neboli poslané štatistiky */
			window.nbot_poslaneStatistiky = 0;


			var pi = 0;
			var zi = 0;

			if(data.currentsong === null) {
				return;
			} else {

				/* Skipnúť song, ak je dlhší ako je nastavené */
				if(obj.media.duration > window.nbot_songLimit) {
					API.moderateForceSkip();
					API.sendChat(window.nbot_emote + window.nbot_nLANG.skip_long_song);
					nBOTChat(window.nbot_nLANG.skip_long_song);
				}

				if(window.nbot_statsMessage === 1) {
					API.sendChat(window.nbot_emote + "" + obj.lastPlay.dj.username + " [:thumbsup:" + obj.lastPlay.score.positive + " | :star:" + obj.lastPlay.score.grabs + " | :thumbsdown:" + obj.lastPlay.score.negative + " ]");
					nBOTChat("" + obj.lastPlay.dj.username + " [:thumbsup:" + obj.lastPlay.score.positive + " | :star:" + obj.lastPlay.score.grabs + " | :thumbsdown:" + obj.lastPlay.score.negative + " ]");

				} //ak su zapnute statistiky    
				$.post(
					"https://origem-bot.tk/get/actions/action_2a1fsas98s.php", {
						woots: obj.lastPlay.score.positive,
						grabs: obj.lastPlay.score.grabs,
						mehs: obj.lastPlay.score.negative,
						eURL: document.URL,
						eRoomName: roomName
					},

					function(data) {}

				);

				saveSongToDatabase(obj.lastPlay.media.author, obj.lastPlay.media.title, obj.lastPlay.dj.username, obj.lastPlay.score.positive, obj.lastPlay.score.grabs, obj.lastPlay.score.negative, obj.lastPlay.media.cid, obj.lastPlay.dj.id);

				window.nbot_totalwoots = eval(window.nbot_totalwoots) + eval(obj.lastPlay.score.positive);
				window.nbot_totalmehs = eval(window.nbot_totalmehs) + eval(obj.lastPlay.score.negative);
				window.nbot_totalgrabs = eval(window.nbot_totalgrabs) + eval(obj.lastPlay.score.grabs);

				window.nbot_currentwoots = 0;
				window.nbot_currentcurates = 0;
				window.nbot_currentmehs = 0;

			}

		};



		handleVote = function(obj) {
			var spoluWootov = spoluWootov++;

			if(obj.vote === -1) {
				removeMeFromNoWootingDJs(obj.user.id);
				var vsetci = API.getUsers().length;
				var CisloVHlasujucich = $.inArray(obj.user.username, window.nbot_Hlasujuci);

				if(CisloVHlasujucich === -1) {
					window.nbot_Hlasujuci.push(obj.user.username);
					window.nbot_skipVotes++;
					var musibyt = window.nbot_voteskipCount;


					if(window.nbot_skipVotes === Number(musibyt)) {
						API.sendChat(window.nbot_emote + " " + window.nbot_skipVotes + "/" + musibyt + window.nbot_nLANG.voteskip_1);
						nBOTChat(window.nbot_skipVotes + "/" + musibyt + window.nbot_nLANG.voteskip_1);
						API.moderateForceSkip();
						window.nbot_skipVotes = 0;
						window.nbot_Hlasujuci = [];
					}

				} else {
					API.sendChat(window.nbot_emote + ":warning: @" + obj.user.username + " " + window.nbot_nLANG.voteskip_2);
					nBOTChat(":warning: @" + obj.user.username + " " + window.nbot_nLANG.voteskip_2);
				}

			} else if(obj.vote === 1) {
				/* voteskip */
				var mojePoziciaVSkipVotes = window.nbot_Hlasujuci.indexOf(obj.user.username);
				if(mojePoziciaVSkipVotes > -1) {
					window.nbot_Hlasujuci.splice(mojePoziciaVSkipVotes, 1);
					if(window.nbot_skipVotes > 0) {
						window.nbot_skipVotes--;
					}
				}

				/* waitlist filter remove from */
				removeMeFromNoWootingDJs(obj.user.id);
			}



			/*    data.users[obj.user.id].updateActivity();*/

		};

		handleUserLeave = function(user) {
			var disconnectStats, i, u, _i, _len, _ref31;
			disconnectStats = {
				id: user.id,
				time: new Date(),
				songCount: data.songCount
			};
			i = 0;
			_ref31 = data.internalWaitlist;
			for(_i = 0; _i < _ref31.length; _i++) {
				u = _ref31[_i];
				if(u.id === user.id) {
					disconnectStats['waitlistPosition'] = i - 1;
					data.setInternalWaitlist();
					break;
				} else {
					i++;
				}
			}
			//API.sendChat(window.nbot_emote+"/em: "+user.username+" tu už nieje");

			data.userDisconnectLog.push(disconnectStats);
			return data.users[user.id].inRoom(false);
		};

		beggar = function(chat) {
			var msg, r, responses;
			msg = chat.message.toLowerCase();

			if(window.nbot_LastMessage === msg && window.nbot_slusnost == 1) {

				narcisDeleteChat(chat.cid);

			} else {

				window.nbot_LastMessage = msg;

			} // antispam

			
			if(window.nbot_badWordsFilterEngine == 1){
				if(window.nbot_badwords.length > 1){

					for (var i = window.nbot_badwords.length - 1; i >= 0; i--) {
						if(msg.replace(/(\w)\1+/g, "$1").indexOf(window.nbot_badwords[i]) > -1){
							narcisDeleteChat(chat.cid);
							API.sendChat(window.nbot_emote+window.nbot_nLANG.bw_4.replace("%%MENTION%%", "@"+chat.un));
						}
					};
					
				}
			}



		};

		chatUniversals = function(chat) {
			data.activity(chat);

			return beggar(chat);
		};

		hook = function(apiEvent, callback) {
			return API.on(apiEvent, callback);
		};

		unhook = function(apiEvent, callback) {
			return API.off(apiEvent, callback);
		};

		apiHooks = [{
			'event': API.SCORE_UPDATE,
			'callback': updateVotes
		}, {
			'event': API.GRAB_UPDATE,
			'callback': announceCurate
		}, {
			'event': API.USER_JOIN,
			'callback': handleUserJoin
		}, {
			'event': API.ADVANCE,
			'callback': handleNewSong
		}, {
			'event': API.VOTE_UPDATE,
			'callback': handleVote
		}, {
			'event': API.CHAT,
			'callback': chatCommandDispatcher
		}, {
			'event': API.USER_LEAVE,
			'callback': handleUserLeave
		}];

		initHooks = function() {
			var pair, _i, _len, _results;
			_results = [];
			for(_i = 0; _i < apiHooks.length; _i++) {
				pair = apiHooks[_i];
				_results.push(hook(pair['event'], pair['callback']));
			}
			return _results;
		};

		undoHooks = function() {
			var pair, _i, _len, _results;
			_results = [];
			for(_i = 0; _i < apiHooks.length; _i++) {
				pair = apiHooks[_i];
				_results.push(unhook(pair['event'], pair['callback']));
			}

			return _results;
		};


		initialize();




	}).call(this);



	function isInHistory() {
		if(window.nbot_skipInHistory === 1) {
			window.nbot_PoslednychDesatSongov = [];

			if(API.getHistory().length > window.nbot_historyLimit) {

				for(var hi = 1; hi <= window.nbot_historyLimit; hi++) {
					window.nbot_PoslednychDesatSongov.push(API.getHistory()[hi].media.title);
				};

				var mediaa = API.getMedia();

				window.nbot_AktualnySong = mediaa.title;

				if(($.inArray(window.nbot_AktualnySong, window.nbot_PoslednychDesatSongov) > -1)) {
					API.sendChat(window.nbot_emote + window.nbot_nLANG.song_in_history);
					nBOTChat(window.nbot_nLANG.song_in_history);
					API.moderateForceSkip();
				}

			}
		} else {
			return;
		}
	}

	function vyhlasVitaza() {
		var pocetVsetkychLudi = API.getUsers().length;
		var VsetciLudia = API.getUsers();

		var kolesoStastiaCislo = Math.floor(Math.random() * window.nbot_KolesoStastiaHraci.length);

		API.sendChat(window.nbot_emote + window.nbot_nLANG.roulette_6.replace("%%MENTION%%", window.nbot_KolesoStastiaHraci[kolesoStastiaCislo]));
		nBOTChat(window.nbot_nLANG.roulette_6.replace("%%MENTION%%", window.nbot_KolesoStastiaHraci[kolesoStastiaCislo]));

		for(_ksus = 0; _ksus < API.getUsers().length; _ksus++) {
			if(API.getUsers()[_ksus].username === window.nbot_KolesoStastiaHraci[kolesoStastiaCislo]) {
				var tentoDJ = API.getUsers()[_ksus].id;

				API.moderateMoveDJ(tentoDJ, 1);
			}

		}

		window.nbot_KolesoStastiaHraci = [];
		window.nbot_KolesoStastia = 0;

	}

	function checkBanned() {
		var e, eAuthor, eTitle, msg;
		e = encodeURIComponent;
		eKey = e(API.getMedia().cid);

		$.post(
			"https://origem-bot.tk/get/actions/action_x879af1d56g.php", {
				videoKey: eKey,
				url: document.URL
			},

			function(data) {
				if(data === "banned") {
					API.sendChat(window.nbot_emote + window.nbot_nLANG.song_banned);
					nBOTChat(window.nbot_nLANG.song_banned);
					API.moderateForceSkip();
				}
			}

		);
	}

	function updateLivePLay() {

		if(typeof API.getDJ() !== "undefined") {
			var author, title, dj;
			if(API.getMedia() !== undefined) {
				author = API.getMedia().author;
				title = API.getMedia().title;
			}

			roomName = encodeURIComponent($("#room-name").children().text());
			$.post(
				"https://origem-bot.tk/get/actions/action_4daf4ds8g.php", {
					eAuthor: author,
					eTitle: title,
					songKey: API.getMedia().cid,
					roomUrl: document.URL,
					key: rurl,
					eRoomName: roomName
				},

				function(data) {
					return true;
				}

			);
		}
	}

	function saveSongToDatabase(author, title, dj, w, g, m, key, euid) {

		roomName = encodeURIComponent($("#room-name").children().text());


		$.post(
			"https://origem-bot.tk/get/actions/action_9a8s7f9as4f5.php", {
				eAuthor: author,
				eTitle: title,
				eDJ: dj,
				eUid: euid,
				songKey: key,
				stats: w + "," + g + "," + m,
				eURL: document.URL,
				eRoomName: roomName
			},

			function(data) {}

		);
	}


	dcinterval = setInterval(function() {

		if(API.getWaitList().length < 50) {

			if(window.nbot_waitingUsersForDC.length > 0) {

				API.moderateAddDJ(window.nbot_waitingUsersForDC[0].id);

				setTimeout(function() {
					API.moderateMoveDJ(window.nbot_waitingUsersForDC[0].id, window.nbot_waitingUsersForDC[0].position);

					setTimeout(function() {
						window.nbot_waitingUsersForDC.shift();
						API.moderateLockWaitList(false, false);
					}, 1000);

				}, 1000);

			}
		}

	}, 2000);




	clearInterval(skontrolujAktivnostBota);
	clearInterval(zapisLiveSong);
	clearInterval(window.nbot_autoRouletteInterval);
	window.nbot_poslaneStatistiky = 0;

	var skontrolujAktivnostBota = setInterval(checkActiveBot, 300000);
	var zapisLiveSong = setInterval(updateLivePLay, 60000);


}