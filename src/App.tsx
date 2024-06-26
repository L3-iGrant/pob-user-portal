import React from 'react';
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Views from "./views";
import 'antd/dist/antd.min.css';
import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Views} />
      </Switch>
    </Router>
  );
}

export default App;
