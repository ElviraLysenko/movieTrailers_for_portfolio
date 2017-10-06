

$(document).ready(function(){
	
var result = 0; //переменная, которая содержить результат теста

//значения для контроля результата при возврате к предыдущим вопросам
	var res1 = "0";
	var res2 = "0";
	var res3 = "0";
	var res4 = "0";
	var res5 = "0";
	var res6 = "0";
	var res7 = "0";

//путь ко всем радиокнопкам 
		var Elem1 = document.getElementById('quest1');
		var elems1 = Elem1.getElementsByTagName('input');
		var Elem2 = document.getElementById('quest2');
		var elems2 = Elem2.getElementsByTagName('input');
		var Elem3 = document.getElementById('quest3');
		var elems3 = Elem3.getElementsByTagName('input');
		var Elem4 = document.getElementById('quest4');
		var elems4 = Elem4.getElementsByTagName('input');
		var Elem5 = document.getElementById('quest5');
		var elems5 = Elem5.getElementsByTagName('input');
		var Elem6 = document.getElementById('quest6');
		var elems6 = Elem6.getElementsByTagName('input');
		var Elem7 = document.getElementById('quest7');
		var elems7 = Elem7.getElementsByTagName('input');


//скрыть весь файл
	$("#End").hide(); $("#return").hide(); $("#quest1").hide(); $("#quest2").hide(); $("#quest3").hide(); 
	$("#quest4").hide(); $("#quest5").hide(); $("#quest6").hide(); $("#quest7").hide();
	$("#back2").hide(), $("#back3").hide(), $("#back4").hide(), $("#back5").hide(), $("#back6").hide(), $("#back7").hide();
    $("#next1").hide(), $("#next2").hide(), $("#next3").hide(), $("#next4").hide(), $("#next5").hide(), $("#next6").hide(); 

//кнопка "начать тест"
	$("#button_Start").click(function(){ //при нажатии на кнопки, одна информация скрывается, а другая появляется
		$("#button_Start").hide();
		$("#quest1").show();
		$("#next1").show();
	});

//кнопки "вперед ► "
	$("#next1").click(function(){
		for(var i=0; i<elems1.length; i++) //перебор ответов
		{ 
		var val1 = elems1[i].value; //присвоение значения ответа  
			
			if (elems1[i].checked == 1 && val1 == "1") //происходит, если выбран правильный ответ 
			{	
				result = result + 1;
				res1 = "1"; 
			}  
		}
		//переход от одного вопроса к другому
	    $("#quest1").hide();
		$("#next1").hide();
		$("#quest2").show();
		$("#next2").show();
		$("#back2").show();
	});  

	$("#next2").click(function(){
		for(var i=0; i<elems2.length; i++) 
		{ 
			var val2 = elems2[i].value;
			if (elems2[i].checked == 1 && val2 == "1")
			{
				result = result + 1;
				res2 = "1"; 
			}
		}
		$("#quest2").hide();
		$("#next2").hide();
		$("#back2").hide();
		$("#quest3").show();
		$("#next3").show();
		$("#back3").show();

		

		$("#img1").click(function(){  
			$("#img1").fadeTo(500, 0.4);//выделяем выбранное изображение, делая его прозрачнее
			$("#img2").fadeTo(500, 1);
			$("#img3").fadeTo(500, 1);
			if (res3 == "1") //манипуляция "от правильного к неправильному ответу"
			{
				result = result - 1; 
				res3 = "0";
			}
		});

		$("#img2").click(function(){
			$("#img2").fadeTo(500, 0.4);
			$("#img1").fadeTo(500, 1);
			$("#img3").fadeTo(500, 1);
			if (res3 == "1")
			{
				result = result - 1; 
				res3 = "0";
			}
		});

		$("#img3").click(function(){  
			$("#img3").fadeTo(500, 0.4);
			$("#img1").fadeTo(500, 1);
			$("#img2").fadeTo(500, 1);		
		if (res3 == "0")
		result = result + 1; //манипуляция "к правильному ответу"
		res3 = "1";
		});
	});  
	
	$("#next3").click(function(){
	
		for(var i=0; i<elems3.length; i++) 
		{ 
			var val3 = elems3[i].value;
			if (elems3[i].checked == 1 && val3 == "1")
			{
				result = result + 1;
				res3 = "1";
			}
		}
		$("#quest3").hide();
		$("#next3").hide();
		$("#back3").hide();
		$("#quest4").show();
		$("#next4").show();
		$("#back4").show();
	});  
	
	$("#next4").click(function(){

		for(var i=0; i<elems4.length; i++) 
		{ 
			var val4 = elems4[i].value;
			if (elems4[i].checked == 1 && val4 == "1")
			{
				result = result + 1;
				res4 = "1";
			}
		}
		$("#quest4").hide();
		$("#next4").hide();
		$("#back4").hide();
		$("#quest5").show();
		$("#next5").show();
		$("#back5").show();
	});  
	
	$("#next5").click(function(){
		

		for(var i=0; i<elems5.length; i++) 
		{ 
			var val5 = elems5[i].value;
			var sum = 0; //сумма значений выбраных ответов этого вопроса
			if (elems5[i].checked && val5 == 0.25)
			{
				sum = sum + 0.25;
			}
			result = result + sum;
				res5 = "1";
		}
		$("#quest5").hide();
		$("#next5").hide();
		$("#back5").hide();
		$("#quest6").show();
		$("#next6").show();
		$("#back6").show();
	});  
	
	$("#next6").click(function(){

		for(var i=0; i<elems6.length; i++) 
		{ 
			var val6 = elems6[i].value;
			if (elems6[i].checked == 1 && val6 == "1")
			{
				result = result + 1;
				res6 = "1";
			}
		}
		$("#quest6").hide();
		$("#next6").hide();
		$("#back6").hide();
		$("#quest7").show();
		$("#back7").show();
		$("#End").show();
	});  

//кнопки "назад ◄ "
	$("#back2").click(function(){

		if (res1 == "1") //очистка бала за предыдущий выбраный ответ 
			//(если новый ответ не правильный)
		{
			result = result - 1; 
			res1 = "0";
		}

		$("#quest2").hide();
		$("#next2").hide();
		$("#back2").hide();
		$("#quest1").show();
		$("#next1").show();
	});  
	
	$("#back3").click(function(){

		if (res2 == "1")
		{
			result = result - 1; 
			res2 = "0";
		}

		$("#quest3").hide();
		$("#next3").hide();
		$("#back3").hide();
		$("#quest2").show();
		$("#back2").show();
		$("#next2").show();
	});  
	
	$("#back4").click(function(){

		if (res3 == "1")
		{
			result = result - 1; 
			res3 = "0";
		}

		$("#quest4").hide();
		$("#next4").hide();
		$("#back4").hide();
		$("#quest3").show();
		$("#back3").show();
		$("#next3").show();
	});  
	
	$("#back5").click(function(){

		if (res4 == "1")
		{
			result = result - 1; 
			res4 = "0";
		}

		$("#quest5").hide();
		$("#next5").hide();
		$("#back5").hide();
		$("#quest4").show();
		$("#back4").show();
		$("#next4").show();
	});  
	
	$("#back6").click(function(){

		if (res5 == "1")
		{
			result = result - 1; 
			res5 = "0";
		}

		$("#quest6").hide();
		$("#next6").hide();
		$("#back6").hide();
		$("#quest5").show();
		$("#back5").show();
		$("#next5").show();
	});  

	$("#back7").click(function(){

		if (res6 == "1")
		{
			result = result - 1; 
			res6 = "0";
		}

		$("#quest7").hide();
		$("#End").hide();
		$("#back7").hide();
		$("#quest6").show();
		$("#back6").show();
		$("#next6").show();
		$("#travel").show();
	}); 

//Кнопка "Завершить" для подведения итогов, выдачи результатов, и сохранения их на сервере
	$("#End").click(function(){

		//та же манипуляция, что и в кнопках "вперед"
		

		for(var i=0; i<elems7.length; i++) 
		{ 
			var val7 = elems7[i].value;
				if (elems7[i].checked == 1 && val7 == "1")
				{	
					result = result + 1;
					res7 = "1"; 
				}  
		}
	    $("#quest7").hide();
		$("#next7").hide();
		$("#back7").hide();
		$("#End").hide();

	//вывод ответа
		if (result<5)
		{
			document.getElementById("1").innerHTML = name + " Увы! Вы не прошли тест";
			document.getElementById("2").innerHTML = "Правильных ответов: " + result;
			document.getElementById("3").innerHTML = "Пройдите тест заново";
			$("#return").show(); 
		}
		
		else if (result<7)
		{
			document.getElementById("1").innerHTML = name + " Ура! Вы прошли тест";
			document.getElementById("2").innerHTML = "Правильных ответов: " + result;
			document.getElementById("3").innerHTML = "Если Вам не понравился Ваш результат - можете пройти тест заново";
			$("#return").show(); 
		}
		
		else
		{
			document.getElementById("1").innerHTML = name + " Ура! Вы прошли тест";
			document.getElementById("2").innerHTML = "Правильных ответов: " + result;
			document.getElementById("3").innerHTML =  "Это лучший результат. Да Вы знаток в футболе!";
			$("#return").hide(); 
		}
			

		$("#resultat").show();
		
	});  

//кнопка для прохождения теста заново
	$("#return").click(function(){
		result = 0; //очищаем результат окончания теста
		$("#resultat").hide();
		$("#return").hide();
		res1 = "0"; res2 = "0"; res3 = "0"; res4 = "0"; res5 = "0"; res6 = "0"; res7 = "0"; //очищаем результаты ответов
		$("#button_Start").show(); //возвращаемся к кнопке "начать тест"
			for(var i=0; i<elems1.length; i++) {if (elems1[i].checked == true) {elems1[i].checked = 0;} }
			for(var i=0; i<elems2.length; i++) {if (elems2[i].checked == true) {elems2[i].checked = 0;} }
			for(var i=0; i<elems3.length; i++) {
				$("#img1").fadeTo(0, 1);
				$("#img2").fadeTo(0, 1);
				$("#img3").fadeTo(0, 1);
			} 
			for(var i=0; i<elems4.length; i++) {if (elems4[i].checked == true) {elems4[i].checked = 0;} }
			for(var i=0; i<elems5.length; i++) {if (elems5[i].checked == true) {elems5[i].checked = 0;} }
			for(var i=0; i<elems6.length; i++) {if (elems6[i].checked == true) {elems6[i].checked = 0;} } 
			for(var i=0; i<elems7.length; i++) {if (elems7[i].checked == true) {elems7[i].checked = 0;} }
		});
 	});

//

