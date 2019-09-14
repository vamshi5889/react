import React, {Component} from 'react';
import { Redirect } from 'react-router';
import { FormGroup, FormControl } from 'react-bootstrap';
import { Auth } from 'aws-amplify';
import { Cookies } from 'react-cookie';
import Header from '../general/Header.js';
import Button from '../general/Button.js';
import './Register.css';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      email: '',
      password: '',
      confirmPassword: '',
      confirmationCode: '',
      newUser: null,
      isLoggedIn: false
    };
  }

  validateForm() {
    return (
      this.state.email.length > 0 &&
      this.state.password.length > 0 &&
      this.state.password === this.state.confirmPassword
    );
  }

  validateConfirmationForm() {
    return this.state.confirmationCode.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = async event => {
    event.preventDefault();
    this.setState({ isLoading: true });
    try {
      const newUser = await Auth.signUp({
        username: this.state.email,
        password: this.state.password
      });
      this.setState({
        newUser
      });
    } catch (e) {
      alert(e.message);
    }
    this.setState({ isLoading: false });
  }

  handleConfirmationSubmit = async event => {
    event.preventDefault();
    this.setState({ isLoading: true });
    try {
      await Auth.confirmSignUp(this.state.email, this.state.confirmationCode);
      await Auth.signIn(this.state.email, this.state.password);
      //this.props.userHasAuthenticated(true);
      //this.props.history.push("/");
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
      this.setState({ isLoading: false });
    }
  }

  renderConfirmationForm() {
    return (
      <form onSubmit={this.handleConfirmationSubmit}>

        <FormGroup controlId="confirmationCode">
          <FormControl
            placeholder="Confirmation Code"
            value={this.state.confirmationCode}
            onChange={this.handleChange}
            type="tel"
          />
          <p>Please check your email for the code.</p>
        </FormGroup>

        <Button
          theme="color" size="lg"
          disabled={!this.validateConfirmationForm()}
          type="submit"
          value="Verify" />
      </form>
    );
  }

  renderForm() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="email">
            <FormControl
              placeholder="Email"
              value={this.state.email}
              onChange={this.handleChange}
              type="email"
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
          <br />
          <FormGroup controlId="confirmPassword">
            <FormControl
              placeholder="Confirm Password"
              value={this.state.confirmPassword}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <br />
          <Button
            theme="color" size="lg"
            disabled={!this.validateForm()}
            type="submit"
            value="Signup" />
          &nbsp; &nbsp;
          <a href="/login">
            <Button
              theme="dark" size="lg"
              type="button"
              value="Back to Login" />
          </a>

        </form>
      </div>
    );
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
            <div className="Signup" style={{width: '400px', margin: '50px auto'}}>
              {this.state.newUser === null
                ? this.renderForm()
                : this.renderConfirmationForm()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
