import React from 'react';
import { withRouter } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import classes from './Auth.module.css';

class Auth extends React.Component {
  state = {
    email: '',
    password: '',
    loginSuccess: false
  };

  inputHandler = (event, field) => {
    this.setState({
      [field]: event.target.value
    });
  };

  login = () => {
    axios
      .post('http://192.168.100.2:3000/authenticate', this.state)
      .then(res => {
        localStorage.setItem('token', res.data.auth_token);
        this.props.history.push('/create');
        console.log(res);
      })
      .catch(err => console.error(err));
  };

  render() {
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
              onChange={e => this.inputHandler(e, 'email')}
            />
            <TextField
              id="password"
              type="password"
              required
              label="Password"
              margin="normal"
              variant="outlined"
              onChange={e => this.inputHandler(e, 'password')}
            />
            <Button onClick={this.login} variant="contained" color="primary">
              Log In
            </Button>
          </Box>
        </Box>
      </>
    );
  }
}

export default withRouter(Auth);
