import React from 'react'
import { Link } from 'react-router-dom'
import Filter from '../other/filter.js'

export default class Search extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	value: ''
	    }
	    this.onChangeSearch = this.onChangeSearch.bind(this);
	    this.filterList = this.filterList.bind(this);
  	}
  	onChangeSearch(e){
  		this.setState({value: e.target.innerText});
  	}
  	filterList(){
  		Filter(this.props.data, this.props.update, 'genre', this.state.value);
  	}
    render(){
  	    return (
  	    	<ul id="genresList">
				<li onClick={()=>{this.props.update({filterArray: this.props.data})}}>
					<Link to={`/search/?genre=все жанры`}>
					Все жанры</Link>
				</li>
				{ this.props.genres.map((item, index) => 
					<li key={index} onMouseOver={this.onChangeSearch} onClick={this.filterList} >
						<Link to={`/search/?genre=${this.state.value}`}> {item} </Link>
					</li> 
				)}
			</ul> 
		);
	}
}