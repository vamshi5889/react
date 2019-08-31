import React, {Component} from 'react';
import { Redirect } from 'react-router';
import { FormGroup, FormControl } from 'react-bootstrap';
import { Auth } from 'aws-amplify';
import { Cookies } from 'react-cookie';
import Header from '../general/Header.js';
import Button from '../general/Button.js';
import './Login.css';

class Login extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      email: '',
      password: '',
      isLoggedIn: false
    };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = async event => {
    event.preventDefault();
    try {
      await Auth.signIn(this.state.email, this.state.password);
      console.log(Auth);
      const cookies = new Cookies();
      cookies.set('userNameCode', Auth.user.username, { path: '/' });
      cookies.set('userKeyPrefix', Auth.user.keyPrefix, { path: '/' });
      cookies.set('userJwtToken', Auth.user.signInUserSession.accessToken.jwtToken, { path: '/' });
      console.log(cookies.get('userJwtToken'));
      if(Auth.user.signInUserSession.accessToken.jwtToken != "") {
        this.setState({
          isLoggedIn: true
        });
      }
    } catch (e) {
      alert(e.message);
    }
  }

  render() {
    const {isLoggedIn} = this.state;
    if (isLoggedIn) {
        return <Redirect to="/home" />
    }

    return (
      <div>
        <Header page="login" />
        <div className="login-main-section">
          <div className="login-container">
            <form onSubmit={this.handleSubmit}>
              <FormGroup controlId="email">
                <FormControl
                  placeholder="Email"
                  autoFocus
                  type="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <br />
              <FormGroup controlId="password">
                <FormControl
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.handleChange}
                  type="password"
                />
              </FormGroup>
              <br />&nbsp;
              <Button
                theme="dark" size="lg"
                disabled={!this.validateForm()}
                type="submit"
                value="Login"
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
