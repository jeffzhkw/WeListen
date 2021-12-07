import React from "react";

function AudioPlayer({ audioStream }) {
  return (
    <div className="musicPlayer">
      <audio controls src={audioStream}>
        Your browser does not support the
        <code>audio</code> element.
      </audio>
    </div>
  );
}

export default AudioPlayer;
