import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import registerServiceWorker from './registerServiceWorker';
import reducers from './reducers';
import './config';

import App from './app';

const store = createStore(reducers, composeWithDevTools({
	// Specify name here, actionsBlacklist, actionsCreators and other options if needed
})(
	applyMiddleware(thunk)
	));

ReactDOM.hydrate(
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>,
	document.getElementById('root'));
// ReactDOM.render(
// 	<Provider store={store}>
// 		<BrowserRouter>
// 			<App />
// 		</BrowserRouter>
// 	</Provider>,
// 	document.getElementById('root'));

registerServiceWorker();
