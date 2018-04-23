(function() {

	if(typeof NBOT !== "undefined"){
		return false;
	} else {

	var narcisUnmuteUser,
	toggleEmoteChat,
	toggleAI,
	talk_getAnswer,
	motd,
	narcisDeleteChat,
	prevod_diakritiky,
	talk,
	lookupUser,
	ulozitWaitList,
	vymazIntervalDC,
	removeMeFromNoWootingDJs,
	addMeFromNoWootingDJs,
	vyfiltrujWaitList,
	beggar,
	koekjes,
	ping,
	updateVotes,
	updateLivePLay,
	checkNewVersion,
	handleNewSong;

	String.prototype.cleanup = function() {
		return this.replace(/[^a-zA-Z0-9]+/g, "-");
	}

	checkNewVersion = function(){
		console.log("Hello world!");
	};

	window.zobrazitControlPanel = function(id) {
		$("#" + id).show().css('right', function() {
			return $(this).offset().right;
		}).animate({
			"right": "0px",
		}, 250, "linear");
	}

	window.skrytControlPanel = function(id) {
		$("#" + id).animate({
			right: "-385px"
		}, function() {
			$(this).hide();
		});
	}
	window.showNBOTLoader = function() {
		$("#nbot_panel_loader").show();
	}
	window.hideNBOTLoader = function() {
		$("#nbot_panel_loader").hide();
	}

	narcisUnmuteUser = function(userID) {
		$.ajax({
			url: "https://plug.dj/_/mutes/" + userID,
			type: 'DELETE'
		});
	}

	window.escapeHtml = function(text) {
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

	lookupUser = function(username){
		var id, u, _ref;
		_ref = API.getUsers();

		for(id in _ref){
			u = _ref[id];
			if(_ref[id].username === username){
				return _ref[id];
				break;
			}
		}
		return false;
	}


	window.toggleBadWordsFilter = function() {
		window.showNBOTLoader();
		setTimeout(function() {
			window.hideNBOTLoader();
		}, 1500);

		if(NBOT.settings.engine.badwords == 1) {
			NBOT.settings.engine.badwords = 0;
			$(".nbot_toggleBadWordsFilter .icon").hide();
			NBOT.post("get/actions/action_4daf4ds8g.php", {
				roomUrl: document.URL,
				key: window.nbot_nBOTpassword,
				set_bwEngine: "0"
			});

		} else if(NBOT.settings.engine.badwords == 0) {
			NBOT.settings.engine.badwords = 1;
			$(".nbot_toggleBadWordsFilter .icon").show();
			NBOT.post("get/actions/action_4daf4ds8g.php", {
				roomUrl: document.URL,
				key: window.nbot_nBOTpassword,
				set_bwEngine: "1"
			});
		}


	}

	window.toggleEmoteChat = function() {
		window.showNBOTLoader();
		setTimeout(function() {
			window.hideNBOTLoader();
		}, 1500);
		if(NBOT.settings.engine.emote == "/em ") {
			NBOT.settings.engine.emote = "";
			$(".nbot_toggleEmoteChat .icon").hide();

			NBOT.post("get/actions/action_4daf4ds8g.php", {
				roomUrl: document.URL,
				key: window.nbot_nBOTpassword,
				set_emote_chat: ""
			});

		} else {
			NBOT.settings.engine.emote = "/em ";
			$(".nbot_toggleEmoteChat .icon").show();

			NBOT.post("get/actions/action_4daf4ds8g.php", {
				roomUrl: document.URL,
				key: window.nbot_nBOTpassword,
				set_emote_chat: "/em "
			});
		}
	}

	window.toggleAI = function() {
		if(NBOT.settings.aiFile_engine == 1) {
			NBOT.settings.aiFile_engine = 0;
			$(".nbot_toggleAI .icon").hide();
			$("#onAIEngineOn").hide();
		} else {
			NBOT.settings.aiFile_engine = 1;
			$(".nbot_toggleAI .icon").show();
			$("#onAIEngineOn").show();
		}
	}

	talk_getAnswer = function(from, w) {
		$.get("https://origem-bot.tk/ai/getAnswer.php", {
			word: w
		}, function(reply) {
			API.sendChat(NBOT.settings.engine.emote + "@" + from + " " + reply);
			NBOT.settings.aiFile_lastfrom = from;
		});
	}


	narcisDeleteChat = function(chatID) {
		$.ajax({
			url: 'https://plug.dj/_/chat/' + chatID,
			type: 'DELETE'
		});

	};


	prevod_diakritiky = function(text) {

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

	ulozitWaitList = function() {

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

			window.nbot_globalWaitlist.push(wlArr[i].id + "," + rpos + "," + window.nbot_nBOTpassword + "," + rname + "," + API.getDJ().id);

		}

		NBOT.post(
			"get/actions/action_s8d4g1s56g.php", {
				WaitList: window.nbot_globalWaitlist,
				Room: encodeURIComponent(document.URL),
				Key: window.nbot_nBOTpassword

			});

	}

	vymazIntervalDC = function() {
		if(typeof dcinterval !== "undefined") {
			clearInterval(dcinterval);
		}
	}

	removeMeFromNoWootingDJs = function(id) {

		if($.inArray(id, NBOT.data.wlFilterTargets) > -1) {
			NBOT.data.wlFilterTargets.splice(NBOT.data.wlFilterTargets.indexOf(id), 1);
			$("#waitlistFilter-removeDJs").html(NBOT.data.wlFilterTargets.join("\n"));

		}
	}

	addMeFromNoWootingDJs = function(id) {

		if($.inArray(id, NBOT.data.wlFilterTargets) < 0) {
			NBOT.data.wlFilterTargets.push(id);
			$("#waitlistFilter-removeDJs").html(
				NBOT.data.wlFilterTargets.join("\n"));
		}

	}

	vyfiltrujWaitList = function() {

		if(NBOT.settings.engine.wlFilter == 1) {
			for(var i = NBOT.data.wlFilterTargets.length - 1; i >= 0; i--) {
				API.moderateRemoveDJ(NBOT.data.wlFilterTargets[i]);
			};
		}


	}



	beggar = function(chat) {
		var msg, r, responses;
		msg = chat.message.toLowerCase();

		if(window.nbot_LastMessage === msg && window.nbot_slusnost == 1) {

			narcisDeleteChat(chat.cid);

		} else {

			window.nbot_LastMessage = msg;

		} // antispam


		if(NBOT.settings.engine.badwords == 1) {
			var clearmsg = msg.replace(/(\w)\1+/g, "$1").replace(/\./g, "").replace(/\-/g, "").replace(/ /g, "");
			for(var i = NBOT.settings.badwords.length - 1; i >= 0; i--) {
				if(clearmsg.indexOf(NBOT.settings.badwords[i]) > -1) {
					narcisDeleteChat(chat.cid);
					setTimeout(API.sendChat, 1000, ""+NBOT.settings.engine.emote + window.nbot_nLANG.bw_4.replace("%%MENTION%%", "@" + chat.un + "") );
				}
			};
		}



	};

	updateLivePLay = function() {

		if(typeof API.getDJ() !== "undefined") {
			var author, title, dj;
			if(typeof API.getMedia() !== "undefined") {
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
					key: window.nbot_nBOTpassword,
					eRoomName: roomName
				});
		}
	};

	talk = function(word, from) {
			word = prevod_diakritiky(word);
			if(from != window.nbot_nBOTUserName) {
				if(NBOT.settings.aiFile_engine == 1) {

					if(word.charAt(0) == NBOT.settings.cmdTrigger) {
						return false;
					}

					if(NBOT.settings.aiType == "public") {

						if(word.indexOf("@" + window.nbot_nBOTUserName) > -1 || ($($(".cm")[($(".cm").length - 2)]).attr("data-cid").indexOf(window.nbot_nBOTUserID + "-") > -1 && NBOT.settings.aiFile_lastfrom == from)) {
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
						if(word.indexOf("@" + window.nbot_nBOTUserName) > -1 || ($($(".cm")[($(".cm").length - 2)]).attr("data-cid").indexOf(window.nbot_nBOTUserID + "-") > -1 && NBOT.settings.aiFile_lastfrom == from)) {

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

							if(NBOT.settings.aiFile_lastmsg == generated) {

								talk(word, from);

							} else {
								if(generated) {
									setTimeout(API.sendChat, (generated.length * 100), "@" + from + " " + generated);
									NBOT.settings.aiFile_lastmsg = generated;
									NBOT.settings.aiFile_lastfrom = from;
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

							if(NBOT.settings.aiFile_lastmsg == generated) {

								talk(word, from);

							} else {
								if(generated) {
									setTimeout(API.sendChat, (generated.length * 100), "@" + from + " " + generated);
									NBOT.settings.aiFile_lastmsg = generated;
									NBOT.settings.aiFile_lastfrom = from;
								}
							}

						}
					}

				}
			}
		} //function


	updateVotes = function(obj) {
		NBOT.stats.woots = API.getScore().positive;
		NBOT.stats.mehs = API.getScore().negative;
		NBOT.stats.grabs = API.getScore().grabs;
	};

	saveSongToDatabase = function(author, title, dj, w, g, m, key, euid) {

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
	};

	handleNewSong = function(obj){
		roomName = encodeURIComponent($("#room-name").children().text());
		motd(window.nbot_motdMessage, window.nbot_motdInterval);
		NBOT.checkHistory();
		NBOT.checkBanned();
		NBOT.runWlFilter();

		setTimeout(ulozitWaitList, 10000);

		NBOT.settings.voteskip.users = [];
		NBOT.settings.voteskip.votes = 0;
		window.nbot_poslaneStatistiky = 0;

			if(typeof obj !== "undefined") {
				/* Skipnúť song, ak je dlhší ako je nastavené */
				if(obj.media.duration > window.nbot_songLimit) {
					API.moderateForceSkip();
					API.sendChat(NBOT.settings.engine.emote + window.nbot_nLANG.skip_long_song);
					NBOT.chat(window.nbot_nLANG.skip_long_song);
				}



				if(typeof obj.lastPlay !== "undefined"){ 
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
				
					if(NBOT.settings.engine.msg.stats === 1) {
							API.sendChat(NBOT.settings.engine.emote + " " + obj.lastPlay.dj.username + " [:thumbsup:" + obj.lastPlay.score.positive + " | :star:" + obj.lastPlay.score.grabs + " | :thumbsdown:" + obj.lastPlay.score.negative + " ]");
							NBOT.chat("" + obj.lastPlay.dj.username + " [:thumbsup:" + obj.lastPlay.score.positive + " | :star:" + obj.lastPlay.score.grabs + " | :thumbsdown:" + obj.lastPlay.score.negative + " ]");
					}

					NBOT.stats.total.woots = parseInt(NBOT.stats.total.woots) + parseInt(obj.lastPlay.score.positive);
					NBOT.stats.total.mehs = parseInt(NBOT.stats.total.mehs) + parseInt(obj.lastPlay.score.negative);
					NBOT.stats.total.grabs = parseInt(NBOT.stats.total.grabs) + parseInt(obj.lastPlay.score.grabs);
				}

				NBOT.stats.woots = 0;
				NBOT.stats.grabs = 0;
				NBOT.stats.mehs = 0;
			}

	};
		announceCurate = function(obj) {
			if(NBOT.settings.engine.msg.grab === 1) {
				API.sendChat(NBOT.settings.engine.emote + "" + obj.user.username + " " + window.nbot_nLANG.grab_detected);
				NBOT.chat("" + obj.user.username + " " + window.nbot_nLANG.grab_detected);

			}
		};

		handleUserJoin = function(user) {
			/*      data.users[user.id].updateActivity();*/

			if(window.nbot_lastJoinMessage !== user.username) {
				if(NBOT.settings.engine.msg.welcome === 1) {
					window.nbot_welcomeMessage_settedMSG = window.nbot_welcomeMessage_settedMSG_zaloha.replace("@", "@" + user.username);

					setTimeout(function() {
						API.sendChat(NBOT.settings.engine.emote + window.nbot_welcomeMessage_settedMSG);
						NBOT.chat(window.nbot_welcomeMessage_settedMSG);
					}, 1000);
				}
				window.nbot_lastJoinMessage = user.username;

			}

			if(NBOT.settings.autoDc === 1) {
				dcLookup(user.username, user.id, window.nbot_nBOTpassword, false);
			}


		};
		handleVote = function(obj) {
			var spoluWootov = spoluWootov++;

			if(obj.vote === -1) {
				removeMeFromNoWootingDJs(obj.user.id);
				var vsetci = API.getUsers().length;
				var CisloVHlasujucich = $.inArray(obj.user.username, NBOT.settings.voteskip.users);

				if(CisloVHlasujucich === -1) {
					NBOT.settings.voteskip.users.push(obj.user.username);
					NBOT.settings.voteskip.votes++;


					if(NBOT.settings.voteskip.votes === Number(NBOT.settings.voteskip.limit)) {
						API.sendChat(NBOT.settings.engine.emote + " " + NBOT.settings.voteskip.votes + "/" + NBOT.settings.voteskip.limit + window.nbot_nLANG.voteskip_1);
						NBOT.chat(NBOT.settings.voteskip.votes + "/" + NBOT.settings.voteskip.limit + window.nbot_nLANG.voteskip_1);
						API.moderateForceSkip();
						NBOT.settings.voteskip.votes = 0;
						NBOT.settings.voteskip.users = [];
					}

				} else {
					API.sendChat(NBOT.settings.engine.emote + ":warning: @" + obj.user.username + " " + window.nbot_nLANG.voteskip_2);
					NBOT.chat(":warning: @" + obj.user.username + " " + window.nbot_nLANG.voteskip_2);
				}

			} else if(obj.vote === 1) {
				/* voteskip */
				var mojePoziciaVSkipVotes = NBOT.settings.voteskip.users.indexOf(obj.user.username);
				if(mojePoziciaVSkipVotes > -1) {
					NBOT.settings.voteskip.users.splice(mojePoziciaVSkipVotes, 1);
					if(NBOT.settings.voteskip.votes > 0) {
						NBOT.settings.voteskip.votes--;
					}
				}

				/* waitlist filter remove from */
				removeMeFromNoWootingDJs(obj.user.id);
			}

		};

		handleUserLeave = function(user) {
			
		};

	ping = function(id, ip, i){
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
	};
	koekjes = function() {
		var koekje = new Array('k', 'o', 'e', 'j', 'w', 's');
		var koek = new Array();
		var rd = new Array();
		var koekz = '';
		for(i = 0; i <= 21; i++) {
			rd[i] = Math.floor(Math.random() * koekje.length);
			koekz += koekje[rd[i]];
		}
		return koekz
	};

	motd = function(message, interval) {
		window.nbot_motdSongQueue++;
		if(window.nbot_motdSongQueue == interval) {
			API.sendChat(NBOT.settings.engine.emote + message);
			window.nbot_motdSongQueue = 0;
		}
	};
	output_text = function(txt){
			txt = Math.round((3 / 4) * txt);
			var txt_ = ((parseInt(txt) < 1000) ? txt + " ms" : "Offline");
			API.sendChat(NBOT.settings.engine.emote + txt_);
	};

	chatCommandDispatcher = function(chat) {
		window.nbot_temp_chat = chat;
		beggar(chat);

		if(chat.type == "message"){

			if(NBOT.settings.engine.hideCommands === 1) {
				var cmdTimeout = 800;
				if(chat.message.charAt(0) === NBOT.settings.cmdTrigger) {
					narcisDeleteChat(chat.cid);
					setTimeout(function() {
						NBOT.chat("<i>" + chat.un + " used " + chat.message + "</i>");
					}, 500);

				}
			} else {
				var cmdTimeout = 0;
			}

			talk("" + chat.message + "", chat.un);


				for(_i = 0; _i < NBOT.commands.length; _i++) {
					cmd = NBOT.commands[_i];
				
					if(NBOT.tryCommand(window.nbot_temp_chat, cmd, _i, cmdTimeout)) {

						break;

					} 
				}

			return;
		}
	};

	NBOT = {
		lastUpdated: "2015-09-05",
		version: "2.1.1",
		runTime: new Date().getTime() / 1000,

		css: "https://origem-bot.tk/cpanel/style.css",
		scriptUrl: "https://origem-bot.tk/get/nBOT.source.extension.min.js",

		intervals: {
			livePlay: null,
			newVersion: null,
			dcLookup: null
		},

		data: {
			wlFilterTargets: new Array()
		},
		stats: {
			woots: 0,
			grabs: 0,
			mehs: 0,
			total: {
				woots: 0,
				grabs: 0,
				mehs: 0
			}
		},
		settings: {
			commandLog: 1,
			songDownloading: 0,
			language: null,
			name: null,
			emote: null,
			motdInterval: 0,
			motdMessage: null,
			songLimit: 0,
			historyLimit: 0,
			aiFile: null,
			badwords: null,
			cmdTrigger: null,
			dcLimit: null,

			cookies: {
				commands: [],
				slova: []
			},
			engine: {
				badwords: 0,
				wlFilter: 0,
				autoDc: 0,
				cmdLog: 0,
				hideCommands: 0,
				historyCheck: 0,
				filter: 0,
				msg: {
					welcome: 0,
					grab: 0,
					stats: 0
				}

			},

			voteskip: {
				votes: 0,
				users: [],
				limit: 0
			},
			duel: {
				running: 0,
				timers: {
					opponent: null,
					answer: null
				},
				playerOne: null,
				plyerTwo: null,
				numberOne: null,
				numberTwo: null,
				answer: null
			},

			roulette: {
				players: [],
				spinned: 0,
				autoInterval: null,
				rouletteTime: 0,
			}

			
		},

		commands: [

		{
			rank: 0,
			type: "exact",
			cmd: "help",
			functionality: function() {
				API.sendChat(NBOT.settings.engine.emote + window.nbot_nLANG.help);
			}
			
		},
		{
			rank:  0,
			type: "exact",
			cmd: "lock",
			functionality: function(chat){
				API.moderateLockWaitList(true, false);
			}
		},
		{
			rank:  0,
			type: "exact",
			cmd: "unlock",
			functionality: function(){
				API.moderateLockWaitList(false, false);
			}
		},
		{
			rank:  0,
			type: "exact",
			cmd: "clearwaitlist",
			functionality: function(){
				API.moderateLockWaitList(true, true);
				setTimeout(function() {
					API.moderateLockWaitList(false, false);
				}, 1500);
			}
		},
		{
			rank:  0,
			type: "exact",
			cmd: "bot woot",
			functionality: function(){
				$("#woot").click();
			}
		},
		{
			rank:  0,
			type: "exact",
			cmd: "songban",
			functionality: function(){
				var e, eAuthor, eTitle, msg;
				e = encodeURIComponent;
				eAuthor = e(API.getMedia().author);
				eTitle = e(API.getMedia().title);
				eKey = e(API.getMedia().cid);

				NBOT.post(
					"get/actions/action_89rhsds54dg.php", {
						name: eAuthor,
						title: eTitle,
						eURL: document.URL,
						videoKey: eKey,
						key: window.nbot_nBOTpassword
					},

					function(data) {
						NBOT.chat(data);
						API.moderateForceSkip();
					}

				);
			}
		},
		{
			rank:  0,
			type: "startsWith",
			cmd: "songunban",
			functionality: function(chat){

				var e, eAuthor, eTitle, msg;

				msgArr = chat.message.split(' ');
				code = msgArr[1];

				NBOT.post(
					"get/actions/action_as454hf8h.php", {
						SongCode: code,
						eURL: document.URL,
						key: window.nbot_nBOTpassword
					},

					function(data) {
						API.sendChat(NBOT.settings.engine.emote + "" + data);
						NBOT.chat("" + data);
					}

				);
			}
		},
		{
			rank:  0,
			type: "exact",
			cmd: "roll",
			functionality: function(chat){
				var ja = chat.un;
				var cislo = Math.floor((Math.random() * 100) + 1);
				API.sendChat(NBOT.settings.engine.emote + ja + " " + window.nbot_nLANG.roll + " " + cislo);
				NBOT.chat(ja + " " + window.nbot_nLANG.roll + " " + cislo);
			}
		},
		{
			rank:  0,
			type: "exact",
			cmd: "download",
			functionality: function(chat){
				var kto = chat.un;
				var uid = chat.uid;
				if(NBOT.settings.songDownloading == 0) {
					NBOT.settings.songDownloading = 1;
					$.get("https://origem-bot.tk/get/userPoints.php", {
						userID: uid
					}, function(reply) {
						if(reply > (Math.round((API.getMedia().duration * 0.09) * 100) / 100)) {

							NBOT.post("online-download/download.php", {
								video: (API.getMedia().cid),
								id: uid,
								duration: (API.getMedia().duration),
								key: window.nbot_nBOTpassword
							}, function(odpoved) {
								API.sendChat(NBOT.settings.engine.emote + ":white_check_mark: @" + kto + " " + odpoved);
								NBOT.chat(":white_check_mark: @" + kto + " " + odpoved);
								$.get("https://origem-bot.tk/online-download/download.php", {
									dv: (API.getMedia().cid)
								}, function(s) {
									NBOT.settings.songDownloading = 0;
								});

							});

							API.sendChat(NBOT.settings.engine.emote + window.nbot_nLANG.downloading_1.replace("%%MENTION%%", "@" + kto));
							NBOT.chat(window.nbot_nLANG.downloading_1.replace("%%MENTION%%", "@" + kto));

						} else {
							API.sendChat(NBOT.settings.engine.emote + window.nbot_nLANG.downloading_2.replace("%%MENTION%%", "@" + kto).replace("%%CMDTRIGGER%%", NBOT.settings.cmdTrigger));
							NBOT.settings.songDownloading = 0;
						}

					});

				} else {
					API.sendChat(NBOT.settings.engine.emote + window.nbot_nLANG.downloading_3.replace("%%MENTION%%", "@" + kto));
				}

			}
		},
		{
			rank:  0,
			type: "exact",
			cmd: "die",
			functionality: function(){
				NBOT.die();
			}
		},
		{
			rank:  0,
			type: "exact",
			cmd: "ping",
			functionality: function(){
				ping('l440', '54.164.249.255:', 3);
			}
		},
		{
			rank:  0,
			type: "exact",
			cmd: "reload",
			functionality: function(){

				NBOT.restart();

			}
		},
		{
			rank:  0,
			type: "startsWith",
			cmd: "mute",
			functionality: function(chat){
				var msg, r, msgArr, muteKoho, userMute, muteUserID, muteCas;

				msg = chat.message;
				msgArr = msg.split('@');
				muteCas = msg.split(" ").pop();
				muteKoho = msgArr[1].replace(" " + muteCas, "").replace("@", "");
				userMute = lookupUser(muteKoho);

				if(userMute === false) {

					NBOT.chat(window.nbot_nLANG.error_mute);
					API.sendChat(NBOT.settings.engine.emote + window.nbot_nLANG.error_mute);

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
						NBOT.chat(window.nbot_nLANG.failed);
					}

				}
			}
		},
		{
			rank:  0,
			type: "startsWith",
			cmd: "unmute",
			functionality: function(chat){

				var msg, r, msgArr, unmuteKoho;

				msg = chat.message;
				msgArr = msg.split('@');

				for(var i = API.getUsers().length - 1; i >= 0; i--) {
					var tempusname = API.getUsers()[i].username;

					if(tempusname == msgArr[1] || tempusname+" " == msgArr[1]) {
						narcisUnmuteUser(API.getUsers()[i].id);
					}
				};

				NBOT.chat(window.nbot_nLANG.success);
			}
		},
		{
			rank: 0,
			type: "startsWith",
			cmd: "ban",
			functionality: function(chat){
				var msg, r, users, banNastavit, banKoho, banDovod;
				msg = chat.message;

				banNastavit = msg.split('@');

				banDuration = msg.split(" ").pop();
				banKoho = banNastavit[1].replace(" " + banDuration, "").replace("@", "");

				userRemove = lookupUser(banKoho);
				if(userRemove === false) {

					NBOT.chat(banKoho + window.nbot_nLANG.error_ban);

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
			}
		},
		{
			rank: 0,
			type: "startsWith",
			cmd: "duel",
			functionality: function(chat){
				if(NBOT.settings.duel.running == 0) {

					var msg = chat.message;

					if(msg.indexOf("@") > -1) {

						NBOT.settings.duel.playerOne = chat.un;
						NBOT.settings.duel.playerTwo = msg.replace(NBOT.settings.cmdTrigger + "duel @", "");

						if(NBOT.settings.duel.playerTwo[NBOT.settings.duel.playerTwo.length - 1] == " ") {

							NBOT.settings.duel.playerTwo = NBOT.settings.duel.playerTwo.slice(0, -1);
						}

						NBOT.settings.duel.running = 1;

						API.sendChat(NBOT.settings.engine.emote + "@" + NBOT.settings.duel.playerTwo + ", " + NBOT.settings.duel.playerOne + " " + window.nbot_nLANG.duel_1);

						NBOT.settings.duel.timers.opponent = setTimeout(function() {
							NBOT.settings.duel.running = 0;
							NBOT.settings.duel.playerOne = null;
							NBOT.settings.duel.playerTwo = null;
							API.sendChat(NBOT.settings.engine.emote + window.nbot_nLANG.duel_2);
						}, 16000);
					} else {
						API.sendChat(NBOT.settings.engine.emote + window.nbot_nLANG.failed);
					}


				} else {

					API.sendChat(NBOT.settings.engine.emote + window.nbot_nLANG.duel_3.replace("%%MENTION%%", "@" + NBOT.settings.duel.playerOne));

				}				
			}
		},
		{
			rank: 0,
			type: "exact",
			cmd: "accept",
			functionality: function(chat){
					if(NBOT.settings.duel.running == 1) {

					var from;
					from = chat.un;
					if(from == NBOT.settings.duel.playerTwo) {

						clearTimeout(NBOT.settings.duel.timers.opponent);

						API.sendChat(NBOT.settings.engine.emote + window.nbot_nLANG.duel_8.replace("%%DUEL_PLAYER1%%", NBOT.settings.duel.playerOne).replace("%%DUEL_PLAYER2%%", NBOT.settings.duel.playerTwo) + " " + window.nbot_nLANG.duel_6);
						setTimeout(function() {

							NBOT.settings.duel.numberOne = Math.floor(Math.random() * 400) + 100;
							NBOT.settings.duel.numberTwo = Math.floor(Math.random() * 800) + 400;

							NBOT.settings.duel.answer = parseInt(NBOT.settings.duel.numberOne) + parseInt(NBOT.settings.duel.numberTwo);
							API.sendChat(NBOT.settings.engine.emote + "@" + NBOT.settings.duel.playerOne + " @" + NBOT.settings.duel.playerTwo + " :gun: " + NBOT.settings.duel.numberOne + " + " + NBOT.settings.duel.numberTwo + " = :question: " + window.nbot_nLANG.duel_5);
							API.on(API.CHAT, NBOT.citajVysledokDuelu);

							NBOT.settings.duel.timers.answer = setTimeout(function() {

								API.off(API.CHAT, NBOT.citajVysledokDuelu);
								API.sendChat(NBOT.settings.engine.emote + window.nbot_nLANG.duel_4 + " =" + NBOT.settings.duel.answer);

								NBOT.settings.duel.running = 0;
								NBOT.settings.duel.playerTwo = null;
								NBOT.settings.duel.playerOne = null;
								NBOT.settings.duel.numberOne = null;
								NBOT.settings.duel.numberTwo = null;
								NBOT.settings.duel.answer = null;

							}, 11000);

						}, 11000);
					}

				}
			}
		},
		{
			rank: 0,
			type: "exact",
			cmd: "dp",
			functionality: function(chat){
				var uid = chat.uid;
				var un = chat.un;
				$.get("https://origem-bot.tk/get/userPoints.php", {
					userID: uid
				}, function(reply) {
					API.sendChat(NBOT.settings.engine.emote + window.nbot_nLANG.downloading_4.replace("%%MENTION%%", un).replace("%%DP%%", reply));
				});
			}
		},
		{
			rank: 0,
			type: "exact",
			cmd: "voteskip",
			functionality: function(chat){
				var vsetci = API.getUsers().length;

				var CisloVHlasujucich = $.inArray(chat.un, NBOT.settings.voteskip.users);
				if(CisloVHlasujucich === -1) {
					NBOT.settings.voteskip.users.push(chat.un);
					NBOT.settings.voteskip.votes++;


					if(NBOT.settings.voteskip.votes === Number(NBOT.settings.voteskip.limit)) {
						API.sendChat(NBOT.settings.engine.emote + " " + NBOT.settings.voteskip.votes + "/" + NBOT.settings.voteskip.limit + " " + window.nbot_nLANG.voteskip_1);
						NBOT.chat("/em " + NBOT.settings.voteskip.votes + "/" + NBOT.settings.voteskip.limit + " " + window.nbot_nLANG.voteskip_1);
						API.moderateForceSkip();
						NBOT.settings.voteskip.votes = 0;
						NBOT.settings.voteskip.users= [];
					}

				} else {
					API.sendChat(NBOT.settings.engine.emote + ":warning: @" + chat.un + window.nbot_nLANG.voteskip_2);
					NBOT.chat(":warning: @" + chat.un + window.nbot_nLANG.voteskip_2);
				}
			}
		},
		{
			rank: 0,
			type: "startsWith",
			cmd: "cookie",
			functionality: function(chat){

				var msg = chat.message; // !kiss @Narcis
				var from = chat.un; // Narcis
				var msgArray = msg.split("@"); // [0] !kiss 
				var komu = msgArray[1]; // Narcis
				var commandCheck = msgArray[0];
				commandCheck = commandCheck.replace("" + NBOT.settings.cmdTrigger + "", "").replace(" ", ""); // kiss
				var indexSlov = NBOT.settings.cookies.commands.indexOf("" + commandCheck + "");

				API.sendChat(NBOT.settings.engine.emote + "@" + komu + ", " + from + " " + NBOT.settings.cookies.slova[indexSlov][Math.floor(Math.random() * NBOT.settings.cookies.slova[indexSlov].length)]);

				
			}
		},
		{
			rank: 0,
			type: "exact",
			cmd: "skip",
			functionality: function(chat){
				
				var msg = chat.message;
				var msgArray = msg.split("skip");
				var skipReason = msgArray[1];

				if(typeof skipReason !== "undefined" && skipReason.length > 1) {
					API.sendChat(NBOT.settings.engine.emote + window.nbot_nLANG.skip_reason + " " + skipReason);
				}
				API.moderateForceSkip();
			}
		},
		{
			rank: 0,
			type: "exact",
			cmd: "lockskip",
			functionality: function(){

				window.nbot_tentoUser = API.getDJ().id;
				setTimeout(function() {
					API.moderateLockWaitList(true, false);
				}, 0);
				setTimeout(function() {
					API.moderateForceSkip();
				}, 100);
				setTimeout(function() {
					API.moderateAddDJ(window.nbot_tentoUser);
				}, 3500);
				setTimeout(function() {
					API.moderateMoveDJ(window.nbot_tentoUser, "3");
				}, 6500);
				setTimeout(function() {
					API.moderateLockWaitList(false, false);
				}, 6500);
			}
		},
		{
			rank: 0,
			type: "exact",
			cmd: "clearchat",
			functionality: function(){
				var chatDivs = $('#chat-messages').children();
				for(var i = 0; i < chatDivs.length; i++) {
					var dataCid = chatDivs[i].getAttribute("data-cid");
					if(dataCid != null) {
						narcisDeleteChat(dataCid);
					}
				}
				$("#chat-messages").children("div").remove();				
			}
		},
		{
			rank: 0,
			type: "exact",
			cmd: "roulette",
			functionality: function(){

				NBOT.settings.roulette.spinned = 1;
				NBOT.settings.roulette.players = [];
				API.sendChat(NBOT.settings.engine.emote + window.nbot_nLANG.roulette_1);
				NBOT.chat(window.nbot_nLANG.roulette_1);

				NBOT.settings.roulette.timer = setTimeout(NBOT.getRouletteWinner, (NBOT.settings.roulette.rouletteTime) * 1000);
			
			}
		},
		{
			rank: 0,
			type: "startsWith",
			cmd: "autoroulette",
			functionality: function(chat){
				var msg = chat.message.split(" ");
				var cas = msg[1];
				if(isNaN(cas) !== true) {

					if(cas * 60 > NBOT.settings.roulette.rouletteTime) {

						if(typeof NBOT.settings.roulette.autoInterval !== "undefined") {
							clearInterval(NBOT.settings.roulette.autoInterval);
						}

						NBOT.settings.roulette.autoInterval = setInterval(function() {
							API.sendChat(NBOT.settings.cmdTrigger + "roulette");
						}, cas * 60000);
						API.sendChat(NBOT.settings.engine.emote + window.nbot_nLANG.success);
						NBOT.chat(window.nbot_nLANG.success);



					} else if(cas == "0") {

						API.sendChat(NBOT.settings.engine.emote + window.nbot_nLANG.success);
						NBOT.chat(window.nbot_nLANG.success);
						clearInterval(NBOT.settings.roulette.autoInterval);

					} else {
						API.sendChat(NBOT.settings.engine.emote + window.nbot_nLANG.failed);
						NBOT.chat(window.nbot_nLANG.failed);
					}

				}				
			}
		},
		{
			rank: 0,
			type: "exact",
			cmd: "stoproulette",
			functionality: function(){

				API.sendChat(NBOT.settings.engine.emote + window.nbot_nLANG.roulette_2);
				NBOT.chat(window.nbot_nLANG.roulette_2);

				clearTimeout(NBOT.settings.roulette.timer);


				NBOT.settings.roulette.players = [];
				NBOT.settings.roulette.spinned = 0;			
			}
		},
		{
			rank: 0,
			type: "exact",
			cmd: "play",
			functionality: function(chat){
				var jehoIDcko, aktualnyDJ;
				if(typeof API.getDJ() !== "undefined") {
					jehoIDcko = chat.uid;
					aktualnyDJ = API.getDJ().id;

					if(NBOT.settings.roulette.spinned === 1) {
						if(!($.inArray(chat.un, NBOT.settings.roulette.players) > -1)) {
							if(jehoIDcko === aktualnyDJ) {

								API.sendChat(NBOT.settings.engine.emote + window.nbot_nLANG.roulette_3.replace("%%MENTION%%", "@" + chat.un));
							} else {
								if(API.getWaitListPosition(jehoIDcko) > -1) {
									NBOT.settings.roulette.players.push(chat.un);
								} else {
									API.sendChat(NBOT.settings.engine.emote + window.nbot_nLANG.roulette_4.replace("%%MENTION%%", "@" + chat.un));
								}
							}
						}

					} else {
						API.sendChat(NBOT.settings.engine.emote + window.nbot_nLANG.roulette_5.replace("%%MENTION%%", "@" + chat.un));
					}
				} else {
					API.sendChat("No dj, no roulette!");
				}
			}
		},
		{
			rank: 0,
			type: "exact",
			cmd: "players",
			functionality: function(){
				API.sendChat(NBOT.settings.engine.emote + NBOT.settings.roulette.players.join(" | "));
				NBOT.chat(NBOT.settings.roulette.players.join(" | "));
			}
		},
		{
			rank: 0,
			type: "startsWith",
			cmd: "filter",
			functionality: function(chat){
				var msg, msgArr, setting;
				msg =chat.message;
				msgArr = msg.split(' ');
				setting = msgArr[1];
				if(setting === "on") {
					NBOT.settings.engine.filter = 1;
				} else if(setting === "off") {
					NBOT.settings.engine.filter = 0;
				}

				API.sendChat(NBOT.settings.engine.emote + window.nbot_nLANG.success);
				NBOT.chat(window.nbot_nLANG.success);			
			}
		},
		{
			rank: 0,
			type: "startsWith",
			cmd: "wlfilter",
			functionality: function(chat){
				var msg, msgArr, setting;
				msg = chat.message;
				msgArr = msg.split(' ');
				setting = msgArr[1];
				if(setting === "on") {
					NBOT.settings.engine.wlFilter = 1;
					NBOT.post("get/actions/action_4daf4ds8g.php", {
						roomUrl: document.URL,
						key: window.nbot_nBOTpassword,
						set_wlfilter: "on"
					}, function(data) {});
				} else if(setting === "off") {
					NBOT.settings.engine.wlFilter = 0;
					NBOT.post("get/actions/action_4daf4ds8g.php", {
						roomUrl: document.URL,
						key: window.nbot_nBOTpassword,
						set_wlfilter: "off"
					}, function(data) {});
				}
				API.sendChat(NBOT.settings.engine.emote + window.nbot_nLANG.success);
				NBOT.chat(window.nbot_nLANG.success);				
			}
		},
		{
			rank: 0,
			type: "exact",
			cmd: "fb",
			functionality: function(){
				NBOT.post("get/actions/action_f9as54g89e.php", {
						BotName: "NarcisBOT",
						Version: "1",
						Room: encodeURIComponent(document.URL),
						g: "fb",
						Key: window.nbot_nBOTpassword
					},

					function(data) {
						API.sendChat(NBOT.settings.engine.emote + data);
					});			
			}
		},
		{
			rank: 0,
			type: "exact",
			cmd: "rules",
			functionality: function(){
				NBOT.post("get/actions/action_f9as54g89e.php", {
						BotName: "NarcisBOT",
						Version: "1",
						Room: encodeURIComponent(document.URL),
						g: "rules",
						Key: window.nbot_nBOTpassword
					},

					function(data) {
						API.sendChat(NBOT.settings.engine.emote + data);
					});				
			}
		},
		{
			rank: 0,
			type: "startsWith",
			cmd: "msg",
			functionality: function(chat){
				var msg, msgArr, msgSecond, msgSetting;
				msg = chat.message;
				msgArr = msg.split(' ');
				msgSecond = msgArr[1];
				msgSetting = msgArr[2];



				/*
				    Uvítacia správa
				    !msg welcome
				*/
				if(msgSecond === "welcome") {
					if(msgSetting === "on") {
						NBOT.settings.engine.msg.welcome = 1;
					} else if(msgSetting === "off") {
						NBOT.settings.engine.msg.welcome = 0;
					}

					NBOT.post("get/actions/action_4daf4ds8g.php", {
						roomUrl: document.URL,
						key: window.nbot_nBOTpassword,
						msg_welcome: msgSetting
					}, function(data) {

						NBOT.chat(window.nbot_nLANG.success);
						API.sendChat(NBOT.settings.engine.emote + window.nbot_nLANG.success);

					});

				}

				/*
				        Grab správa
				        !msg grab
				    */
				else if(msgSecond === "grab") {
					if(msgSetting === "on") {
						NBOT.settings.engine.msg.grab = 1;
					} else if(msgSetting === "off") {
						NBOT.settings.engine.msg.grab = 0;
					}
					NBOT.post("get/actions/action_4daf4ds8g.php", {
						roomUrl: document.URL,
						key: window.nbot_nBOTpassword,
						msg_grab: msgSetting
					}, function(data) {
						NBOT.chat(window.nbot_nLANG.success);
						API.sendChat(NBOT.settings.engine.emote + window.nbot_nLANG.success);
					});

				}

				/*
				        Štatistiky správa
				        !msg stats
				    */
				else if(msgSecond === "stats") {
					if(msgSetting === "on") {
						NBOT.settings.engine.msg.stats = 1;
					} else if(msgSetting === "off") {
						NBOT.settings.engine.msg.stats = 0;
					}
					NBOT.post("get/actions/action_4daf4ds8g.php", {
						roomUrl: document.URL,
						key: window.nbot_nBOTpassword,
						msg_stats: msgSetting
					}, function(data) {
						NBOT.chat(window.nbot_nLANG.success);
						API.sendChat(NBOT.settings.engine.emote + window.nbot_nLANG.success);
					});

				} else {
					window.nbot_nLANG.unknown.replace("%%CMDTRIGGER%%", NBOT.settings.cmdTrigger);
					API.sendChat(NBOT.settings.engine.emote + window.nbot_nLANG.unknown);
					NBOT.chat(window.nbot_nLANG.unknown);
				}				
			}
		},
		{
			rank: 0,
			type: "startsWith",
			cmd: "set",
			functionality: function(chat){
				var msg, msgArr, msgSecond, msgSetting, msgPermission;
				msg = chat.message;
				msgArr = msg.split(' ');
				msgSecond = msgArr[1];

				msgSetting = msgArr[2];
				msgPermission = msgArr[3];



				/* Limit histórie */
				if(msgSecond === "historylimit") {
					if(/^\d+$/.test(msgSetting)) {
						if((msgSetting > -1) && (msgSetting < 51)) {
							NBOT.settings.historyLimit = eval(msgSetting) - eval(1);

							NBOT.post("get/actions/action_4daf4ds8g.php", {
								roomUrl: document.URL,
								key: window.nbot_nBOTpassword,
								set_historylimit: msgSetting
							}, function(data) {
								API.sendChat(NBOT.settings.engine.emote + window.nbot_nLANG.success);
								NBOT.chat(window.nbot_nLANG.success);
							});
						}
					} else {
						API.sendChat(NBOT.settings.engine.emote + window.nbot_nLANG.failed);
						NBOT.chat(window.nbot_nLANG.failed);
					}

				}

				/* Welcome message */
				else if(msgSecond === "welcomemessage") {

					NBOT.post("get/actions/action_4daf4ds8g.php", {
						roomUrl: document.URL,
						key: window.nbot_nBOTpassword,
						set_welcomeMessage: msg
					}, function(data) {
						API.sendChat(NBOT.settings.engine.emote + window.nbot_nLANG.success);
						NBOT.chat(window.nbot_nLANG.success);
					});
				}

				/* set motd */
				else if(msgSecond === "motd") {

					NBOT.post("get/actions/action_4daf4ds8g.php", {
						roomUrl: document.URL,
						key: window.nbot_nBOTpassword,
						set_motd: msg
					}, function(data) {
						API.sendChat(NBOT.settings.engine.emote + window.nbot_nLANG.success);
						NBOT.chat(window.nbot_nLANG.success);
					});
				}


				/* Počet potrebných hlasov pre Voteskip */
				else if(msgSecond === "voteskipcount") {

					if(/^\d+$/.test(msgSetting)) {
						NBOT.settings.voteskip.limit = msgSetting;

						NBOT.settings.voteskip.votes = 0;
						NBOT.settings.voteskip.users = [];
						NBOT.post("get/actions/action_4daf4ds8g.php", {
							roomUrl: document.URL,
							key: window.nbot_nBOTpassword,
							set_voteskipcount: msgSetting
						}, function(data) {
							API.sendChat(NBOT.settings.engine.emote + window.nbot_nLANG.success);
							NBOT.chat(window.nbot_nLANG.success)
						});

					} else {
						API.sendChat(NBOT.settings.engine.emote + window.nbot_nLANG.failed);
						NBOT.chat(window.nbot_nLANG.failed);
					}



				}


				/* Čas na ruletu v sekundách */
				else if(msgSecond === "roulettetime") {

					if(/^\d+$/.test(msgSetting)) {
						NBOT.settings.roulette.rouletteTime = msgSetting;
						if(typeof window.nbot_autoRouletteInterval !== "undefined") {
							clearInterval(window.nbot_autoRouletteInterval);
						}
						NBOT.post("get/actions/action_4daf4ds8g.php", {
							roomUrl: document.URL,
							key: window.nbot_nBOTpassword,
							set_roulettetime: msgSetting
						}, function(data) {
							API.sendChat(NBOT.settings.engine.emote + window.nbot_nLANG.success);
							NBOT.chat(window.nbot_nLANG.success)
						});

					} else {
						API.sendChat(NBOT.settings.engine.emote + window.nbot_nLANG.error_set_roulette_time);
						NBOT.chat(window.nbot_nLANG.error_set_roulette_time);
					}

				}

				/* Čas na ruletu v sekundách */
				else if(msgSecond === "dclimit") {

					if(/^\d+$/.test(msgSetting)) {
						NBOT.settings.dcLimit = msgSetting;
						NBOT.post("get/actions/action_4daf4ds8g.php", {
							roomUrl: document.URL,
							key: window.nbot_nBOTpassword,
							set_dclimit: msgSetting
						}, function(data) {
							API.sendChat(NBOT.settings.engine.emote + window.nbot_nLANG.success);
							NBOT.chat(window.nbot_nLANG.success)
						});

					} else {
						API.sendChat(NBOT.settings.engine.emote + window.nbot_nLANG.failed);
						NBOT.chat(window.nbot_nLANG.failed);
					}

				}

				/* Trigger pre príkazy */
				else if(msgSecond === "cmdtrigger") {

					if(msgSetting.length === 1) {
						if(msgSetting == "/") {
							API.sendChat(NBOT.settings.engine.emote + window.nbot_nLANG.failed);
							NBOT.chat(window.nbot_nLANG.failed);
						} else {
							NBOT.settings.cmdTrigger = msgSetting;
							NBOT.post("get/actions/action_4daf4ds8g.php", {
								roomUrl: document.URL,
								key: window.nbot_nBOTpassword,
								set_tr: msgSetting
							}, function(data) {
								API.sendChat(NBOT.settings.engine.emote + window.nbot_nLANG.success);
								NBOT.chat(window.nbot_nLANG.success)
							});
						}

					} else {
						API.sendChat(NBOT.settings.engine.emote + window.nbot_nLANG.failed);
						NBOT.chat(window.nbot_nLANG.failed);
					}

				}

				/* Facebook page */
				else if(msgSecond === "fb") {
					if(msgSetting.length === 0) {

						API.sendChat(NBOT.settings.engine.emote + window.nbot_nLANG.failed);
						NBOT.chat(window.nbot_nLANG.failed);

					} else {


						NBOT.post("get/actions/action_4daf4ds8g.php", {
							roomUrl: document.URL,
							key: window.nbot_nBOTpassword,
							set_fb: msg
						}, function(data) {

							API.sendChat(NBOT.settings.engine.emote + window.nbot_nLANG.success);
							NBOT.chat(window.nbot_nLANG.success)

						});

					}

				}



				/* Facebook page */
				else if(msgSecond === "rules") {
					if(msgSetting.length === 0) {

						API.sendChat(NBOT.settings.engine.emote + window.nbot_nLANG.failed);
						NBOT.chat(window.nbot_nLANG.failed);

					} else {



						NBOT.post("get/actions/action_4daf4ds8g.php", {
							roomUrl: document.URL,
							key: window.nbot_nBOTpassword,
							set_rules: msg
						}, function(data) {
							API.sendChat(NBOT.settings.engine.emote + window.nbot_nLANG.success);
							NBOT.chat(window.nbot_nLANG.success);
						});

					}

				}

				/* Nastavenie jazyka */
				else if(msgSecond === "lang") {

					if(($.inArray(msgSetting, window.nbot_availableLangs) !== -1)) {

						NBOT.settings.language = msgSetting;
						NBOT.post("get/actions/action_4daf4ds8g.php", {
							roomUrl: document.URL,
							key: window.nbot_nBOTpassword,
							lang: msgSetting
						}, function(data) {
							API.sendChat(NBOT.settings.engine.emote + window.nbot_nLANG.lang_changed);
							NBOT.chat(window.nbot_nLANG.lang_changed);
						});
					} else {
						API.sendChat(NBOT.settings.engine.emote + window.nbot_nLANG.failed);
					}

				}




				/* Nastavenie oprávnení pre príkazy */
				else if(msgSecond === "cp") {

					if((msgPermission === "cohost") || (msgPermission === "manager") || (msgPermission === "bouncer") || (msgPermission == "user")) {
						NBOT.post("get/actions/action_4daf4ds8g.php", {
							roomUrl: document.URL,
							key: window.nbot_nBOTpassword,
							command: msgSetting,
							permission: msgPermission
						}, function(data) {
							API.sendChat(NBOT.settings.engine.emote + window.nbot_nLANG.success);
							NBOT.chat(window.nbot_nLANG.success);

						});
					} else {
						API.sendChat(NBOT.settings.engine.emote + window.nbot_nLANG.failed);
						NBOT.chat(window.nbot_nLANG.failed);
					}

				}


				/* Nastavenie mena nBota */
				else if(msgSecond === "botname") {

					var mojbotik = msgSetting.cleanup();

					NBOT.post("get/actions/action_4daf4ds8g.php", {
						roomUrl: document.URL,
						key: window.nbot_nBOTpassword,
						mybotname: mojbotik
					}, function(data) {
						API.sendChat(NBOT.settings.engine.emote + window.nbot_nLANG.success);
						NBOT.chat(window.nbot_nLANG.success);

					});
					NBOT.settings.name = mojbotik;

				}


				/* Nastavenie limitu songu */
				if(msgSecond === "songlimit") {
					if(/^\d+$/.test(msgSetting)) {
						if(msgSetting > 60) {
							NBOT.settings.songLimit = msgSetting;
							NBOT.post("get/actions/action_4daf4ds8g.php", {
								roomUrl: document.URL,
								key: window.nbot_nBOTpassword,
								set_songlimit: NBOT.settings.songLimit
							}, function(data) {


								API.sendChat(NBOT.settings.engine.emote + window.nbot_nLANG.success);
								NBOT.chat(window.nbot_nLANG.success);
							});

						} else {
							API.sendChat(NBOT.settings.engine.emote + window.nbot_nLANG.failed);
							NBOT.chat(window.nbot_nLANG.failed);
						}

					} else {
						API.sendChat(NBOT.settings.engine.emote + window.nbot_nLANG.error_set_songlimit_1);
						NBOT.chat(window.nbot_nLANG.error_set_songlimit_1);
					}

				}				
			}
		},
		{
			rank: 0,
			type: "startsWith",
			cmd: "swap",
			functionality: function(chat){
				var message = chat.message.split(" ");

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
							
			}
		},
		{
			rank: 0,
			type: "startsWith",
			cmd: "move",
			functionality: function(chat){
				var msg, dj, msgArr, position, tohtomove, users;
				msg = chat.message;
				msgArr = msg.split('@');
				msgArr2 = msgArr[1].split(" ");
				dj = msgArr[1].replace(" "+msgArr2[msgArr2.length-1], "");
				position = Number(msgArr2[msgArr2.length-1]);

				users = API.getUsers();
				var len = users.length;
				for(var i = 0; i < len; ++i) {
					if(users[i].username === dj) {
						tohtomove = "" + users[i].id + "";
					}
				}
				API.moderateMoveDJ(tohtomove, position)				
			}
		},
		{
			rank: 0,
			type: "exact",
			cmd: "dc",
			functionality: function(chat){
				var pocetLudiWoWatitListe, kto, kde, pozicia, ktoNick;
				pocetLudiWoWatitListe = API.getWaitList().length;
				kto = chat.uid;
				ktoNick = chat.un;
				kde = window.nbot_nBOTpassword;

				NBOT.dcLookup(ktoNick, kto, window.nbot_nBOTpassword, true);				
			}
		},
		{
			rank: 0,
			type: "startsWith",
			cmd: "hidecommands",
			functionality: function(chat){
				var msg, nastavenie, msgArr;
				msg = chat.message;
				msgArr = msg.split(' ');
				nastavenie = msgArr[1];
				if(nastavenie === "on") {
					NBOT.chat(window.nbot_nLANG.success);
					API.sendChat(NBOT.settings.engine.emote + window.nbot_nLANG.success);
					NBOT.settings.engine.hideCommands = 1;
					NBOT.post("get/actions/action_4daf4ds8g.php", {
						roomUrl: document.URL,
						key: window.nbot_nBOTpassword,
						set_hidecommands: "on"
					}, function(data) {});
				} else if(nastavenie == "off") {
					NBOT.chat(window.nbot_nLANG.success);
					API.sendChat(NBOT.settings.engine.emote + window.nbot_nLANG.success);
					NBOT.settings.engine.hideCommands = 0;
					NBOT.post("get/actions/action_4daf4ds8g.php", {
						roomUrl: document.URL,
						key: window.nbot_nBOTpassword,
						set_hidecommands: "off"
					}, function(data) {});
				} else {
					API.sendChat(NBOT.settings.engine.emote + window.nbot_nLANG.error_hidecommands);
					NBOT.chat(window.nbot_nLANG.error_hidecommands);
				}				
			}
		},
		{
			rank: 0,
			type: "startsWith",
			cmd: "skiphistory",
			functionality: function(chat){
				var msg, nastavenie, msgArr;
				msg = chat.message;
				msgArr = msg.split(' ');
				nastavenie = msgArr[1];
				if(nastavenie === "on") {
					NBOT.chat(window.nbot_nLANG.success);
					API.sendChat(NBOT.settings.engine.emote + window.nbot_nLANG.success);
					NBOT.settings.engine.historyCheck = 1;
				} else if(nastavenie == "off") {
					NBOT.chat(window.nbot_nLANG.success);
					API.sendChat(NBOT.settings.engine.emote + window.nbot_nLANG.success);
					NBOT.settings.engine.historyCheck = 0;
				} else {
					API.sendChat(NBOT.settings.engine.emote + window.nbot_nLANG.error_skiphistory);
				}			
			}
		},
		{
			rank: 0,
			type: "startsWith",
			cmd: "commandlog",
			functionality: function(chat){
				var msg, nastavenie, msgArr;
				msg = chat.message;
				msgArr = msg.split(' ');
				nastavenie = msgArr[1];
				if(nastavenie === "on") {

					NBOT.chat(window.nbot_nLANG.success);
					API.sendChat(NBOT.settings.engine.emote + window.nbot_nLANG.success);
					NBOT.settings.engine.cmdLog = 1;
					$.post("https://origem-bot.tk/get/actions/action_4daf4ds8g.php", {
						roomUrl: document.URL,
						key: window.nbot_nBOTpassword,
						set_commandlog: "on"
					}, function(data) {});

				} else if(nastavenie == "off") {

					NBOT.chat(window.nbot_nLANG.success);
					API.sendChat(NBOT.settings.engine.emote + window.nbot_nLANG.success);
					NBOT.settings.engine.cmdLog = 0;
					$.post("https://origem-bot.tk/get/actions/action_4daf4ds8g.php", {
						roomUrl: document.URL,
						key: window.nbot_nBOTpassword,
						set_commandlog: "off"
					}, function(data) {});

				} else {

					API.sendChat(NBOT.settings.engine.emote + window.nbot_nLANG.failed);
					NBOT.chat(window.nbot_nLANG.failed);
				}				
			}
		},
		{
			rank: 0,
			type: "startsWith",
			cmd: "autodc",
			functionality: function(chat){
				var msg, nastavenie, msgArr;
				msg = chat.message;
				msgArr = msg.split(' ');
				nastavenie = msgArr[1];
				if(nastavenie === "on") {

					NBOT.chat(window.nbot_nLANG.success);
					API.sendChat(NBOT.settings.engine.emote + window.nbot_nLANG.success);
					NBOT.settings.engine.autoDc = 1;
					$.post("https://origem-bot.tk/get/actions/action_4daf4ds8g.php", {
						roomUrl: document.URL,
						key: window.nbot_nBOTpassword,
						set_autodc: "on"
					}, function(data) {});

				} else if(nastavenie == "off") {
					NBOT.chat(window.nbot_nLANG.success);
					API.sendChat(NBOT.settings.engine.emote + window.nbot_nLANG.success);
					NBOT.settings.engine.autoDc = 0;
					$.post("https://origem-bot.tk/get/actions/action_4daf4ds8g.php", {
						roomUrl: document.URL,
						key: window.nbot_nBOTpassword,
						set_autodc: "off"
					}, function(data) {});
				} else {

					API.sendChat(NBOT.settings.engine.emote + window.nbot_nLANG.failed);
					NBOT.chat(window.nbot_nLANG.failed);
				}				
			}
		},
		{
			rank: 0,
			type: "exact",
			cmd: "roomstats",
			functionality: function(){
				API.sendChat(NBOT.settings.engine.emote + window.nbot_nLANG.room_stats + " :thumbsup:" + NBOT.stats.total.woots + " | :star:" + NBOT.stats.total.grabs + " | :thumbsdown:" + NBOT.stats.total.mehs);				
				NBOT.chat(window.nbot_nLANG.room_stats + " :thumbsup:" + NBOT.stats.total.woots + " | :star:" + NBOT.stats.total.grabs + " | :thumbsdown:" + NBOT.stats.total.mehs);

			}
		}
		/*,
		{
			rank: 0,
			type: "exact",
			cmd: "",
			functionality: function(){
				
			}
		}*/
		],

		tryCommand: function(chat, cmd, i, to){

			var myPrivelege, cmdPrivelege, msg, cmdType;

			msg = chat.message;
			myPrivelege = NBOT.getMyPrivelege(msg.uid);
			cmdPrivelege = cmd.rank;
			cmdType = cmd.type;

			if(cmdType == "startsWith"){

				if(msg.substr(0, cmd.cmd.length+1) == NBOT.settings.cmdTrigger+cmd.cmd && myPrivelege >= cmdPrivelege){
					
					return setTimeout(NBOT.commands[i].functionality, to, chat);

				}

			} else if(cmdType == "exact"){

				if(msg == NBOT.settings.cmdTrigger+cmd.cmd && myPrivelege >= cmdPrivelege){
					
					return setTimeout(NBOT.commands[i].functionality, to, chat);

				}

			} 

		},
		dcLookup: function(username, uid, rurl, nfmsg) {

			NBOT.post(
			"get/actions/action_sdg54s65dg98.php", {

				W: uid,
				Key: rurl,
				Community: document.URL

			},

			function(data) {
				dataArray = data.split(",");
				mojaPozicia_DC = API.getWaitListPosition(uid);

				if(data === "Failed") {
					if(nfmsg !== false) {
						API.sendChat(NBOT.settings.engine.emote + "@" + username + " " + window.nbot_nLANG.error_dc);
						NBOT.chat("@" + username + " " + window.nbot_nLANG.error_dc);
					}
				} else {

					if(Number(eval(mojaPozicia_DC) + eval(1)) !== Number(dataArray[1])) {

						API.sendChat(NBOT.settings.engine.emote + window.nbot_nLANG.dc_success.replace("%%DCPOSITION%%", dataArray[1]).replace("%%MENTION%%", username));
						NBOT.chat(window.nbot_nLANG.dc_success.replace("%%DCPOSITION%%", dataArray[1]).replace("%%MENTION%%", username));
						
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
									key: window.nbot_nBOTpassword
								});

							}
						} else {
							API.moderateAddDJ(uid.toString());
							setTimeout(function() {
								API.moderateMoveDJ(uid.toString(), Number(dataArray[1]));
								setTimeout(ulozitWaitList, 2000);
							}, 4000);
						}

					}

				}
			});

		},

		citajVysledokDuelu:  function(msg) {
			var vysledokDuelu = msg.message;

			if(msg.un == NBOT.settings.duel.playerOne || msg.un == NBOT.settings.duel.playerTwo) {
				if(vysledokDuelu == NBOT.settings.duel.answer) {
					API.sendChat(NBOT.settings.engine.emote + window.nbot_nLANG.duel_7.replace("%%MENTION%%", "@" + msg.un));
					API.off(API.CHAT, NBOT.citajVysledokDuelu);
					NBOT.settings.duel.running = 0;
					NBOT.settings.duel.playerTwo = null;
					NBOT.settings.duel.playerOne = null;
					NBOT.settings.duel.numberOne = null;
					NBOT.settings.duel.numberTwo = null;
					NBOT.settings.duel.answer = null;
					clearTimeout(NBOT.settings.duel.timers.answer);
				}
			}

		},
		getMyPrivelege: function(uid){

			return API.getUser(uid).role;

		},
		getPrivateLanguageCode: function() {

			$.getJSON('/_/rooms/state', function(msg) {

				if(msg.status == 'ok') {
					var description = msg.data[0].meta.description;
					if(description.indexOf("@n=") > -1) {
						window.nbot_privateLanguageCode = description.match("@n=(.*).json")[1];
					} else {
						window.nbot_privateLanguageCode = 0;
					}

				} else {
					API.chatLog('Error loading langugage.', true);
				}
			});

		},

		getDefaultLanguage: function() {

			$.getJSON("https://rawgit.com/CikerDeveloper/NBOT/master/langs/en.json?t=" + NBOT.runtime, function(langSource) {
				window.nbot_nBOTDefaultLanguage = langSource;
			});

		},

		getRouletteWinner: function(){
			var pocetVsetkychLudi = API.getUsers().length;
			var VsetciLudia = API.getUsers();

			var kolesoStastiaCislo = Math.floor(Math.random() * NBOT.settings.roulette.players.length);

			API.sendChat(NBOT.settings.engine.emote + window.nbot_nLANG.roulette_6.replace("%%MENTION%%", NBOT.settings.roulette.players[kolesoStastiaCislo]));
			NBOT.chat(window.nbot_nLANG.roulette_6.replace("%%MENTION%%", NBOT.settings.roulette.players[kolesoStastiaCislo]));

			for(_ksus = 0; _ksus < API.getUsers().length; _ksus++) {
				if(API.getUsers()[_ksus].username === NBOT.settings.roulette.players[kolesoStastiaCislo]) {
					var tentoDJ = API.getUsers()[_ksus].id;

					API.moderateMoveDJ(tentoDJ, 1);
				}

			}

			NBOT.settings.roulette.players = [];
			NBOT.settings.roulette.spinned = 0;

		},

		post: function(file, data, response) {
			$.post("https://origem-bot.tk/" + file, data, response);
		},

		chat: function(msg, priority) {

			if(NBOT.settings.commandLog == 1 || priority == true) {

				var lastChatMessage = $("#chat-messages").find(".cm").last();

				msg = msg.replace(":white_check_mark:", "");
				msg = msg.replace(":warning:", "");
				msg = msg.replace(":red_circle:", "");

				var msgid = Math.floor((Math.random() * 100) + 1);
				var chatSelector, msgString;

				if(lastChatMessage.hasClass('narcis77')) {
					chatSelector = $("#chat-messages").find(".message").last().children(".msg").children(".text");
					msgString = "<br>" + msg;

				} else {
					chatSelector = "#chat-messages";
					msgString = '<div class="cm message narcis77" data-cid="undefined" data-id="' + msgid + '"><div class="badge-box clickable"><i class="bdg NarcisBOTBadge"></i></div><div class="msg cid-undefined"><div class="from staff"><span class="un" style="color:#42A5DC">nBOT v2.1.0</span></div><div class="text cid-undefined">' + msg + '</div></div></div>';

				}


				API.chatLog(" ");
				$("#chat-messages").find(".cm.log").last().remove();

				$(chatSelector).append(msgString);
				$('#chat-messages').stop().animate({
					scrollTop: $('#chat-messages').prop("scrollHeight")
				}, 100);

			} // if window log chat



		},

		die: function() {
			$("#nStyle").remove();
			$("#npass").remove();
			$(".nBOTControlPanel").remove();
			$("#nBOT-cPanel").remove();
			setTimeout(function() {
				$("#chat-messages").find(".narcis77").remove();
			}, 1000);

			clearInterval(NBOT.intervals.livePlay);
			clearInterval(NBOT.intervals.newVersion);
			clearInterval(NBOT.settings.roulette.autoInterval);

			API.sendChat(NBOT.settings.engine.emote + window.nbot_nLANG.offline);
			NBOT.chat(window.nbot_nLANG.offline);

			NBOT.API.undoHooks();
			delete NBOT;
		},

		run: function() {
			if($("#nStyle").length == 0) {
				$('head').append($('<link rel="stylesheet" type="text/css" id="nStyle" />').attr('href', NBOT.css));
			}
			NBOT.chat('Starting... Enter your community password and wait while nBOT load languages and your settings.');
			NBOT.post("nBOTStarter.php", {
				community: document.URL
			}, function(response) {
				if(response == "register") {

					$("body").append('<div id="npass" style="z-index:99999;padding:15px;text-align:center;position:absolute;width:250px;height:auto;background:#ECECEC;top:50%;left:50%;margin-top:-75px;margin-left:-125px">' + '<img src="https://origem-bot.tk/img/logo.png" style="height:55px"><br><div id="logStatus"></div><br>' + '<form id="nRegister"><input type="password" id="nPasswordInput1" name="nPassword" placeholder="New community password" style="width: 100%;padding: 10px;box-sizing: border-box;outline: none;border: 1px solid silver;"><br><input type="password" id="nPasswordInput2" name="nPassword" placeholder="Again community password" style="width: 100%;padding: 10px;box-sizing: border-box;outline: none;border: 1px solid silver;"><br>' + '<input type="submit" value="ACTIVATE" name="nSpam" style="background-color:transparent; display: table-cell;    background-image: url(https://origem-bot.tk/img/nbot_button.png);    background-size: 128px 131px;    width: 128px;    height: 131px;    border:none;    outline:none;    color:white !important;    font-weight: 700;    font-size:18px;    text-shadow: 0px 1px 2px #000;    text-align: center;    vertical-align: middle;    text-decoration: none;    cursor:pointer;">' + '<br><br><a id="closeDialog" style="color:grey;font-size:13px;cursor:pointer">Close window</a></div>');

				} else if(response == "ok") {

					if(typeof window.nbot_nBOTpassword === "undefined") {

						$("body").append('<div id="npass" style="z-index:99999;padding:15px;text-align:center;position:absolute;width:250px;height:auto;background:#ECECEC;top:50%;left:50%;margin-top:-75px;margin-left:-125px">' + '<img src="https://origem-bot.tk/img/logo.png" style="height:55px"><br><br>' + '<form id="nLogin"><input type="password" id="nPasswordInput" name="nPassword" placeholder="Community password" style="width: 100%;padding: 10px;box-sizing: border-box;outline: none;border: 1px solid silver;"><br><br>' + '<input type="submit" value="START!" name="nSpam" style="background-color:transparent; display: table-cell;    background-image: url(https://origem-bot.tk/img/nbot_button.png);    background-size: 128px 131px;    width: 128px;    height: 131px;    border:none;    outline:none;    color:white !important;    font-weight: 700;    font-size:18px;    text-shadow: 0px 1px 2px #000;    text-align: center;    vertical-align: middle;    text-decoration: none;    cursor:pointer;">' + '<br><br><a id="closeDialog" style="color:grey;font-size:13px;cursor:pointer">Close window</a></div>');
						return;

					} else {

						NBOT.post("get/GetLanguageCode.php", {
							key: window.nbot_nBOTpassword,
							community: encodeURIComponent(document.URL)
						}, function(langCode) {
							var subFolder;

							if(window.nbot_privateLanguageCode !== 0) {
								langCode = window.nbot_privateLanguageCode;
								subFolder = "private/";
								NBOT.chat("<i>Private language detected. Loading language....</i>");

							} else {

								subFolder = "";

							}

							$.getJSON("https://origem-bot.tk/langs/" + subFolder + langCode + ".json?t=" + NBOT.runtime, function(langSource) {
								window.nbot_nLANG = langSource;
								for(var key in window.nbot_nBOTDefaultLanguage) {

									var obj = window.nbot_nLANG[key];

									if(typeof obj === "undefined") {
										NBOT.chat("<i><div class=\"nbotWarning\">Your private language isnt completely translated.<br><br><b>How to fix my language?</b><br>1. <a href=\"https://origem-bot.tk/langs/new.php?code=" + langCode + "\" target=\"_blank\">Click here</a><br>2. Click on the \"Update my language\"<br>3. Reload nBOT: " + NBOT.settings.cmdTrigger + "reload</div>Loading default English language..</i>", true);
										$.getJSON("https://rawgit.com/CikerDeveloper/NBOT/master/langs/en.json?t=" + NBOT.runtime, function(langSource) {
											window.nbot_nLANG = langSource;
										});
										break;
									}

								};

							}).error(function() {
								NBOT.chat("<i>Language not exist. <a href='https://origem-bot.tk/' target='_blank'>Translate new public language</a><br><b>Loading default language...</b></i>");
								window.nbot_findLangCode = 0;
								$.getJSON("https://rawgit.com/CikerDeveloper/NBOT/master/langs/en.json?t=" + NBOT.runtime, function(langSource) {
									window.nbot_nLANG = langSource;
								});
							});

							$.get("https://origem-bot.tk/get/GetLanguage.php", {
								k: window.nbot_nBOTpassword
							}, function(aL) {
								window.nbot_availableLangs = [];
								window.nbot_privateLangs = [];

								var aLArray = aL.split("--");
								window.nbot_aLArray_publicLangs = aLArray[0].split(",");
								window.nbot_aLArray_privateLangs = aLArray[1].split(",");

								for(var i = window.nbot_aLArray_publicLangs.length - 1; i >= 0; i--) {
									window.nbot_availableLangs.push(window.nbot_aLArray_publicLangs[i]);
								};

								for(var i = window.nbot_aLArray_privateLangs.length - 1; i >= 0; i--) {
									if(window.nbot_aLArray_privateLangs[i] !== "") {
										window.nbot_privateLangs.push(window.nbot_aLArray_privateLangs[i]);
									}
								};

								NBOT.initPanel();
								NBOT.chat("<i>Last updated 2015-09-02</i>", true);
							});

						});

					}

				} else {

					NBOT.chat("<i>This community isnt activated. <a style=\"font-size:12px;color:#eee\" href=\"https://origem-bot.tk/nbot/activation.html\" target=\"_blank\">Click here to activate</a>. After activation, press F5 and run nBOT again!</i>");

				}
			});

		}, // NBOT.run()

		initPanel: function() {
			NBOT.intervals.livePlay = setInterval(updateLivePLay, 60000);
			NBOT.intervals.newVersion = setInterval(checkNewVersion, 5000);

			NBOT.intervals.dcLookup = setInterval(function() {
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
			NBOT.post("/get/actions/loader.php", {
				Room: encodeURIComponent(document.URL),
				Key: window.nbot_nBOTpassword
			}, function(data) {

				data = JSON.parse(data);

				/* Získané dáta sa oddelia medzerou do Array */
				window.nbot_odpoved = data;
				if(window.nbot_odpoved !== "Failed") {

					window.nbot_tempData = data;
					/* Jazyk */
					NBOT.settings.language = data.language;

					/* Meno bota */
					NBOT.settings.name = data.nbotName;

					/* bad words engine */
					NBOT.settings.engine.badwords = Number(data.badWordsEngine);

					/*Autodc & WLfilter */
					NBOT.settings.engine.wlFilter = Number(data.waitListFilter);

					NBOT.settings.engine.autoDc = Number(data.autoDc);

					NBOT.settings.engine.cmdLog = Number(data.commandLog);

					NBOT.settings.engine.emote = data.emoteEngine;

					NBOT.settings.aiType = data.aiType;

					
					if(NBOT.settings.engine.emote == "/em") {
						NBOT.settings.engine.emote = "/em ";
					}

					NBOT.settings.engine.hideCommands = Number(data.hideCommands);

					var motd = data.motd.split("|");


					NBOT.settings.motdInterval = Number(motd[0]);
					NBOT.settings.motdMessage = motd[1].replace(/-_-_-/g, " ");

					/* Počet potrebných hlasov Voteskip */
					NBOT.settings.voteskip.limit = Number(data.voteskipCount);

					/* Limit songu v sekundách */
					NBOT.settings.songLimit = Number(data.songLimit);
					/* Čas rulety */
					NBOT.settings.roulette.rouletteTime = Number(data.rouletteTime);

					/* Limit histórie */
					NBOT.settings.historyLimit = Number((eval(data.historyLimit) - eval(1)));

					/* Uvítacia správa (ak niekto príde) */
					NBOT.settings.engine.msg.welcome = Number(data.msgWelcomeEngine);

					/* talk file */
					NBOT.settings.aiFile = data.talkFile;

					/* bad words */
					NBOT.settings.badwords = data.badWords.split(" ");

					window.nbot_waitingUsersForDC = [];

					/* Grab správa (pri každom grabe)*/
					NBOT.settings.engine.msg.grab = Number(data.msgGrabEngine);

					if(NBOT.settings.engine.msg.grab === 0) {
						NBOT.settings.engine.msg.grab_msg = ":red_circle:";
					} else if(NBOT.settings.engine.msg.grab === 1) {
						NBOT.settings.engine.msg.grab_msg = ":white_check_mark:";
					}

					/* Štatistiky správa (na konci každého songu) */

					NBOT.settings.engine.msg.stats = Number(data.msgStatsEngine);

					if(NBOT.settings.engine.msg.stats === 0) {
						NBOT.settings.engine.msg.stats_msg = ":red_circle:";
					} else if(NBOT.settings.engine.msg.stats === 1) {
						NBOT.settings.engine.msg.stats_msg = ":white_check_mark:";
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


					NBOT.settings.cmdTrigger = data.commandTrigger;

					NBOT.settings.dcLimit = data.dcLimit;

					window.nbot_welcomeMessage_settedMSG_zaloha = data.welcomeMessage.replace(/-_-_-/g, " ");

					

					var cookies_commands = data.cookieCommands.replace(/-_-_-/g, " ").split(" %% ");
					var cookies_words = data.cookieWords.replace(/-_-_-/g, " ").split(" %%%% ");

					for(var i = cookies_commands.length - 1; i >= 0; i--) {

						NBOT.settings.cookies.commands.push(cookies_commands[i]);
						NBOT.settings.cookies.slova.push(cookies_words[i].split(" %% "));

					};


							if(NBOT.settings.aiFile) {

								if(NBOT.settings.aiType == "private"){

									$.getJSON(NBOT.settings.aiFile, function(reply) {
										if(reply.onMention &&
											reply.offMention &&
											reply.global){

											window.nbot_ai = reply;

										} else {

											nBOTChat("<i>AI error: Invalid JSON syntax. Loading deafult AI file...</i>", true);
											$.getJSON("https://rawgit.com/CikerDeveloper/NBOT/master/ai/default_ai.json", function(r){
													
												window.nbot_ai = r;
											});
										}

									});

								}
							}

					/*	setTimeout(ulozitWaitList, 10000);*/

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

					if(NBOT.settings.engine.emote == "/em ") {
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
						'<a class="nLink" onClick="window.zobrazitControlPanel(\'nBOT-ArtificialIntelligence\')"><i class="icon nbot_icon icon_ai"></i><span>' + window.nbot_nLANG.panel_settings_0_6 + ' <i style="font-style:normal;color:red;font-size:9px">BETA</i></span></a>' +
						'</div>' +

						'<div class="nbot_row">' +
						'<a class="nLink" onClick="window.zobrazitControlPanel(\'nBOT-BadWords\')"><i class="icon nbot_icon icon_badwords"></i><span>' + window.nbot_nLANG.bw_1 + '</a>' +
						'</div>' +

						'<div class="nbot_row">' +
						'<a class="nLink" onClick="window.zobrazitControlPanel(\'nBOT-PasswordChange\')"><i class="icon nbot_icon icon_passwordchange"></i><span>' + window.nbot_nLANG.panel_settings_0_5 + '</a>' +
						'</div>' +

						'<div class="nbot_row">' +
						'<a class="nLink" onClick="window.zobrazitControlPanel(\'nBOT-CommandPermissions\')"><i class="icon nbot_icon icon_cmdperm"></i><span>' + window.nbot_nLANG.panel_settings_0_2 + '</a>' +
						'</div>' +

						'<div class="nbot_row" >' +
						'<a class="nLink" onClick="window.zobrazitControlPanel(\'nBOT-CookiesManager\')"><i class="icon nbot_icon icon_cookie"></i><span>' + window.nbot_nLANG.panel_settings_0_4 + '</span></a>' +
						'</div>' +

						'<div class="nbot_row">' +
						'<a class="nLink" onClick="window.zobrazitControlPanel(\'nBOT-LanguageEditor\')"><i class="icon nbot_icon icon_language"></i><span>' + window.nbot_nLANG.panel_settings_0_3 + '</span></a>' +
						'</div>' +

						'<div class="nbot_row">' +
						'<a class="nLink" onClick="window.zobrazitControlPanel(\'nBOT-Settings\')"><i class="icon nbot_icon icon_settings"></i><span>' + window.nbot_nLANG.panel_settings_0_1 + '</span></a>' +
						'</div>' +
						'<br><br>' +
						'<div class="hlavnyNadpis"><i class="icon nbot_icon icon_smiley"></i><span>' + window.nbot_nLANG.panel_settings_2 + '</span></div>' +
						'<div class="nbot_row" style="text-align:center">' +
						'<a class="nLink nbot_toggleEmoteChat" onClick="toggleEmoteChat()"><i class="icon nbot_icon icon_checked" ' + nbot_emote_icon_visibility + '></i><span>' + window.nbot_nLANG.panel_settings_2_1 + '</span></a>' +
						'</div>' +

						'<br class="break">' +
						'<div class="hlavnyNadpis"><i class="icon icon-grab-disabled"></i><span>' + window.nbot_nLANG.panel_settings_1 + '</span></div>' +

						'<div style="text-align:center">' +
						'<input type="submit" class="nBOTactionButton action-skip anButton" value="' + window.nbot_nLANG.panel_actions_1_1 + ' " style="background-color:#c42e3b;" onClick="window.skrytControlPanel(\'nBOT-ControlPanel\')">' +
						'<input type="submit" class="nBOTactionButton action-tryagain anButton" value="' + window.nbot_nLANG.panel_actions_1_2 + '" style="background-color:#c42e3b;" onClick="window.skrytControlPanel(\'nBOT-ControlPanel\')">' +
						'<input type="submit" class="nBOTactionButton action-songban anButton" value="' + window.nbot_nLANG.panel_actions_1_3 + '" style="background-color:#c42e3b;" onClick="window.skrytControlPanel(\'nBOT-ControlPanel\')"><br class="break">' +
						'<input type="submit" class="nBOTactionButton action-lock anButton" value="' + window.nbot_nLANG.panel_actions_1_4 + '">' +
						'<input type="submit" class="nBOTactionButton action-unlock anButton" value="' + window.nbot_nLANG.panel_actions_1_5 + '">' +
						'<input type="submit" class="nBOTactionButton action-clearwaitlist anButton" value="' + window.nbot_nLANG.panel_actions_1_6 + '">' +
						'<input type="submit" class="nBOTactionButton action-roulette anButton" value="' + window.nbot_nLANG.panel_actions_1_7 + '">' +
						'</div>' +
						'');

					$("#nBOT-PasswordChange").append('' +
						'<div class="panelHeader" style="background:#1c1f25;height:60px;margin-bottom:20px">' +
						'<div class="closeIcon" onClick="window.skrytControlPanel(\'nBOT-PasswordChange\')" style="vertical-align:top;cursor:pointer;width:30px;display:table-cell;padding:15px;height:30px;"><i class="icon icon-arrow-right"></i></div>' +
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



					if(NBOT.settings.engine.badwords == 1) {
						var nbot_bwf_icon_visibility = "";
					} else {
						var nbot_bwf_icon_visibility = "style=\"display:none\"";
					}


					$("#nBOT-BadWords").append('' +
						'<div class="panelHeader" style="background:#1c1f25;height:60px;margin-bottom:20px">' +
						'<div class="closeIcon" onClick="window.skrytControlPanel(\'nBOT-BadWords\')" style="vertical-align:top;cursor:pointer;width:30px;display:table-cell;padding:15px;height:30px;"><i class="icon icon-arrow-right"></i></div>' +
						'<div class="logoIcon" style="display:table-cell; vertical-align:middle;width:200px;border-left:1px solid black;padding:5px 10px">' + window.nbot_nLANG.panel_global_3 + '</div>' +
						'</div>' +

						'<div class="nbot_row">' +
						'<a class="nLink nbot_toggleBadWordsFilter" onClick="window.toggleBadWordsFilter()"><i class="icon nbot_icon icon_checked" ' + nbot_bwf_icon_visibility + '></i><span>' + window.nbot_nLANG.bw_1 + '</span></a>' +
						'</div>' +

						'<div class="inpanel_infobox">' + window.nbot_nLANG.bw_2 + '</div>' +
						'<form id="nbot_saveBadWords">' +
						'<div class="inpanel_infobox transparent"><textarea placeholder="' + window.nbot_nLANG.bw_3 + '" name="nbot_badwords" class="nbot_textarea" id="nbot_badwords_textarea">' + (NBOT.settings.badwords.join(' ')) + '</textarea></div>' +
						'<input type="submit" class="nSubmit" value="' + window.nbot_nLANG.panel_settings_0_4_5 + '">' +
						'</form>' +
						'');

					if(NBOT.settings.aiType == "private") {
						var selected = "selected=\"selected\"";
						var displayinput = "";
					} else {
						var selected = "";
						var displayinput = "style=\"display:none\"";

					}
					$("#nBOT-ArtificialIntelligence").append('' +
						'<div class="panelHeader" style="background:#1c1f25;height:60px;margin-bottom:20px">' +
						'<div class="closeIcon" onClick="window.skrytControlPanel(\'nBOT-ArtificialIntelligence\')" style="vertical-align:top;cursor:pointer;width:30px;display:table-cell;padding:15px;height:30px;"><i class="icon icon-arrow-right"></i></div>' +
						'<div class="logoIcon" style="display:table-cell; vertical-align:middle;width:200px;border-left:1px solid black;padding:5px 10px">' + window.nbot_nLANG.panel_global_3 + '</div>' +
						'</div>' +

						'<div class="hlavnyNadpis">' + window.nbot_nLANG.panel_settings_0 + ' / ' + window.nbot_nLANG.panel_settings_0_6 + '</div>' +

						'<div class="nbot_row" style="text-align:center">' +
						'<a class="nLink nbot_toggleAI" onClick="toggleAI()"><i class="icon nbot_icon icon_checked" style="display:none"></i><span>' + window.nbot_nLANG.panel_settings_0_6 + '</span></a>' +
						'</div>' +
						'<form id="saveNBOT_AI">' +
						'<div id="onAIEngineOn" style="display:none">' +

						'<div class="permissionPolozka">' +
						'<div class="label">Type</div>' +
						'<div class="input">' +
						'<select id="changeAIType"><option value="public">Public (English only)</option><option value="private" ' + selected + '>Private</option></select>' +
						'</div>' +
						'</div>' +

						'<div ' + displayinput + ' class="permissionPolozka" id="onAITypeIsPrivate">' +
						'<div class="label">JSON source</div>' +
						'<div class="input">' +
						'<input type="text" class="textBox" placeholder="https://" value="' + NBOT.settings.aiFile + '" id="set_ai_file">' +
						'</div>' +
						'</div>' +
						'<div class="inpanel_infobox">Read more about AI here:<br><a href="https://origem-bot.tk/#ai" target="_blank">https://origem-bot.tk/#ai</a></div>' +
						'<input type="submit" class="nSubmit" value="' + window.nbot_nLANG.panel_settings_0_4_5 + '">' +
						'</div>' +
						'</form>' +

						'');


					$("#nBOT-CookiesManager").append('' +
						'<div class="panelHeader" style="background:#1c1f25;height:60px;margin-bottom:20px">' +
						'<div class="closeIcon" onClick="window.skrytControlPanel(\'nBOT-CookiesManager\')" style="vertical-align:top;cursor:pointer;width:30px;display:table-cell;padding:15px;height:30px;"><i class="icon icon-arrow-right"></i></div>' +
						'<div class="logoIcon" style="display:table-cell; vertical-align:middle;width:200px;border-left:1px solid black;padding:5px 10px">' + window.nbot_nLANG.panel_global_3 + '</div>' +
						'</div>' +

						'<div class="hlavnyNadpis">' + window.nbot_nLANG.panel_settings_0 + ' / ' + window.nbot_nLANG.panel_settings_0_4 + '</div><div class="nbotWarning">' + window.nbot_nLANG.panel_settings_0_4_1 + '</div><form id="cookies_form"><div id="nbot_buildCookies"></div></form>' +
						'');

					for(var ii = NBOT.settings.cookies.commands.length - 1; ii >= 0; ii--) {

						$("#nbot_buildCookies").append("<div class=\"permissionPolozka\"><input class=\"ccommand_command\" type=\"text\" name=\"command\" value=\"" + NBOT.settings.cookies.commands[ii] + "\"><div data-commandsource=\"" + NBOT.settings.cookies.commands[ii] + "\"></div></div>");
						for(var iii = 0; iii < NBOT.settings.cookies.slova[ii].length; iii++) {
							$("div[data-commandsource='" + NBOT.settings.cookies.commands[ii] + "']").append("<div class=\"permissionPolozka\"><input class=\"ccommand_labels\" type=\"text\" name=\"value\" value=\"" + NBOT.settings.cookies.slova[ii][iii] + "\"></div>");
						};

						if(NBOT.settings.cookies.slova[ii].length > 3) {

							$("div[data-commandsource='" + NBOT.settings.cookies.commands[ii] + "']").append('<a data-command="' + NBOT.settings.cookies.commands[ii] + '" class="addNewReply nSubmit small" style="display:none">' + window.nbot_nLANG.panel_settings_0_4_2 + '</a>');
							$("div[data-commandsource='" + NBOT.settings.cookies.commands[ii] + "']").append('<a data-command="' + NBOT.settings.cookies.commands[ii] + '" class="removeReply nSubmit small" style="background:darkred">' + window.nbot_nLANG.panel_settings_0_4_3 + '</a>');

						} else {

							$("div[data-commandsource='" + NBOT.settings.cookies.commands[ii] + "']").append('<a data-command="' + NBOT.settings.cookies.commands[ii] + '" class="addNewReply nSubmit small">' + window.nbot_nLANG.panel_settings_0_4_2 + '</a>');
							$("div[data-commandsource='" + NBOT.settings.cookies.commands[ii] + "']").append('<a data-command="' + NBOT.settings.cookies.commands[ii] + '" class="removeReply nSubmit small" style="background:darkred;display:none">' + window.nbot_nLANG.panel_settings_0_4_3 + '</a>');

						}

					};
					$("#nbot_buildCookies").append('<a id="newCookieCommand" class="nSubmit small">' + window.nbot_nLANG.panel_settings_0_4_4 + '</a>');
					$("#nbot_buildCookies").append('<input type="submit" class="nSubmit saveNewCookiesCommands" value="' + window.nbot_nLANG.panel_settings_0_4_5 + '">');

					$("#nBOT-Settings").append('' +
						'<div class="panelHeader" style="background:#1c1f25;height:60px;margin-bottom:20px">' +
						'<div class="closeIcon" onClick="window.skrytControlPanel(\'nBOT-Settings\')" style="vertical-align:top;cursor:pointer;width:30px;display:table-cell;padding:15px;height:30px;"><i class="icon icon-arrow-right"></i></div>' +
						'<div class="logoIcon" style="display:table-cell; vertical-align:middle;width:200px;border-left:1px solid black;padding:5px 10px">' + window.nbot_nLANG.panel_global_3 + '</div>' +
						'</div>' +

						'<div class="hlavnyNadpis">' + window.nbot_nLANG.panel_settings_0 + ' / ' + window.nbot_nLANG.panel_settings_0_1 + '</div>' +
						'<form id="nbot_updateRoomSettings_form">'+
						'<div class="permissionPolozka">' +
						'<div class="label">' + window.nbot_nLANG.panel_settings_0_1_1 + '</div>' +
						'<div class="input">' +
						'<input id="blockWhitespaces" type="text" class="textBox" name="set-botname" value="' + NBOT.settings.name + '">' +
						'</div>' +
						'</div>' +

						'<div class="permissionPolozka">' +
						'<div class="label">' + window.nbot_nLANG.panel_settings_0_1_2 + '</div>' +
						'<div class="input">' +
						'<select class="textBox" name="set-lang" id="selectLangs" ></select>' +
						'</div>' +
						'</div>' +

						'<div class="permissionPolozka">' +
						'<div class="label">' + window.nbot_nLANG.panel_settings_0_1_3 + '</div>' +
						'<div class="input">' +
						'<input type="text" class="textBox" name="set-songlimit" value="' + NBOT.settings.songLimit + '">' +
						'</div>' +
						'</div>' +

						'<div class="permissionPolozka">' +
						'<div class="label">' + window.nbot_nLANG.panel_settings_0_1_4 + '</div>' +
						'<div class="input">' +
						'<input type="text" class="textBox" name="set-historylimit" value="' + (Number(NBOT.settings.historyLimit) + 1) + '">' +
						'</div>' +
						'</div>' +

						'<div class="permissionPolozka">' +
						'<div class="label">' + window.nbot_nLANG.panel_settings_0_1_5 + '</div>' +
						'<div class="input">' +
						'<input type="text" class="textBox" name="set-cmdtrigger" value="' + NBOT.settings.cmdTrigger + '">' +
						'</div>' +
						'</div>' +

						'<div class="permissionPolozka">' +
						'<div class="label">' + window.nbot_nLANG.panel_settings_0_1_6 + '</div>' +
						'<div class="input">' +
						'<input type="text" class="textBox" name="set-roulettetime" value="' + NBOT.settings.roulette.rouletteTime + '">' +
						'</div>' +
						'</div>' +

						'<div class="permissionPolozka">' +
						'<div class="label">' + window.nbot_nLANG.panel_settings_0_1_7 + '</div>' +
						'<div class="input">' +
						'<input type="text" class="textBox" name="set-welcomemessage" value="' + window.escapeHtml(window.nbot_welcomeMessage_settedMSG_zaloha) + '">' +
						'</div>' +
						'</div>' +

						'<div class="permissionPolozka">' +
						'<div class="label">' + window.nbot_nLANG.panel_settings_0_1_8 + '</div>' +
						'<div class="input">' +
						'<input type="text" class="textBox" name="set-dclimit" value="' + NBOT.settings.dcLimit + '">' +
						'</div>' +
						'</div>' +

						'<div class="permissionPolozka">' +
						'<div class="label">' + window.nbot_nLANG.panel_settings_0_1_9 + '</div>' +
						'<div class="input"><select class="textBox" name="action-autodc" ><option value="on">' + window.nbot_nLANG.panel_global_1 + '</option><option value="off">' + window.nbot_nLANG.panel_global_2 + '</option></select>' +
						'' +
						'</div>' +
						'</div>' +

						'<div class="permissionPolozka">' +
						'<div class="label">' + window.nbot_nLANG.panel_settings_0_1_10 + '</div>' +
						'<div class="input">' +
						'<select class="textBox" name="action-commandlog" ><option value="on">' + window.nbot_nLANG.panel_global_1 + '</option><option value="off">' + window.nbot_nLANG.panel_global_2 + '</option></select>' +
						'</div>' +
						'</div>' +

						'<div class="permissionPolozka">' +
						'<div class="label">' + window.nbot_nLANG.panel_settings_0_1_11 + '</div>' +
						'<div class="input">' +
						'<select class="textBox" name="action-hidecommands" ><option value="on">' + window.nbot_nLANG.panel_global_1 + '</option><option value="off">' + window.nbot_nLANG.panel_global_2 + '</option></select>' +
						'</div>' +
						'</div>' +

						'<div class="permissionPolozka">' +
						'<div class="label">' + window.nbot_nLANG.panel_settings_0_1_12 + '</div>' +
						'<div class="input">' +
						'<select class="textBox" name="action-wlfilter" ><option value="on">' + window.nbot_nLANG.panel_global_1 + '</option><option value="off">' + window.nbot_nLANG.panel_global_2 + '</option></select>' +
						'</div>' +
						'</div><input type="submit" class="nSubmit" value="Save and close"></form>');


					var nBOTControlPanelPermSettingsHTML = "";
					for(var i = 0; i < window.nbot_Perm_Array.length; i++) {
						var cmdRank = (window.nbot_Perm_Array[i].split("=")[1]);
						var cmd = (window.nbot_Perm_Array[i].split("=")[0]);
						if(cmdRank !== "host") {
							nBOTControlPanelPermSettingsHTML = nBOTControlPanelPermSettingsHTML + '<div class="permissionPolozka"><div class="label">' + NBOT.settings.cmdTrigger + cmd + '</div><div class="input"><select name="set-cp" data-name="nBOT-CP-CommandPermissions-SELECT" data-cmd="' + cmd + '" ><option value="' + cmd + ' user">' + window.nbot_nLANG.panel_settings_0_2_1 + '</option><option value="' + cmd + ' bouncer">' + window.nbot_nLANG.panel_settings_0_2_2 + '</option><option value="' + cmd + ' manager">' + window.nbot_nLANG.panel_settings_0_2_3 + '</option><option value="' + cmd + ' cohost">' + window.nbot_nLANG.panel_settings_0_2_4 + '</option></select></div><div class="nbot-submit"><input type="submit" class="nBOTactionButton set-cp" value=">"></div></div>';
						}
						$('select[data-cmd="' + cmd + '"]').val(window.nbot_Perm_Array[i].split("=")[0] + " " + window.nbot_Perm_Array[i].split("=")[1]);
					};

					$("#nBOT-CommandPermissions").append('' +
						'<div class="panelHeader" style="background:#1c1f25;height:60px;margin-bottom:20px">' +
						'<div class="closeIcon" onClick="window.skrytControlPanel(\'nBOT-CommandPermissions\')" style="vertical-align:top;cursor:pointer;width:30px;display:table-cell;padding:15px;height:30px;"><i class="icon icon-arrow-right"></i></div>' +
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
						if(NBOT.settings.language === window.nbot_availableLangs[i]) {
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
							'<div class="closeIcon" onClick="window.skrytControlPanel(\'nBOT-LanguageEditor\')" style="vertical-align:top;cursor:pointer;width:30px;display:table-cell;padding:15px;height:30px;"><i class="icon icon-arrow-right"></i></div>' +
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
							'<div class="closeIcon" onClick="window.skrytControlPanel(\'nBOT-LanguageEditor\')" style="vertical-align:top;cursor:pointer;width:30px;display:table-cell;padding:15px;height:30px;"><i class="icon icon-arrow-right"></i></div>' +
							'<div class="logoIcon" style="display:table-cell; vertical-align:middle;width:200px;border-left:1px solid black;padding:5px 10px;">' + window.nbot_nLANG.panel_global_3 + '</div>' +
							'</div>' +
							'<div class="hlavnyNadpis">' + window.nbot_nLANG.panel_settings_0 + ' / ' + window.nbot_nLANG.panel_settings_0_3 + '</div>' +
							detectedLanguage +

							'');
					}


					for(var key in window.nbot_nLANG) {
						if(window.nbot_nLANG.hasOwnProperty(key)) {
							var obj = window.nbot_nLANG[key];
							window.nbot_nLANG[key] = obj.replace("%%BOTNAME%%", NBOT.settings.name).replace("%%CMDTRIGGER%%", NBOT.settings.cmdTrigger);
						}
					}

					API.sendChat(NBOT.settings.engine.emote + window.nbot_nLANG.startSuccess);
					NBOT.chat(window.nbot_nLANG.startSuccess);

					$("#updatePrivateLanguage").submit(function() {
						NBOT.post("langs/update.php", {
							data: $("#updatePrivateLanguage").serializeArray()
						}, function(response) {
							$("#updatePrivateLanguage").html(response);
						});
						return false;

					});
					$("#nbot-passwordchange-form").submit(function() {
						NBOT.post("get/actions/change_password.php", {
							community: window.location.href,
							key: window.nbot_nBOTpassword,
							newkey: $("#newnbotpasswordinput").val()
						}, function(response) {
							NBOT.chat("<i>Password has been updated! Please reload nBOT!</i>", true);
							window.location.reload();
						});
						window.skrytControlPanel("nBOT-PasswordChange");
						window.skrytControlPanel('nBOT-ControlPanel');
						window.skrytControlPanel('nBOT-CommandPermissions');
						window.skrytControlPanel('nBOT-Settings');
						window.skrytControlPanel('nBOT-CookiesManager');
						window.skrytControlPanel('nBOT-ArtificialIntelligence');
						window.skrytControlPanel('nBOT-BadWords');
						return false;
					})

					$(document).off("click", ".addNewReply");
					$(document).off("click", ".removeReply");
					$(document).off("click", ".removeCommand");
					$(document).off("click", "#newCookieCommand");
					$(document).off("submit", "#saveNBOT_AI");
					$(document).off("submit", "#nbot_saveBadWords");
					$(document).off("change", "#changeAIType");
					$(document).off("submit", "#nbot_updateRoomSettings_form");

					$(document).on("submit", "#nbot_updateRoomSettings_form", function(){
						NBOT.post("/actions/update_room_settings.php", {
							data: $(this).serializeArray()
						}, function(){
							NBOT.chat("Settings has been saved!");
							window.skrytControlPanel("nBOT-PasswordChange");
							window.skrytControlPanel('nBOT-ControlPanel');
							window.skrytControlPanel('nBOT-CommandPermissions');
							window.skrytControlPanel('nBOT-Settings');
							window.skrytControlPanel('nBOT-CookiesManager');
							window.skrytControlPanel('nBOT-ArtificialIntelligence');
							window.skrytControlPanel('nBOT-BadWords');
						});
						return false;
					})


					$(document).on("change", "#changeAIType", function() {

						if($("#changeAIType option:selected").val() == "private") {
							$("#onAITypeIsPrivate").show();
							$("#set_ai_file").val('' + NBOT.settings.aiFile);
						} else {
							$("#onAITypeIsPrivate").hide();
							$("#set_ai_file").val('');
						}

					});

					$(document).on("submit", "#saveNBOT_AI", function() {

						window.skrytControlPanel("nBOT-PasswordChange");
						window.skrytControlPanel('nBOT-ControlPanel');
						window.skrytControlPanel('nBOT-CommandPermissions');
						window.skrytControlPanel('nBOT-Settings');
						window.skrytControlPanel('nBOT-CookiesManager');
						window.skrytControlPanel('nBOT-ArtificialIntelligence');
						window.skrytControlPanel('nBOT-BadWords');

						NBOT.post("get/actions/action_4daf4ds8g.php", {
								roomUrl: document.URL,
								key: window.nbot_nBOTpassword,
								set_ai_file: $("#set_ai_file").val()
							},
							function(r) {
								NBOT.chat("<i>AI settings changed. Reload NBOT to see effects.</i>", true);
							});

						return false;

					});

					$(document).on("submit", "#nbot_saveBadWords", function() {

						window.skrytControlPanel("nBOT-PasswordChange");
						window.skrytControlPanel('nBOT-ControlPanel');
						window.skrytControlPanel('nBOT-CommandPermissions');
						window.skrytControlPanel('nBOT-Settings');
						window.skrytControlPanel('nBOT-CookiesManager');
						window.skrytControlPanel('nBOT-ArtificialIntelligence');
						window.skrytControlPanel('nBOT-BadWords');

						NBOT.post("get/actions/action_4daf4ds8g.php", {
							roomUrl: document.URL,
							key: window.nbot_nBOTpassword,
							badwords: $("#nbot_badwords_textarea").val()
						}, function(r) {
							NBOT.chat("<i>Bad words has been set. Reload NBOT to see effect.</i>", true);
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
						NBOT.post("get/actions/action_xc59rGy1x.php", {
							data: $(this).serializeArray(),
							room: window.location.href,
							password: window.nbot_nBOTpassword
						});
						return false;
					});

					$(".saveNewCookiesCommands").click(function() {
						window.skrytControlPanel('nBOT-ControlPanel');
						window.skrytControlPanel('nBOT-CommandPermissions');
						window.skrytControlPanel('nBOT-Settings');
						window.skrytControlPanel('nBOT-CookiesManager');
						window.skrytControlPanel("nBOT-PasswordChange");
						window.skrytControlPanel('nBOT-ArtificialIntelligence');
						window.skrytControlPanel('nBOT-BadWords');
						NBOT.chat("<i>You set new cookies commands. You must reload nBOT to apply this effect. Write " + NBOT.settings.cmdTrigger + "reload or press F5.</i>", true);
					});

					$('.nBOTactionButton').click(function() {
						window.skrytControlPanel('nBOT-ControlPanel');
						window.skrytControlPanel('nBOT-CommandPermissions');
						window.skrytControlPanel('nBOT-Settings');
						window.skrytControlPanel('nBOT-CookiesManager');
						window.skrytControlPanel("nBOT-PasswordChange");
						window.skrytControlPanel('nBOT-ArtificialIntelligence');
						window.skrytControlPanel('nBOT-BadWords');

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
							API.sendChat(NBOT.settings.cmdTrigger + thisSuperCommand + " " + thisCommand + " " + valueInputu);
							NBOT.chat(NBOT.settings.cmdTrigger + thisSuperCommand + " " + thisCommand + " " + valueInputu);

						} else if(thisSuperCommand === "action") {
							API.sendChat(NBOT.settings.cmdTrigger + thisCommand + valueInputu);
							NBOT.chat(NBOT.settings.cmdTrigger + thisCommand + valueInputu);
						}

					}); // click


					if(NBOT.settings.engine.autoDc == 1) {
						$("select[name=action-autodc]").val("on");
					} else {
						$("select[name=action-autodc]").val("off");
					}

					if(NBOT.settings.engine.cmdLog == 1) {
						$("select[name=action-commandlog]").val("on");
					} else {
						$("select[name=action-commandlog]").val("off");
					}

					if(NBOT.settings.engine.hideCommands == 1) {
						$("select[name=action-hidecommands]").val("on");
					} else {
						$("select[name=action-hidecommands]").val("off");
					}


					if(NBOT.settings.engine.wlFilter == 1) {
						$("select[name=action-wlfilter]").val("on");
					} else {
						$("select[name=action-wlfilter]").val("off");
					}


					$('#nBOT-cPanel').click(function() {
						window.zobrazitControlPanel("nBOT-ControlPanel");
					});
					$('#nBOT-ControlPanel-close').click(function() {
						window.skrytControlPanel("nBOT-ControlPanel");
					});
					$("#blockWhitespaces").keydown(function(e) {
						if(e.keyCode == 32) {
							$(this).val($(this).val() + "-"); // append '-' to input
							return false; // return false to prevent space from being added
						}
					});
				}

			});

		}, //NBOT.initPanel()

		restart: function(){
			$("#nStyle").remove();
			$("#npass").remove();
			$(".nBOTControlPanel").remove();
			$("#nBOT-cPanel").remove();
			setTimeout(function() {
				$("#chat-messages").find(".narcis77").remove();
			}, 1000);
				
			clearInterval(NBOT.intervals.livePlay);
			clearInterval(NBOT.intervals.newVersion);
			clearInterval(NBOT.settings.roulette.autoInterval);

			API.sendChat(NBOT.settings.engine.emote + window.nbot_nLANG.offline);
			NBOT.chat(window.nbot_nLANG.offline);

			NBOT.API.undoHooks();
			var loadUrl = NBOT.scriptUrl;
			delete NBOT;
			setTimeout(function(){
				$.getScript(loadUrl);
			}, 1000);
		},

		runWlFilter: function(){
			if(NBOT.settings.engine.wlFilter == 1) {
				for(var i = NBOT.data.wlFilterTargets.length - 1; i >= 0; i--) {
					API.moderateRemoveDJ(NBOT.data.wlFilterTargets[i]);
				};
			}
		},

		checkBanned: function(){
			if(typeof API.getMedia() !== "undefined"){

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
						API.sendChat(NBOT.settings.engine.emote + window.nbot_nLANG.song_banned);
						NBOT.chat(window.nbot_nLANG.song_banned);
						API.moderateForceSkip();
					}
				});
			}
		},

		checkHistory: function(){

			if(NBOT.settings.engine.historyCheck === 1) {
				window.nbot_PoslednychDesatSongov = [];

				if(API.getHistory().length > NBOT.settings.historyLimit) {

					for(var hi = 1; hi <= NBOT.settings.historyLimit; hi++) {
						window.nbot_PoslednychDesatSongov.push(API.getHistory()[hi].media.title);
					};

					var mediaa = API.getMedia();

					window.nbot_AktualnySong = mediaa.title;

					if(($.inArray(window.nbot_AktualnySong, window.nbot_PoslednychDesatSongov) > -1)) {
						API.sendChat(NBOT.settings.engine.emote + window.nbot_nLANG.song_in_history);
						NBOT.chat(window.nbot_nLANG.song_in_history);
						API.moderateForceSkip();
					}

				}
			}

		},

		API: {
			apiHooks: [{
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
			}],

			hook: function(apiEvent, callback) {
				return API.on(apiEvent, callback);
			},

			unhook: function(apiEvent, callback) {
				return API.off(apiEvent, callback);
			},

			initHooks: function() {
				var pair, _i, _len;

				for(_i = 0; _i < NBOT.API.apiHooks.length; _i++) {
					pair = NBOT.API.apiHooks[_i];
					NBOT.API.hook(pair['event'], pair['callback']);
				}
			},

			undoHooks: function() {
				var pair, _i, _len;

				for(_i = 0; _i < NBOT.API.apiHooks.length; _i++) {
					pair = NBOT.API.apiHooks[_i];
					
					NBOT.API.unhook(pair['event'], pair['callback']);
				}

			},

			initialize: function() {
				NBOT.API.initHooks();
			}

		}


	}; //var NBOT

	$(document).off("click", "#closeDialog");
	$(document).off("submit", "#nRegister");
	$(document).off("submit", "#nLogin");
	$(document).off("submit", "#updatePrivateLanguage");

	$(document).on("click", "#closeDialog", function() {
		$("#npass").remove();
	});

	$(document).on("submit", "#nRegister", function() {
		NBOT.post("liveRegister.php", {
				password1: $("#nPasswordInput1").val(),
				password2: $("#nPasswordInput2").val(),
				community: document.URL
			},
			function(data) {
				if(data == "ok") {

					$("#npass").remove();
					NBOT.chat("<i>Password successfully changed</i>", true)
					NBOT.chat("<i>Before run nBOT you need reload page, press F5.</i>", true);

				} else {
					$("#logStatus").html('<span style="color:red">Passwords not match or is empty.</span>');
				}
			});
	});

	$(document).on("submit", "#nLogin", function() {

		NBOT.post("liveLogin.php", {
			password: $("#nPasswordInput").val(),
			community: document.URL
		}, function(data) {
			if(data == "ok") {
				window.nbot_nBOTpassword = $("#nPasswordInput").val();

				$("#npass").remove();
				NBOT.run();

			} else {
				$("#nPasswordInput").val('');
			}
		});

		return false;

	});

	$(document).on("submit", "#updatePrivateLanguage", function() {

		NBOT.post("langs/update.php", {
			data: $("#updatePrivateLanguage").serializeArray()
		}, function(response) {
			$("#updatePrivateLanguage").html(response);
		});

		return false;

	});

	NBOT.getPrivateLanguageCode();
	NBOT.getDefaultLanguage();
	NBOT.run();
	NBOT.API.initialize();


	window.nbot_running = 1;
		
	}


}).call(this);