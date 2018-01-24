import React, { Component } from 'react';
import { List, InputItem, NavBar, Icon, Grid } from 'antd-mobile';
import { connect } from 'react-redux';
import { getMsgList, sendMsg, recvMsg, readMsg } from '../../redux/chat.redux';
import { getChatId } from '../../util';
// import io from 'socket.io-client';
// const socket = io('ws://localhost:9093');

@connect(
  state => state,
  { getMsgList, sendMsg, recvMsg, readMsg }
)
class Chat extends Component {
  state = {
    text: '',
    showEmoji: false
  }
  componentDidMount() {
    if (!this.props.chat.chatmsg.length) {
     this.props.getMsgList();
     this.props.recvMsg(); 
    }
    this.fixCarousel();
  }
  componentWillUnmount() {
    const to = this.props.match.params.user;
    this.props.readMsg(to);
  }
  handleSubmit() {
    const from = this.props.user._id;
    const to = this.props.match.params.user;
    const msg = this.state.text;
    this.props.sendMsg({ from, to, msg });
    this.setState({ text: '' });
  }
  fixCarousel () {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 0);
  }
  render() {
    const userid = this.props.match.params.user;
    const users = this.props.chat.users;
    if (!users[userid]) {
      return null;
    }
    const emoji = '😀 😁 😂 🤣 😃 😄 😅 😆 😉 😊 😋 😎 😍 😘 😗 😙 😚 ☺ 🙂 🤗 🤩 🤔 🤨 😐 😑 😶 🙄 😏 😣 😥 😮 🤐 😯 😪 😫 😴 😌 😛 😜 😝 🤤 😒 😓 😔 😕 🙃 🤑 😲 ☹ 🙁 😖 😞 😟 😤 😢 😭 😦 😧 😨 😩 🤯 😬 😰 😱 😳 🤪 😵 😡 😠 🤬 😷 🤒 🤕 🤢 🤮 🤧 😇 🤠 🤡 🤥 🤫 🤭 🧐 🤓'
      .split(' ')
      .filter(v => v)
      .map(v => ({text: v}));
    const Item = List.Item;
    const chatid = getChatId(this.props.user._id, userid);
    const chatmsgs = this.props.chat.chatmsg.filter(v => v.chatid === chatid);
    return (
      <div id="chat-page" style={{paddingBottom: (this.state.showEmoji ? 234 : 50)}}>
        <NavBar
          className='fixed-header'
          mode='dark'
          icon={<Icon type='left' />}
          onLeftClick={() => {
            this.props.history.goBack();
          }}
        >
          {users[userid].name}
        </NavBar>
        {chatmsgs.map(v => {
          const avatar = require(`../img/${users[v.from].avatar}.png`);
          return v.from === userid ? (
            <List key={v._id}>
              <Item
                thumb={avatar}
              >{v.content}</Item>
            </List>
          ) : (
            <List key={v._id}>
              <Item 
                className='chat-me'
                extra={<img src={avatar} alt=''/>}
              >{v.content}</Item>
            </List>
          );
        })}
        <div className='stick-footer'>
          <List>
            <InputItem
              placeholder='请输入'
              value={this.state.text}
              onChange={v => {
                this.setState({ text: v });
              }}
              extra={
                <div>
                  <span 
                    style={{marginRight: '10px'}} role='img' aria-label='微笑'
                    onClick={() => {
                      this.setState({
                        showEmoji: !this.state.showEmoji
                      });
                      this.fixCarousel();
                    }}>😀</span>
                  <span onClick={() => this.handleSubmit()}>发送</span>
                </div>
              }
            >
            </InputItem>
          </List>
          {
            this.state.showEmoji ? <Grid 
              data={emoji}
              columnNum={9}
              carouselMaxRow={4}
              isCarousel
              onClick={(el) => {
                this.setState({
                  text: this.state.text + el.text
                });
              }}
            >
            </Grid> : null
          }
        </div>
      </div>
    );
  }
}

export default Chat;
