import React from "react";
import { useParams } from "react-router-dom";

function Profile({ userInfo }) {
  let { username } = useParams();
  if (!userInfo) {
    return;
  } else {
    return (
      <div>
        <h1>Profile</h1>
        <h2>Welcome, {userInfo.username}</h2>
      </div>
    );
  }
}

export default Profile;
