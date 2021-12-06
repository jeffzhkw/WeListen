import axios from "@aws-amplify/storage/node_modules/axios";
import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

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
    // <div className="square">
    //   {songDetail ? (
    //     <>
    //       <h3>{songDetail.title}</h3>
    //       <h4>{songDetail.artist}</h4>
    //       <img
    //         src={songDetail.thumbnails.default.url}
    //         alt="the album cover"
    //       ></img>
    //       <p>
    //         <Link to={"/song/" + songID}>To Song detail page</Link>
    //       </p>
    //       <p>
    //         <Link to={"/activity/?urlSongID=" + songID}>
    //           Share this Song to activity
    //         </Link>
    //       </p>
    //       <button
    //         onClick={() => {
    //           handlePlay(songDetail.songID);
    //         }}
    //       >
    //         Play
    //       </button>
    //     </>
    //   ) : (
    //     <></>
    //   )}
    // </div>

    <>
      {songDetail ? (
        <Card sx={{ maxWidth: 345 }}>
          <CardHeader
            title={songDetail.video_title}
            subheader={songDetail.artist}
          />
          <CardMedia
            component="img"
            height="194"
            image={songDetail.thumbnails.default.url}
            alt={songDetail.video_title}
          />
          <CardActions disableSpacing>
            <IconButton
              onClick={() => {
                handlePlay(songDetail.songID);
              }}
              aria-label="expand"
            >
              <PlayArrowIcon />
            </IconButton>

            <IconButton
              component={Link}
              to="/profile"
              aria-label="add to favorites"
            >
              <FavoriteIcon />
            </IconButton>
            <IconButton
              component={Link}
              to={"/activity/?urlSongID=" + songID}
              aria-label="share"
            >
              <ShareIcon />
            </IconButton>
            <IconButton
              component={Link}
              to={"/song/" + songID}
              aria-label="expand"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
        </Card>
      ) : (
        <></>
      )}
    </>
  );
}

export default SongThumbnail;
