import React, { Component } from 'react';
import Button from './Button.js';
import logo from '../logo.svg';
import './css/Footer.css';

class Footer extends Component {
  render() {
    return (
      <header className="App-header">
        <div className="App-logo-container">
          <img src={logo} className="App-logo" alt="logo" /> <span>DevOpsOnlineHub</span>
        </div>
        <div className="header-right-actions">
          @ copyrights, 2019
        </div>
      </header>
    );
  }
}

export default Footer;
