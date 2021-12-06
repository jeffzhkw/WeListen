import { React, useState, useEffect } from "react";
import AudioPlayer from "./Audioplayer";
import { Link } from "react-router-dom";
import axios from "axios";

import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

const { REACT_APP_API_URL } = process.env;

function ControlBar({ currPlayingID }) {
  const [songDetail, setSongDetail] = useState();

  useEffect(() => {
    if (currPlayingID) {
      axios
        .get(`${REACT_APP_API_URL}/youtubeDetail?songID=${currPlayingID}`)
        .then((response) => {
          console.log(response.data);
          setSongDetail(response.data);
        })
        .catch((error) => {
          console.warn(error);
        });
    }
  }, [currPlayingID]);

  return (
    <footer className="controlBarWrapper">
      <p>Playing: </p>
      {songDetail ? (
        <>
          <h4>{songDetail.video_title}</h4>
          <h4>{songDetail.artist}</h4>
          <AudioPlayer audioStream={songDetail.audio_stream} />{" "}
          <p>
            <Link to={"/song/" + songDetail.songID}>To Song detail page</Link>
          </p>
          <p>
            <Link to={"/activity/?urlSongID=" + songDetail.songID}>
              Share this Song to activity
            </Link>
          </p>
        </>
      ) : (
        <></>
      )}
    </footer>
  );
}

export default ControlBar;
