import React, { Component } from 'react';
import './logo.css';

class Logo extends Component {
  state = {}
  render() {
    return (
      <div className="component-logo">
        <img src={require('./job.png')} alt="" />
      </div>
    );
  }
}

export default Logo;