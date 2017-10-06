$(document).ready(function(){
	$(".menu").css("display", "none");
	$(".sweet").css("display", "none");
	$("#f1, #f2, #f3, #f4, #f5, #f6").fadeTo(0, 0); 

	var id_menu;

		$("#f1").mouseover(function(){	$("#f1").fadeTo(100, 1) && $("#g1").fadeTo(100, 0.3); });
		$("#f2").mouseover(function(){	$("#f2").fadeTo(100, 1) && $("#g2").fadeTo(100, 0.3); });
		$("#f3").mouseover(function(){	$("#f3").fadeTo(100, 1) && $("#g3").fadeTo(100, 0.3); });
		$("#f4").mouseover(function(){	$("#f4").fadeTo(100, 1) && $("#g4").fadeTo(100, 0.3); });
		$("#f5").mouseover(function(){	$("#f5").fadeTo(100, 1) && $("#g5").fadeTo(100, 0.3); });
		$("#f6").mouseover(function(){	$("#f6").fadeTo(100, 1) && $("#g6").fadeTo(100, 0.3); });
		
		$("#f1").mouseout(function(){	$("#f1").fadeTo(0, 0) && $("#g1").fadeTo(100, 1); });
		$("#f2").mouseout(function(){	$("#f2").fadeTo(0, 0) && $("#g2").fadeTo(100, 1); });
		$("#f3").mouseout(function(){	$("#f3").fadeTo(0, 0) && $("#g3").fadeTo(100, 1); });
		$("#f4").mouseout(function(){	$("#f4").fadeTo(0, 0) && $("#g4").fadeTo(100, 1); });	
		$("#f6").mouseout(function(){	$("#f6").fadeTo(0, 0) && $("#g6").fadeTo(100, 1); });
		$("#f5").mouseout(function(){	$("#f5").fadeTo(0, 0) && $("#g5").fadeTo(100, 1); });	 

		$("#f1, #m01").click(function(){
			$("i").remove();
			$(".menu").css("display", "block"); 
			$(".sweet").css("display", "block");
			$(".container").css("height", "570px");
			$("#main").hide(); 
			$(".container").css("background", "url(img/fon/fon_cakes.jpg"); 
			$("#m01").css("border", "1px solid black");
			$("#m02, #m03, #m04, #m05, #m06").css("border", "0px solid black");
				id_menu = "cakes";
				cakes();
		}); 

		$("#f2, #m02").click(function(){
			$("i").remove();
			$(".menu").css("display", "block");
			$(".sweet").css("display", "block");
			$(".container").css("height", "570px");
			$("#main").hide();
			$(".container").css("background", "url(img/fon/fon_marmelad.jpg"); 
			$("#m02").css("border", "1px solid black");
			$("#m01, #m03, #m04, #m05, #m06").css("border", "0px solid black");
				id_menu = "marmelad";
				marmelad();
		});

		$("#f3, #m03").click(function(){
			$("i").remove();
			$(".menu").css("display", "block");
			$(".sweet").css("display", "block");
			$(".container").css("height", "570px");
			$("#main").hide(); 
			$(".container").css("background", "url(img/fon/fon_biscuit.jpg");
			$("#m03").css("border", "1px solid black");
			$("#m02, #m01, #m04, #m05, #m06").css("border", "0px solid black");
				id_menu = "biscuit";
				biscuit();

		});

		$("#f4, #m04").click(function(){
			$("i").remove();
			$(".menu").css("display", "block");
			$(".sweet").css("display", "block");
			$(".container").css("height", "570px");
			$("#main").hide() ;
			$(".container").css("background", "url(img/fon/fon_cocktails.jpg") ;
			$("#m04").css("border", "1px solid black");
			$("#m02, #m03, #m01, #m05, #m06").css("border", "0px solid black");
				id_menu = "cocktails";
				coctails();
		});	

		$("#f5, #m05").click(function(){
			$("i").remove();
			$(".menu").css("display", "block");
			$(".sweet").css("display", "block");
			$(".container").css("height", "570px");
			$("#main").hide() ;
			$(".container").css("background", "url(img/fon/fon_candies.jpg") ;
			$("#m05").css("border", "1px solid black");
			$("#m02, #m03, #m04, #m01, #m06").css("border", "0px solid black");
				id_menu = "candies";
				candies();
		});	

		$("#f6, #m06").click(function(){
			$("i").remove();
			$(".menu").css("display", "block");
			$(".sweet").css("display", "block");
			$(".container").css("height", "570px");
			$("#main").hide() ;
			$(".container").css("background", "url(img/fon/fon_ice.jpg") ;
			$("#m06").css("border", "1px solid black");
			$("#m02, #m03, #m04, #m05, #m01").css("border", "0px solid black");
				id_menu = "ice";
				ice();
		});		
		
		$(".sweet").on('click', ".picture", function(e){
			var id_click =  e.target.id;
			$('.container .sweet').html('');

				$.getJSON('http:/my_server_sites/sweet_dreams/json/cakes.json', function(data){ //для мармелада
					var items = [];
	 				$.each(data, function(key, val){
	 					var ingradients = [];
						for (var i=0; i<val.ingradients.length; i++) { ingradients.push('<br><i class="fa fa-diamond"></i>      '+val.ingradients[i]); }
	 					if (key == id_click) {
	    				items.push('<div><p id="names">'+val.name+'</p><img class="image" src="'+ val.img + '"><div class="ingradients"><p>'+ingradients+'</p></div><div class="recept">' + val.recept + '</div></div>');
	    				}
	  				});
	  				$('<div/>', { "class":'receptes', html: items.join(''), }).appendTo('.container .sweet'); 
	  			});

				$.getJSON('http:/my_server_sites/sweet_dreams/json/marmelad.json', function(data){ //для мармелада
					var items = [];
	 				$.each(data, function(key, val){
	 					var ingradients = [];
						for (var i=0; i<val.ingradients.length; i++) { ingradients.push('<br><i class="fa fa-diamond"></i>      '+val.ingradients[i]); }
	 					if (key == id_click) {
	    				items.push('<div><p id="names">'+val.name+'</p><img class="image" src="'+ val.img + '"><div class="ingradients"><p>'+ingradients+'</p></div><div class="recept">' + val.recept + '</div></div>');
	    				}
	  				});
	  				$('<div/>', { "class":'receptes', html: items.join(''), }).appendTo('.container .sweet');
				});	
	  			
	  			$.getJSON('http:/my_server_sites/sweet_dreams/json/biscuit.json', function(data){ //для мармелада
					var items = [];
	 				$.each(data, function(key, val){
	 					var ingradients = [];
						for (var i=0; i<val.ingradients.length; i++) { ingradients.push('<br><i class="fa fa-diamond"></i>      '+val.ingradients[i]); }
	 					if (key == id_click) {
	    				items.push('<div><p id="names">'+val.name+'</p><img class="image" src="'+ val.img + '"><div class="ingradients"><p>'+ingradients+'</p></div><div class="recept">' + val.recept + '</div></div>');
	    				}
	  				});
	  				$('<div/>', { "class":'receptes', html: items.join(''), }).appendTo('.container .sweet'); 
	  			});
	  			
	  			$.getJSON('http:/my_server_sites/sweet_dreams/json/coctails.json', function(data){ //для мармелада
					var items = [];
	 				$.each(data, function(key, val){
	 					var ingradients = [];
						for (var i=0; i<val.ingradients.length; i++) { ingradients.push('<br><i class="fa fa-diamond"></i>      '+val.ingradients[i]); }
	 					if (key == id_click) {
	    				items.push('<div><p id="names">'+val.name+'</p><img class="image" src="'+ val.img + '"><div class="ingradients"><p>'+ingradients+'</p></div><div class="recept">' + val.recept + '</div></div>');
	    				}
	  				});
	  				$('<div/>', { "class":'receptes', html: items.join(''), }).appendTo('.container .sweet'); 
	  			});
	  			
	  			$.getJSON('http:/my_server_sites/sweet_dreams/json/candies.json', function(data){ //для мармелада
					var items = [];
	 				$.each(data, function(key, val){
	 					var ingradients = [];
						for (var i=0; i<val.ingradients.length; i++) { ingradients.push('<br><i class="fa fa-diamond"></i>      '+val.ingradients[i]); }
	 					if (key == id_click) {
	    				items.push('<div><p id="names">'+val.name+'</p><img class="image" src="'+ val.img + '"><div class="ingradients"><p>'+ingradients+'</p></div><div class="recept">' + val.recept + '</div></div>');
	    				}
	  				});
	  				$('<div/>', { "class":'receptes', html: items.join(''), }).appendTo('.container .sweet'); 
	  			});
	  			
	  			$.getJSON('http:/my_server_sites/sweet_dreams/json/ice_cream.json', function(data){ //для мармелада
					var items = [];
	 				$.each(data, function(key, val){
	 					var ingradients = [];
						for (var i=0; i<val.ingradients.length; i++) {	ingradients.push('<br><i class="fa fa-diamond"></i>      '+val.ingradients[i]); }
	 					if (key == id_click) {
	    				items.push('<div><p id="names">'+val.name+'</p><img class="image" src="'+ val.img + '"><div class="ingradients"><p>'+ingradients+'</p></div><div class="recept">' + val.recept + '</div></div>');
	    				}
	  				});
	  				$('<div/>', { "class":'receptes', html: items.join(''), }).appendTo('.container .sweet'); 
	  			});

	  			$('<i/>', {	"class":'fa fa-arrow-left', "text": '  ' + "Назад", }).appendTo('.container');

		});

		$(".container").on("click", ".fa-arrow-left", function(){
			$('.container .sweet').html('');
			$("i").remove();
			switch(id_menu){
				case 'cakes': cakes(); break;
				case 'marmelad': marmelad(); break;
				case 'biscuit': biscuit(); break;
				case 'cocktails': coctails(); break;
				case 'candies': candies(); break;
				case 'ice': ice(); break;
			}
		});

	function cakes() {
		$('.container .sweet').html('');
		$.getJSON('http:/my_server_sites/sweet_dreams/json/cakes.json', function(data){
			var items = [];
	 		$.each(data, function(key, val){
	    		items.push('<div class="span3">' + '<img id="' + key + '" class="picture" src="'+ val.img + '"><div class="row"> <div class="span3 value">' + val.name + '</div></div></div>');
	  		});
	  		$('<div/>', { "class":'row', html: items.join('') }).appendTo('.container .sweet');
		});	
	}

	function marmelad() {
  		$('.container .sweet').html('');
		$.getJSON('http:/my_server_sites/sweet_dreams/json/marmelad.json', function(data){
			var items = [];
	 		$.each(data, function(key, val){
	    		items.push('<div class="span3">' + '<img id="' + key + '" class="picture" src="'+ val.img + '"><div class="row"> <div class="span3 value">' + val.name + '</div></div></div>');
	  		});

	  		$('<div/>', { "class":'row', html: items.join('') }).appendTo('.container .sweet');
		});
	}

	function biscuit() {
		$('.container .sweet').html('');
		$.getJSON('http:/my_server_sites/sweet_dreams/json/biscuit.json', function(data){
			var items = [];
	 		$.each(data, function(key, val){
	    		items.push('<div class="span3">' + '<img id="' + key + '" class="picture" src="'+ val.img + '"><div class="row"> <div class="span3 value">' + val.name + '</div></div></div>');
	  		});
	  		$('<div/>', { "class":'row', html: items.join('') }).appendTo('.container .sweet');
		});	
	}

	function coctails() {
		$('.container .sweet').html('');
		$.getJSON('http:/my_server_sites/sweet_dreams/json/coctails.json', function(data){
			var items = [];
	 		$.each(data, function(key, val){
	    		items.push('<div class="span3">' + '<img id="' + key + '" class="picture" src="'+ val.img + '"><div class="row"> <div class="span3 value">' + val.name + '</div></div></div>');
	  		});
	  		$('<div/>', { "class":'row', html: items.join('') }).appendTo('.container .sweet');
		});	
	}

	function candies() {
		$('.container .sweet').html('');
		$.getJSON('http:/my_server_sites/sweet_dreams/json/candies.json', function(data){
			var items = [];
	 		$.each(data, function(key, val){
	    		items.push('<div class="span3">' + '<img id="' + key + '" class="picture" src="'+ val.img + '"><div class="row"> <div class="span3 value">' + val.name + '</div></div></div>');
	  		});
	  		$('<div/>', { "class":'row', html: items.join('') }).appendTo('.container .sweet');
		});	
	}

	function ice() {
		$('.container .sweet').html('');
		$.getJSON('http:/my_server_sites/sweet_dreams/json/ice_cream.json', function(data){
			var items = [];
	 		$.each(data, function(key, val){
	    		items.push('<div class="span3">' + '<img id="' + key + '" class="picture" src="'+ val.img + '"><div class="row"> <div class="span3 value">' + val.name + '</div></div></div>');
	  		});
	  		$('<div/>', { "class":'row', html: items.join('') }).appendTo('.container .sweet');
		});	
	}

});