/*
 (c) 2013-2017 NBOT - Powerful chatbot for plug.dj 
 Created by 1MICROFIX.
*/

if(typeof window.nbot_botStarted === "undefined" || window.nbot_botStarted == 0) {
var t = new Date().getTime() / 1000;
$.getJSON("https://rawgit.com/CikerDeveloper/NBOT/master/langs/en.json?t="+t, function(langSource) { 
    window.nbot_nBOTDefaultLanguage = langSource; });
    function nBOTChat(msg, priority) {

        if(msg.indexOf("<i>") > -1) {


            if(window.nbot_commandLog == 1 || priority == true) {

                var lastChatMessage = $("#chat-messages").find(".cm").last();

                msg = msg.replace(":white_check_mark:", "");
                msg = msg.replace(":warning:", "");
                msg = msg.replace(":red_circle:", "");

                var msgid = Math.floor((Math.random() * 100) + 1);


                if(lastChatMessage.hasClass('narcis77')) {
                    var chatSelector = $("#chat-messages").find(".message").last().children(".msg").children(".text");
                    var msgString = "<br>" + msg;

                } else {
                    var chatSelector = "#chat-messages";
                    var msgString = '<div class="cm message narcis77" data-cid="undefined" data-id="' + msgid + '"><div class="badge-box clickable"><i class="bdg NarcisBOTBadge"></i></div><div class="msg cid-undefined"><div class="from staff"><span class="un" style="color:#42A5DC">nBOT v2.1.0</span></div><div class="text cid-undefined">' + msg + '</div></div></div>';

                }


                API.chatLog(" ");
                $("#chat-messages").find(".cm.log").last().remove();

                $(chatSelector).append(msgString);
                $('#chat-messages').stop().animate({
                    scrollTop: $('#chat-messages').prop("scrollHeight")
                }, 100);

            } // if window log chat


        }
    }

    function zistiAktivituBota() {
        $.post("https://www.origem-bot.tk/nBOTStarter.php", {
                community: document.URL
            },
            function(response) {
                if(response == "register") {


                    $("body").append('<div id="npass" style="z-index:99999;padding:15px;text-align:center;position:absolute;width:250px;height:auto;background:#ECECEC;top:50%;left:50%;margin-top:-75px;margin-left:-125px">' + '<img src="https://www.origem-bot.tk/img/logo.png" style="height:55px"><br><div id="logStatus"></div><br>' + '<form id="nRegister"><input type="password" id="nPasswordInput1" name="nPassword" placeholder="New community password" style="width: 100%;padding: 10px;box-sizing: border-box;outline: none;border: 1px solid silver;"><br><input type="password" id="nPasswordInput2" name="nPassword" placeholder="Again community password" style="width: 100%;padding: 10px;box-sizing: border-box;outline: none;border: 1px solid silver;"><br>' + '<input type="submit" value="ACTIVATE" name="nSpam" style="background-color:transparent; display: table-cell;    background-image: url(https://www.origem-bot.tk/img/nbot_button.png);    background-size: 128px 131px;    width: 128px;    height: 131px;    border:none;    outline:none;    color:white !important;    font-weight: 700;    font-size:18px;    text-shadow: 0px 1px 2px #000;    text-align: center;    vertical-align: middle;    text-decoration: none;    cursor:pointer;">' + '<br><br><a id="closeDialog" style="color:grey;font-size:13px;cursor:pointer">Close window</a></div>');


                } else if(response == "ok") {


                    if(typeof window.nbot_nBOTpassword === "undefined") {


                        $("body").append('<div id="npass" style="z-index:99999;padding:15px;text-align:center;position:absolute;width:250px;height:auto;background:#ECECEC;top:50%;left:50%;margin-top:-75px;margin-left:-125px">' + '<img src="https://www.origem-bot.tk/img/logo.png" style="height:55px"><br><br>' + '<form id="nLogin"><input type="password" id="nPasswordInput" name="nPassword" placeholder="Community password" style="width: 100%;padding: 10px;box-sizing: border-box;outline: none;border: 1px solid silver;"><br><br>' + '<input type="submit" value="START!" name="nSpam" style="background-color:transparent; display: table-cell;    background-image: url(https://www.origem-bot.tk/img/nbot_button.png);    background-size: 128px 131px;    width: 128px;    height: 131px;    border:none;    outline:none;    color:white !important;    font-weight: 700;    font-size:18px;    text-shadow: 0px 1px 2px #000;    text-align: center;    vertical-align: middle;    text-decoration: none;    cursor:pointer;">' + '<br><br><a id="closeDialog" style="color:grey;font-size:13px;cursor:pointer">Close window</a></div>');
                        return;

                    }


                    if(window.nbot_botStarted == 1) {

                        $.post("https://www.origem-bot.tk/get/GetLanguageCode.php", {
                            key: window.nbot_nBOTpassword,
                            community: encodeURIComponent(document.URL)
                        }, function(langCode) {

                            if(window.nbot_findLangCode !== 0) {
                                langCode = window.nbot_findLangCode;
                                var subFolder = "private/";
                                nBOTChat("<i>Private language detected. Loading language....</i>");
                            } else {
                                var subFolder = "";
                            }
                        
                            var t = new Date().getTime() / 1000;

                            $.getJSON("https://rawgit.com/CikerDeveloper/NBOT/master/langs/" + subFolder + langCode + ".json?t="+t, function(langSource) {
                                window.nbot_nLANG = langSource;
                                for (var key in window.nbot_nBOTDefaultLanguage) {
                                    
                                        var obj = window.nbot_nLANG[key];
                                        
                                        if(typeof obj === "undefined"){
                                            nBOTChat("<i><div class=\"nbotWarning\">Your private language isnt completely translated.<br><br><b>How to fix my language?</b><br>1. <a href=\"https://www.origem-bot.tk/langs/new.php?code="+langCode+"\" target=\"_blank\">Click here</a><br>2. Click on the \"Update my language\"<br>3. Reload nBOT: "+window.nbot_cmdTrigger+"reload</div>Loading default English language..</i>", true);
                                            $.getJSON("https://rawgit.com/CikerDeveloper/NBOT/master/langs/en.json?t="+t, function(langSource) {
                                                window.nbot_nLANG = langSource;
                                            });
                                            break;
                                        }
                                     
                                }

                            }).error(function() {
                                nBOTChat("<i>Language not exist. <a href='#' target='_blank'>Translate new public language</a><br><b>Loading default language...</b></i>");
                                window.nbot_findLangCode = 0;
                                $.getJSON("https://rawgit.com/CikerDeveloper/NBOT/master/langs/en.json?t="+t, function(langSource) {
                                    window.nbot_nLANG = langSource;
                                });
                            });

                            $.get("https://www.origem-bot.tk/get/GetLanguage.php", {
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

                                $.getScript("https://www.origem-bot.tk/get/nBOT.source.extension.min.js");
                                nBOTChat("<i>Last updated 2016-19-08<br>New Origem Bot facebook page: <a>open in new window</a></i>", true);
                            });

                        });

                    }


                } else {

                    nBOTChat("<i>This community isnt activated. <a style=\"font-size:12px;color:#eee\" href=\"https://www.origem-bot.tk/nbot/activation.html\" target=\"_blank\">Click here to activate</a>. After activation, press F5 and run nBOT again!</i>");


                }

            });

    }

    window.nbot_findLangCode = 0;
    window.nbot_commandLog = 1;
    window.nbot_botStarted = 1;

    $.getJSON('/_/rooms/state', function(msg) {

        if(msg.status == 'ok') {
            var description = msg.data[0].meta.description;
            if(description.indexOf("@n=") > -1) {
                window.nbot_findLangCode = description.match("@n=(.*).json")[1];
            }
        } else {
            API.chatLog('Error loading langugage.', true);
        }




        if($("#nBOTStyle").length > 0) {
            $("#nBOTStyle").remove();
        }
        $("body").append('<style id="nBOTStyle">' +
            '.nBOTControlPanel { display:none;overflow:auto; width:345px; position:absolute; top:54px; right:-385px; z-index:10; min-height:530px; ' +

            'bottom:54px;}' +

            '.nBOTControlPanel input[type=text].textBox, .nBOTControlPanel select.textBox { width:120px; font-size:12px; height:25px; outline:none;margin:0; }' +
            '.nBOTControlPanel select.textBox { height:25px;display:block;float:left}' +
            '.nBOTControlPanel .nBOTactionButton { cursor:pointer; border:0; font-family: arial; font-size: 13px; font-weight: 100; text-decoration: none; padding: 5px 5px 5px 6px; color:white}' +
            '.nBOTControlPanel div .text.left { float:left;width:50%; }' +
            '.nBOTControlPanel div table { width:100%; }' +
            '.nBOTControlPanel div table td { width:190px; padding:0px 10px}' +
            '.nBOTControlPanel div table th { font-weight:300;text-align:left }' +
            '.nBOTCPoff { background-color:darkred !important }' +
            '.NarcisBOTBadge { background-image:url(https://www.origem-bot.tk/img/badge.png) !important }' +
            '.nbotWarning { padding:7px;border:1px solid red;background-color:#701919;color:#fff;margin:10px;font-size:13px } '+
            '.theme-black { background: #0a0a0a;color:#808691; }' +
            '.theme-black .hlavnyNadpis { overflow:hidden;font-size:17px; color:#eee;text-indent:20px;height:30px;line-height:30px; width:95%;margin: 0 auto }' +
            '.theme-black .hlavnyNadpis i.icon { left:10px }' +
            '.theme-black .hlavnyNadpis span { display:block;margin-left:15px}' +
            '.theme-black .polozka { height:60px; position:relative;width:340px; }' +
            '.theme-black .polozka .label { color:#ccc;text-indent:30px }' +
            '.theme-black input[type=text], .theme-black select, .theme-black input[type=password] { background-color: #333; color: #ddd; border:none;outline:none;height:27px;text-indent:5px  } '+

            '.theme-black .polozka .input { display:inline-block;width:90%;box-sizing:border-box;-moz-box-sizing:border-box;padding:0px 0px 0px 30px }' +
            '.theme-black .polozka .input input, .theme-black .polozka .input select { width:100%;}' +
            '.theme-black .polozka .nbot-submit { display:inline-block;width:10%;vertical-align:top  }' +
            '.theme-black .polozka .nbot-submit input { width:100%; height:27px; background-color:#0684C9; color:white }' +
            '.theme-black .permissionPolozka { width:90%; margin: 1px auto;position:relative }' +
            '.theme-black .permissionPolozka .label { display:inline-block;color:#ccc;width:145px }' +

            '.theme-black .permissionPolozka .input{ display:inline-block;vertical-align:top;height:27px }' +
            '.theme-black .permissionPolozka .nbot-submit{ display:inline-block;vertical-align:top;height:27px }' +
            '.theme-black .permissionPolozka .input input, .theme-black .permissionPolozka .input select { width:115px }' +
            '.theme-black .permissionPolozka .nbot-submit { display:inline-block;vertical-align:top  }' +
            '.theme-black .permissionPolozka .nbot-submit input { width:30px; height:27px; background-color:#0684C9; color:white }' +
    

            '.theme-black .nSubmit { display:block;text-decoration:none;outline:none;border:none;cursor:pointer; background: #0684C9; color:white;display:block;width:90%;height:60px;line-height:60px;text-align:center;border:none;outline:none;font-size:17px;margin:15px auto }' +
            '.theme-black .nSubmit.small {width:auto;height:25px;line-height:25px;text-align:center;border:none;outline:none;font-size:13px;padding:0px 10px;margin:15px 10px;display:inline-block}' +
            '.theme-black .nSubmit:hover, .theme-black .nSubmit:active {background: #076FA8; }' +
            '.theme-black input[type=text].ccommand_command { background:#05669C !important;color:white !important; width:100% !important }' +
            '.theme-black input[type=text].ccommand_labels { width:100% }' +

            '.theme-black .anButton { background-color:#05669C; width:100px;height:35px;border-radius:5px;font-size:12px !important;text-align:center;margin:5px;display:inline-block;padding:0 }' +
            '.break { clear:both }' +
            '#nbot_panel_loader { position:absolute;z-index:99999;display:none;top:54px;right:0px;bottom:54px; width:345px; background-color:rgba(0,0,0,0.5); background-image: url(https://www.origem-bot.tk/img/ajax-loader.gif); background-repeat:no-repeat; background-position: center center; } '+
            '.theme-black a.nLink { color: #bbb;  display: block;  text-align: left; cursor:pointer }' +
            '.theme-black a.nLink:hover { color: #ddd; }' +
            '.nbot_row {padding-left: 10px; line-height:30px; } '+
            '.nbot_row a { } '+
            '.nbot_row a span { margin-left: 30px !important; } '+
            '.nbot_icon { background-image: url(https://www.origem-bot.tk/img/nbot_icons.png) !important} '+
            
            '.icon_ai { background-position: 0 0; } '+
            '.icon_passwordchange { background-position: -30px 0px; } '+
            '.icon_cookie { background-position: -60px 0; } '+
            '.icon_language { background-position: -90px 0; }'+
            '.icon_settings  { background-position: -120px 0; }'+
            '.icon_cmdperm { background-position: -150px 0px; } '+
            '.icon_checked  { background-position: -180px 0; }'+
            '.icon_smiley { background-position: -210px 0; }'+
            '.icon_badwords { background-position: -240px 0; }'+
            '.inpanel_infobox {margin:15px 20px; padding:10px; color:black; font-size:13px;background-color:#dddddd;} '+
            '.inpanel_infobox a { color:blue; } '+
            '.transparent { background:none !important; padding:0px !important }'+
            '.nbot_textarea { background: #1C1F25; box-sizing: border-box;outline: none;border: none;width: 100%;height: 100px;resize: none;color: white;padding: 5px; }'+

            '</style>');

        nBOTChat('<i>Starting... Enter your community password and wait while nBOT load languages and your settings.</i>');

        $("#npass").remove();



        $(document).on('submit', '#nLogin', function() {

            $.post("https://www.origem-bot.tk/liveLogin.php", {
                password: $("#nPasswordInput").val(),
                community: document.URL
            }, function(data) {
                if(data == "ok") {
                    window.nbot_nBOTpassword = $("#nPasswordInput").val();

                    $("#npass").remove();
                    zistiAktivituBota();

                } else {
                    $("#nPasswordInput").val('');
                }
            });

            return false;
        });




        zistiAktivituBota();
    });

}

$("#updatePrivateLanguage").submit(function(){
    $.post("https://www.origem-bot.tk/langs/update.php", { data: $("#updatePrivateLanguage").serializeArray() }, function(response){
        $("#updatePrivateLanguage").html(response);
    });
    return false;

});


$(document).on('submit', '#nRegister', function() {

    $.post("https://www.origem-bot.tk/liveRegister.php", {
        password1: $("#nPasswordInput1").val(),
        password2: $("#nPasswordInput2").val(),
        community: document.URL
    }, function(data) {
        if(data == "ok") {

            $("#npass").remove();
            nBOTChat("<i>Password successfully changed</i>", true)
            nBOTChat("<i>Before run nBOT you need reload page, press F5.</i>", true);

        } else {
            $("#logStatus").html('<span style="color:red">Passwords not match or is empty.</span>');
        }
    });

    return false;
});

$(document).on("click", "#closeDialog", function() {
    $("#npass").remove();
    nBOTChat("<i>Login closed. Press F5 to login again.<i>", true);
});
