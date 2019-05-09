import React from "react";
import { createStyles, withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import ToolBar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { Link, withRouter } from "react-router-dom";
import { AUTH_TOKEN } from "../constants";

const Header = ({ classes, history }) => {
  const authToken = localStorage.getItem(AUTH_TOKEN);
  return (
    <div>
      <AppBar position="static">
        <ToolBar>
          <Typography variant="h6" color="inherit">
            Hacker News
          </Typography>
          <nav className={classes.nav}>
            <Link to="/">new</Link>
            <Link to="/top">top</Link>
            <Link to="/search">search</Link>
            {authToken && <Link to="/create">submit</Link>}
          </nav>
          <div>
            {authToken ? (
              <Button
                variant="outlined"
                onClick={() => {
                  localStorage.removeItem(AUTH_TOKEN);
                  history.push("/");
                }}
              >
                Logout
              </Button>
            ) : (
              <Link to="/login" className={classes.link}>
                Login
              </Link>
            )}
          </div>
        </ToolBar>
      </AppBar>
    </div>
  );
};

const styles = ({ spacing }) =>
  createStyles({
    root: {},
    toolbar: {
      display: "flex"
    },
    nav: {
      flexGrow: 1,
      marginLeft: spacing.unit * 2,
      "& a": {
        marginRight: spacing.unit * 2,
        textDecoration: "none",
        color: "white",
        fontWeight: 700
      }
    },
    link: {
      marginRight: spacing.unit * 2,
      textDecoration: "none",
      color: "white",
      fontWeight: 700
    }
  });

export default withStyles(styles)(withRouter(Header));
