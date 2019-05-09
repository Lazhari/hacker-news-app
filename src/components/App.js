import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { createStyles, withStyles } from "@material-ui/core/styles";
import Header from "./Header";
import Search from "./Search";
import Login from "./Login";
import LinkList from "./LinkList";
import CreateLink from "./CreateLink";
import Notifications from "react-notify-toast";

function App({ classes }) {
  return (
    <div>
      <Header />
      <main className={classes.root}>
        <Notifications />
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/new/1" />} />
          <Route exact path="/create" component={CreateLink} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/search" component={Search} />
          <Route exact path="/top" component={LinkList} />
          <Route exact path="/new/:page" component={LinkList} />
        </Switch>
      </main>
    </div>
  );
}

const styles = ({ spacing }) =>
  createStyles({
    root: {
      paddingTop: spacing.unit * 3
    }
  });

export default withStyles(styles)(App);
