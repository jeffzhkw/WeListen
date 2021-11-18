import React from "react";

function Header() {
  const username = "a-temp-user";
  return (
    <div className="headerWrapper">
      <div className="title">
        <h1>WeListen</h1>
      </div>
      <div className="navBar">
        <h2>
          <a href="\home">Home</a>
        </h2>
        <h2>
          <a href="\groups">Groups</a>
        </h2>
        <h2>
          <a href="\song">Song</a>
        </h2>
      </div>
      <div className="userDetail">
        <h2>
          <a href={username}>{username}</a>
        </h2>
        <h2>
          <a href="\start">Log out</a>
        </h2>
      </div>
    </div>
  );
}

export default Header;
