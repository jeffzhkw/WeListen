import React, { useState, useEffect, useCallback } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import "./css/App.css";

import Header from "./components/Header";
import ControlBar from "./components/Controlbar";
import NotFound from "./components/NotFound";

import Home from "./containers/Home";
import Groups from "./containers/Groups";
import Start from "./containers/Start";
import Profile from "./containers/Profile";
import Activity from "./containers/Activity";
import Song from "./containers/Song";

import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import NotAuthed from "./components/NotAuthed";
import axios from "@aws-amplify/storage/node_modules/axios";
const { REACT_APP_API_URL } = process.env;

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

  useEffect(() => {
    axios
      .post(`${REACT_APP_API_URL}/newUser`, { username: userInfo.username })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.warn(error);
      });
  }, [userInfo]);

  return (
    <div className="App">
      {console.log(isLoggedIn)}

      <Router>
        <Header
          isLoggedIn={isLoggedIn}
          userInfo={userInfo}
          setIsLoggedIn={setIsLoggedIn}
          setUserInfo={setUserInfo}
        />
        <Routes>
          <Route path="/song" element={isLoggedIn ? <Outlet /> : <NotAuthed />}>
            <Route
              path=":songID"
              element={
                isLoggedIn ? <Song userInfo={userInfo} /> : <NotAuthed />
              }
            />
            <Route path="" element={<NotFound />} />
          </Route>

          <Route path="/user" element={isLoggedIn ? <Outlet /> : <NotAuthed />}>
            <Route
              path=":username"
              element={
                isLoggedIn ? <Profile userInfo={userInfo} /> : <NotAuthed />
              }
            />
            <Route path="" element={<NotFound />} />
          </Route>

          <Route
            path="/activity"
            element={
              isLoggedIn ? <Activity userInfo={userInfo} /> : <NotAuthed />
            }
          ></Route>

          <Route
            path="/groups"
            element={isLoggedIn ? <Groups /> : <NotAuthed />}
          ></Route>

          <Route
            path="/home"
            element={
              isLoggedIn ? <Home handlePlay={handlePlay} /> : <NotAuthed />
            }
          ></Route>
          {/* TODO: Resolve second render. */}
          <Route
            path="/login"
            element={
              <Authenticator variation="modal">
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
        </Routes>
        <ControlBar currPlaying={currPlaying} />
      </Router>
    </div>
  );
}

export default App;
