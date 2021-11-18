import React from "react";

function SongThumbnail({ title, artist, album, stream, handlePlay }) {
  return (
    <div className="square">
      <h3>{title}</h3>
      <h4>{artist}</h4>
      <img src={album}></img>
      <button onClick={handlePlay}>Play</button>
    </div>
  );
}

export default SongThumbnail;
