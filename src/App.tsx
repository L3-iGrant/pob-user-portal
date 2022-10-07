import React from 'react';
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Views from "./views";
import './App.css';
import 'antd/dist/antd.min.css';
import "../src/styles/reduction.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" component={Views} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
