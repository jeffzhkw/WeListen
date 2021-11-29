import React, { useState, useCallback } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./css/App.css";
import Home from "./containers/Home";
import Groups from "./containers/Groups";

import Login from "./containers/Login";
import Start from "./containers/Start";
import Profile from "./containers/Profile";
import Activity from "./containers/Activity";
import Header from "./components/Header";
import ControlBar from "./components/Controlbar";
import Song from "./containers/Song";

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

  const handleUserInfo = useCallback((userInfo) => {
    console.log(userInfo);
    setIsLoggedIn(true);
    setUserInfo(userInfo);
  }, []);

  return (
    <div className="App">
      {console.log(isLoggedIn)}
      <Router>
        <Header userInfo={userInfo} />
        <>
          <Switch>
            <Route path="/home">
              <Home handlePlay={handlePlay} />
            </Route>

            <Route path="/groups">
              <Groups />
            </Route>

            <Route path="/activity">
              <Activity />
            </Route>

            <Route path="/cognito_redirect">
              <Login handleUserInfo={handleUserInfo} />
            </Route>

            <Route path="/profile">
              <Switch>
                <Route path="/profile/:username">
                  <Profile />
                </Route>
              </Switch>
            </Route>

            <Route path="/song">
              <Switch>
                <Route path="/song/:songID">
                  <Song />
                </Route>
              </Switch>
            </Route>
            <Route path="/">
              <Start />
            </Route>
          </Switch>
        </>
        <ControlBar currPlaying={currPlaying} />
      </Router>
      {/* <Authenticator>
        {/* https://ui.docs.amplify.aws/components/authenticator */}
      {/* https://docs.amplify.aws/lib/auth/emailpassword/q/platform/js/ */}
      {({ signOut, user }) => (
        <main>
          <h1>Hello {user.username}</h1>
          <button onClick={signOut}>Sign out</button>
        </main>
      )}
    </div>
  );
}

export default App;
