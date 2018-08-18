export default (_this, _url) => {
	fetch(_url)
		.then(  
		   	(response) => {  
		   		if (response.status !== 200) { return; }
		   		return response.json().then(data => { 
		   			let dataReverse = data.reverse();
		   			switch(_url){
		   				case '../api/get_films.php' : 
		   					_this.setState({filmsItems: dataReverse});
		   					break;
		   				case '../api/get_comment.php':
		   					_this.setState({comments: dataReverse})
		   					break;
		   				default: 
		   					break;
		   			}
				});  
			}  
		)  
		.catch((err) => {  
		  	console.log('Fetch Error :-S', err);  
		});
}

