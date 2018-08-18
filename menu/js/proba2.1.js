$(document).ready(function(){
	$("#but1").click(function(){ 
		console.log($("#par1").css("color"));
			console.log($("#par2").css("color"));
				console.log($("#par3").css("color"));
	});
$("#but1").mousedown(function(){$("#code").css("background","green")});
$("#but1").mouseup(function(){$("#code").css("background","white")});
$("#but2").click(function(){
$("#par6").css({fontSize: "33px",border:"2px solid blue"});
$("#par7").css({fontWeight:"bold",fontStyle: "Times New Roman",color: "red",fontSize: "27px"});
});

});    