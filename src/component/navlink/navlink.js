import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TabBar } from 'antd-mobile';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

@withRouter
@connect(
  state => state.chat
)
class NavLink extends Component {
  state = {  }
  render() {
    const navList = this.props.data.filter(v => !v.hide);
    const {pathname} = this.props.location;
    return (
      <TabBar>
        {
          navList.map(v => (
            <TabBar.Item
              badge={v.path === '/msg' ? this.props.unread : 0}
              key={v.path}
              title={v.text}
              icon={{uri: require(`./img/${v.icon}.png`)}}
              selectedIcon={{uri: require(`./img/${v.icon}-active.png`)}}
              selected={v.path === pathname}
              onPress={() => {
                this.props.history.push(v.path);
              }}
            >
            </TabBar.Item>
          ))
        }
      </TabBar>
    );
  }
  static propTypes = {
    data: PropTypes.array.isRequired
  }
}

export default NavLink; 
