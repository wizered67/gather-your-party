import React, { Component } from 'react';
import { STITCH_CLIENT } from "../App";
import { Link } from 'react-router-dom';
import { Stitch, UserPasswordCredential } from "mongodb-stitch-browser-sdk";
export class Layout extends Component {
  render() {
      return(
         <div>
            <Header />
               { this.props.children }
            <Footer />
         </div>
      );
  }
}
class Header extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: "",
      password: "",
      loggedIn: false,
      loginErrorMessage: "",
    }
  }

  componentDidMount() {
    this.updateLoggedIn();
  }

  updateLoggedIn = () => {
    this.setState({loggedIn: STITCH_CLIENT.auth.isLoggedIn});
  }

  render() {
    const loginOrOut = this.getLoginOrLogout();
      return (
          <div>
            <h1>HEADER</h1>
            {loginOrOut}
            <Link to={'./'}>Home</Link>
          </div>
        );
  }

  getLoginOrLogout = () => {
    if (!this.state.loggedIn) {
      return (
      <div>
      <p style={{color: "red"}}>{this.state.loginErrorMessage}</p>
      <form onSubmit={this.handleSubmit}>
        <label>
          E-mail:
          <input type="text" name="email" value={this.state.email} onChange={this.handleChange} />
          Password:
          <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
       <Link to={'./register'}>Register</Link>
      </div>)
    }
    return <button onClick={this.logout}>Logout</button>;
  }

  logout = () => {
    STITCH_CLIENT.auth.logout().then(() => this.updateLoggedIn());
  }

  handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    const credential = new UserPasswordCredential(email, password);
    STITCH_CLIENT
      .auth
      .loginWithCredential(credential).then(authedId => {
         console.log(`successfully logged in with id: ${authedId}`)
      }).then(() => this.loginSuccess())
      .catch(err => this.loginError(err));
  }

  loginSuccess = () => {
    this.updateLoggedIn();
    this.setState({email: "", password: "", loginErrorMessage: ""});
  }

  loginError = (err) => {
    console.error(`login error: ${err}`);
    const errorMessage = `login error: ${err}`;
    this.setState({email: "", password: "", loginErrorMessage: errorMessage});
  }
}

class Footer extends Component {
  render() {
      return (<p>Copyright 2018</p>);
  }
}

