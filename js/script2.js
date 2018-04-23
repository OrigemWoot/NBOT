$(window).scroll(function() {
	var x = $(window).scrollTop();
	if(x > 200){
		$("#scrollTop").fadeIn("slow");
	} else {
		$("#scrollTop").hide();
	}
});

$(document).ready(function() {

	$(".commands").find("a").click(function(){
		var divid = $(this).html().replace(" ", "");

		 $('html, body').animate({
		        scrollTop: $("#"+divid).offset().top 
		    }, 500);
		

	});

	$(".start").click(function(){

		$("html, body").animate({
			scrollTop: $("#installation").offset().top
		}, 1000);

	});

	$("#scrollTop").click(function(){

		$("html, body").animate({
			scrollTop: $("body").offset().top
		}, 500);

	});


	$("html").niceScroll({touchbehavior:false,cursorcolor:"#00C4ED",cursoropacitymax:1,cursorwidth:15,cursorborder:"0px",cursorborderradius:"0px",background:"#333",autohidemode:false});

});

function scroll(kde){

		$("html, body").animate({
			scrollTop: $("#"+kde).offset().top
		}, 500);
	return false;

}