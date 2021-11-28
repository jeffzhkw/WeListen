import { React } from "react";

const { REACT_APP_LOGIN_URI } = process.env;

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
