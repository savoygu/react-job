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
class BossInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      company: '',
      money: '',
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
      <div className="container-bossinfo">
        { redirect&&redirect!==pathname ? <Redirect to={this.props.redirectTo}></Redirect> : null}
        <NavBar mode="dark" >BOSS完善信息页面</NavBar>
        <AvatarSelector selectAvatar={imagename => {
          this.setState({
            avatar: imagename
          });
        }}></AvatarSelector>
        <InputItem onChange={v => this.handleChange('title', v)}>
          招聘职位
        </InputItem>
        <InputItem onChange={v => this.handleChange('company', v)}>
          公司名称
        </InputItem>
        <InputItem onChange={v => this.handleChange('money', v)}>
          职位薪资
        </InputItem>
        <TextareaItem
          onChange={v => this.handleChange('desc', v)}
          rows={3}
          autoHeight
          title='职位要求'
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

export default BossInfo;
