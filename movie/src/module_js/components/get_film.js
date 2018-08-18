import React from 'react'
import queryString from 'query-string'
import Comments from './comments.js'
import setCookie from '../cookie/set_cookie.js'
import Description from './description.js'
import GetByUrl from '../other/get_by_url.js'

export default ({data}, active) => {
	if(!data){ return <p>Загружаем...</p>}
	else {
		return <Film data={data} active={active}/>
	}
}

const Film = ({data}, active) => {
	let title = queryString.parse(window.location.search);
	<GetByUrl data={data} title={title} />
	return (
		<section id='film'>
		    {  	data.map((film, index) => {
		   	    if  ((active === index)||(title.title === film.title))  {
		   	      	setCookie("film", film.id, 86400, '/');
		   	       	return (
					    <section id='boxForFilmInfo' key={index}>
							<section className='basicInfo'>
								<img src={require('../../image/'+film.image)} alt='poster'/>
								<Description film={film} />
							</section>
							<video controls src={require('../../movie/'+film.movie)} />
							<Comments />
						</section>
					);	
		   	    }
			})}
		</section>
	);		
}