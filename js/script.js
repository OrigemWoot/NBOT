$(window).scroll(function() {
	var x = $(window).scrollTop();

	if(x > 70){
		$(".navigation").css("position", "fixed").css("top", "0px");
	} else {
		$(".navigation").css("position", "relative").css("top", "0px");

	}

	if(x > 185){

		$("#background").css('background-position', 'center -129.5px').css("position", "fixed").css("height", "165px").css("box-shadow", "0px 2px 2px black");
		$(".logo_white").css("opacity","1").css("top", "74px");
		$(".logo_black").css("opacity", "0").css("top", "74px");

	} else {

		$("#background").css('background-position', 'center -'+(x*0.70) +'px').css("position", "absolute").css("height", "350px").css("box-shadow", "0px 0px 0px black");
		$(".logo_white").css("opacity", x*0.01).css("top", ""+(x*0.4)+"px");
		$(".logo_black").css("opacity", 1-(x*0.008)).css("top", ""+(x*0.4)+"px");
		

	}
});

$(document).ready(function() {

	$(".commands").find("a").click(function(){
		var divid = $(this).html().replace(" ", "");

		 $('html, body').animate({
		        scrollTop: $("#"+divid).offset().top - 50
		    }, 500);
		

	});


	$("html").niceScroll({touchbehavior:false,cursorcolor:"#00C4ED",cursoropacitymax:1,cursorwidth:15,cursorborder:"0px",cursorborderradius:"0px",background:"#333",autohidemode:true});

});