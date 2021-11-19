import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Login() {
  //handle events
  //https://reactjs.org/docs/handling-events.html
  // const [username, setUsername] = useState();
  // const [password, setPassword] = useState();

  const client_id = "hmahe8t4gg805bqsk90uvb58d";
  const client_secret = "igi2a2hmk5nec5tgp62rv38onfb87nakn5qm9imh4c0vqjt3aa0";

  const { code } = useParams();
  const cognito_domain = "https://welisten.auth.us-east-1.amazoncognito.com";
  const token_url = `${cognito_domain}/oauth2/token`;

  const params = {
    grant_type: "authorization_code",
    client_id: client_id,
    code: code,
    redirect_uri: "http://localhost:3000/login",
  };

  axios
    .post(token_url, params, {
      auth: {
        username: client_id,
        password: client_secret,
      },
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.warn(error);
    });

  // const handleLogin = (e) => {
  //   e.preventDefault();
  //   console.log("Logging with", username, password);
  // };

  return (
    // <div className="loginPage">
    //   <p>This is the landing page with login</p>
    //   <p>TODO: Authentication</p>
    //   <form onSubmit={handleLogin}>
    //     <div>
    //       <label htmlFor="username">User Name</label>
    //       <input
    //         type="text"
    //         name="username"
    //         value={username}
    //         onChange={({ target }) => {
    //           setUsername(target.value);
    //         }}
    //       ></input>
    //     </div>
    //     <div>
    //       <label htmlFor="password">password</label>
    //       <input
    //         type="text" //TODO: Change to hidden
    //         name="password"
    //         value={password}
    //         onChange={({ target }) => {
    //           setPassword(target.value);
    //         }}
    //       ></input>
    //     </div>

    //     <button type="submit">Submit</button>
    //   </form>
    //   <a href="/home">Assuming success: To Home</a>
    // </div>
    <p>Login</p>
  );
}

export default Login;
