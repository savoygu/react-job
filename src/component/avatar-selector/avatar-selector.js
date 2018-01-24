import React, { Component } from 'react';
import { Grid, List} from 'antd-mobile';
import PropTypes from 'prop-types';

class AvatarSelector extends Component {
  state = {}
  render() {
    const avatarList = 'boy,girl,man,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra'
      .split(',')
      .map(v => ({
        icon: require(`../img/${v}.png`),
        text: v
      }));
    const gridHeader = this.state.text ?
      (
        <div>
          <span>已选择头像：</span>
          <img style={{width: 20}} src={this.state.icon} alt=""/>
        </div>
      ) : <div>请选择头像</div>;
    return (
      <div className='component-avatar-selector'>
        <List renderHeader={() => gridHeader}>
          <Grid 
            data={avatarList} 
            columnNum={5}
            onClick={elm=> {
              this.setState(elm);
              this.props.selectAvatar(elm.text);
            }}
          />
        </List>
      </div>
    );
  }
  static propTypes = {
    selectAvatar: PropTypes.func.isRequired
  }
}

export default AvatarSelector;
