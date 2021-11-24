import React from "react";

function Profile({ userInfo }) {
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
