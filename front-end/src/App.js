import React, { useState, useCallback } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./css/App.css";
import Home from "./containers/Home";
import Groups from "./containers/Groups";
import Song from "./containers/Song";
import Login from "./containers/Login";
import Start from "./containers/Start";
import Profile from "./containers/Profile";
import Header from "./components/Header";
import ControlBar from "./components/Controlbar";

function App() {
  const [currTitle, setCurrTitle] = useState();
  const [currArtist, setCurrArtist] = useState();
  const [currStream, setCurrStream] = useState();

  const handlePlay = useCallback((e) => {
    console.log(e.target);
  }, []);
  return (
    <div className="App">
      <Header />
      <div className="Content">
        <Router>
          <Switch>
            <Route path="/groups">
              <Groups />
            </Route>

            <Route path="/home">
              <Home />
            </Route>

            <Route path="/song">
              <Song handlePlay={handlePlay} />
            </Route>

            <Route path="/login">
              <Login />
            </Route>

            <Route path="/:username">
              <Profile />
            </Route>

            <Route path="/">
              <Start />
            </Route>
          </Switch>
        </Router>
      </div>
      <ControlBar />
    </div>
  );
}

export default App;
