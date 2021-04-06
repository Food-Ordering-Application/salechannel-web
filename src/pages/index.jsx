import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Login from "./Login";
import Home from "./Home";
import Restaurant from "./Restaurant";


export default function IndexComponent() {
  return (
    <Switch>
      <Route exact path='/'><Home/></Route>
      <Route exact path='/store'><Restaurant/></Route>
      <Route exact path='/login'><Login/></Route>
    </Switch>
  );
}