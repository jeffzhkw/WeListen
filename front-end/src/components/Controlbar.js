import React from "react";
import AudioPlayer from "./Audioplayer";

function ControlBar({ currPlaying }) {
  return (
    <div className="controlBarWrapper">
      <p>Playing: </p>
      {currPlaying ? <strong>{currPlaying.currTitle}</strong> : <></>}
      {currPlaying ? <strong>{currPlaying.currArtist}</strong> : <></>}
      {currPlaying ? (
        <AudioPlayer audioStream={currPlaying.currStream} />
      ) : (
        <></>
      )}
    </div>
  );
}

export default ControlBar;
