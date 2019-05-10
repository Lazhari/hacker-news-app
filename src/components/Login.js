import React, { useState } from "react";
import { createStyles, withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

import { AUTH_TOKEN } from "../constants";

const SIGNUP_MUTATION = gql`
  mutation SignupMutation($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
    }
  }
`;
const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

const Login = ({ history, classes }) => {
  const [loginState, setLoginState] = useState({
    login: true,
    email: "",
    password: "",
    name: ""
  });

  const { login, email, password, name } = loginState;

  const _confirm = async data => {
    const { token } = login ? data.login : data.signup;
    _saveUserData(token);
    history.push("/");
  };
  const _saveUserData = token => {
    localStorage.setItem(AUTH_TOKEN, token);
  };

  return (
    <div className={classes.root}>
      <Typography variant="h6">{login ? "Login" : "Sign Up"}</Typography>
      <Typography />
      <form className={classes.formContainer} noValidate autoComplete="off">
        <Grid container spacing={8}>
          {!login && (
            <Grid item xs={12}>
              <TextField
                label="Your name"
                variant="outlined"
                fullWidth
                value={name}
                onChange={e =>
                  setLoginState({ ...loginState, name: e.target.value })
                }
                type="text"
                placeholder="Your name"
              />
            </Grid>
          )}
          <Grid item xs={12}>
            <TextField
              label="Your E-mail"
              variant="outlined"
              fullWidth
              value={email}
              onChange={e =>
                setLoginState({ ...loginState, email: e.target.value })
              }
              type="text"
              placeholder="Your E-mail"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Choose a safe password"
              variant="outlined"
              fullWidth
              value={password}
              onChange={e =>
                setLoginState({ ...loginState, password: e.target.value })
              }
              type="password"
              placeholder="Choose a safe password"
            />
          </Grid>
          <Grid item xs={12} className={classes.actionsGrid}>
            <Mutation
              mutation={login ? LOGIN_MUTATION : SIGNUP_MUTATION}
              variables={{ email, password, name }}
              onCompleted={data => _confirm(data)}
            >
              {mutation => (
                <Button onClick={mutation} variant="outlined">
                  {login ? "Login" : "Create Account"}
                </Button>
              )}
            </Mutation>
            <Button
              onClick={() => setLoginState({ ...loginState, login: !login })}
            >
              {login
                ? "Need to create an account?"
                : "Already have an account?"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

const styles = ({ spacing }) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center"
    },
    formContainer: {
      width: "30%"
    },
    actionsGrid: {
      display: "flex",
      justifyContent: "space-between"
    },
    submitButton: {
      width: spacing.unit * 20
    }
  });

export default withStyles(styles)(Login);
