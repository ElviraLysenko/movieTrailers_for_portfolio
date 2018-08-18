import React from 'react'

export default (date) => {
	let new_date = '';
	date !== '' ? new_date = new Date(date) : new_date = new Date();

	let month_array = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
	let month = new_date.getMonth();
	let mm = month+1;
	let m_str = month_array[month];

	let dd = new_date.getDate();
	let yyyy = new_date.getFullYear();
	let h = new_date.getHours();
	let m = new_date.getMinutes();
	let s = new_date.getSeconds();

	if(dd<10) {	dd = '0'+ dd; }
	if(mm<10) {	mm = '0'+ mm; }
	if(h<10) {	h = '0'+ h; }
	if(m<10) {	m = '0'+ m; }
	if(s<10) {	s = '0'+ s; }

	let setDateTime = yyyy + '-' + mm + '-' + dd + ' ' + h + ':' + m + ':' + s;
	let getDate = dd + ' ' + m_str + ' ' + yyyy;
	let getTime = ' | ' + h + ':' + m ;

	if(date !== ''){ 
		let today = new Date();
		today.setHours(0, 0, 0, 0);
		let yesterday = new Date(today); 
		yesterday.setDate(yesterday.getDate() - 1);
		
		if(+new_date >= +today){
			return <span>{'сегодня'+getTime}</span>
		}
		else if ((+new_date >= +yesterday) && (+new_date < +today)){
			return <span>{'вчера'+getTime}</span>
		}
		else {return <span>{getDate + getTime}</span>} 
	}
	else {return setDateTime}	
		
}