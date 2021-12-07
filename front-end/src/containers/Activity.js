import axios from "@aws-amplify/storage/node_modules/axios";
import { React, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import APost from "../components/APost";

const { REACT_APP_API_URL } = process.env;

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Activity({ userInfo, handlePlay }) {
  //TODO: Dynamic Web Final Project

  let query = useQuery();
  const urlSongID = query.get("urlSongID");

  /* TODO: Share songID, content, username */

  const [content, setContent] = useState();
  const [songID, setSongID] = useState();
  const [postList, setPostList] = useState([]);
  /* TODO: get Activity of username */

  useEffect(() => {
    setSongID(urlSongID);
  }, [urlSongID]);

  const handlePost = (e) => {
    e.preventDefault();
    axios
      .post(`${REACT_APP_API_URL}/postActivity`, {
        songID: songID,
        username: userInfo.username,
        content: content,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.warn(err);
      });
  };

  useEffect(() => {
    if (userInfo) {
      axios
        .get(`${REACT_APP_API_URL}/getActivity?username=${userInfo.username}`)
        .then((res) => {
          console.log(res.data);
          setPostList(res.data.posts);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [userInfo]);

  return (
    <div className="containerWrapper">
      <h1>Activity</h1>
      <h2>Share a Song</h2>
      <form onSubmit={handlePost}>
        <label htmlFor="content">
          Post your thoughts for song {urlSongID}!!!
        </label>
        <input
          type="text"
          name="content"
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
        ></input>
        <button type="submit">Post</button>
      </form>
      <h2>See what your friends post</h2>
      {postList.length !== 0 ? (
        postList.map((aPost, i) => {
          console.log(aPost);
          return (
            <APost
              postCreator={aPost.postCreator}
              postCaption={aPost.postCaption}
              postDate={aPost.postDate}
              postSong={aPost.postSong}
              handlePlay={handlePlay}
              userInfo={userInfo}
            />
          );
        })
      ) : (
        <></>
      )}
    </div>
  );
}

export default Activity;
