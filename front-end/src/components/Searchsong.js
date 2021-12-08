import { React, useState } from "react";
import SongThumbnail from "../components/Songthumbnail";
import axios from "axios";
import LoadingButton from "@mui/lab/LoadingButton";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
const { REACT_APP_API_URL } = process.env;

function SearchSong({ handlePlay, userInfo }) {
  const [title, setTitle] = useState();
  const [artist, setArtist] = useState();
  const [resSongID, setResSongID] = useState();
  const [loading, setLoading] = useState(false);

  const handleSearch = (e) => {
    setLoading(true);
    e.preventDefault();
    if (title && artist) {
      axios
        .get(`${REACT_APP_API_URL}/search?title=${title}&artist=${artist}`)
        .then((response) => {
          console.log("Handled search", response);
          setResSongID(response.data.songID);
          setLoading(false);
        })
        .catch((error) => {
          console.warn(error);
          setLoading(false);
        });
    }
  };

  return (
    <div className="songWrapper">
      <form onSubmit={handleSearch} className="searchForm">
        <h1>Search</h1>
        <TextField
          sx={{ margin: "20px auto" }}
          fullWidth
          label="Song Name: "
          id="fullWidth"
          type="text"
          name="title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          required
        />
        <TextField
          sx={{ margin: "20px auto" }}
          fullWidth
          label="Artist"
          id="fullWidth"
          type="text"
          name="artist"
          value={artist}
          onChange={(e) => {
            setArtist(e.target.value);
          }}
          required
        />

        <LoadingButton
          sx={{ alignItems: "flex-end" }}
          type="submit"
          endIcon={<SendIcon />}
          loading={loading}
          loadingPosition="end"
          variant="contained"
        >
          Search
        </LoadingButton>
      </form>

      <div className="searchResult">
        {resSongID ? (
          <SongThumbnail
            youtubeID={resSongID}
            handlePlay={handlePlay}
            userInfo={userInfo}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default SearchSong;
