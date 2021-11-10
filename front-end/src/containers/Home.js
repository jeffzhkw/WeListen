import React from "react";
import { useParams } from "react-router-dom";
import NavBar from "../components/Navbar";
import ControlBar from "../components/Controlbar";

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
