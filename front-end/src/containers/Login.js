import React from "react";

function Login() {
  //handle events
  //https://reactjs.org/docs/handling-events.html
  return (
    <div className="loginPage">
      <p>This is the landing page with login</p>
      <p>TODO: Authentication</p>
      <form>
        <label htmlFor="username">username</label>
        <input type="text" name="username"></input>
        <br></br>
        <label htmlFor="password">password</label>
        <input type="text" name="password"></input>
        <br></br>
        <button type="submit">Submit</button>
      </form>
      <a href="/home">Assuming success: To Home</a>
    </div>
  );
}

export default Login;
