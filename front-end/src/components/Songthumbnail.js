import React from "react";

function SongThumbnail({ title, artist, album, stream, handlePlay }) {
  return (
    <div className="square">
      <h3>{title}</h3>
      <h4>{artist}</h4>
      <img src={album} alt="the album cover"></img>
      <p>
        <a href={"/song/" + title}>To Song detail page</a>
      </p>
      <button
        onClick={() => {
          handlePlay(title, artist, stream);
        }}
      >
        Play
      </button>
    </div>
  );
}

export default SongThumbnail;
