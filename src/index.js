import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';

import './index.css';
import registerServiceWorker from './registerServiceWorker';
import reducers from './reducers';
import './config';

import Login from './container/login/login';
import Register from './container/register/register';
import AuthRoute from './component/authroute/authroute';
import BossInfo from './container/bossinfo/bossinfo';
import GeniusInfo from './container/geniusinfo/geniusinfo';
import Dashboard from './container/dashboard/dashboard';

const store = createStore(reducers, composeWithDevTools({
	// Specify name here, actionsBlacklist, actionsCreators and other options if needed
})(
	applyMiddleware(thunk)
	));

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<div>
				<AuthRoute></AuthRoute>
				<Switch>
					<Route path='/bossinfo' component={BossInfo}></Route>
					<Route path='/geniusinfo' component={GeniusInfo}></Route>
					<Route path='/login' component={Login}></Route>
					<Route path='/register' component={Register}></Route>
					<Route component={Dashboard}></Route>
				</Switch>
			</div>
		</Router>
	</Provider>,
	document.getElementById('root'));

registerServiceWorker();
