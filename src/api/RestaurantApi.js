import axios from "axios";

const BASEURL = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PRODUCTION_API : process.env.REACT_APP_LOCAL_API;

const RestaurantApi = {
  filter: async (pageIndex, rowsPerPage, area, category, name) => {
    try {
      return (await axios.post(`${BASEURL}/restaurant/some-restaurant`, {
        page: pageIndex,
        size: rowsPerPage,
        area: area,
        category: category,
        search: name,
      })).data.data;
    } catch (error) {
      if (error.response) {
        throw new Error(`Lỗi máy chủ. Vui lòng liên hệ quản trị viên`);
      } else {
        throw new Error(`Không có kết nối đến máy chủ`);
      }
    }
  },

  fetch: async (id) => {
    try {
      return (await axios.get(`${BASEURL}/restaurant/${id}`)).data.data;
    } catch (error) {
      if (error.response) {
        throw new Error(`Lỗi máy chủ. Vui lòng liên hệ quản trị viên`);
      } else {
        throw new Error(`Không có kết nối đến máy chủ`);
      }
    }
  },
}

export default RestaurantApi;