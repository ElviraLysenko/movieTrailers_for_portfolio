window.onload = function() {
	const container = document.querySelector('.container');
	const body = document.querySelector('body');
	const loader = document.querySelector('#load');
	body.removeChild(loader);
	if (!navigator.cookieEnabled) {
  		alert( 'Включите cookie для комфортной работы с этим сайтом' );
	}
		
	/*Создание и вставка объектов*/
		const log = document.createElement('a');

		const block_for_form = document.createElement('section'); //служит общим фоном для форм, и убирает возможность воздействия на все элементы сайта, кроме той формы, которая открыта
	   	block_for_form.className = "block_for_form";

		const authorization_form = document.createElement('form');
		authorization_form.method = 'post';

		const actual_news_block = document.createElement('article');
		actual_news_block.id = 'actual';
		actual_news_block.innerHTML = '<h2><img src="img/vensel-left.png">Актуальное<img src="img/vensel-right.png"></h2><section id="actual_block"></section><aside><a href="" class="banner"></a><a href="" class="banner"></a></aside>';
		container.appendChild(actual_news_block);

		const news_block = document.createElement('article');
		news_block.id = 'news';
		news_block.innerHTML = '<h2><img src="img/vensel-left.png">Новости<img src="img/vensel-right.png"></h2><section id="news_block_items"></section><input type="button" id="show_more" value="Показать еще..."></input>';
		container.appendChild(news_block);

		const news_example = document.createElement('section');
	    news_example.className = "news_example";

		const block_insert = document.createElement('form');
			block_insert.method = 'post';
			block_insert.name = 'add_news';

		const block_edit = document.createElement('form');
			block_edit.method = 'post';
			block_edit.name = 'edit_news';

	/*Глобальные переменные*/
		const xhr_signIn = new XMLHttpRequest();
		const xhr_signUp = new XMLHttpRequest();
		const xhr_get_news = new XMLHttpRequest();
		const xhr_set_news = new XMLHttpRequest();
		const xhr_up_news = new XMLHttpRequest();
		const xhr_get_comment = new XMLHttpRequest();
		const xhr_set_comment = new XMLHttpRequest();

		let add_date = new Date();
		let yyyy = add_date.getFullYear();
		let mm = add_date.getMonth()+1;
		let dd = add_date.getDate();
		let h = add_date.getHours();
		let m = add_date.getMinutes();
		let s = add_date.getSeconds();
		if(dd<10) {	dd = '0'+ dd; }
		if(mm<10) {	mm = '0'+ mm; }
		if(h<10) {	h = '0'+ h; }
		if(m<10) {	m = '0'+ m; }
		if(s<10) {	s = '0'+ s; }

		let setDate = yyyy + '-' + mm + '-' + dd;
		let setDateTime = setDate + ' ' + h + ':' + m + ':' + s;

		let id_news = 0;

		const nav = document.querySelector('nav');
		const nav_a = document.querySelectorAll('nav a');

		const cookie_id = getCookie("id");
		const cookie_nick = getCookie("nick_name");

		const sign_in_text = '<span class="close"><i class="far fa-times-circle"></i></span>'+
	    		'<fieldset><legend>Авторизация</legend>'+
	            '<input type="email" name="email" placeholder="E-mail" minlength="6" maxlength="40" required>'+
	            '<input type="password" name="password" placeholder="Пароль" minlength="8"  maxlength="40" required><br>' +
	            '<input type="submit" name="submit" value="Войти"><br>'+
	            '<span id="register">Вы еще не зарегистрированы?</span></fieldset>';     

	    const sign_up_text = '<span class="close"><i class="far fa-times-circle"></i></span>'+
	    		'<fieldset><legend>Регистрация</legend>'+
	            '<span id="hello">Здравствуйте, уважаемый посетитель нашего сайта! Регистрация на нашем сайте позволит Вам оставлять комментарии.</span>' + 
	            '<input type="email" name="email" placeholder="E-mail" minlength="6" maxlength="40" required autocomplete="off">'+
	            '<input type="password" name="password" placeholder="Пароль" minlength="8"  maxlength="40" required><br>' +
	            '<input type="text" name="nick_name" placeholder="Имя пользователя (ник)"><br>'+ 
	            '<input type="submit" name="submit" value="Зарегистрироваться"></fieldset>';   

	    const insert_news_text = '<span class="close"><i class="far fa-times-circle"></i></span>'+
	    		'<fieldset><legend>Добавить новость</legend><input type="text" name="caption" placeholder="Заголовок">'+
				'<input type="file" name="file" accept=".jpg, .jpeg, .png">'+
				'<input type="text" name="file_name" readonly>'+
				'<textarea name="text" placeholder="Новостной текст"></textarea>'+
				'<input type="submit" name="add_news" value="Добавить новость"></fieldset>';

		const update_news_text = '<span class="close"><i class="far fa-times-circle"></i></span>'+
	    		'<fieldset><legend>Редактировать новость</legend><input type="text" name="caption">'+
				'<input type="file" name="file" accept=".jpg, .jpeg, .png">'+
				'<input type="text" name="file_name" readonly>'+
				'<textarea name="text"></textarea>'+
				'<input type="submit" name="edit_news" value="Редактировать новость"></fieldset>';

		const arr=['января', 'февраля', 'марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'];

		const actual_news_item_block = document.querySelector('#actual_block');
		const news_block_items = document.querySelector('#news_block_items');
		const show_more = document.querySelector('#show_more');

	/*основной ajax запрос для работы с новостями*/
	    xhr_get_news.open('GET', 'http://127.0.0.1/home_decoration/api/Get_news.php', true);
		xhr_get_news.send(); 
		xhr_get_news.onreadystatechange = function() {
			if (xhr_get_news.readyState != 4) return;
			if (xhr_get_news.status != 200) {
			    alert(xhr_get_news.status + ': ' + xhr_get_news.statusText);
			} 
			else {
				 /*считывание данных из бд (таблица "Новости")*/
			 	const news_objects = JSON.parse(xhr_get_news.responseText, function(key, value) {
					if (key == 'date_publication') return new Date(value);
				  	return value;
				});
				let arr_str = [];
				let arr_str_full = [];
				let arr_news = [];
				let progress = 0;
				let progress_stop = 0;
				let modulo = 0;
				if(document.documentElement.clientWidth>800){ modulo = news_objects.length%3; } 
				else {	modulo = news_objects.length%2;	} 
				let show = news_objects.length - modulo; 

				for (let i = 0; i<news_objects.length; i++){
					actual_load(actual_news_item_block, news_objects, i); //вывод актуальной новости
					arr_news.push(news_objects[i]); // запись в массив данных про все новости
				}

				arr_news.reverse(); //сортировка новости в обратном порядке (от новых к старым)

				/*формирование читабельного вида дат опубликованных новостей*/
				for (let i = 0; i<news_objects.length; i++){
					let path = arr_news[i].date_publication;
					let yyyy = path.getFullYear();
					let mm = path.getMonth();
					let dd = path.getDate();
					if(dd<10) { dd= '0'+ dd; }
					mm = arr[mm];
					let str = dd + ' ' + mm;
					arr_str.push(str);
					let str_full = dd + ' ' + mm + ' ' + yyyy;
					arr_str_full.push(str_full);
				}

				/*для пользователя*/
				if((!cookie_id)||(cookie_id!==1)&&(cookie_nick!=="admin")){
					if(document.documentElement.clientWidth>800){ progress = 4; progress_stop = 7; }  //для экранов с шириной более 800px блок новостей состоит из 3 элементов
					else {progress = 5;  progress_stop = 9;}  //для экранов с шириной 800px и более, блок новостей состоит из 4 элементов
					for (let i = 1; i<news_objects.length; i++){ 
						let news_item = document.createElement('section');
						news_item.className = "news_items";
						auto_load(arr_news, i, news_item, arr_str, show_more);  //вывод первого блока новостей, не включая актуальную новость
						news_example_load(news_item, i, arr_news, arr_str_full);  //вывод отдельно взятой новости
					}
					show_more.onclick = function(){ 
						if(progress<=arr_news.length){ 
							if(modulo === 0){
								for (progress; progress<progress_stop; progress++){
									show_more_forUsers(arr_news, arr_str, progress, arr_news, arr_str_full); //подгружение дополнительного блока новостей
									if(document.documentElement.clientWidth>800){ 
										if(progress_stop > arr_news.length){ 
											show_more.style.display = 'none'; //когда загружены все новости - скрытие кнопки "Показать еще"
										}
									}
									else {
										if(progress_stop > arr_news.length){
											show_more.style.display = 'none';
										}
									}
								}
								if(document.documentElement.clientWidth>800){ progress_stop+=3; }
								else { progress_stop+=4; }
							}
							else if(progress < show){
								for (progress; progress<progress_stop; progress++){
									show_more_forUsers(arr_news, arr_str, progress, arr_news, arr_str_full); 
								}
								if(document.documentElement.clientWidth>800){ 
									if(progress < (show-1)){
										progress_stop+=3; 
									}
									else {show_more.style.display = "none";}
								}
								else { 
									if(modulo == 0){ progress_stop+=4; }
									else if((modulo == 1)&&(progress<(show+1))){ progress_stop+=4; }
									else {show_more.style.display = "none";}									
								}
							}
							else {
				   				show_more.style.display = "none";
				   				for (progress; progress<progress_stop; progress++){
									show_more_forUsers(arr_news, arr_str, progress, arr_news, arr_str_full); 
								}
							}
						}					
					}
				}

			/*для админа*/
				else {
					show = show-1; //потому-что первым элементом в новостном блоке будет не новость, а блок для добавления новости 
					if(document.documentElement.clientWidth>800){ progress = 2; progress_stop = 5;}
					else {progress = 3;  progress_stop = 7;}
					news_add();  //операции, позволяющие в последствии добавить новость

					for (let i = 0; i<news_objects.length; i++){
						let change = document.createElement('span');  //создание панели изменения и удаления новости
						change.className='change';
						change.innerHTML = '<span class="edit"><i class="fas fa-pencil-alt"></i></span>'+
							'<span class="delete"><i class="fas fa-trash-alt"></i></span>';
						let news_item = document.createElement('section');
						news_item.className = "news_items";
						auto_load_forAdmin(i, arr_news, news_item, change, arr_str, arr_str_full);  //вывод первого блока новостей
						news_example_load(news_item, i, arr_news, arr_str_full);  //вывод отдельно взятой новости
					}

					show_more.onclick = function(){
						if(progress<=arr_news.length){
							if(modulo === 0){
								let style_after = document.querySelector('#news_block_items');
								style_after.className = 'additional_after';  //добавление класса для корректного отображения панели изменения и удаления новости
								for (progress; progress<progress_stop; progress++){
									show_more_forAdmin(progress, arr_news, arr_str, arr_str_full);  //подгружение дополнительного блока новостей
									if(progress_stop > arr_news.length){ 
										show_more.style.display = 'none'; //когда загружены все новости - скрытие кнопки "Показать еще"
									}
								}
								if(document.documentElement.clientWidth>800){ progress_stop+=3; }
								else { progress_stop+=4; }
							}
							else if(progress < show){
								for (progress; progress<progress_stop; progress++){
									show_more_forAdmin(progress, arr_news, arr_str, arr_str_full); 
								}
								if(document.documentElement.clientWidth>800){ progress_stop+=3; }
								else { 
									if((modulo == 1)&&(progress < (show+1))){ progress_stop+=4; }
									else if((modulo == 2)&&(progress<(show+2))){ progress_stop+=4; }
									else {show_more.style.display = "none"; }									
								}
							}
							else {
					   			for (progress; progress<progress_stop; progress++){
									show_more_forAdmin(progress, arr_news, arr_str, arr_str_full); 
								}
								show_more.style.display = "none";
							}
						}					
					}	
				}	
			}
		}

		/*настройка вида меню и актуальной новости при показе на мобильных устройствах*/
		if((document.documentElement.clientWidth>300)&&(document.documentElement.clientWidth<451)){ 
			nav_a[0].innerHTML = '<i class="fas fa-home"></i>';
			nav_a[1].innerHTML = '<i class="fab fa-hotjar"></i>';
			nav_a[2].innerHTML = '<i class="far fa-newspaper"></i>';
			nav_a[0].setAttribute('title','Home');
			nav_a[1].setAttribute('title','Актуальное');
			nav_a[2].setAttribute('title','Новости');

			let act =  document.querySelector('#actual');
			let read_more = document.createElement('input');
			read_more.readOnly = true;
			read_more.value = '... читать далее';
			act.insertBefore(read_more, act.firstChild);

			read_more.onclick = function(){
				document.querySelector('#actual_block').style.height = 'auto';
				act.removeChild(this);
			}
		}

	/*функции*/
		window.onscroll = function(){  //при прокрутке - фиксированное меню
			if (window.pageYOffset > 450) {
				nav.style.position = "fixed";
				nav.style.top = "0";
			}
			else {
				nav.style.position = "";
				nav.style.top = "";
			}
		}

		nav.appendChild(log);
		if((document.cookie=='')||(!cookie_id)){  //вход в систему не выполнен
			log.title = 'Войти';
			log.innerHTML = '<i class="fas fa-sign-in-alt"></i>';	
			log.onclick = function(){  //получение формы авторизации
				container.appendChild(authorization_form);
				body.insertBefore(block_for_form, container);
				block_for_form.style.display = 'block';
				authorization_form.name="log_in";
				authorization_form.style.display = "flex";
				authorization_form.innerHTML = sign_in_text;
				const register = document.querySelector("#register"); 
				register.onclick = function(){  //изменение  формы на регистрационную
					authorization_form.name="check_in";
					authorization_form.innerHTML = sign_up_text;	
					close_form(authorization_form); 
				}
				close_form(authorization_form);  //закрытие формы
			}	
		}
		else { //вход в систему выполнен
			log.title = 'Выйти';
			log.innerHTML = '<i class="fas fa-sign-out-alt"></i>';	
			log.onclick = function(){ //выход из системы, путем удаления файлов куки
				deleteCookie('id');
				deleteCookie('nick_name');
				document.location.reload(true);
			}
		}

		/*выполнение проверок на правильность введенных данных, и отправка этих данных на сервер*/
		authorization_form.onsubmit = function(e){
			let message_error = document.createElement('span');
			message_error.id = 'error';

			/*проверка email на валидность*/
			var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
			if(reg.test(this.email.value) == false) {
				message_error.textContent = 'Не корректный email! Пример допустимого: validate_prime@com.ua';
				if(!document.querySelector('#error')){
					document.querySelector('fieldset').insertBefore(message_error, document.querySelector('fieldset').children[1]);
				}
				else {
					document.querySelector('fieldset').replaceChild(message_error, document.querySelector('#error'));
				}
				return false;
			}
			else if(authorization_form.name == 'log_in') { 
				let log_form_data = document.forms.log_in;
				autorization(log_form_data, xhr_signIn, 'login.php', message_error); //вторизация
			}
			else if(authorization_form.name == 'check_in') {
				let reg_form_data = document.forms.check_in;
				autorization(reg_form_data, xhr_signUp, 'register.php', message_error); //регистрация
			}
			e.preventDefault();			
		}


	let form_data = {};
	function autorization(form, xhr, file_name, message_error){
		form_data = new FormData(form);
		xhr.open('POST', 'http://127.0.0.1/home_decoration/api/'+file_name, true);
		xhr.onreadystatechange = function() {
			if (xhr.readyState != 4) return;
			if (xhr.status != 200) {
			    alert(xhr.status + ': ' + xhr.statusText);
			} 
			else {
				let data = JSON.parse(this.responseText); //получение ошибок
				if(data!='') { 
					message_error.textContent = data; 
					if(!document.querySelector('#error')){
						document.querySelector('fieldset').insertBefore(message_error, document.querySelector('fieldset').children[1]); //вывод ошибки на форму, без перезагрузки сайта
					}
					else {
						document.querySelector('fieldset').replaceChild(message_error, document.querySelector('#error')); //замена ошибки на текущую
					}
					if(document.querySelector('#hello')){
						document.querySelector('fieldset').removeChild(document.querySelector('#hello')); //удалить приветствие
					}
				}	
				else {
					if(authorization_form.name == 'check_in') { //при удачной регистрации преход на форму аторизации
						authorization_form.name="log_in";
						authorization_form.innerHTML = sign_in_text;	
						const register = document.querySelector("#register"); 
						register.onclick = function(){
							authorization_form.name="check_in";
							authorization_form.innerHTML = sign_up_text;	
							close_form(authorization_form); 
						}
						close_form(authorization_form);
					}
					else { //при удачной авторизации перезагрузка страницы (уже с новыми возможностями) 
						window.location.href = "http://127.0.0.1/home_decoration/"; 
					}
				}
			}
		}
		xhr.send(form_data); 
	}

	function actual_load(actual_news_item_block, obj, i){
		for (let key in obj[i]) {
			actual_news_item_block.innerHTML ='<h3 id="caption">'+ obj[i]['caption']+'</h3><img id="image" '+
			'src="'+ obj[i]['image']+'"><p class="text">'+ obj[i]['text']+'</p>'; //вывод информации про актуальную новость
		}
	}

	function auto_load(obj, per_i, news_item, arr_str, show_more){
		let col_auto_load = 0; //кол-во новостей в первом блоке, при том, что актуальную новость [0] не показываем, но учитываем ее наличие...
		if(document.documentElement.clientWidth>800){ col_auto_load = 4; } 
		else {col_auto_load = 5;} 
		if(per_i<col_auto_load){ 
			for (let key in obj[per_i]) { //вывод первого блока новостей (для пользователя)
				news_item.innerHTML = '<span class="date">'+arr_str[per_i]+'</span><img class="image" src="'+obj[per_i]['image']+'">'+
				'<h4 class="caption"><hr>'+obj[per_i]['caption']+'<hr></h4>'; 
				news_block_items.appendChild(news_item); 
				if(obj.length>col_auto_load) { show_more.style.display = 'block'; } //если общее кол-во новостей больше, чем кол-во выведенных - показать кнопку "Показать еще"
			}
		}	
	}

	function show_more_forUsers(obj, arr_str, progress, arr_news, arr_str_full){
		let news_item = document.createElement('section'); 
		news_item.className = "news_items";
		for (let key in obj[progress]) { //подгружение блока новостей (для пользователя)
			news_item.innerHTML = '<span class="date">'+arr_str[progress]+'</span><img class="image" src="'+obj[progress]['image']+'">'+
				'<h4 class="caption"><hr>'+obj[progress]['caption']+'<hr></h4>'; 
			news_block_items.appendChild(news_item); 
		}
		news_example_load(news_item, progress, arr_news, arr_str_full); //вывод отдельно взятой новости
	}

	function news_example_load(obj, per_i, arr_news, arr_str_full){
		//вывести новость на которую кликнули
	  	obj.onclick = function(){
	  		id_news = arr_news[per_i].id; //вытягивание id новости, на которую нажали
	    	for (let key in arr_news[per_i]) {
		  		news_example.innerHTML = '<span class="close"><i class="far fa-times-circle"></i></span>'+
		  		'<section class="example"><h3 id="caption">'+arr_news[per_i]['caption']+'</h3>'+
				'<img id="image" src="'+arr_news[per_i]['image']+'"><p class="text">'+arr_news[per_i]['text']+'</p>'+
				'<span class="date">'+arr_str_full[per_i]+'</span></section>'+
				'<section class="comments_block"><form name="user_comment" method="post">'+
				'<span class="rate"><span class="star"><i class="fas fa-star"></i></span><span class="star">'+
				'<i class="fas fa-star"></i></span><span class="star"><i class="fas fa-star"></i></span><span class="star">'+
				'<i class="fas fa-star"></i></span><span class="star"><i class="fas fa-star"></i></span></span><br>'+
				'<textarea name="text" placeholder="Оставьте свой комментарий..."></textarea>'+
				'<input type="submit" name="add_comment" value="Отправить">'+
				'</form><section class="all_comments"></section></section>';
				container.appendChild(news_example); //вывод новости
				body.insertBefore(block_for_form, container);  
				block_for_form.style.display = 'block'; 
			}
			star(); //добавление анимированного поля, для оценивания новости
			comment_but();  //добавление комментария
			if(document.documentElement.clientWidth>960){news_example.style.display = 'flex';}
			else {news_example.style.display = 'block';}
			Get_comment();	//считывание всех комментариев
			close_form(news_example); //закрытие формы
		}
	}	

	function star(){ //добавление анимированного поля, для оценивания новости
		if(document.querySelectorAll('.star')){
			let form_comment = document.querySelector('form[name="user_comment"]');
			let star = document.querySelectorAll('.star');
			let rate_str = document.createElement('input');
			rate_str.name = 'rate'; rate_str.readOnly = true; 
			form_comment.insertBefore(rate_str, form_comment.children[1]);
			let rate = 0;
			for (let i = 0; i<star.length; i++){
				(function(n){
					star[n].addEventListener('mouseover', star_active);
					star[n].addEventListener('mouseout', star_disabled);
					star[n].addEventListener('click', star_res);
					function star_active(){
						for(let s=0; s<=n; s++){
							star[s].style.color = '#f9c700';
						}
					}
					function star_disabled(){
						for(let s=0; s<star.length; s++){
							star[s].style.color = '';
						}
					}
					function star_res(){
						star[n].addEventListener('mouseover', star_active);
						star[n].addEventListener('mouseout', star_disabled);
						rate = n+1;
						rate_str.value = '   ' + rate + ' stars'; 
						for(let s=0; s<=n; s++){
							star[s].style.color = '#f9c700';
							star[s].removeEventListener('mouseout', star_disabled);
						}
						for(let s = n+1; s<star.length; s++){
							star[s].style.color = '';
							star[s].removeEventListener('mouseover', star_active);
						}
					}
				})(i);
			}	
		}
	}

	function comment_but(){
		if(document.querySelector('form[name="user_comment')){
			let comment_submit = document.querySelector('form[name="user_comment');
			let comment_text = document.querySelector('form[name="user_comment"] textarea');
			if(document.cookie=='') {
				comment_submit.onsubmit = function(){
					comment_text.value = 'Комментарии могут оставлять только зарегистрированные пользователи. Пожалуйста, зарегистрируйтесь!';
					comment_text.readOnly = true;
					return false //отмена отправки формы, для незарегистрированного пользователя
				}
			}
			else {
				comment_submit.onsubmit = function(e){
					let rate_str = document.querySelector('input[name="rate"]');
					if((rate_str.value=='')&&(comment_text.value=='')){
						comment_text.placeholder = 'Оставьте свой комментарий или оценку!';
						comment_text.focus();
						return false //отмена отправки формы, при пустых значениях оценки и комментария
					}
					else {
						if(rate_str.value=='') rate_str.value = '0 stars';
						setCookie("comment_sending_date", setDateTime, 20);
						setCookie("id_news", id_news, 20);
						Set_comment(); //добавление комментария
						comment_text.value = '';
						rate_str.value = '';
					}
					e.preventDefault();
				}
			}
		}
	}	

	function Set_comment(){ /*добавление комментария*/
		form_data = new FormData(document.forms.user_comment);
		xhr_set_comment.open('POST', 'http://127.0.0.1/home_decoration/api/Set_comment.php', true);
		xhr_set_comment.onreadystatechange = function() {
			if (xhr_set_comment.readyState != 4) return;
			if (xhr_set_comment.status != 200) {
			    alert(xhr_set_comment.status + ': ' + xhr_set_comment.statusText);
			} 
			else {
				if(document.querySelector('.all_comments')){
					let comments_block = document.querySelector('.all_comments');
					comments_block.innerHTML = ''; //при успешном добавлении комментария очистить блок с комментариями
				}
				Get_comment(); //вывод комментариев, включая добавленный
			}
		}
		xhr_set_comment.send(form_data); 
	}

	function Get_comment(){ //вывод всех комментариев для определенной новости, в порядке от новых к старым
		xhr_get_comment.open('GET', 'http://127.0.0.1/home_decoration/api/Get_comment.php', true);
		xhr_get_comment.send(); 
		xhr_get_comment.onreadystatechange = function() {
			if (xhr_get_comment.readyState != 4) return;
			if (xhr_get_comment.status != 200) {
			    alert(xhr_get_comment.status + ': ' + xhr_get_comment.statusText);
			} 
			else {
				const comment_objects = JSON.parse(this.responseText);
				for (let i = 0; i<comment_objects.length; i++){
					let stars = [];
					let star = '<span class="star"><i class="fas fa-star"></i></span>';
					let comment = document.createElement('section');
					comment.className = 'comment';
					let path = new Date(comment_objects[i].date_uploud);
					let yyyy = path.getFullYear();
					let mm = path.getMonth()+1;
					let dd = path.getDate();
					let h = path.getHours();
					let m = path.getMinutes();
					if(dd<10) {	dd = '0'+ dd; }
					if(mm<10) {	mm = '0'+ mm; }
					if(h<10) {	h = '0'+ h; }
					if(m<10) {	m = '0'+ m; }
					let str_dateTime = dd + '.' + mm + '.' + yyyy + ' ' + h + ':' + m;
					if(id_news == comment_objects[i].id_news){
						if(document.querySelector('.all_comments')){
							let comments_block = document.querySelector('.all_comments');
							comments_block.insertBefore(comment, comments_block.firstChild); //добавление блока для комментария в начало списка
						}
						(function(){ //показ оценки в виде количества звезд
							let rate_num = comment_objects[i]['rate'];
							for(let i = 0; i<rate_num; i++){
								stars.push(star);
							}
						})();
						let stars_new = stars.join('');
						for(let key in comment_objects[i]){ //запись комментрия в соответствующий блок
							comment.innerHTML = '<span class="nick">'+comment_objects[i]['nick_name']+'</span><span class="rate">'+stars_new+'</span><p class="comment_text">'+
							comment_objects[i]['text_comment']+'</p><span class="date_of_comment">'+str_dateTime+'</span>'; 
						}
					}
				}
			}
		}
	}

	function close_form(form_name){
		//кнопка закрытия форм
		const closes = document.querySelectorAll('.close');
		for (let i = 0; i<closes.length; i++){
			(function(n){
				closes[n].onclick = function(){
					form_name.style.display = 'none';
					block_for_form.style.display = 'none';
				}
			})(i);
		}
	}
    
    /*далее setCookie, getCookie, deleteCookie - для записи, считывания и удаления куки соответственно
    используется для работы с введенными данными пользователя*/
	function setCookie (name, value, expires, path, domain, secure) {
		let date = new Date(new Date().getTime() + expires * 1000);
	    document.cookie = name + "=" + escape(value) +
	    ((expires) ? "; expires=" + date.toUTCString() : "") +
	    ((path) ? "; path=" + path : "") +
	    ((domain) ? "; domain=" + domain : "") +
	    ((secure) ? "; secure" : "");
	}	

	function getCookie(name) {
		var cookie = " " + document.cookie;
		var search = " " + name + "=";
		var setStr = null;
		var offset = 0;
		var end = 0;
		if (cookie.length > 0) {
			offset = cookie.indexOf(search);
			if (offset != -1) {
				offset += search.length;
				end = cookie.indexOf(";", offset)
				if (end == -1) {
					end = cookie.length;
				}
				setStr = unescape(cookie.substring(offset, end));
			}
		}
		return(setStr);
	}		

	function deleteCookie(name){
		setCookie(name, "", -1,  "/");
	}

	function auto_load_forAdmin(per_i, arr_news, news_item, change, arr_str, arr_str_full){ //вывод первого блока новостей (для администратора)
		let progress = 0;
		let progress_stop = 0;
		if(document.documentElement.clientWidth>800){ col_auto_load = 2; }
		else { col_auto_load = 3; }
		if(per_i<col_auto_load){
			for (let key in arr_news[per_i]) {
				news_item.innerHTML = '<span class="date">'+arr_str[per_i]+'</span><img class="image" src="'+arr_news[per_i]['image']+'">'+
				'<h4 class="caption"><hr>'+arr_news[per_i]['caption']+'<hr></h4>'; //запись данных о новости
			}
			news_block_items.appendChild(news_item); //вывод новости
			news_block_items.appendChild(change); //вывод блока для изменения списка новостей (редактирование, удаление)
			let edit_news_item = document.querySelectorAll('.edit');
			let delete_news_item = document.querySelectorAll('.delete');
			news_edit(edit_news_item[per_i], per_i, arr_news, arr_str_full); //добавление формы с данными новости, для редактирования
			news_delete(delete_news_item[per_i], per_i, arr_news); //удаляет новость
			if(arr_news.length>col_auto_load) {show_more.style.display = 'block';}  //если общее кол-во новостей больше, чем кол-во выведенных - показать кнопку "Показать еще"
		}	
	}

	function show_more_forAdmin(progress, arr_news, arr_str, arr_str_full){ //подгружение блока новостей (для администратора)
		let change = document.createElement('span');
		let news_item = document.createElement('section');
		change.className='change';
		change.innerHTML = '<span class="edit"><i class="fas fa-pencil-alt"></i></span>'+
			'<span class="delete"><i class="fas fa-trash-alt"></i></span>';
		news_item.className = "news_items";

		for (let key in arr_news[progress]) {
			news_item.innerHTML = '<span class="date">'+arr_str[progress]+'</span><img class="image" src="'+arr_news[progress]['image']+'">'+
				'<h4 class="caption"><hr>'+arr_news[progress]['caption']+'<hr></h4>'; //запись данных о новости
			news_block_items.appendChild(news_item);  //вывод новости
			news_block_items.appendChild(change);  //вывод блока для изменения списка новостей (редактирование, удаление)
			let edit_news_item = document.querySelectorAll('.edit');
			let delete_news_item = document.querySelectorAll('.delete');
			news_edit(edit_news_item[progress], progress, arr_news, arr_str_full); //добавление формы с данными новости, для редактирования
			news_delete(delete_news_item[progress], progress, arr_news); //удаляет новость
		}
		news_example_load(news_item, progress, arr_news, arr_str_full); //вывод отдельно взятой новости
	}

	function news_add(){  //создание необходимых элементов для возможности добавить новость
		let news_item_add = document.createElement('section');
		news_item_add.className = "news_items";
		news_item_add.innerHTML = '<span id="add"><i class="fas fa-plus"></i></span>';
		news_block_items.appendChild(news_item_add);
		news_item_add.onclick = function(){
			block_insert.innerHTML = insert_news_text;
			container.appendChild(block_insert);
			body.insertBefore(block_for_form, container);
			block_for_form.style.display = 'block';
			let add_file = document.querySelector('form[name="add_news"] input[name="file"]');
			let add_file_name = document.querySelector('form[name="add_news"] input[name="file_name"]');
			add_file.onchange = function(){
			 	add_file_name.value = this.files[0].name;
			}
			block_insert.style.display = 'block';
			close_form(block_insert); 
		}
	}

	function news_edit(obj, per_i, arr_news, arr_str_full){ //добавление формы с данными новости, для редактирования
		obj.onclick = function(){
		  	id_news = arr_news[per_i].id;
			block_edit.innerHTML = update_news_text;
			container.appendChild(block_edit);
			block_edit.style.display = 'block';
			body.insertBefore(block_for_form, container);
			block_for_form.style.display = 'block';
			for (let key in arr_news[per_i]) {
			   	let edit_caption = document.querySelector('form[name="edit_news"] input[name="caption"]');
				let edit_file = document.querySelector('form[name="edit_news"] input[name="file"]');
				let edit_file_name = document.querySelector('form[name="edit_news"] input[name="file_name"]');
				let edit_text = document.querySelector('form[name="edit_news"] textarea[name="text"]');
				edit_caption.value = arr_news[per_i]['caption'];
			  	edit_file_name.value = arr_news[per_i]['image'];
			  	edit_file.onchange = function(){
			    	edit_file_name.value = this.files[0].name;
				}
				edit_text.value = arr_news[per_i]['text'];	     				
			}
			close_form(block_edit); 
		}
	}

	block_insert.onsubmit = function(e){ 
		let form_add_news = document.forms.add_news;
		let caption = document.querySelector('form[name="add_news"] input[name="caption"]');
		let text = document.querySelector('form[name="add_news"] textarea[name="text"]');
		/*если все поля заполнены, добавление новости с текущей датой*/
		if((caption.value!=='')&&(text.value!=='')){ 
			setCookie("date_of_news", setDate, 15);
			block_insert.style.display = 'none'; 
			change_news_list(form_add_news, xhr_set_news, 'Set_news.php'); 
		}
		/*отмена отправки формы, при пустом значении полей*/
		else if(caption.value == ''){
			caption.placeholder = 'Заголовок отсутствует!';
			caption.focus();
			return false; 
		}
		else {
			text.placeholder = 'Текст новостей отсутствует!';
			text.focus();
			return false; 	
		}			
		e.preventDefault();
	}

	block_edit.onsubmit = function(e){
		let form_edit_news = document.forms.edit_news;
		let caption = document.querySelector('form[name="edit_news"] input[name="caption"]');
		let text = document.querySelector('form[name="edit_news"] textarea[name="text"]');
		/*если все поля заполнены, редактирование текущей новости*/
		if((caption.value!=='')&&(text.value!=='')){
			setCookie("id_news", id_news, 20);
			block_edit.style.display = 'none'; 
			change_news_list(form_edit_news, xhr_up_news, 'Up_news.php'); 
		}
		/*отмена отправки формы, при пустом значении полей*/
		else if(caption.value == ''){
			caption.placeholder = 'Заголовок отсутствует!';
			caption.focus();
			return false;
		}
		else {
			text.placeholder = 'Текст новостей отсутствует!';
			text.focus();
			return false;	
		}		
		e.preventDefault();
	}	

	function change_news_list(form, xhr, file_name){ 
		form_data = new FormData(form);
		xhr.open('POST', 'http://127.0.0.1/home_decoration/api/'+file_name, true);
		xhr.onreadystatechange = function() {
			if (xhr.readyState != 4) return;
			if (xhr.status != 200) {
			    alert(xhr.status + ': ' + xhr.statusText);
			} 
			else {
				/*если операция редактирования/удаления прошла успешно, перезагрузить сайт*/
				window.location.href = "http://127.0.0.1/home_decoration/"; 
			}
		}
		xhr.send(form_data); 
	}

	function news_delete(obj, per_i, arr_news){ 
		obj.onclick = function() {
			id_news = arr_news[per_i].id;
			if (confirm("Удалить новость?")){
				setCookie("id_news", id_news, 20);
				window.location.href = "http://127.0.0.1/home_decoration/api/Delete_news.php";
			}
			else { return false; }
		}
	}
};