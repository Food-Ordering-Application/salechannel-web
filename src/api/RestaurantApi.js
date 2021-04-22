import axios from "axios";

const BASEURL = `http://localhost:8000`;

const RestaurantApi = {
  filter: async (pageIndex, area, category) => {
    try {
      return (await axios.post(`${BASEURL}/restaurant/some-restaurant`, {
        pageNumber: pageIndex,
        area: area,
        category: category
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