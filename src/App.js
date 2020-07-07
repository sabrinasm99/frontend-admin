import React from 'react';
import './App.css';
import './assets/main.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import NewDash from './page/NewDash';
import Login from './page/Login';
import Privat from "./components/Privat";
import {Provider} from 'react-redux';
import EditDelete from './page/EditDelete';
import Add from './page/Add';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <Router>
      <Switch>
        {/* <Route path='/' exact component={Home} /> */}
        {/* <Route path='/home-user' exact component={HomeUser} /> */}
        <Privat path='/dashboard' component={NewDash} />
        <Privat path='/edit-delete' component={EditDelete} />
        <Privat path='/add' component={Add} />
        {/* <Route path='/food' exact component={HomeFood} /> */}
        <Route path='/' exact component={Login} />
        {/* <Route path='/register' exact component={Register} /> */}
        {/* <Route path='/grocery' component={Grocery} /> */}
      </Switch>
    </Router>
    </Provider>
    
  );
}

export default App;
