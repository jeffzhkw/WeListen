import React, { useState } from "react";

function Login() {
  //handle events
  //https://reactjs.org/docs/handling-events.html
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Logging with", username, password);
  };

  return (
    <div className="loginPage">
      <p>This is the landing page with login</p>
      <p>TODO: Authentication</p>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">User Name</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={({ target }) => {
              setUsername(target.value);
            }}
          ></input>
        </div>
        <div>
          <label htmlFor="password">password</label>
          <input
            type="text" //TODO: Change to hidden
            name="password"
            value={password}
            onChange={({ target }) => {
              setPassword(target.value);
            }}
          ></input>
        </div>

        <button type="submit">Submit</button>
      </form>
      <a href="/home">Assuming success: To Home</a>
    </div>
  );
}

export default Login;
