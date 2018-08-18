export default (name, value, expires, path, domain, secure) => {
		let date = new Date(new Date().getTime() + expires * 1000);
	    document.cookie = name + "=" + encodeURI(value) +
	    ((expires) ? "; expires=" + date.toUTCString() : "") +
	    ((path) ? "; path=" + path : "") +
	    ((domain) ? "; domain=" + domain : "") +
	    ((secure) ? "; secure" : "");
	}	