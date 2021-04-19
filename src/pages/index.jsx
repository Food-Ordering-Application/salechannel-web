import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Login from "../features/user/login-page/Login";
import Home from "./Home";
import Restaurant from "./Restaurant";
import Register from "./Register";
import Account from "./Account";


export default function IndexComponent() {
  return (
    <Switch>
      <Route exact path='/'><Home/></Route>
      <Route exact path='/store'><Restaurant/></Route>
      <Route exact path='/login'><Login/></Route>
      <Route exact path='/register'><Register/></Route>
      <Route exact path='/account'><Account/></Route>
    </Switch>
  );
}