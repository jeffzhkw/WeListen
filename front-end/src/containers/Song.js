import React from "react";
import NavBar from "../components/NavBar";
import ControlBar from "../components/ControlBar";

function Song() {
  return (
    <div className="songWrapper">
      <NavBar />
      <h1>Song</h1>
      <p> search a song </p>
      <form method="POST">
        <label htmlFor="songname">Songname</label>
        <input type="text" name="songname" id="songname" required></input>
        <label htmlFor="author">Author</label>
        <input name="author" required></input>
        <button type="submit">Search</button>
      </form>
      <ControlBar />
    </div>
  );
}

export default Song;
