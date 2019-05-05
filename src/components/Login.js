import React, { useState } from "react";
import { AUTH_TOKEN } from "../constants";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

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

const Login = props => {
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
    props.history.push("/");
  };
  const _saveUserData = token => {
    localStorage.setItem(AUTH_TOKEN, token);
  };

  return (
    <div>
      <h4 className="mv3">{login ? "Login" : "Sign Up"}</h4>
      <div className="flex flex-column">
        {!login && (
          <input
            className="pa2 input-reset ba bg-transparent w-100 mb1"
            value={name}
            onChange={e =>
              setLoginState({ ...loginState, name: e.target.value })
            }
            type="text"
            placeholder="Your name"
          />
        )}
        <input
          className="pa2 input-reset ba bg-transparent w-100 mb1"
          value={email}
          onChange={e =>
            setLoginState({ ...loginState, email: e.target.value })
          }
          type="text"
          placeholder="Your E-mail"
        />
        <input
          className="pa2 input-reset ba bg-transparent w-100 mb1"
          value={password}
          onChange={e =>
            setLoginState({ ...loginState, password: e.target.value })
          }
          type="password"
          placeholder="Choose a safe password"
        />
      </div>
      <div className="flex mt3">
        <Mutation
          mutation={login ? LOGIN_MUTATION : SIGNUP_MUTATION}
          variables={{ email, password, name }}
          onCompleted={data => _confirm(data)}
        >
          {mutation => (
            <div className="pointer mr2 button" onClick={mutation}>
              {login ? "Login" : "Create Account"}
            </div>
          )}
        </Mutation>
        <div
          className="pointer button"
          onClick={() => setLoginState({ ...loginState, login: !login })}
        >
          {login ? "Need to create an account?" : "Already have an account?"}
        </div>
      </div>
    </div>
  );
};

export default Login;
