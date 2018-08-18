import React from 'react'
import { Link } from 'react-router-dom'
import search_img from '../../image/details/search.png'
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
    	this.setState({value: e.target.value.toLowerCase()});
  	}
  	filterList(e){
  		Filter(this.props.data, this.props.update, 'title', this.state.value);
  	}
    render(){
  	    return (
		  	<li id='search'>
				<Link to={`/search/?title=${this.state.value}`} ><img src={search_img} title='найти' alt='Поиск' onClick={this.filterList} /></Link>
				<input 
					value={this.state.value}
					type='search' 
					placeholder='Поиск по названию...'
					onChange={this.onChangeSearch}
				/>
			</li>	
		);
	}
}