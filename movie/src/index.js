import React from 'react'
import ReactDOM from 'react-dom'

import { BrowserRouter } from 'react-router-dom'

import App from './module_js/app.js'

import Style from './style/style.css'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render((
	<BrowserRouter>
		<App />
	</BrowserRouter>
), document.getElementById('root'));

registerServiceWorker();
