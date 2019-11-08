import React from "react";
import { withRouter } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import axios from "axios";
import classes from "./Auth.module.css";

class Auth extends React.Component {
  state = {
    email: "",
    password: "",
    userName: "",
    passwordConfirmation: "",
    loginSuccess: false,
    signUp: false,
    loadError: false
  };

  inputHandler = (event, field) => {
    this.setState({
      [field]: event.target.value
    });
  };

  signIn = () => {
    axios
      .post("http://192.168.100.2:3000/authenticate", this.state)
      .then(res => {
        localStorage.setItem("token", res.data.auth_token);
        this.props.history.push("/create");
        console.log(res);
      })
      .catch(err => {
        this.setState({ loadError: true });
        console.error(err);
      });
  };

  signUp = () => {
    this.setState({
      signUp: true
    });
  };

  createAccount = () => {
    axios
      .post("http://192.168.100.2:3000/user/create", {
        ...this.state,
        username: this.state.userName,
        password_confirmation: this.state.passwordConfirmation
      })
      .then(res => {
        localStorage.setItem("token", "zdarova");
        this.props.history.push("/create");
      })
      .catch(err => {
        this.setState({ loadError: true });
        console.error(err);
      });
  };

  render() {
    const errorMessage = this.state.loadError ? (
      <Box className={classes.errorMessage} component="div">
        This is an error message!
      </Box>
    ) : null;
    const signUpFields = this.state.signUp ? (
      <>
        <TextField
          id="passwordConfirmation"
          type="password"
          required
          label="Password Confirmation"
          margin="normal"
          variant="outlined"
          onChange={e => this.inputHandler(e, "passwordConfirmation")}
        />
        <TextField
          id="username"
          required
          label="User Name"
          margin="normal"
          variant="outlined"
          onChange={e => this.inputHandler(e, "userName")}
        />
        <Button
          onClick={this.createAccount}
          variant="contained"
          color="secondary"
          className={classes.signBtn}
        >
          Create Account
        </Button>
      </>
    ) : null;
    return (
      <>
        <Box component="div" className={classes.container}>
          <Box component="div" className={classes.form}>
            <TextField
              id="email"
              required
              label="Email"
              margin="normal"
              variant="outlined"
              onChange={e => this.inputHandler(e, "email")}
            />
            <TextField
              id="password"
              type="password"
              required
              label="Password"
              margin="normal"
              variant="outlined"
              onChange={e => this.inputHandler(e, "password")}
            />
            {!this.state.signUp && (
              <>
                <Button
                  onClick={this.signIn}
                  variant="contained"
                  color="primary"
                  className={classes.signBtn}
                >
                  Sign In
                </Button>
                <Button
                  onClick={this.signUp}
                  variant="contained"
                  color="secondary"
                  className={classes.signBtn}
                >
                  Sign Up
                </Button>
              </>
            )}
            {signUpFields}
            {errorMessage}
          </Box>
        </Box>
      </>
    );
  }
}

export default withRouter(Auth);
