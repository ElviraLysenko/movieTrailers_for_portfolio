export default (data,  update, val, state) => {
	update({filterArray: ''});
	    let  displayedFilms = data.filter((film) => {
	    	let searchValue = '';
	    	switch(val){
			    case 'title': 
			    	searchValue = film.title.toLowerCase(); 
			    	break;
			    case 'genre':
			    	searchValue = film.genre;
			    	break;
			    default: 
			    	alert("Поиск по такому параметру отсутствует");
				}
			return searchValue.indexOf(state) !== -1;
		});
    update({filterArray: displayedFilms});
}
