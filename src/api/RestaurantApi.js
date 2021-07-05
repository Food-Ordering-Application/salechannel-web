import axios from "axios";
import {authHeader} from "../helpers/header";

const BASEURL = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PRODUCTION_API : process.env.REACT_APP_LOCAL_API;

const RestaurantApi = {
  filter: async (pageIndex, rowsPerPage, area, category, name, categoryIds, sortId, position, filterIds, areaIds, cityId) => {
    try {
      return (await axios.post(`${BASEURL}/restaurant/some-restaurant`, {
        page: 1,
        size: rowsPerPage,
        area: area,
        category: category,
        search: name,
        cityId,
        categoryIds,
        sortId,
        position,
        filterIds,
        areaIds
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
      return (await axios.get(
        `${BASEURL}/restaurant/${id}`,
        {headers: authHeader()}
      )).data.data;
    } catch (error) {
      if (error.response) {
        throw new Error(`Lỗi máy chủ. Vui lòng liên hệ quản trị viên`);
      } else {
        throw new Error(`Không có kết nối đến máy chủ`);
      }
    }
  },
  setFavorite: async (restaurantId, isFavorite) => {
    try {
      return (await axios.put(
        `${BASEURL}/restaurant/${restaurantId}/favorite`,
        {isFavorite},
        {headers: authHeader()}
      )).data;
    } catch (error) {
      const response = error.response;
      if (response) {
        throw new Error(response?.message);
      } else {
        throw new Error(`Không có kết nối đến máy chủ`);
      }
    }
  },
  fetchFavorite: async (page, size) => {
    try {
      return (await axios.post(
        `${BASEURL}/restaurant/get-favorite-infos?page=${page}&size=${size}`,
        {},
        {headers: authHeader()}
      )).data.data;
    } catch (error) {
      const response = error.response;
      if (response) {
        throw new Error(response?.message);
      } else {
        throw new Error(`Không có kết nối đến máy chủ`);
      }
    }
  }
}

export default RestaurantApi;