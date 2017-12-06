$(document).ready(function(){
	//part1
	$("#but1").click(function(){
		$("#par1").hide(1000);
	});

		$("#but2").click(function(){
		$("#par1").show(1000);
	});
	//end part 1

	$("#par2").mouseover(function(){
		$("#par2").fadeOut(3000);
	});

	$("#par2").mouseout(function(){
		$("#par2").fadeIn(1);
	});

	$("#but3").click(function(){
		$("#wrap1").slideUp(5000);
	});


	$("#but4").click(function(){
		$("#wrap1").slideDown(7000);
	});


	console.log('sq1 Top:'+ $("#square1").position().top +' Left:'+ $("#square1").position().left);
	console.log('sq2 Top:'+ $("#square2").position().top +' '+ $("#square2").position().left);
	console.log('sq3 Top:'+ $("#square3").position().top +' '+ $("#square3").position().left);
	console.log('sq4 Top:'+ $("#square4").position().top +' '+ $("#square4").position().left);
	console.log('sq5 '+ $("#square5").position().top +' '+ $("#square5").position().left);

	$("#but5").click(function(){
		$("#redsquare").animate({top: $("#square1").position().top, left: $("#square1").position().left},2000);
		$("#redsquare").animate({top: $("#square2").position().top, left: $("#square2").position().left},2000);
		$("#redsquare").animate({top: $("#square3").position().top, left: $("#square3").position().left},2000);
		$("#redsquare").animate({top: $("#square4").position().top, left: $("#square4").position().left},2000);
		$("#redsquare").animate({top: $("#square5").position().top, left: $("#square5").position().left},2000);
	});
 });
