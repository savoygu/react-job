import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, WhiteSpace, WingBlank } from 'antd-mobile';

class UserCard extends Component {
  render() {
    return (
      <WingBlank>
        <WhiteSpace></WhiteSpace>
        {
          this.props.userlist.map(v => (
            v.avatar ? <Card key={v._id}>
              <Card.Header
                title={v.user}
                thumb={require(`../img/${v.avatar}.png`)}
                extra={<span>{v.title}</span>}
              >
              </Card.Header>
              <Card.Body>
                {v.type === 'boss' ? <div>公司：{v.company}</div> : null}
                {
                  v.desc ? v.desc.split('\n').map((v, i) => (
                    <div key={i}>{v}</div>
                  )) : null
                }
                {v.type === 'boss' ? <div>薪资：{v.money}</div> : null}
              </Card.Body>
            </Card> : null
          ))
        }
      </WingBlank>
    );
  }
  static propTypes = {
    userlist: PropTypes.array.isRequired
  }
}

export default UserCard;
