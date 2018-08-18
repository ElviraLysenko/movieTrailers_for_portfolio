import React from 'react'
import { Link } from 'react-router-dom'
import SearchTitle from '../search/search_title.js'
import SearchGenre from '../search/search_genre.js'
import deleteCookie from '../cookie/delete_cookie.js'

const genres = ['Биография','Боевик','Вестерн','Военный','Детектив','Документальный','Драма','Исторический','Комедия','Криминал','Мелодрама','Мультфильм','Мюзикл','Приключения','Семейный','Cпортивный','Триллер','Ужас','Фантастика','Фэнтези'];

export default class Menu extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	genreList: false
	    };
  	}  	
  	changeLog(){
  		if(this.props.logLink === 'Вход'){
  			return <Link to='/authorization'>{this.props.logLink}</Link>
  		}
  		else {
  			return <Link to='/' onClick={() => {
  				deleteCookie('log');
  			}}>{this.props.logLink}</Link>
  		}
  	}
	render(){
		return ( 
			<nav>
				<ul id='menu'>
			    	<li onClick={() => 
			    		{ this.props.update({filterArray: ''})}}>
			    		<Link to="/">Главная</Link>
			    	</li>
			      	<li onClick={()=>
			        	{ this.state.genreList === false ? this.setState({ genreList: true }) : this.setState({ genreList: false })	            	
			        }}>
			      	Категории
			      		{ this.state.genreList === true ? <SearchGenre data={this.props.data}  update={this.props.update} genres={genres} /> : false }
			      	</li>
			      	<SearchTitle data={this.props.data} update={this.props.update} />
			      	<li>{this.changeLog()}</li>
			    </ul>
			</nav>
		);
	}
}