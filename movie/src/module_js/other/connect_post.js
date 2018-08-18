let form_data = {};

export default (_this, _url, _form) => {
	form_data = new FormData(_form);
	fetch(_url, {  method: "POST",  body: form_data	})
		.then(  
		   	(response) => {  
		   		if (response.status !== 200) { return; }
		   		return response.json().then(data => {  
		   			if(data!=='') { 
		   				_this.setState({error: data});
		   			}
		   			else {
		   				switch(_url){
		   					case 'api/register.php' : 
		   						_this.props.history.push('/authorization');
		   						break;
		   					case 'api/login.php':
		   						_this.props.history.push('/');
		   						break;
		   					default: 
		   						break;
		   				}
		   			}
				});  
			}  
		)  
		.catch((err) => {  
		  	console.log('Fetch Error :-S', err);  
		});
}


