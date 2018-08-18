$(document).ready(function(){
	
	$("#go").click(function(){

		$("#block").animate({
			width: '300',
			opacity: '0.5',
			fontSize: '150px'
		}, {
			duration: 1000,
			specialEasing: {
			width: 'linear',
			}
		});

		$("#block").animate({
			width: '70%',
			borderWidth: '10px'

		}, {
			duration: 1000,
			specialEasing: {
			width: 'linear',
			}
		});

	});
	
});