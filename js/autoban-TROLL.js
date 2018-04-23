API.on(API.USER_JOIN, banhim);
function banhim(d){
	window.lid = d.id;
	API.sendChat("@"+d.username+" [Auto-Ban] o/ bye");
	setTimeout(function(){

		API.moderateBanUser(window.lid, 5, API.BAN.HOUR);
	
	}, 5000);
}
