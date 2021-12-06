import { React, useState } from "react";
import SongThumbnail from "../components/Songthumbnail";
import axios from "axios";
const { REACT_APP_API_URL } = process.env;

function SearchSong({ handlePlay }) {
  const [title, setTitle] = useState();
  const [artist, setArtist] = useState();
  const [resSongID, setResSongID] = useState();

  const handleSearch = (e) => {
    e.preventDefault();
    if (title && artist) {
      axios
        .get(`${REACT_APP_API_URL}/search?title=${title}&artist=${artist}`)
        .then((response) => {
          console.log("Handled search", response);
          setResSongID(response.data.songID);
        })
        .catch((error) => {
          console.warn(error);
        });
    }
  };

  return (
    <div className="songWrapper">
      <form onSubmit={handleSearch}>
        <h1>Search</h1>

        <label htmlFor="title">Song Name: </label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          required
        ></input>

        <label htmlFor="artist">Artist: </label>
        <input
          type="text"
          name="artist"
          value={artist}
          onChange={(e) => {
            setArtist(e.target.value);
          }}
          required
        ></input>

        <button type="submit">Submit</button>
      </form>

      {/* TODO: Generate a list of result from Flask Query */}
      <div>
        {/* TODO: Switch link to use songID */}
        <SongThumbnail youtubeID={resSongID} handlePlay={handlePlay} />
      </div>
    </div>
  );
}

export default SearchSong;
