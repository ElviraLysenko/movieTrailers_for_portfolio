$(document).ready(function(){
	
var logic = true;

	$(".item:eq(1)").click(function(){
		$(".item:eq(0)").offset({top:80});
	});

	$(".item:eq(0)").click(function(){
		if (logic == true) {
			$(".item:eq(2)").offset({left:287});
			logic = false;
		} else {
			$(".item:eq(2)").offset({left:187});
			logic = true;
		}
	});

});