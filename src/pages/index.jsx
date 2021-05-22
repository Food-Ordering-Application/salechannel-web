import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Login from "../features/user/login-page/Login";
import Register from "../features/user/register-page/Register";
import Home from "./Home";
import Restaurant from "../features/restaurant/restaurant-page/Restaurant";
import Account from "../features/user/account-page/Account";
import Notifications from "../features/notification/notification-page/Notification";
import Checkout from "../features/order/checkout-page/Checkout";
import Search from "../features/restaurant/search-page/Search";
import OrderStatus from "../features/order/status-page/OrderStatus";
import AddressManagement from "../features/address/address-management-page/AddressManagement";
import AddressAdding from "../features/address/address-adding-page/AddressAdding";
import LocationAdding from "../features/address/current-location-adding-page/LocationAdding";
import CouponDetails from "../features/promotion/coupon-details-page/CouponDetails";
import OrderHistory from "../features/order/order-history-page/OrderHistory";
import Coupon from "../features/promotion/coupon-page/Coupon";
import OrderHistoryDetails from "../features/order/order-history-details-page/OrderHistoryDetails";
import RestaurantInfo from "../features/restaurant/restaurant-info-page/RestaurantInfo";
import EditAccount from "../features/user/edit-account-page/EditAccount";


export default function IndexComponent() {
  return (
    <Switch>
      <Route exact path='/'><Home/></Route>
      <Route exact path='/store/:id/info'><RestaurantInfo/></Route>
      <Route exact path='/store/:id'><Restaurant/></Route>
      <Route exact path='/login'><Login/></Route>
      <Route exact path='/register'><Register/></Route>
      <Route exact path='/account/edit'><EditAccount/></Route>
      <Route exact path='/account'><Account/></Route>
      <Route exact path='/notifications'><Notifications/></Route>
      <Route exact path='/checkout/:id'><Checkout/></Route>
      <Route exact path='/search'><Search/></Route>
      <Route exact path='/order/:id'><OrderStatus/></Route>
      <Route exact path='/address'><AddressManagement/></Route>
      <Route exact path='/address/add'><AddressAdding/></Route>
      <Route exact path='/address/add/current-location'><LocationAdding/></Route>
      <Route exact path='/coupon/:id'><CouponDetails/></Route>
      <Route exact path='/coupons'><Coupon/></Route>
      <Route exact path='/orders'><OrderHistory/></Route>
      <Route exact path='/orders/history/:id'><OrderHistoryDetails/></Route>
    </Switch>
  );
}