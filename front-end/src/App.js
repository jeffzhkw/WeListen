import React, { useState, useCallback } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./css/App.css";
import Home from "./containers/Home";
import Groups from "./containers/Groups";

import Start from "./containers/Start";
import Profile from "./containers/Profile";
import Activity from "./containers/Activity";
import Header from "./components/Header";
import ControlBar from "./components/Controlbar";
import Song from "./containers/Song";

import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

function App() {
  const [currPlaying, setCurrPlaying] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  const handlePlay = useCallback((title, artist, stream) => {
    setCurrPlaying({
      currTitle: title,
      currArtist: artist,
      currStream: stream,
    });
  }, []);

  return (
    <div className="App">
      {console.log(isLoggedIn)}

      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Header
                userInfo={userInfo}
                setIsLoggedIn={setIsLoggedIn}
                setUserInfo={setUserInfo}
              />
            }
          >
            <Route path="/song">
              <Route path=":songID" element={<Song />} />
            </Route>

            <Route path="/user">
              <Route path=":username" element={<Profile />} />
            </Route>

            <Route path="/activity" element={<Activity />}></Route>

            <Route path="/groups" element={<Groups />}></Route>

            <Route
              path="/home"
              element={<Home handlePlay={handlePlay} />}
            ></Route>

            <Route
              path="/login"
              element={
                <Authenticator>
                  {({ signOut, user }) => {
                    console.log(`userInfo`, user);
                    setUserInfo(user);
                    setIsLoggedIn(true);
                    return <Navigate to="/home" />;
                  }}
                </Authenticator>
              }
            ></Route>

            <Route path="/" element={<Start />}></Route>
          </Route>
        </Routes>
      </Router>
      <ControlBar currPlaying={currPlaying} />
    </div>
  );
}

export default App;
