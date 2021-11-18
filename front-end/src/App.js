import React, { useState, useCallback } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./css/App.css";
import Home from "./containers/Home";
import Groups from "./containers/Groups";
import Song from "./containers/Song";
import Login from "./containers/Login";
import Start from "./containers/Start";
import Profile from "./containers/Profile";
import Activity from "./containers/Activity";
import Header from "./components/Header";
import ControlBar from "./components/Controlbar";

function App() {
  const [currTitle, setCurrTitle] = useState();
  const [currArtist, setCurrArtist] = useState();
  const [currStream, setCurrStream] = useState();

  const handlePlay = useCallback((title, artist, stream) => {
    console.log(title, artist, stream);
    setCurrTitle(title);
    setCurrArtist(artist);
    setCurrStream(stream);
  }, []);
  return (
    <div className="App">
      <div className="Content">
        <Router>
          <Header />
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
            <Route path="/activity">
              <Activity />
            </Route>
            <Route path="/">
              <Start />
            </Route>

            <Route path="/:username">
              <Profile />
            </Route>
          </Switch>
          <ControlBar
            currTitle={currTitle}
            currArtist={currArtist}
            currStream={currStream}
          />
        </Router>
      </div>
    </div>
  );
}

export default App;
