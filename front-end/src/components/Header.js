import React from "react";
import { Link } from "react-router-dom";

function Header() {
  const username = "a-temp-user";
  return (
    <div className="headerWrapper">
      <div className="title">
        <h1>WeListen</h1>
      </div>
      <div className="navBar">
        <h2>
          <Link to="/home">Home</Link>
        </h2>
        <h2>
          <Link to="/groups">Groups</Link>
        </h2>
        <h2>
          <Link to="/song">Song</Link>
        </h2>
        <h2>
          <Link to="/activity">Activity</Link>
        </h2>
      </div>
      <div className="userDetail">
        <h2>
          <Link to={"/profile/" + username}>{username}</Link>
        </h2>
        <h2>
          <a href="\start">Log out</a>
        </h2>
      </div>
    </div>
  );
}

export default Header;
