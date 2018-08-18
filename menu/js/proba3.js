$(document).ready(function(){
		console.log($("#href1").offset().left);
		console.log($("ul").offset().top);
		$("#cvadro").mouseenter(function(){$("#cvadro").offset({top:550, left:50})
		});
		

	});