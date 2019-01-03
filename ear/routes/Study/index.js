import React, { Component } from 'react';
import Header from '../../Components/Header/header.js';
import Home from '../../../visitlog/routes/Home';
class Study extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '学情实况',
    };
  }
  render() {
    return (
      <div className="bodyindex">
        <div className="main">
          <Header title={this.state.title} />
          <Home />
        </div>
      </div>
    );
  }
}

export default Study;
