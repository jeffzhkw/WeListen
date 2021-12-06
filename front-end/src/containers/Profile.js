import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

import CheckIcon from "@mui/icons-material/Check";
import ToggleButton from "@mui/material/ToggleButton";
import SongThumbnail from "../components/Songthumbnail";

const { REACT_APP_API_URL } = process.env;

function Profile({ userInfo, handlePlay }) {
  let { username } = useParams();

  const loggedInUser = userInfo.username;
  const isSelf = username === loggedInUser;

  const [following, setFollowing] = useState([]); //List of username that current user is follows
  const [follower, setFollower] = useState([]); //List of username whom follows current user.
  const isFollowing = follower.includes(loggedInUser);
  const [selected, setSelected] = useState(false);

  const [favoriates, setFavoriates] = useState([]);

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

  useEffect(() => {
    axios
      .get(`${REACT_APP_API_URL}/getFavorites?username=${username}`)
      .then((response) => {
        setFavoriates(response.data.favorite_songs);
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
    <div className="containerWrapper">
      <h1>Profile</h1>
      {!isSelf ? (
        <>
          <h2>Profile of {username}</h2>
          <ToggleButton
            value="check"
            selected={selected}
            onChange={() => {
              setSelected(!selected);
            }}
          >
            Test UI:
            {selected ? <p>Stop Follow</p> : <p>Follow this guy: {username}</p>}
          </ToggleButton>
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
      {following.length !== 0 ? (
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
      {follower.length !== 0 ? (
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

      {isSelf ? <h2>Your Favoriate</h2> : <h2>{username} Favoriate</h2>}
      {console.log(favoriates)}
      {favoriates.length !== 0 ? (
        favoriates.map((aSongID, i) => {
          console.log(aSongID);
          return (
            <SongThumbnail
              youtubeID={aSongID}
              handlePlay={handlePlay}
              userInfo={userInfo}
            />
          );
        })
      ) : (
        <p>No Favoriate</p>
      )}
    </div>
  );
}

export default Profile;
