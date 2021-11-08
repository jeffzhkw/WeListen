import { React, useState, useEffect } from "react";
import { useLocation } from "react-router";
import NavBar from "../components/NavBar";
import ControlBar from "../components/ControlBar";
import axios from "axios";

// function useQuery() {
//   return new URLSearchParams(useLocation().search);
// }

function Song() {
  // const [title, setTitle] = useState();
  // const [artist, setArtist] = useState();
  const [audioStream, setAudioStream] = useState("");
  // const URL = `/song`;

  // let query = useQuery();

  // useEffect(() => {
  //   const artistInput = query.get("artist");
  //   const titleInput = query.get("title");
  //   if (artistInput) {
  //     setArtist(artistInput);
  //   }
  //   if (titleInput) {
  //     setTitle(titleInput);
  //   }
  // }, [query]);

  // const getStream = () => {
  //   console.log("getStream");
  //   axios
  //     .post(URL, JSON.stringify(searchValue))
  //     .then((response) => {
  //       console.log(response);
  //       setAudioStream(response);
  //     })
  //     .catch((error) => {
  //       console.warn(error);
  //     });
  // };

  return (
    <div className="songWrapper">
      <NavBar />
      <h1>Song</h1>
      <form action="/search">
        <label htmlFor="title">Song Name: </label>
        <input type="text" name="title" required></input>

        <label htmlFor="artist">Artist: </label>
        <input type="text" name="artist" required></input>

        <button type="submit">Submit</button>
      </form>

      <ControlBar audioStream={audioStream} />
    </div>
  );
}

export default Song;
