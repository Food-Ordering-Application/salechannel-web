import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Login from "../features/user/login-page/Login";
import Register from "../features/user/register-page/Register";
import Home from "./Home";
import Restaurant from "./Restaurant";
import Account from "./Account";
import Notifications from "../features/notification/notification-page/Notification";


export default function IndexComponent() {
  return (
    <Switch>
      <Route exact path='/'><Home/></Route>
      <Route exact path='/store'><Restaurant/></Route>
      <Route exact path='/login'><Login/></Route>
      <Route exact path='/register'><Register/></Route>
      <Route exact path='/account'><Account/></Route>
      <Route exact path='/notifications'><Notifications/></Route>
    </Switch>
  );
}