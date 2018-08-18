import React from 'react'
import { Link } from 'react-router-dom'
import Err from '../other/error.js'

export default class allFilm extends React.Component {
	render(){
		let data = this.props.data;
		let update = this.props.update;
		if(!data){return <p className='additionalMessage'>Загружаем...</p>}
		if(data.length !== 0){
			return <AllFilm data={data} update={update}/>
		}
		else { return <Err /> }
	}
}

class AllFilm extends React.Component {
	render(){
		return (
			<ul className='filmsList'>
				{this.props.data.map((film, index) => {
					return (
					    <li key={index} className='filmsItem'  
					   	onClick={() => {this.props.update({ active_id: index })}}>
					   		<Link to={`/films/?title=${film.title}`}>
						   		<img src={require('../../image/'+film.image)} title={film.title} alt='poster'/>
						   	</Link>
						</li> 
					);
				})}
			</ul>
		);
	}
}