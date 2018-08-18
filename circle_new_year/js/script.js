$(document).ready(function() {
	function Login_but_click() {
		var users_elem = [];
		let state = false;
		$.getJSON('http:/circle_new_year/json/users.json', function(data){
			console.log('user.json valid');
			for (var i = 0; i<data.users.length; i++){
				users_elem.push(data.users[i]);
			}
			$.each(users_elem, function(key, val){
				this.username = val.username;
				this.password = val.password;
	  		});	
			for (var i = 0; i<users_elem.length; i++) {
				if (($("#login").val() == users_elem[i].username)&&($("#password").val() == users_elem[i].password)){
					state = true;
					var current_user = users_elem[i].username;
					break;
				} 
			}
			if (state == true) {
				$("header").html('Добро пожаловать: ' + $("#login").val())
			}
			else if ((state == false)&&($("#password").val() == '')){alert('введите пароль!');}
			else {alert('Неверно введенные данные :( '+'\n'+'Попробуйте еще раз, или зарегистрируйтесь!'); 
				$("#login").val(''); $("#password").val('');
			}
		});
	}

	function Registration_but_click() {
		var users_elem = [];
		let state = false;
		$.getJSON('http:/circle_new_year/json/users.json', function(data){
			console.log('user.json valid');
			for (var i = 0; i<data.users.length; i++){
				users_elem.push(data.users[i]);
			}
			$.each(users_elem, function(key, val){
				this.username = val.username;
				this.password = val.password;
	  		});	
			for (var i = 0; i<users_elem.length; i++) {
				if ($("#login").val() == users_elem[i].username){
					state = true;
					break;
				}
			}
			if ((state == false)&&($("#password").val() != '')) {
				data.users.push({"username" : $("#login").val(), "password" : $("#password").val()});
				alert('Регистрация прошла успешно!'+'\n'+'Попробуйте зайти!'); 
				$("#login").val(''); $("#password").val('');
			}
			else if ((state == false)&&($("#password").val() == '')){alert('введите пароль!');}
			else {
				alert('Упс... Пользователь с таким login уже зарегистрирован.');
				$("#login").val(''); $("#password").val('');
			}
		});
	}

	function Prod() {
		$.getJSON('http:/circle_new_year/json/products.json', function(data){
			console.log('products.json valid');
			var products_items = [];
			var products_elem = [];
			for (var i = 0; i<data.products.length; i++){
				products_elem.push(data.products[i]);
			}
	 		$.each(products_elem, function(key, val){
	    		products_items.push('<div class="elem"><div class="title">' + val.title + '</div><img src = '+ val.image +'></div>');
	  		});
	  		$('<div/>', { "class":'yes', html: products_items.join('') }).appendTo('.container');
		});	
	}

	$('.container').on('click', '.elem', function(e){
		$('.product_text_all').remove();
		var id_click = $('.elem').index(this);
	 	$.getJSON('http:/circle_new_year/json/products.json', function(data){
			var products_items = [];
			var products_elem = [];
			var text, title, image, color, tracery, material, diametr;
			var text_item = [];
			for (var i = 0; i<data.products.length; i++){
				products_elem.push(data.products[i]);
			}
		 	$.each(products_elem, function(key, val){
		 		title = val.title;
		 		image = val.image;
		 		text = val.text;
		 		if(key == id_click){
		 			text_item.push("<li>Цвет: "+text.color+"</li><li>Узор: "+text.tracery+"</li><li>Материал: "+text.material+"</li><li>Диаметр: "+text.diametr+"</li>");
		 			products_items.push('<div id="product_description"><div class="title">' + title + '</div><hr><img src = '+image +'><hr><div class = "prod_text">'+text_item+'</div></div'); 
		 			$('<div/>', { "class":'product_text_all', html: products_items.join('') }).appendTo('.container');
		 			id = val.id;
		 			ViewComments();
		 		}
		 	}); 
	  	});
	})

	function ViewComments(){
		$.getJSON('http:/circle_new_year/json/comments.json', function(data){
			var comments_elem = [];
			var comments_item = [];
			for (var i = 0; i<data.comments.length; i++) {
				comments_elem.push(data.comments[i]);
			}
			$.each(comments_elem, function(key, val){
				var id_prod = val.id_entry;
				var comment_id_user = val.id_user;
				var users_elem = [];
				$.getJSON('http:/circle_new_year/json/users.json', function(data){
					for (var i = 0; i<data.users.length; i++){
						users_elem.push(data.users[i]);
					}
					for (var i = 0; i<users_elem.length; i++) {
						if (comment_id_user == users_elem[i].id){
							var username_comments = users_elem[i].username;
							break;
						}
					}
				});
				if(id_prod == id){
					comments_item.push('<li class="comments_list"><ul class="comments_item">'+
					'<li class="comments_user">'+val.id_user+'</li>'+
					'<li class="comments_rate">Оценка: '+val.rate+'</li>'+
					'<li class="comments_text">'+val.text+'</li></ul></li>');
				}
			});
			$('<ul/>', {'class':'comments', html: '<input type="text" class="comments_input_text" '+
			'placeholder="Оставьте свой комментарий..."> ' + 
			'<input type="button" class="comments_enter" value="Отправить">' + comments_item.join('')}).appendTo('.product_text_all');
		});
	}

	$('#in').click(function(){
		Login_but_click();
	});

	$('#registration').click(function(){
		Registration_but_click();
	});

	Prod();
});