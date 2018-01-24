import React, { Component } from 'react';

export default function (Comp) {
  return class WrapComp extends Component {
    constructor(props) {
      super(props);
      this.state = {  };
      this.handleChange = this.handleChange.bind(this);
    }
    handleChange(key, val) {
      this.setState({
        [key]: val
      });
    }
    render() {
      return (
        <Comp state={this.state} handleChange={this.handleChange} {...this.props}></Comp>
      );
    }
  };
};
