function showLoader(t){

	if(t == "small"){
		$("#smallLoader").show();
	} else {
		$("#loader").show();
	}
}
function hideLoader(t){
	if(t == "small"){
		$("#smallLoader").fadeOut("slow");
	} else {
		$("#loader").fadeOut("medium");
	}
}

function otvorPodstranku(href){
	showLoader("small");
	setTimeout(function(){

		var d = new Date();
		var seconds = d.getTime() / 1000;
		$.get(href+"?t="+seconds, function(r){
			$("#target").html(r);
			$("html, body").animate({ scrollTop: ($("#target").offset().top+65) }, 500);

			setTimeout(hideLoader, 700, "small");
		});
	}, 500);
	
}



$(document).ready(function(){
	var height = $(window).height();
	$("body").css("background-size", "100% "+height+"px");
	$(".link").click(function(){

		if(typeof window.to1 !== "ndefined"){
			clearTimeout(window.to1);

		} 
		if(typeof window.to2 !== "undefined"){
			clearTimeout(window.to2);

		}
		if(typeof window.to3 !== "undefined"){
			clearTimeout(window.to3);

		}
		if(typeof window.to4 !== "undefined"){
			clearTimeout(window.to4);

		} 
		if(typeof window.to5 !== "undefined"){
			clearTimeout(window.to5);

		}
		if(typeof window.to6 !== "undefined"){
			clearTimeout(window.to6);

		} 
		if(typeof window.to7 !== "undefined"){
			clearTimeout(window.to7);

		}
		
		window.linkClicked 	=	$(this).attr("href");
		showLoader("small");
		
	/*	$("html, body").animate({ scrollTop: 0 }, 300);*/
		
		
		setTimeout(function(){

			var d = new Date();
			var seconds = d.getTime() / 1000;

			
			$.get(window.linkClicked+"?t="+seconds, function(r){
				$("#target").html(r);
				$("html, body").animate({ scrollTop: ($('#target').offset().top+65) }, 500);

				setTimeout(hideLoader, 700, "small");
			});
		}, 500);
		return false;
	});

	$(document).on("click", "#anotherPlanet", function(){
		
		$("#target").find(".target-padding").html("<h1>Trying to find creator...Please wait</h1><div class=\"subcontent\"><img src=\"/img/ajax-loader.gif\" id=\"contact-loader\" style=\"display:inline-block;vertical-align:middle;margin: 0px 15px 0px 0px\"><span style=\"display:inline-block;vertical-align:middle\"></span></div>");
		window.to1 = setTimeout(function(){
			$(".subcontent").find("span").html("Trying to find creator at Mercury...<br>");
		}, 1000);
		window.to2 = setTimeout(function(){
			$(".subcontent").find("span").html("Trying to find creator at Venus...<br>");
		}, 3000);
		window.to3 = setTimeout(function(){
			$(".subcontent").find("span").html("Trying to find creator at Mars...<br>");
		}, 5000);
		window.to4 = setTimeout(function(){
			$(".subcontent").find("span").html("Trying to find creator at Jupiter..<br>");
		}, 6000);
		window.to5 = setTimeout(function(){
			$(".subcontent").find("span").html("Trying to find creator at Saturn...<br>");
		}, 10000);
		window.to6 = setTimeout(function(){
			$(".subcontent").find("span").html("Trying to find creator at Uranus...<br>");
		}, 12000);
		window.to7 = setTimeout(function(){
			$("#target").find(".target-padding").find("h1").html("Done!");
			$(".subcontent").find("span").html("<b>Creator was found on the Uranus!</b><br>But still can't send him message. Don't worry,  try this e-mail: support at nbot.eu maybe you receive some reply.");
			$("#contact-loader").remove();
		}, 14000);
	});

	$("html").niceScroll({
		touchbehavior:false,
		cursorcolor:"#00C4ED",
		cursoropacitymax:1,
		cursorwidth:12,
		cursorborder:"0px",
		cursorborderradius:"0px",
		background:"#222",
		autohidemode:false
	});

	$('.homescroll').innerfade({
		animationtype:  'fade',
		timeout: 5000
	});

	if(document.URL.indexOf("#commands") >= 0){
		otvorPodstranku("commands.html");
	} else if(document.URL.indexOf("#features") >= 0){
		otvorPodstranku("features.html");

	} else if(document.URL.indexOf("#installation") >= 0){
		otvorPodstranku("installation.html");
		
	} else if(document.URL.indexOf("#contact") >= 0){
		otvorPodstranku("contact.html");
		
	} else if(document.URL.indexOf("#activation") >= 0){
		otvorPodstranku("activate.php");	
	} else if(document.URL.indexOf("#dp") >= 0){
		otvorPodstranku("downloadpoints.html");	
	} else if(document.URL.indexOf("#ai") >= 0){
		otvorPodstranku("ai.html");	
	} else if(document.URL.indexOf("#playlist-downloader") >= 0){
		otvorPodstranku("playlist-downloader.html");	
	}

	$(document).on("click", "#toggleOptionallyData", function(){
		$(".optional").fadeToggle();
		return false;
	});

	$(document).on("submit", "#activateForm", function(){
		showLoader("small");

		$.ajax({
			url: "https://origem-bot.tk/activate.php",
			type: "POST",
			data: $(this).serialize(),
			success: function(response){
				window.nactrespons = response;
				setTimeout(function(){
					hideLoader("small");
					$("#console").fadeIn().html(window.nactrespons);
					if(window.nactrespons.indexOf("uccessfully") > -1){
						$("#activateForm").remove();
					}
				}, 2000);

				
			}
		});

		
		return false;
	});

}); // DOM ready

