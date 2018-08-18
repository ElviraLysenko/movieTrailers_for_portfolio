$(document).ready(function(){
	
	$("#clickme").click(function(){
		$("#robot").slideUp(1000);
		$("#result").text("Text");
	});

	$("#toogle").click(function(){
		$("#robot").slideToggle(1500);
	});

	$("#blur").click(function(){
		$("#robot").fadeOut(1000);
		$("#robot").fadeIn(1);
	});

	$("#opacity").click(function(){
		$("#robot").fadeTo(2500, 0.5);
	});

	$("#but1").click(function(){
		$("#robot").fadeToggle(1500);
	});

});