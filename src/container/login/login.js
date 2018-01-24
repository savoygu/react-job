import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile';

import Logo from '../../component/logo/logo';
import { login, emptyMsg } from '../../redux/user.redux';
import Form from '../../component/form/form';

@connect(
  state => state.user,
  { login, emptyMsg }
)
@Form
class Login extends Component {
  constructor(props) {
    super(props);
    this.register = this.register.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }
  register() {
    this.props.emptyMsg();
    this.props.history.push('/register');
  }
  handleLogin() {
    this.props.login(this.props.state);
  }
  render() {
    const {redirectTo, msg} = this.props;
    return (
      <div className='container-login'>
        {redirectTo&&redirectTo!=='/login' ? <Redirect to={redirectTo}></Redirect> : null}
        <Logo></Logo>
        <WingBlank>
          <List>
            {msg ? <p className='error-msg'>{msg}</p> : null}
            <InputItem
              onChange={v => this.props.handleChange('user', v)}
            >用户名</InputItem>
            <WhiteSpace />
            <InputItem
              type='password'
              onChange={v => this.props.handleChange('pwd', v)}
            >密码</InputItem>
          </List>
          <WhiteSpace />
          <Button type='primary' onClick={this.handleLogin}>登录</Button>
          <WhiteSpace />
          <Button onClick={this.register} type='primary'>注册</Button>
        </WingBlank>
      </div>
    );
  }
}

export default Login;
