import React from "react";
import { useParams, Link } from "react-router-dom";

function Profile() {
  let { username } = useParams();
  //TODO: Query Flask for profile detail.
  return (
    <div>
      <h1>Profile</h1>
      <h2>Welcome, {username}</h2>
      <Link to="/user">to /user test</Link>
    </div>
  );
}

export default Profile;
