import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TabBar } from 'antd-mobile';
import { withRouter } from 'react-router-dom';

@withRouter
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