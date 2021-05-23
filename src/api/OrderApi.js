import axios from 'axios';
import { authHeader } from '../helpers/header';

const BASEURL =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_PRODUCTION_API
    : process.env.REACT_APP_LOCAL_API;

//TODO: Optimize duplicate code
export const OrderApi = {
  fetchOrderData: async (orderId) => {
    try {
      return (
        await axios.get(`${BASEURL}/order/${orderId}`, {
          headers: authHeader(),
        })
      ).data.data;
    } catch (error) {
      if (error.response) {
        throw new Error(`Lỗi máy chủ. Vui lòng liên hệ quản trị viên`);
      } else {
        throw new Error(`Không có kết nối đến máy chủ`);
      }
    }
  },

  createOrder: async (restaurantId, userId, menuItem, topping) => {
    console.log(`Menu item`);
    console.log(menuItem);
    const orderItemToppings = topping.flat().map((toppingItem) => ({
      toppingItemId: toppingItem.id,
      // "name": toppingItem.name,
      quantity: 1,
      // "price": toppingItem.price,
    }));
    const data = {
      orderItem: {
        menuItemId: menuItem.id,
        // "name": menuItem.name,
        // "price": menuItem.price,
        quantity: menuItem.quantity,
        orderItemToppings: orderItemToppings,
      },
      restaurantId: restaurantId,
      customerId: userId,
    };

    try {
      return (
        await axios.post(`${BASEURL}/order`, data, { headers: authHeader() })
      ).data.data;
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
      toppingItemId: toppingItem.id,
      // "name": toppingItem.name,
      quantity: 1,
      // "price": toppingItem.price,
    }));
    const data = {
      sendItem: {
        menuItemId: menuItem.id,
        // "name": menuItem.name,
        // "price": menuItem.price,
        quantity: menuItem.quantity,
        orderItemToppings: orderItemToppings,
      },
    };
    try {
      return (
        await axios.patch(`${BASEURL}/order/${orderId}/add-new-item`, data, {
          headers: authHeader(),
        })
      ).data.data;
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
      return (
        await axios.post(
          `${BASEURL}/order/get-order-associated`,
          {
            restaurantId,
            customerId,
          },
          { headers: authHeader() }
        )
      ).data.data;
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
      return (
        await axios.patch(
          `${BASEURL}/order/${orderId}/increase-orditem-quantity`,
          { orderItemId },
          { headers: authHeader() }
        )
      ).data.data;
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
      return (
        await axios.patch(
          `${BASEURL}/order/${orderId}/reduce-orditem-quantity`,
          { orderItemId },
          { headers: authHeader() }
        )
      ).data.data;
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
      return (
        await axios.patch(
          `${BASEURL}/order/${orderId}/remove-orditem`,
          { orderItemId },
          { headers: authHeader() }
        )
      ).data.data;
    } catch (error) {
      if (error.response) {
        throw new Error(`Lỗi máy chủ. Vui lòng liên hệ quản trị viên`);
      } else {
        throw new Error(`Không có kết nối đến máy chủ`);
      }
    }
  },

  updateAddress: async (customerId, orderId, customerAddressId) => {
    try {
      return (
        await axios.patch(
          `${BASEURL}/order/${orderId}/pick-delivery-address`,
          {
            customerId,
            customerAddressId,
          },
          { headers: authHeader() }
        )
      ).data.data;
    } catch (e) {
      const response = e.response;
      if (response) {
        if (response.status === 403) {
          throw new Error(`Máy chủ từ chối thao tác`);
        }
        throw new Error(`Lỗi máy chủ. Vui lòng liên hệ quản trị viên`);
      } else {
        throw new Error(`Không có kết nối đến máy chủ`);
      }
    }
  },

  confirmOrder: async (orderId, note, paymentMethod, paypalMerchantId) => {
    try {
      const response = await axios.patch(
        `${BASEURL}/order/${orderId}/confirm-ord-checkout`,
        {
          orderId,
          note,
          paymentMethod,
          paypalMerchantId,
        },
        { headers: authHeader() }
      );
      return response.data.data;
    } catch (e) {
      const response = e.response;
      if (response) {
        if (response.status === 403) {
          throw new Error(`Máy chủ từ chối thao tác`);
        }
        throw new Error(`Lỗi máy chủ. Vui lòng liên hệ quản trị viên`);
      } else {
        throw new Error(`Không có kết nối đến máy chủ`);
      }
    }
  },
  approvePaypal: async (orderId, paypalOrderId) => {
    try {
      const response = await axios.patch(
        `${BASEURL}/order/${orderId}/approve-paypal-order`,
        { paypalOrderId },
        { headers: authHeader() }
      );
      return response.data;
    } catch (e) {
      const response = e.response;
      if (response) {
        if (response.status === 403) {
          throw new Error(`Máy chủ từ chối thao tác`);
        }
        throw new Error(`Lỗi máy chủ. Vui lòng liên hệ quản trị viên`);
      } else {
        throw new Error(`Không có kết nối đến máy chủ`);
      }
    }
  },
};
