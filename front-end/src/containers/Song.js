import { React } from "react";
import { useParams } from "react-router-dom";

function Song() {
  let { songID } = useParams();
  //TODO: Query Flask for song detail.

  return (
    <div className="songWrapper">
      <h1>Song</h1>
      <p>{songID}</p>
    </div>
  );
}

export default Song;
