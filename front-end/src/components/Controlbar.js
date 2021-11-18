import React from "react";
import AudioPlayer from "./Audioplayer";

function ControlBar() {
  return (
    <div className="controlBarWrapper">
      <p>Playing: </p>
      <AudioPlayer />
    </div>
  );
}

export default ControlBar;
