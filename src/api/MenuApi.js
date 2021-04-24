import axios from "axios";

const BASEURL = `http://localhost:8000`;

export const MenuApi = {

  fetchMenu: async (restaurantId) =>{
    try{
      return (await axios.get(`${BASEURL}/restaurant/${restaurantId}/get-menu-information`)).data.data;
    }catch(error){
      if (error.response) {
        throw new Error(`Lỗi máy chủ. Vui lòng liên hệ quản trị viên`);
      } else {
        throw new Error(`Không có kết nối đến máy chủ`);
      }
    }
  },

  fetchTopping: async (menuItemId)=>{
    try {
      return (await axios.post(`${BASEURL}/restaurant/some-restaurant`, {menuItemId})).data.data;
    } catch (error) {
      if (error.response) {
        throw new Error(`Lỗi máy chủ. Vui lòng liên hệ quản trị viên`);
      } else {
        throw new Error(`Không có kết nối đến máy chủ`);
      }
    }
  },


};