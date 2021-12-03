import { React } from "react";
import { Link } from "react-router-dom";

const { REACT_APP_LOGIN_URI } = process.env;

function Start() {
  return (
    <div>
      <p>
        Hello, please login or sign up
        <Link to="/login">Here</Link>
        {/* <a href={REACT_APP_LOGIN_URI}>Using AWS Cognito</a> */}
        {/* <a href="/welcome">Using AWS Cognito</a> */}
      </p>
      <p>
        <span>Assuming success: </span>
        <a href="/home">To Home</a>
      </p>
    </div>
  );
}

export default Start;
