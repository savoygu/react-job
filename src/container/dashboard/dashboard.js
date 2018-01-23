import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavBar } from 'antd-mobile';
import {
  Switch,
  Route
} from 'react-router-dom';

import NavLinkBar from '../../component/navlink/navlink';
import Boss from '../../component/boss/boss';
import Genius from '../../component/genius/genius';
import Message from '../../component/msg/msg';
import User from '../../component/user/user';

@connect(
  state => state
)
class Dashboard extends Component {
  render() {
    const user = this.props.user;
    const { pathname } = this.props.location;
    const navList = [
      {
        path: '/boss',
        text: 'BOSS',
        icon: 'boss',
        title: 'BOSS列表',
        component: Boss,
        hide: user.type === 'genius'
      },
      {
        path: '/genius',
        text: '牛人',
        icon: 'job',
        title: '牛人列表',
        component: Genius,
        hide: user.type === 'boss'
      },
      {
        path: '/msg',
        text: '消息',
        icon: 'msg',
        title: '消息列表',
        component: Message
      },
      {
        path: '/me',
        text: '我',
        icon: 'user',
        title: '个人中心',
        component: User
      }
    ];
    return (
      <div className="container-dashboard">
        <NavBar className='fixed-header' mode='dard'>{navList.find(v => v.path === pathname).title}</NavBar>
        <div style={{marginTop: '45px'}}>
          <Switch>
            {
              navList.map(v => (
                <Route key={v.path} path={v.path} component={v.component}/>
              ))
            }
          </Switch>
        </div>
        <NavLinkBar data={navList}></NavLinkBar>
      </div>
    );
  }
}

export default Dashboard;
