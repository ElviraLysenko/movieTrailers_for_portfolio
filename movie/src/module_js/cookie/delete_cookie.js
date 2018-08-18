import setCookie from './set_cookie.js'

export default (name) => {
	setCookie(name, "", -1,  "/");
}