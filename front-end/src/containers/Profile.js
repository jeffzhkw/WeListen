import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
const { REACT_APP_API_URL } = process.env;

function Profile() {
  let { username } = useParams();
  //TODO: Query Flask for profile detail.
  const [following, setFollowing] = useState([]); //List of username that current user is follows
  const [follower, setFollower] = useState([]); //List of username whom follows current user.

  const URL = `${REACT_APP_API_URL}/getFollows?username=${username}`;

  useEffect(() => {
    axios
      .get(URL)
      .then((response) => {
        console.log(response.data);
        setFollowing(response.data.followings);
        setFollower(response.data.followers);
      })
      .catch((e) => {
        console.warn(e);
      });
  }, [username, URL]);
  return (
    <div>
      <h1>Profile</h1>
      <h2>Welcome, {username}</h2>
      <Link to="/user/zkw">zkw</Link>
      {console.log(following, follower)}
      <h3>Your are following:</h3>
      {following ? (
        following.map((aFollowing, i) => {
          return (
            <p>
              <Link to={"/user/" + aFollowing}>{aFollowing}</Link>
            </p>
          );
        })
      ) : (
        <p>No one</p>
      )}
      <h3>Who follows you</h3>
      {follower ? (
        follower.map((aFollower, i) => {
          return (
            <p>
              <Link to={"/user/" + aFollower}>{aFollower}</Link>
            </p>
          );
        })
      ) : (
        <p>No one</p>
      )}
    </div>
  );
}

export default Profile;
