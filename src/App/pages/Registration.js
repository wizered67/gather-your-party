import React, { Component } from "react";
import { Layout } from "./Layout";
import { STITCH_CLIENT } from "../App";
import { Stitch, UserPasswordAuthProviderClient } from "mongodb-stitch-browser-sdk";
class Registration extends Component {

  constructor(props){
    super(props);
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      loggedIn: false,
      registerErrorMessage: "",
    }
  }

  render() {
    return (
      <div className="App">
      <Layout>
        <p style={{color: "red"}}>{this.state.registerErrorMessage}</p>
        <form onSubmit={this.handleSubmit}>
          <label>
            E-mail:
            <input type="text" name="email" value={this.state.email} onChange={this.handleChange} />
            Password:
            <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
            Confirm Password:
            <input type="password" name="confirmPassword" value={this.state.confirmPassword} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </Layout>
      </div>
    )
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
    const { email, password, confirmPassword } = this.state;
    if (password !== confirmPassword) {
      this.setState({registerErrorMessage: "Passwords did not match."});
      return;
    }
    // const credential = new UserPasswordCredential(email, password);
    // STITCH_CLIENT
    //   .auth
    //   .loginWithCredential(credential).then(authedId => {
    //      console.log(`successfully logged in with id: ${authedId}`)
    //   }).then(() => this.loginSuccess())
    //   .catch(err => this.loginError(err));
    const emailPassClient = Stitch.defaultAppClient.auth
      .getProviderClient(UserPasswordAuthProviderClient.factory);

    emailPassClient.registerWithEmail(email, password)
      .then(() => {
         console.log("Successfully sent account confirmation email!");
         this.props.history.push('/');
      })
      .catch(err => {
         console.log("Error registering new user:", err);
         this.registerError(err);
      });
  }

  loginSuccess = () => {
    this.updateLoggedIn();
    this.setState({email: "", password: "", loginErrorMessage: ""});
  }

  registerError = (err) => {
    if (err.message === "name already in use") {
      const emailPassClient = Stitch.defaultAppClient.auth
        .getProviderClient(UserPasswordAuthProviderClient.factory);
      emailPassClient.resendConfirmationEmail(this.state.email);
    } else {
      const errorMessage = `login error: ${err}`;
      this.setState({loginErrorMessage: errorMessage});
    }
    this.setState({email: "", password: "", confirmPassword: ""});
  }
}
export default Registration;