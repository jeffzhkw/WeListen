import React from "react";

function Start() {
  return (
    <div>
      <p>Hello new user, please login or sign up</p>

      <p>
        <a href="/login">Login using AWS Cognito</a>
      </p>
      <p>
        <span>Assuming success: </span>
        <a href="/home">To Home</a>
      </p>
    </div>
  );
}

export default Start;
