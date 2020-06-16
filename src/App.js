import React from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import CreateResume from "./containers/CreateResume/CreateResume";
import Auth from "./containers/Auth/Auth";

class App extends React.Component {
  state = {
    isAuthenticated: true,
  };
  //Comment
  componentDidMount = () => {
    const token = localStorage.getItem("token");
    if (token) {
      this.setState({
        isAuthenticated: true,
      });
    }
  };

  componentDidUpdate = () => {
    const token = localStorage.getItem("token");
    if (token && !this.state.isAuthenticated) {
      this.setState({
        isAuthenticated: true,
      });
    } else if (!token && this.state.isAuthenticated) {
      this.setState({
        isAuthenticated: false,
      });
    }
  };

  render() {
    let routes = (
      <Switch>
        <Route path="/" exact render={(props) => <Auth {...props} />} />
        <Redirect to="/" />
      </Switch>
    );
    if (this.state.isAuthenticated) {
      routes = (
        <Switch>
          <Route
            path="/create"
            render={(props) => <CreateResume {...props} />}
          />
          <Redirect to="/create" />
        </Switch>
      );
    }
    return routes;
  }
}

export default withRouter(App);
