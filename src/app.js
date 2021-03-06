import React, { Component } from 'react';
import {
	Route,
	Switch
} from 'react-router-dom';

import Login from './container/login/login';
import Register from './container/register/register';
import AuthRoute from './component/authroute/authroute';
import BossInfo from './container/bossinfo/bossinfo';
import GeniusInfo from './container/geniusinfo/geniusinfo';
import Dashboard from './container/dashboard/dashboard';
import Chat from './component/chat/chat';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			hasError: false
		};
	}
	componentDidCatch(error, info) {
		console.log(error, info);
		this.setState({
			hasError: true
		});
	}
  render() {
		return this.state.hasError 
		? <img src={require('./job.png')} alt='error' />
		: (
      <div>
				<AuthRoute></AuthRoute>
				<Switch>
					<Route path='/bossinfo' component={BossInfo}></Route>
					<Route path='/geniusinfo' component={GeniusInfo}></Route>
					<Route path='/login' component={Login}></Route>
					<Route path='/register' component={Register}></Route>
					<Route path='/chat/:user' component={Chat}/>
					<Route component={Dashboard}></Route>
				</Switch>
			</div>
    );
  }
}

export default App;