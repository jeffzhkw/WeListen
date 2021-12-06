import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
const { REACT_APP_API_URL } = process.env;

function Profile({ userInfo }) {
  let { username } = useParams();

  const loggedInUser = userInfo.username;

  const isSelf = username === loggedInUser;

  const [following, setFollowing] = useState([]); //List of username that current user is follows
  const [follower, setFollower] = useState([]); //List of username whom follows current user.
  const isFollowing = follower.includes(loggedInUser);
  //getFollows
  useEffect(() => {
    axios
      .get(`${REACT_APP_API_URL}/getFollowers?username=${username}`)
      .then((response) => {
        console.log(response.data);
        setFollowing(response.data.followings);
        setFollower(response.data.followers);
      })
      .catch((e) => {
        console.warn(e);
      });
  }, [username]);

  const handleFollow = () => {
    //TODO: need to re-render page
    axios
      .get(
        `${REACT_APP_API_URL}/follow?username=${loggedInUser}&other=${username}`
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleRemove = () => {
    axios
      .get(
        `${REACT_APP_API_URL}/unfollow?username=${loggedInUser}&other=${username}`
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //TODO: Add follow button. Check cannot follow self.
  return (
    <div>
      <h1>Profile</h1>
      {/*TODO: Check if current display user is myself */}
      {!isSelf ? (
        <>
          <h2>Profile of {username}</h2>
          {isFollowing ? (
            <>
              <p>You are following {username}</p>
              <button onClick={handleRemove}>Stop Follow</button>
            </>
          ) : (
            <button onClick={handleFollow}>Follow this guy: {username}</button>
          )}
        </>
      ) : (
        <h2>Welcome, {loggedInUser}</h2>
      )}
      <Link to="/user/zkw">To test zkw</Link>

      {isSelf ? (
        <h3>Your are following:</h3>
      ) : (
        <h3>{username} are following:</h3>
      )}
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
      {isSelf ? <h3>Who follows you</h3> : <h3>Who follows {username}</h3>}

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
