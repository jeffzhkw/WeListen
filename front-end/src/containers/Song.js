import axios from "@aws-amplify/storage/node_modules/axios";
import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AComment from "../components/AComment";

import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";

const { REACT_APP_API_URL } = process.env;

const TinyText = styled(Typography)({
  fontSize: "0.75rem",
  opacity: 0.38,
  fontWeight: 500,
  letterSpacing: 0.2,
});

function Song({ userInfo }) {
  const { songID } = useParams();
  const username = userInfo.username;
  const [writeComment, setWriteComment] = useState();
  const [songTime, setSongTime] = useState(0);

  const [songDetail, setSongDetail] = useState();
  const [totalSongTime, setTotalSongTime] = useState();
  const [songComments, setSongComments] = useState([]);

  //youtube_song_detail.
  useEffect(() => {
    axios
      .get(`${REACT_APP_API_URL}/youtubeDetail?songID=${songID}`)
      .then((response) => {
        console.log(response.data);
        setSongDetail(response.data);
        setTotalSongTime(response.data.duration);
      })
      .catch((error) => {
        console.warn(error);
      });
  }, [songID]);

  useEffect(() => {
    axios
      .get(`${REACT_APP_API_URL}/getComment?songID=${songID}`)
      .then((response) => {
        console.log(response.data.comments);
        setSongComments(response.data.comments);
      })
      .catch((error) => {
        console.warn(error);
      });
  }, [songID]);

  //TODO: getComment, Display songComment of songID

  const handleAddComment = (e) => {
    e.preventDefault();
    console.log(username, songID, writeComment, songTime);
    axios
      .post(`${REACT_APP_API_URL}/writeComment`, {
        username: username,
        songID: songID,
        timestamp: songTime,
        comments: writeComment,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.warn(error);
      });
  };

  function formatDuration(value) {
    const minute = Math.floor(value / 60);
    const secondLeft = value - minute * 60;
    return `${minute}:${secondLeft < 9 ? `0${secondLeft}` : secondLeft}`;
  }

  return (
    <div className="containerWrapper">
      {songDetail ? (
        <>
          <h1>{songDetail.video_title}</h1>
          <h2>{songDetail.artist}</h2>
        </>
      ) : (
        <></>
      )}
      <form onSubmit={handleAddComment}>
        <TextField
          id="outlined-multiline-static"
          label="Enter Your Comment!"
          multiline
          rows={4}
          value={writeComment}
          onChange={(e) => {
            setWriteComment(e.target.value);
          }}
          required
          fullWidth
        />
        <Slider
          aria-label="time-indicator"
          size="small"
          value={songTime}
          min={0}
          step={1}
          max={totalSongTime}
          onChange={(_, value) => setSongTime(value)}
        />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mt: -2,
          }}
        >
          <TinyText>{formatDuration(songTime)}</TinyText>
          <TinyText>-{formatDuration(totalSongTime - songTime)}</TinyText>
        </Box>

        <Button
          sx={{ alignSelf: "end" }}
          type="submit"
          variant="contained"
          endIcon={<SendIcon />}
        >
          Send
        </Button>
      </form>
      {/* <form onSubmit={handleAddComment}>
        <label htmlFor="comment">Write your comment</label>
        <input
          type="text"
          name="comment"
          value={writeComment}
          onChange={(e) => {
            setWriteComment(e.target.value);
          }}
          required
        ></input>

        <label htmlFor="songTime">
          Enter when(within the song, in second) you want to insert the comment
          {songTime}, totalSongTime{totalSongTime}
        </label>
        <input
          type="number"
          name="songTime"
          value={songTime}
          max={totalSongTime}
          onChange={(e) => {
            setSongTime(e.target.value);
          }}
          required
        ></input>
        <button type="submit">Leave a comment</button>
      </form> */}

      <h2>Comments of current song</h2>
      {songComments !== 0 ? (
        songComments.map((aComment, i) => {
          return (
            <AComment
              tcCreator={aComment.tcCreator}
              tcSong={aComment.tcSong}
              tcText={aComment.tcText}
              tcTimeStamp={aComment.tcTimeStamp}
            />
          );
        })
      ) : (
        <></>
      )}
    </div>
  );
}

export default Song;
