$(document).ready(function(){

	$("#list2 .item").width(function(i, val){
		return val + 10;
	}).height(function(i, val){
		return val + 10;
	});


	$("#list").prepend('<li class=item>Первый</li>');
	$("#list").append('<li class=item>Последний</li>');
	$("#list2").prepend('<li class=item>Первый</li>');
	$("#list2").append('<li class=item>Последний</li>');
});