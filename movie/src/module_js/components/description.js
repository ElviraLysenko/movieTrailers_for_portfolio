import React from 'react'
import rate_img from '../../image/details/starForRate.png'

export default ({film}) => {
	return (
		<section className='descriptionFilm'>
			<h2>{film.title}</h2>
			<Rate rate={film.rate}/>
			<ul>
				<li><span>Год выпуска:</span> {film.year}</li>
				<li><span>Страна:</span> {film.country}</li>
				<li><span>Жанр:</span> {film.genre}</li>
				<li><span>Режиссер:</span> {film.director}</li>
				<li><span>Актеры:</span> <span id='actors'>{film.actors}</span></li>
			</ul>
			<h3>Описание</h3>
			<p>{film.description}</p>
		</section>
	);
}

class Rate extends React.Component {
	render(){
		const rateNum = this.props.rate;
		const rateKolStar = [];
		for (let i = 0; i<rateNum; i++){
			rateKolStar[i]=<img key={i} src={rate_img} alt='rate'/>;
		}
		return (
			<p id='rate'>
				{rateKolStar}
			</p>
		);
	}
}