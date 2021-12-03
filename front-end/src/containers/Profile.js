import React from "react";
import { useParams } from "react-router-dom";

function Profile() {
  let { username } = useParams();
  //TODO: Query Flask for profile detail.
  return (
    <div>
      <h1>Profile</h1>
      <h2>Welcome, {username}</h2>
    </div>
  );
}

export default Profile;
