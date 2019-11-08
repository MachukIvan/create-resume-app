import React from 'react';
import axios from 'axios';
import cx from 'classnames';
import * as jsPDF from 'jspdf';
import classes from './CreateResume.module.css';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';

class CreateResume extends React.Component {
  state = {
    personalData: {
      jobTitle: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: ''
    },
    progress: 0
  };

  // componentDidMount() {
  //   axios
  //     .get('http://192.168.100.2:3000/api/v1/resumes/5')
  //     .then(res => {
  //       console.log(res);
  //       this.setState({
  //         ...this.state,
  //         personalData: {
  //           jobTitle: res.data.job_title,
  //           firstName: res.data.first_name,
  //           lastName: res.data.last_name,
  //           email: res.data.email,
  //           phone: res.data.phone
  //         }
  //       });
  //     })
  //     .catch(err => console.error(err));
  // }

  inputHandler = (event, field) => {
    this.setState({
      ...this.state,
      personalData: {
        ...this.state.personalData,
        [field]: event.target.value
      }
    });
  };

  setProgress = oldProgress => {
    if (oldProgress === 100) {
      return 0;
    } else {
      this.setState({
        progress: oldProgress + 20
      });
    }
  };

  downloadPDF = () => {
    const doc = new jsPDF();
    doc.text(
      `
      Job Title: ${this.state.personalData.jobTitle}
      First Name: ${this.state.personalData.firstName}
      Last Name: ${this.state.personalData.lastName}
      Email: ${this.state.personalData.email}
      Phone: ${this.state.personalData.phone}
      `,
      10,
      10
    );
    doc.save('Resume.pdf');
  };

  postData = () => {
    axios
      .post('http://192.168.100.2:3000/api/v1/resumes', {
        job_title: this.state.personalData.jobTitle,
        first_name: this.state.personalData.firstName,
        last_name: this.state.personalData.lastName,
        email: this.state.personalData.email,
        phone: this.state.personalData.phone
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => console.error(err));
  };

  render() {
    return (
      <Grid
        container
        direction="row"
        justify="space-evenly"
        alignItems="stretch"
        className={classes.container}
      >
        <LinearProgress variant="determinate" value={this.state.progress} />
        <Grid
          xs={6}
          item
          className={cx(classes.section, classes.controlsSection)}
        >
          <Typography variant="h6" component="h6">
            Personal Details
          </Typography>
          <Box className={classes.formBlock}>
            <TextField
              id="jobTitle"
              required
              className={classes.textField}
              label="Job title"
              margin="normal"
              variant="outlined"
              onChange={e => this.inputHandler(e, 'jobTitle')}
              value={this.state.personalData.jobTitle}
            />
            <TextField
              id="firstName"
              required
              className={classes.textField}
              label="First Name"
              margin="normal"
              variant="outlined"
              onChange={e => this.inputHandler(e, 'firstName')}
              value={this.state.personalData.firstName}
            />
            <TextField
              id="lastName"
              required
              className={classes.textField}
              label="Last Name"
              margin="normal"
              variant="outlined"
              onChange={e => this.inputHandler(e, 'lastName')}
              value={this.state.personalData.lastName}
            />
            <TextField
              id="email"
              required
              className={classes.textField}
              label="Email"
              margin="normal"
              variant="outlined"
              onChange={e => this.inputHandler(e, 'email')}
              value={this.state.personalData.email}
            />
            <TextField
              id="phone"
              className={classes.textField}
              label="Phone"
              margin="normal"
              variant="outlined"
              onChange={e => this.inputHandler(e, 'phone')}
              value={this.state.personalData.phone}
            />
          </Box>
          <Button onClick={this.postData} variant="contained">
            Post data
          </Button>
        </Grid>
        <Grid
          xs={6}
          item
          className={cx(classes.section, classes.resumeSection)}
        >
          <Paper className={classes.blank}>
            <Box component="div">
              {`Job title: ${this.state.personalData.jobTitle}`}
            </Box>
            <Box component="div">
              {`First name: ${this.state.personalData.firstName}`}
            </Box>
            <Box component="div">
              {`Last Name: ${this.state.personalData.lastName}`}
            </Box>
            <Box component="div">
              {`Email: ${this.state.personalData.email}`}
            </Box>
            <Box component="div">
              {`Phone: ${this.state.personalData.phone}`}
            </Box>
          </Paper>
          <Button
            variant="contained"
            color="primary"
            onClick={this.downloadPDF}
            className={classes.downloadBtn}
          >
            Download PDF
          </Button>
        </Grid>
      </Grid>
    );
  }
}

export default CreateResume;
