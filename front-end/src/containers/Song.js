import { React } from "react";
import { useParams } from "react-router-dom";

function Song() {
  let { songID } = useParams();
  //TODO: Query Flask for song detail.

  return (
    <div className="songWrapper">
      <p>{songID}</p>
    </div>
  );
}

export default Song;
