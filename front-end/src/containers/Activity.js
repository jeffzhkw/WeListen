import axios from "@aws-amplify/storage/node_modules/axios";
import { React, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const { REACT_APP_API_URL } = process.env;

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Activity({ userInfo }) {
  //TODO: Dynamic Web Final Project

  let query = useQuery();
  const urlSongID = query.get("urlSongID");

  /* TODO: Share songID, content, username */
  const username = userInfo.username;
  const [content, setContent] = useState();
  const [songID, setSongID] = useState();

  useEffect(() => {
    setSongID(urlSongID);
  }, [urlSongID]);

  const handlePost = (e) => {
    e.preventDefault();
    axios
      .post(`${REACT_APP_API_URL}/postActivity`, {
        songID: songID,
        username: username,
        content: content,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.warn(err);
      });
  };

  /* TODO: get Activity of username */
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    axios
      .get(`${REACT_APP_API_URL}/getActivity`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
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
      {postList.map((aPost, i) => {
        return aPost;
      })}
    </div>
  );
}

export default Activity;
