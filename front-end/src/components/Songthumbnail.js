import axios from "@aws-amplify/storage/node_modules/axios";
import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
const { REACT_APP_API_URL } = process.env;

function SongThumbnail({ youtubeID, handlePlay }) {
  const [songDetail, setSongDetail] = useState();
  const [songID, setSongID] = useState();

  useEffect(() => {
    setSongID(youtubeID);
    console.log();
  }, [youtubeID]);

  useEffect(() => {
    console.log(songID);
    if (songID) {
      axios
        .get(`${REACT_APP_API_URL}/youtubeDetail?songID=${songID}`)
        .then((response) => {
          console.log(response.data);
          setSongDetail(response.data);
        })
        .catch((error) => {
          console.warn(error);
        });
    }
  }, [songID]);

  return (
    <div className="square">
      {songDetail ? (
        <>
          <h3>{songDetail.title}</h3>
          <h4>{songDetail.artist}</h4>
          <img
            src={songDetail.thumbnails.default.url}
            alt="the album cover"
          ></img>
          <p>
            <Link to={"/song/" + songID}>To Song detail page</Link>
          </p>
          <p>
            <Link to={"/activity/?urlSongID=" + songID}>
              Share this Song to activity
            </Link>
          </p>
          <button
            onClick={() => {
              handlePlay(songDetail.songID);
            }}
          >
            Play
          </button>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default SongThumbnail;
