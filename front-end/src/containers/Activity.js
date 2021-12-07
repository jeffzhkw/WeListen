import axios from "@aws-amplify/storage/node_modules/axios";
import { React, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import APost from "../components/APost";
import { Form, Input, Button } from "antd";
const { Search } = Input;

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

  const handlePost = () => {
    axios
      .post(`${REACT_APP_API_URL}/postActivity`, {
        songID: songID,
        username: userInfo.username,
        content: content,
      })
      .then((res) => {
        console.log('returndata',res);
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

  const formItemLayout = {
    labelCol: { span: 1 },
    wrapperCol: { span: 6 },
  };
  return (
    <div className="containerWrapper groupsClass">
      <div className="groupitem">
        <h1 style={{marginBottom:'20px'}}>Activity</h1>
        <div className='divsize'>Share a Song</div>
        <div className='divsize' style={{marginBottom:'20px'}}>Post your thoughts for song {urlSongID}!!!</div>
        <Form name="control-ref" {...formItemLayout} size="middle">
          <Form.Item label="post:">
            <Search
              allowClear
              enterButton="SEND"
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
              }}
              size="large"
              onSearch={handlePost}
            />
          </Form.Item>
        </Form>
        {/* <form onSubmit={handlePost}>
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
        </form> */}
        <div className='divsize'>See what your friends post</div>
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
    </div>
  );
}

export default Activity;
