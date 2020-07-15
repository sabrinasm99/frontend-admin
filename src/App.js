import React from "react";
import "./App.css";
import "./assets/main.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./page/Dashboard";
import Login from "./page/Login";
import Privat from "./components/Privat";
import { Provider } from "react-redux";
import EditDelete from "./page/EditDelete";
import Add from "./page/Add";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Privat path="/dashboard" component={Dashboard} />
          <Privat path="/edit-delete" component={EditDelete} />
          <Privat path="/add" component={Add} />
          <Route path="/" exact component={Login} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
