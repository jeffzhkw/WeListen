import React from "react";
import SearchSong from "../components/Searchsong";

function Home({ handlePlay, userInfo }) {
  return (
    <div className="containerWrapper">
      <h1>Home</h1>
      <SearchSong handlePlay={handlePlay} userInfo={userInfo} />
    </div>
  );
}

export default Home;
