import React, { Component } from 'react';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import './css/Button.css';

class Button extends Component {
  render() {
    const {onclick, type, size, theme, disabled, value} = this.props;
    return (
        <button onClick={onclick} type={type} className={"app-btn app-btn-"+size+" app-btn-"+theme}
          disabled={disabled}>
          {value}
        </button>
    );
  }
}

export default Button;
