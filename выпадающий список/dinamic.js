
	var count = document.getElementById('count').textContent;
	var cart = document.getElementsByClassName('fa-shopping-cart');
	if (count > 0) { count.style.opacity = "1"; }
	else {alert("корзина пуста");}
