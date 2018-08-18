import React from 'react'
import { Link } from 'react-router-dom'

export default class Err extends React.Component {
	Click(){
		this.props.update({filterArray: ''})
	}
	render(){
		return (
			<p className='additionalMessage'>
				Извините, но фильм не был найден. Поищите другой или <br/> <Link to='/' onClick={this.Click}>на Главную</Link>
			</p>
		);	
	}
}
