import React, { Component } from 'react';
import { Auth } from 'aws-amplify';
import { Cookies } from 'react-cookie';
import Button from './Button.js';
import logo from '../logo.svg';
import cartIcon from '../images/cart-icon.png';
import './css/Header.css';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authData: Auth,
      isLoggedIn: false,
      userData: {},
      userDisplayName: ""
    };
  }

  render() {
    //const {authData, isLoggedIn, userData, userDisplayName} = this.state;
    const cookies = new Cookies();
    const userInfoString = cookies.get('userKeyPrefix') + '.' + cookies.get('userNameCode') + '.userData';
    if(cookies.get('userJwtToken') != undefined) {
      this.state.isLoggedIn = true;
      if(Auth._storage.length != 0){
        this.state.userData = JSON.parse(Auth._storage[userInfoString]);
      }
      for (let index in this.state.userData.UserAttributes){
          if(this.state.userData.UserAttributes[index].Name === 'name'){
            this.state.userDisplayName = this.state.userData.UserAttributes[index].Value;
          }
      }
    }
    return (
      <header className="App-header">
        <a href="/home">
          <div className="App-logo-container">
            <img src={logo} className="App-logo" alt="logo" /> <span>DevOpsOnlineHub</span>
          </div>
        </a>

        {this.props.page == 'login' ? '':
          <div>
            <div className="header-center">
              <div className="header-nav-left">

              </div>
              <div className="header-nav-search">
                <input className="search-input" placeholder="Search for anything" />
              </div>
            </div>
            <div className="header-right-actions">
              {this.state.isLoggedIn ? this.state.userDisplayName :
                <a href="/login">
                  <Button theme="light" size="sm" value="Sign in / Sign up" />
                </a>
              }
            </div>
            <div className="header-cart-icon">
              <img src={cartIcon} />
            </div>
          </div>
        }

      </header>
    );
  }
}

export default Header;
