import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Home from "./containers/Home";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/home">
            <Home />
          </Route>

          <Route path="/">
            <p>hello world from React app</p>
            <a href="/home">to Home</a>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
