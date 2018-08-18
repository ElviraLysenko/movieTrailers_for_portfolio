import React from 'react'
import { Link } from 'react-router-dom'
import connect from '../other/connect_post.js'
import validate from '../other/validate.js'

export default class Autorization extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	error: '',
	    	login: ''
	    };
	    this.onChangeLogin = this.onChangeLogin.bind(this);
	    this.handleSubmit = this.handleSubmit.bind(this);
  	}
  	onChangeLogin(e){
  		this.setState({login: e.target.value});
  	}
	connectOnValidate(){
		let err = validate(this);
		this.setState({error: err});
		if(err === ''){	
			connect(this, 'api/login.php',  document.forms.authorization);
		}
		else {return false;}
	}
	entry(){
        let date = new Date(new Date().getTime() + 86400 * 1000);
		document.cookie = "log=" + this.state.login + "; path=/; expires=" + date.toUTCString();
	}
	handleSubmit(e) {
        e.preventDefault();
		this.connectOnValidate();
        this.entry();
    }
	render(){
		return (
			<section id='auth'>
				<form encType="multipart/form-data" name="authorization" onSubmit={this.handleSubmit}>
					<fieldset>
						<legend>Авторизация</legend>
						<span id='error' style={{color: 'red'}}>{this.state.error}</span>
							<input type='text' name='login' placeholder='Логин' autoFocus required onChange={this.onChangeLogin} />
							<input type='password' name='password' placeholder='Пароль' required />
							<input type='submit' name='submit' value='Войти' />
						<Link to='/registration'>Зарегистрироваться</Link>
					</fieldset>
				</form>
			</section>
		);
	}
}