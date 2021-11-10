import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./css/App.css";
import Home from "./containers/Home";
import Groups from "./containers/Groups";
import Song from "./containers/Song";
import Login from "./containers/Login";
import Start from "./containers/Start";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/groups">
            <Groups />
          </Route>

          <Route path="/home/:username">
            <Home />
          </Route>

          <Route path="/song">
            <Song />
          </Route>

          <Route path="/login">
            <Login />
          </Route>

          <Route path="/">
            <Start />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
