import React from "react";
import NavBar from "../components/NavBar";
import ControlBar from "../components/ControlBar";

function Home() {
  return (
    <div className="homeWrapper">
      <NavBar />
      <h1>Home</h1>

      <ControlBar />
    </div>
  );
}

export default Home;
