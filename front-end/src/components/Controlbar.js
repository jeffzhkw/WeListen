import React from "react";
import AudioPlayer from "./Audioplayer";

function ControlBar({ currTitle, currArtist, currStream }) {
  return (
    <div className="controlBarWrapper">
      <p>Playing: </p>
      <strong>{currTitle}</strong>
      <strong>{currArtist}</strong>
      <AudioPlayer audioStream={currStream} />
    </div>
  );
}

export default ControlBar;
