import axios from "axios";
import {authHeader} from "../helpers/header";

const BASEURL = `http://localhost:8000`;

//TODO: Optimize duplicate code
export const OrderApi = {
  createOrder: async (restaurantId, userId, menuItem, topping) => {
    const orderItemToppings = topping.flat().map((toppingItem) => ({
      "menuItemToppingId": toppingItem.id,
      "quantity": 1,
      "price": toppingItem.price,
    }));
    const data = {
      "orderItem": {
        "menuItemId": menuItem.id,
        "price": menuItem.price,
        "quantity": 1,
        "orderItemToppings": orderItemToppings
      },
      "restaurantId": restaurantId,
      "customerId": userId,
    };

    try {
      return (await axios.post(`${BASEURL}/order`, data, {headers: authHeader()})).data.data.order;
    } catch (error) {
      if (error.response) {
        throw new Error(`Lỗi máy chủ. Vui lòng liên hệ quản trị viên`);
      } else {
        throw new Error(`Không có kết nối đến máy chủ`);
      }
    }
  },

  addItem: async (orderId, menuItem, topping) => {
    const orderItemToppings = topping.flat().map((toppingItem) => ({
      "menuItemToppingId": toppingItem.id,
      "quantity": 1,
      "price": toppingItem.price,
    }));
    const data = {
      "sendItem": {
        "menuItemId": menuItem.id,
        "price": menuItem.price,
        "quantity": 1,
        "orderItemToppings": orderItemToppings
      },
    };
    try {
      return (await axios.post(`${BASEURL}/order/${orderId}/add-new-item`, data, {headers: authHeader()})).data.data;
    } catch (error) {
      if (error.response) {
        throw new Error(`Lỗi máy chủ. Vui lòng liên hệ quản trị viên`);
      } else {
        throw new Error(`Không có kết nối đến máy chủ`);
      }
    }
  },

  getOrderAssociated: async (restaurantId, customerId) => {
    try {
      return (await axios.post(`${BASEURL}/order/get-order-associated`, {
        restaurantId,
        customerId
      }, {headers: authHeader()})).data.data;
    } catch (error) {
      if (error.response) {
        throw new Error(`Lỗi máy chủ. Vui lòng liên hệ quản trị viên`);
      } else {
        throw new Error(`Không có kết nối đến máy chủ`);
      }
    }
  },

  increaseQuantity: async (orderId, orderItemId) => {
    try {
      return (await axios.post(`${BASEURL}/order/${orderId}/increase-orditem-quantity`, {orderItemId}, {headers: authHeader()})).data.data;
    } catch (error) {
      if (error.response) {
        throw new Error(`Lỗi máy chủ. Vui lòng liên hệ quản trị viên`);
      } else {
        throw new Error(`Không có kết nối đến máy chủ`);
      }
    }
  },

  decreaseQuantity: async (orderId, orderItemId) => {
    try {
      return (await axios.post(`${BASEURL}/order/${orderId}/reduce-orditem-quantity`, {orderItemId}, {headers: authHeader()})).data.data;
    } catch (error) {
      if (error.response) {
        throw new Error(`Lỗi máy chủ. Vui lòng liên hệ quản trị viên`);
      } else {
        throw new Error(`Không có kết nối đến máy chủ`);
      }
    }
  },

  removeItem: async (orderId, orderItemId) => {
    try {
      return (await axios.post(`${BASEURL}/order/${orderId}/remove-orditem`, {orderItemId}, {headers: authHeader()})).data.data;
    } catch (error) {
      if (error.response) {
        throw new Error(`Lỗi máy chủ. Vui lòng liên hệ quản trị viên`);
      } else {
        throw new Error(`Không có kết nối đến máy chủ`);
      }
    }
  },
}