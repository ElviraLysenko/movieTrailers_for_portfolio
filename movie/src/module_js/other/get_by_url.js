import React from 'react'
import Err from './error.js'

function get(title, data){		
    const isFilm = film => film.title === title
    return data.find(isFilm)
}

export default ({title, data}) => {
	let film = get(
		title.title, data
	);
	if(!film){
		return <Err />
	}
}
