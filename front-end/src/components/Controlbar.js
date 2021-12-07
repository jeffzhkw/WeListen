import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import IconButton from "@mui/material/IconButton";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import ReactJkMusicPlayer from "react-jinke-music-player";
import "react-jinke-music-player/assets/index.css";

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
      {/* {songDetail ? (
        <>
          <p>{songDetail.video_title}</p>
          <p>{songDetail.artist}</p>
          <AudioPlayer audioStream={songDetail.audio_stream} />{" "}
          <IconButton
            component={Link}
            to={"/activity/?urlSongID=" + songDetail.songID}
            aria-label="share"
          >
            <ShareIcon />
          </IconButton>
          <IconButton
            component={Link}
            to={"/song/" + songDetail.songID}
            aria-label="expand"
          >
            <ExpandMoreIcon />
          </IconButton>
        </>
      ) : (
        <></>
      )} */}
      {songDetail ? (
        <>
          <ReactJkMusicPlayer
            audioLists={[
              {
                name: songDetail.video_title,
                cover: songDetail.thumbnails.default.url,
                musicSrc: songDetail.audio_stream,
                singer: songDetail.artist,
                duration: songDetail.duration,
              },
            ]}
            defaultPosition={{ bottom: "0" }}
            mode="full"
          />
          <IconButton
            component={Link}
            to={"/activity/?urlSongID=" + songDetail.songID}
            aria-label="share"
          >
            <ShareIcon />
          </IconButton>
          <IconButton
            component={Link}
            to={"/song/" + songDetail.songID}
            aria-label="expand"
          >
            <ExpandMoreIcon />
          </IconButton>
        </>
      ) : (
        <ReactJkMusicPlayer defaultPosition={{ bottom: "0" }} mode="full" />
      )}
      ,
    </footer>
  );
}

export default ControlBar;
