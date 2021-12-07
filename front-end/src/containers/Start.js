import { React } from "react";
import { Link } from "react-router-dom";

function Start() {
  return (
    <div className="containerWrapper">
      <div className="libig">
        <h2>Hello, please login or sign up</h2>
        <Link to="/login" className="bigclass">
        Here
        </Link>
        {/* <a href={REACT_APP_LOGIN_URI}>Using AWS Cognito</a> */}
        {/* <a href="/welcome">Using AWS Cognito</a> */}
      </div>
      <div className="libig">
        <h2>Assuming success: </h2>
        <Link to="/home" className="bigclass">
          To Home
        </Link>
      </div>
    </div>
  );
}

export default Start;
