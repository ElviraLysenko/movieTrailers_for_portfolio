import React from 'react'
import { Link } from 'react-router-dom'
import getCookie from '../cookie/get_cookie.js'
import setCookie from '../cookie/set_cookie.js'
import connect_post from '../other/connect_post.js'
import connect_get from '../other/connect_get.js'
import dateFormat from '../other/dateFormat.js'
import rate_img from '../../image/details/starForRate.png'

export default class CommentsBlock extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	comments: ''
	    };
  	}
  	componentDidMount(){
  		connect_get(this, '../api/get_comment.php');
  	}
  	reloadComments(conf){
  		this.setState(conf);
  	}
	render(){
		return (
			<section id='comments'>
				<section id='add_comment'>
					<h2>Комментарии</h2><hr/>
					{commentForm(this.state.comments, this.reloadComments.bind(this))}
				</section> 
				<section id='all_comments'>
					{commentList(this.state.comments)}
				</section>
			</section>
		);
	}	
}

const commentForm = (comments, reloadComments) => {
	if(!getCookie('log')) { 	
		return <p>Увы, чтобы оставить комментарий Вам нужно <Link to='/authorization'>авторизоваться</Link>!</p>
	}
	else {
		return <AddComment comments={comments} reloadComments={reloadComments} /> 
	}
}

const commentList = (comments) => {
	if(!comments){return <p>Загружаем...</p>}
  	if(comments.length !== 0){
		return <DisplayComments comments={comments} />
	}
	else {	return <span>Комментарии отсутствуют</span>}
}

class AddComment extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	placeholder: 'Оставьте свой комментарий',
	    	value: '',
	    	rating: 0,
	    	tmpRating: 0
	    };
	    this.onChangeComment = this.onChangeComment.bind(this);
	 	this.handleSubmit = this.handleSubmit.bind(this);
	 	this.reset = this.reset.bind(this);
  	}
  	onChangeComment(e){
  		this.setState({value: e.target.value});
  	}
  	setTemp(rating) { // при проходе над элементом указателя мыши
  		this.setState({tmpRating: rating});
	}
	setRating(rating) { // при щелчке
  		this.setState({
			tmpRating: rating,
    		rating: rating
		});
	}
	reset() { // возвращение к реальному рейтингу при уводе указателя мыши
		this.setTemp(this.state.rating);
	}
	sendData(){
       	let time = dateFormat('');
       	setCookie("comment_sending_date", time, 60, '/');
	}
	setComment(){
		connect_post(this, '../api/set_comment.php', document.forms.addComment);
	}
	newCommentsAdd(){
		let comments = this.props.comments;
		let comment = this.state.value;
		let userName = getCookie('log');
		let rating = this.state.rating;
		let date = getCookie('comment_sending_date'); 
		let commentNew= [{userName: userName, date: date, rate: rating, comment: comment}];
		let newComments = commentNew.concat(comments);
    	this.props.reloadComments({comments: newComments})
	}
	handleSubmit(e) {
       	e.preventDefault();
		this.sendData();
		if(this.state.value === '' && this.state.rating === 0){
			this.setState({placeholder: 'Пожалуйста, заполните это поле'});
			return false;
		}
		else {
			this.setComment();
        	this.setState({value: ''}); this.setRating(0);
		}
		this.newCommentsAdd();
    }
	render(){
		const stars = [];
	  	for (let i = 1; i <= 5; i++) {
	   		stars.push(
	   		    <span 
	   		    	className={i <= this.state.tmpRating ? 'RatingOn' : null}  
	   		    	key={i} 
	   		    	onClick={this.setRating.bind(this,i)}
	       			onMouseOver={this.setTemp.bind(this,i)}
	      		> &#9733;</span>
	       	);
	  	}
		return (
			<form encType="multipart/form-data" name="addComment" onSubmit={this.handleSubmit}>
				<section className='rating' onMouseOut={this.reset}> {stars} 
		    		<input type='text' name='rate' value={this.state.rating} readOnly/><em>stars</em>
				</section>
				<textarea name='comment' onChange={this.onChangeComment} placeholder={this.state.placeholder} value={this.state.value}/>
				<input type='submit' name='submit' value='Отправить' />
			</form>
		);

	}
}

class DisplayComments extends React.Component {
	render(){
		return (
			<ul id='comments_all'>
				{this.props.comments.map((comment, index) => {
					return (
						<li key={index} className='comment'>
							<span>{comment.userName}</span>
							{dateFormat(comment.date)}
							{getRate(comment.rate)}
							<p>{comment.comment}</p>
						</li> 
					);
				})}
			</ul>
		);
	}
}

function getRate(rateNum) {
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