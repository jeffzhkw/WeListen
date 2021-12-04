import { React, useState, useMemo } from "react";
import SongThumbnail from "../components/Songthumbnail";
import axios from "axios";
const { REACT_APP_API_URL } = process.env;

function SearchSong({ handlePlay }) {
  const [title, setTitle] = useState();
  const [artist, setArtist] = useState();
  const [resTitle, setResTitle] = useState();
  const [resArtist, setResArtist] = useState();
  const [audioStream, setAudioStream] = useState();

  const URL = `${REACT_APP_API_URL}/search?title=${title}&artist=${artist}`;

  const { audioData } = useMemo(() => {
    if (!audioStream) return { audioData: "" };
    else {
      return {
        audioData: audioStream,
      };
    }
  }, [audioStream]);

  const handleSearch = (e) => {
    console.log("Handled");
    e.preventDefault();
    if (title && artist) {
      axios
        .get(URL)
        .then((response) => {
          console.log(response);
          setAudioStream(response.data.audio_stream);
          setResArtist(response.data.artist);
          setResTitle(response.data.title);
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
        <SongThumbnail
          title={resTitle}
          artist={resArtist}
          stream={audioData}
          handlePlay={handlePlay}
        />
      </div>
    </div>
  );
}

export default SearchSong;
