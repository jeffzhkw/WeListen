import React from "react";

function Start() {
  return (
    <div>
      <p>Hello new user, please login or sign up</p>

      <p>
        <a href="https://welisten.auth.us-east-1.amazoncognito.com/login?response_type=code&client_id=hmahe8t4gg805bqsk90uvb58d&redirect_uri=http://localhost:5000/cognito_redirect">
          Login using AWS Cognito
        </a>
      </p>
      <p>
        <span>Assuming success: </span>
        <a href="/home">To Home</a>
      </p>
    </div>
  );
}

export default Start;
