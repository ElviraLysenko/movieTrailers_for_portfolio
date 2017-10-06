$(document).ready(function(){
var n = 1;
var y = 1;


	$( "#form" ).on( "click", ".whence", function() {
	   	var whenceCity = $(this).text();
	   	$(this).parents(".input-prepend").children(".whence_city").val(whenceCity); 	
	});

    $( "#form" ).on( "click", ".where", function() {
	   	var whereCity = $(this).text();
	   	$(this).parents(".input-prepend").children(".where_city").val(whereCity); 	
	});



//кнопка Добавить
	$("#plus").click(function(){
		n++;
		var form = document.getElementById("form");
		var theDiv = document.createElement('div');  // создать новый тег div
		theDiv.className = "parcel";
 		theDiv.innerHTML =  '<div class="row">'+
			'	<div class="span5">'+
					'<div class="input-prepend">'+
						'<div class="btn-group">'+
							'<a class="btn btn-primary dropdown-toggle" data-toggle="dropdown" href="#"> Whence <span class="caret"></span></a>'+
							'<ul class="dropdown-menu">'+
								'<li><a class="whence" href="#">Днепр</a></li>'+
								'<li><a class="whence" href="#">Запорожье</a></li>'+
								'<li><a class="whence" href="#">Киев</a></li>'+
								'<li><a class="whence" href="#">Львов</a></li>'+
								'<li><a class="whence" href="#">Харьков</a></li>'+
							'</ul>'+
						'</div>'+
						'<input type="text" class="whence_city" placeholder="ZIP code, Address">'+
					'</div>'+
				'</div>'+
				'<div class="span5">'+
					'<div class="input-prepend">'+
						'<div class="btn-group">'+
							'<a class="btn btn-primary dropdown-toggle" data-toggle="dropdown" href="#"> Where <span class="caret"></span></a>'+
							'<ul class="dropdown-menu">'+
								'<li><a class="where" href="#">Днепр</a></li>'+
								'<li><a class="where" href="#">Запорожье</a></li>'+
								'<li><a class="where" href="#">Киев</a></li>'+
								'<li><a class="where" href="#">Львов</a></li>'+
								'<li><a class="where" href="#">Харьков</a></li>'+
							'</ul>'+
						'</div>'+
						'<input type="text" class="where_city" placeholder="ZIP code, Address">'+
					'</div>'+
				'</div>'+
			'</div>'+
			'<div class="row">'+
				'<div class="span2">'+
					'<fieldset class="switch">'+
    					'<input type="radio" checked name="switch-'+n+'" id="switch-radio-off-'+n+'" class="switch-radio switch-radio-off">'+
    					'<label for="switch-radio-off-'+n+'" class="switch-label switch-label-off">PARCEL<span class="switch-slider"></span></label>'+
 				   		'<input type="radio"  name="switch-'+n+'" id="switch-radio-on-'+n+'" class="switch-radio switch-radio-on">'+
  				  		'<label for="switch-radio-on-'+n+'" class="switch-label switch-label-on">PALLET<span class="switch-slider"></span></label>'+
 				 	'</fieldset>'+
				'</div>'+
				'<div class="span2">'+
					'<div class="input-append">'+
						'<label class="weight">Weight:</label><input type="text" class="elem weight_elem elem'+n+'"><span class="add-on">Kg</span>'+
					'</div>'+
				'</div>'+
				'<div class="span2">'+
					'<div class="input-append">'+
						'<label class="length">Length:</label><input type="text" class="elem length_elem elem'+n+'"><span class="add-on">Cm</span>'+
					'</div>'+
				'</div>'+
				'<div class="span2">'+
					'<div class="input-append">'+
						'<label class="width">Width:</label><input type="text" class="elem width_elem elem'+n+'"><span class="add-on">Cm</span>'+
					'</div>'+
				'</div>'+
				'<div class="span2">'+
					'<div class="input-append">'+
						'<label class="height">Height:</label><input type="text" class="elem height1_elem elem'+n+'"><span class="add-on">Cm</span>'+
					'</div>'+
				'</div>'+
			'</div>'+
		'</div>'+
	'</div>'	;// его содержимое
 		form.append(theDiv); 
	}); 

//кнопка Удалить
	$("#minus").click(function(){
		$("div#form").children().last().remove();
	});

//переключатель на форму pallet
	$( "#form" ).on( "click", ".switch-radio-on", function() {
		n++;
		var sel = 	$(this).parents(".parcel");
		sel.html('<div class="row">'+
				'<div class="span2">'+
					'<fieldset class="switch">'+
    					'<input type="radio"  name="switch-'+n+'" id="switch-radio-off-'+n+'" class="switch-radio switch-radio-off">'+
    					'<label for="switch-radio-off-'+n+'" class="switch-label switch-label-off">PARCEL<span class="switch-slider"></span></label>'+
 				   		'<input type="radio" checked name="switch-'+n+'" id="switch-radio-on-'+n+'" class="switch-radio switch-radio-on">'+
  				  		'<label for="switch-radio-on-'+n+'" class="switch-label switch-label-on">PALLET<span class="switch-slider"></span></label>'+
 				 	'</fieldset>'+
 				 '</div>'+ 
				'<div class="span2">'+ 
					'<div class="input-append">'+ 
					'	<label class="nop">Number of pallets:</label><input type="text" class="elem nop_elem elem'+n+'"><span class="add-on">Pcs</span>'+ 
					'</div>'+ 
				'</div>'+ 
				'<div class="span2">'+ 
					'<div class="input-append">'+ 
						'<label class="height">Height:</label><input type="text" class="elem height2_elem elem'+n+'"><span class="add-on">Cm</span>'+ 
					'</div>'+ 
				'</div>'+ 
				'<div class="span2">'+ 
					'<div class="input-append">'+ 
						'<label class="wfp">Weight for pallets:</label><input type="text" class="elem wfp_elem elem'+n+'"><span class="add-on">Kg</span>'+ 
					'</div>'+ 
				'</div>'+ 
			'</div>');
	});

//переключатель на форму parcel
	$( "#form" ).on( "click", ".switch-radio-off", function() {
		n++;
		var sel = 	$(this).parents(".parcel");
		sel.html('<div class="row">'+
			'	<div class="span5">'+
					'<div class="input-prepend">'+
						'<div class="btn-group">'+
							'<a class="btn btn-primary dropdown-toggle" data-toggle="dropdown" href="#"> Whence <span class="caret"></span></a>'+
							'<ul class="dropdown-menu">'+
								'<li><a class="whence" href="#">Днепр</a></li>'+
								'<li><a class="whence" href="#">Запорожье</a></li>'+
								'<li><a class="whence" href="#">Киев</a></li>'+
								'<li><a class="whence" href="#">Львов</a></li>'+
								'<li><a class="whence" href="#">Харьков</a></li>'+
							'</ul>'+
						'</div>'+
						'<input type="text" class="whence_city" placeholder="ZIP code, Address">'+
					'</div>'+
				'</div>'+
				'<div class="span5">'+
					'<div class="input-prepend">'+
						'<div class="btn-group">'+
							'<a class="btn btn-primary dropdown-toggle" data-toggle="dropdown" href="#"> Where <span class="caret"></span></a>'+
							'<ul class="dropdown-menu">'+
								'<li><a class="where" href="#">Днепр</a></li>'+
								'<li><a class="where" href="#">Запорожье</a></li>'+
								'<li><a class="where" href="#">Киев</a></li>'+
								'<li><a class="where" href="#">Львов</a></li>'+
								'<li><a class="where" href="#">Харьков</a></li>'+
							'</ul>'+
						'</div>'+
						'<input type="text" class="where_city" placeholder="ZIP code, Address">'+
					'</div>'+
				'</div>'+
			'</div>'+
			'<div class="row">'+
				'<div class="span2">'+
					'<fieldset class="switch">'+
    					'<input type="radio" checked name="switch-'+n+'" id="switch-radio-off-'+n+'" class="switch-radio switch-radio-off">'+
    					'<label for="switch-radio-off-'+n+'" class="switch-label switch-label-off">PARCEL<span class="switch-slider"></span></label>'+
 				   		'<input type="radio" name="switch-'+n+'" id="switch-radio-on-'+n+'" class="switch-radio switch-radio-on">'+
  				  		'<label for="switch-radio-on-'+n+'" class="switch-label switch-label-on">PALLET<span class="switch-slider"></span></label>'+
 				 	'</fieldset>'+
				'</div>'+
				'<div class="span2">'+
					'<div class="input-append">'+
						'<label class="weight">Weight:</label><input type="text" class="elem weight_elem elem'+n+'"><span class="add-on">Kg</span>'+
					'</div>'+
				'</div>'+
				'<div class="span2">'+
					'<div class="input-append">'+
						'<label class="length">Length:</label><input type="text" class="elem length_elem elem'+n+'"><span class="add-on">Cm</span>'+
					'</div>'+
				'</div>'+
				'<div class="span2">'+
					'<div class="input-append">'+
						'<label class="width">Width:</label><input type="text" class="elem width_elem elem'+n+'"><span class="add-on">Cm</span>'+
					'</div>'+
				'</div>'+
				'<div class="span2">'+
					'<div class="input-append">'+
						'<label class="height">Height:</label><input type="text" class="elem height1_elem elem'+n+'"><span class="add-on">Cm</span>'+
					'</div>'+
				'</div>'+
			'</div>'+
		'</div>'+
	'</div>'	);	
	});

//кнопка вывода результата в консоль
	$( ".container" ).on( "click", "#add", function() {

		console.clear();
		
		var form = $(".parcel");
		var city1 = $(".whence_city");
		var city2 = $(".where_city");
		var weight = $(".weight_elem");
		var length = $(".length_elem");
		var width = $(".width_elem");
		var height1 = $(".height1_elem");
		var height2 = $(".height2_elem");
		var nop = $(".nop_elem");
		var wfp = $(".wfp_elem");
 		
		for (var i=0; i<form.length; i++) {
           	if (city1[i] !== undefined){
  				console.log(
  					"*parcel*\n"+
					"From : "+city1[i].value+"\n"+
					"To : "+city2[i].value+"\n"+
					"Weight : "+weight[i].value+" kg\n"+
					"Length : "+length[i].value+" Cm\n"+
					"Width  : "+width[i].value+" Cm\n"+
					"Height : "+height1[i].value+" Cm"
				);
			}
			if (nop[i] !== undefined){
				console.log(
 					"*pallet*\n"+
 					"Numbers of pallets : "+nop[i].value+" kg\n"+
 					"Height : "+height2[i].value+" Cm\n"+
 					"Weight for pallets  : "+wfp[i].value+" Kg"
 				); 
			}
 		};			

	});
  
});