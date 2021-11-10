import React from "react";
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import ControlBar from "../components/ControlBar";

function Home() {
  let { username } = useParams();

  return (
    <div className="homeWrapper">
      <NavBar />
      <h1>Home</h1>
      <h2>Welcome, {username}</h2>

      <ControlBar />
    </div>
  );
}

export default Home;
