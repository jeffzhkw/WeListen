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

function SongThumbnail({ youtubeID, handlePlay, userInfo }) {
  const [songDetail, setSongDetail] = useState();
  const [songID, setSongID] = useState();
  console.log(youtubeID);

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

  const handleAddFavoriate = () => {
    axios
      .get(
        `${REACT_APP_API_URL}/addFavorites?username=${userInfo.username}&songID=${songID}`
      )
      .then((response) => {
        console.log("add Favorites: ", response.data);
      })
      .catch((e) => {
        console.warn(e);
      });
  };

  return (
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
              aria-label="play"
            >
              <PlayArrowIcon />
            </IconButton>

            <IconButton
              onClick={() => {
                handleAddFavoriate(songDetail.songID);
              }}
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
