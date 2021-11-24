import { React, useCallback } from "react";
import axios from "axios";

const {
  REACT_APP_CLIENT_ID,
  REACT_APP_CLIENT_SECRET,
  REACT_APP_COGNITO_DOMAIN,
  REACT_APP_REDIRECT_URI,
  REACT_APP_LOGIN_URI,
} = process.env;

function Start() {
  return (
    <div>
      <p>
        Hello, please login or sign up
        <a href={REACT_APP_LOGIN_URI}>Using AWS Cognito</a>
      </p>
      <p>
        <span>Assuming success: </span>
        <a href="/home">To Home</a>
      </p>
    </div>
  );
}

export default Start;
