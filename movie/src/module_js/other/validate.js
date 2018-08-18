export default (_this) => {
	let err = '';
	let login = _this.state.login;
	let pass = _this.state.password;
	let passRep = _this.state.passwordRepeat;

	if(/^[a-zA-Z][a-zA-Z0-9-_]+$/.test(login) === false){
		err = 'В логине должны быть только латинские буквы и символы "_ -" !';
	}

	if(parseInt(login.substr(0, 1), 10)){
		err = 'Логин должен начинаться с буквы';
	}

	if(login.length<6 || login.length>30){
		let err_log_length = 'В логине должно быть количество символов от 6 до 30. Сейчас - ' + login.length;
		err = err_log_length;
	}

	if(document.querySelector('input[name=passwordRepeat]')){
		if(pass.length<8 || pass.length>30){
			let err_pass_length = 'В пароле должно быть количество символов от 8 до 30. Сейчас - ' + pass.length;
			err = err_pass_length;
		}

		if(pass !== passRep){
			err = 'Пороли не совпадают';
		}	
	}
	
	return err;
}