import React from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import cx from "classnames";
import * as jsPDF from "jspdf";
import classes from "./CreateResume.module.css";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import LinearProgress from "@material-ui/core/LinearProgress";
import Button from "@material-ui/core/Button";

class CreateResume extends React.Component {
  state = {
    personalData: {
      jobTitle: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: ""
    },
    progress: 0
  };

  componentDidUpdate = () => {
    this.setProgress();
  };

  inputHandler = (event, field) => {
    this.setState({
      ...this.state,
      personalData: {
        ...this.state.personalData,
        [field]: event.target.value
      }
    });
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
    doc.save("Resume.pdf");
  };

  postData = () => {
    axios
      .post("http://192.168.100.2:3000/api/v1/resumes", {
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

  signOut = () => {
    localStorage.removeItem("token");
    this.props.history.push("/");
  };

  setProgress = () => {
    let progress = 0;
    Object.entries(this.state.personalData).forEach(([key, value]) => {
      if (value.length !== 0 && progress < 100) {
        progress = progress + 100 / Object.keys(this.state.personalData).length;
      }
    });
    if (progress !== this.state.progress) {
      this.setState({
        progress: progress
      });
    }
  };

  render() {
    console.log(this.state.progress);
    return (
      <Grid
        container
        direction="row"
        justify="space-evenly"
        alignItems="stretch"
        className={classes.container}
      >
        <Grid
          xs={6}
          item
          className={cx(classes.section, classes.controlsSection)}
        >
          <Box component="div" className={classes.progressLine}>
            <span
              className={cx(classes.progressScore, {
                [classes.secondaryColor]: this.state.progress === 100
              })}
            >
              {`${this.state.progress}%`}
            </span>
            <span className={classes.progressTitle}>Resume Completeness</span>
            <LinearProgress
              variant="determinate"
              value={this.state.progress}
              color={this.state.progress === 100 ? "secondary" : "primary"}
            />
          </Box>
          <Typography
            variant="h6"
            component="h6"
            className={classes.groupHeading}
          >
            Personal Details
          </Typography>
          <Box component="div" className={classes.formBlock}>
            <TextField
              id="jobTitle"
              required
              className={classes.textField}
              label="Job title"
              margin="normal"
              variant="outlined"
              onChange={e => this.inputHandler(e, "jobTitle")}
              value={this.state.personalData.jobTitle}
            />
            <TextField
              id="firstName"
              required
              className={classes.textField}
              label="First Name"
              margin="normal"
              variant="outlined"
              onChange={e => this.inputHandler(e, "firstName")}
              value={this.state.personalData.firstName}
            />
            <TextField
              id="lastName"
              required
              className={classes.textField}
              label="Last Name"
              margin="normal"
              variant="outlined"
              onChange={e => this.inputHandler(e, "lastName")}
              value={this.state.personalData.lastName}
            />
            <TextField
              id="email"
              required
              className={classes.textField}
              label="Email"
              margin="normal"
              variant="outlined"
              onChange={e => this.inputHandler(e, "email")}
              value={this.state.personalData.email}
            />
            <TextField
              id="phone"
              className={classes.textField}
              label="Phone"
              margin="normal"
              variant="outlined"
              onChange={e => this.inputHandler(e, "phone")}
              value={this.state.personalData.phone}
            />
          </Box>
          <Button
            onClick={this.postData}
            variant="contained"
            className={classes.postBtn}
            disabled={this.state.progress !== 100}
          >
            Post data
          </Button>
          <Button
            onClick={this.signOut}
            color="secondary"
            variant="contained"
            className={classes.signOutBtn}
          >
            Sign Out
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

export default withRouter(CreateResume);
