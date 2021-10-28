import React from "react";

function Login() {
  //handle events
  //https://reactjs.org/docs/handling-events.html
  function changeWord() {}
  return (
    <div className="loginPage">
      <p>hello world from React app.</p>
      <p>This is the landing page with login</p>
      <a href="/home">to Home</a>
      <form onSubmit={(e) => changeWord()}>
        <input type="text" />
        <input type="button" value="submit" />
      </form>
    </div>
  );
}

export default Login;
