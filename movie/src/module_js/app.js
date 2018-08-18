import React from 'react'
import { Route,  Switch } from 'react-router-dom'

import Menu from './components/menu.js'
import Footer from './components/footer.js'
import AllFilm from './components/get_all_films.js'
import Film from './components/get_film.js'
import Login from './components/authorization.js'
import Register from './components/registration.js'


import getCookie from './cookie/get_cookie.js'
import connect from './other/connect_get.js'

export default  class App extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	active_id: '',
	    	filmsItems: '',
	    	filterArray: ''
	    };
	    this.updateData = this.updateData.bind(this);
	}
	componentDidMount(){
		connect(this, '../api/get_films.php');
	}
	updateData(config) {
    	this.setState(config);
  	}
	render(){
		let logLink = '';
		!getCookie('log') ? logLink = 'Вход' : logLink = 'Выйти';

		let films = ''; 
		const with_filter = this.state.filterArray;
		const without_filter = this.state.filmsItems;

		with_filter === '' ? (films = without_filter) : (films = with_filter)

		const Menu_component = () => <Menu data={without_filter} update={this.updateData} logLink={logLink} />;
		const All_film_component = () => <AllFilm data={films} update={this.updateData} />;
		const Film_component = () => <Film data={films} active={this.state.active_id} />;

		const Search = () => (
		  <Switch>
		   		<Route path='/search/:title?' component={All_film_component} />
				<Route path='/search/:genre?' component={All_film_component} />
		  </Switch>
		)

		return (<article className='container'>
					<Route component={Menu_component} />
					<article className='content'>
						<Switch>							
		      				<Route path='/authorization' component={Login} />
							<Route path='/registration' component={Register} />
						</Switch>
						<section id='filmsInfo'>
							<Switch>
								<Route exact path='/' component={All_film_component} />
								<Route path='/search' component={Search} />
		      					<Route path='/films/:title?' component={Film_component} />
		      				</Switch>	
						</section>
					</article>
					<Route component={Footer} />
				</article>
		);
	}
}