import React, { Component } from 'react';
import { NavBar, InputItem, TextareaItem, Button } from 'antd-mobile';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import AvatarSelector from '../../component/avatar-selector/avatar-selector';
import { update } from '../../redux/user.redux';

@connect(
  state => state.user,
  { update }
)
class GeniusInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      desc: '',
      avatar: ''
    };
  }
  handleChange(key, val) {
    this.setState({
      [key]: val
    });
  }
  render() {
    const pathname = this.props.location.pathname;
    const redirect = this.props.redirectTo;
    return (
      <div className="container-geniusinfo">
        { redirect&&redirect!==pathname ? <Redirect to={this.props.redirectTo}></Redirect> : null}
        <NavBar mode="dark" >牛人完善信息页面</NavBar>
        <AvatarSelector selectAvatar={imagename => {
          this.setState({
            avatar: imagename
          });
        }}></AvatarSelector>
        <InputItem onChange={v => this.handleChange('title', v)}>
          求职岗位
        </InputItem>
        <TextareaItem
          onChange={v => this.handleChange('desc', v)}
          rows={3}
          autoHeight
          title='个人简介'
        >
        </TextareaItem>
        <Button
          onClick={() => {
            this.props.update(this.state);
          }}
          type='primary'>保存</Button>
      </div>
    );
  }
}

export default GeniusInfo;
