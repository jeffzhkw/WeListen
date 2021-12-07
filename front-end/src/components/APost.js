import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import SongThumbnail from "./Songthumbnail";

export default function APost({
  postCreator,
  postCaption,
  postDate,
  postSong,
  handlePlay,
  userInfo,
}) {
  console.log(postCreator, postCaption, postDate, postSong);
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {postCreator}
        </Typography>
        <Typography sx={{ fontSize: 10 }} color="text.secondary" gutterBottom>
          {postDate}
        </Typography>
        <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
          {postCaption}
        </Typography>
      </CardContent>
      <SongThumbnail
        youtubeID={postSong}
        handlePlay={handlePlay}
        userInfo={userInfo}
      />
    </Card>
  );
}
