import { React } from "react";
import { Link } from "react-router-dom";

function Start() {
  return (
    <div className="containerWrapper">
      <div className="libig">
        <div className="welcomeTitle">
          <h1>Music, </h1>
          <h1>now with your friends.</h1>
        </div>

        {/* <a href={REACT_APP_LOGIN_URI}>Using AWS Cognito</a> */}
        {/* <a href="/welcome">Using AWS Cognito</a> */}
      </div>
      <div className="libig">
        <Link to="/login" className="bigclass">
          Get Start
        </Link>
      </div>
    </div>
  );
}

export default Start;
