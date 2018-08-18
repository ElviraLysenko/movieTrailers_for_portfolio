$(document).ready(function(){
	$("#but1").click(function(){$("p#par1").css("color","green").css("font-size","20px")});
	$("#href1").mouseenter(function(){$("a").css("color","orange")});
	$("#href1").mouseleave(function(){$("a").css("color","black")});
	$("#text1").select(function(){$("#text1").css("color","red").css("font-size","13px")});
	$(document).scroll(function(){ 
		console.log($('body').scrollTop())});
});    