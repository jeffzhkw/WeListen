import React from "react";

function NavBar() {
  return (
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
      <h2>
        <a href="\start">Log out</a>
      </h2>
    </div>
  );
}

export default NavBar;
