import axios from "axios";

const BASEURL = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PRODUCTION_API : process.env.REACT_APP_LOCAL_API;

export const MenuApi = {

  fetchMenu: async (restaurantId) => {
    try {
      return (await axios.get(`${BASEURL}/restaurant/${restaurantId}/get-menu-information`)).data.data;
    } catch (error) {
      if (error.response) {
        throw new Error(`Lỗi máy chủ. Vui lòng liên hệ quản trị viên`);
      } else {
        throw new Error(`Không có kết nối đến máy chủ`);
      }
    }
  },

  fetchTopping: async (menuItemId) => {
    try {
      return (await axios.post(`${BASEURL}/restaurant/get-menu-item-topping-info`, {menuItemId})).data.data;
    } catch (error) {
      if (error.response) {
        throw new Error(`Lỗi máy chủ. Vui lòng liên hệ quản trị viên`);
      } else {
        throw new Error(`Không có kết nối đến máy chủ`);
      }
    }
  },


};