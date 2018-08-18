import React from 'react'
import connect from '../other/connect_post.js'
import validate from '../other/validate.js'

export default class Registration extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	error: '',
	    	login: '',
	    	password: '',
	    	passwordRepeat: ''
	    };
	   	this.onChangeState = this.onChangeState.bind(this);
	   	this.handleSubmit = this.handleSubmit.bind(this);
  	}
  	onChangeState(e){
  		let name = e.target.name;
  		let value = e.target.value;
  		switch(name){
  			case 'login' : this.setState({login: value});  break;
  			case 'password' : this.setState({password: value});  break;
  			case 'passwordRepeat' : this.setState({passwordRepeat: value}); break;
  			default: break;
  		}
	}
	connectOnValidate(){
		let err_valid = validate(this);
		this.setState({error: err_valid}) 
		if(err_valid === '') { connect(this, 'api/register.php',  document.forms.registration); }
	}
	handleSubmit(e) {
        e.preventDefault();
        this.connectOnValidate();
    }
	render(){
		return (
			<section id='auth'>
				<form encType="multipart/form-data" name="registration" onSubmit={this.handleSubmit}>
					<fieldset>
					 	<legend>Регистрация</legend>
					 	<span id='error' style={{color: 'red'}} >{this.state.error}</span>
							<input type='text' name='name' placeholder='Ваше имя' autoFocus maxLength='30' />
							<input type='text' name='login' placeholder='Логин' required onChange={this.onChangeState} />
							<input type='password' name="password" placeholder='Пароль' required onChange={this.onChangeState} />
							<input type='password' name='passwordRepeat' placeholder='Повторите пароль' onChange={this.onChangeState} />
							<input type='submit' name='submit' value='Зарегистрироваться' />
					</fieldset>
				</form>
			</section>
		);
	}
}