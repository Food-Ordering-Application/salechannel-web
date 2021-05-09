import axios from "axios";
import {authHeader} from "../helpers/header";

const BASEURL = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PRODUCTION_API : process.env.REACT_APP_LOCAL_API;

const UserApi = {

  register: async function (phoneNumber, password) {
    try {
      const res = await axios.post(`${BASEURL}/user/customer`, {phoneNumber, password});
      return res.data.data;
    } catch (error) {
      const response = error.response;
      if (response) {
        if (response.status === 409)
          throw new Error(`Tài khoản đã tồn tại`);
        throw new Error(`Lỗi máy chủ. Vui lòng liên hệ quản trị viên`);
      } else {
        throw new Error(`Không có kết nối đến máy chủ`);
      }
    }
  },

  login: async function (phoneNumber, password) {
    try {
      const res = await axios.post(`${BASEURL}/user/customer/login`, {phoneNumber, password});
      return res.data.data;
    } catch (error) {
      const response = error.response;
      if (response) {
        if (response.status === 401)
          throw new Error(`Số điện thoại hoặc mật khẩu không đúng`);
        throw new Error(`Lỗi máy chủ. Vui lòng liên hệ quản trị viên`);
      } else {
        throw new Error(`Không có kết nối đến máy chủ`);
      }
    }
  },

  requestOTP: async function (token) {
    try {
      await axios.post(`${BASEURL}/user/customer/send-otp`, {}, {headers: {"Authorization": `Bearer ${token}`}});
      return true;
    } catch (error) {
      const response = error.response;
      if (response) {
        throw new Error(`Lỗi máy chủ. Vui lòng liên hệ quản trị viên`);
      } else {
        throw new Error(`Không có kết nối đến máy chủ`);
      }
    }
  },

  submitOTP: async function (otp, token) {
    try {
      await axios.post(`${BASEURL}/user/customer/verify-otp`, {otp}, {headers: {"Authorization": `Bearer ${token}`}});
      return true;
    } catch (error) {
      const response = error.response;
      if (response) {
        if (response.status === 401)
          throw new Error(`Mã OTP không đúng`);
        throw new Error(`Lỗi máy chủ. Vui lòng liên hệ quản trị viên`);
      } else {
        throw new Error(`Không có kết nối đến máy chủ`);
      }
    }
  },

  fetchUser: async function (token, id) {
    try {
      return (await axios.get(`${BASEURL}/user/customer/${id}`, {headers: {"Authorization": `Bearer ${token}`}})).data.data.user;
    } catch (error) {
      const response = error.response;
      if (response) {
        if (response.status === 401 || response.status === 403)
          throw new Error(`Token không hợp lệ`);
        throw new Error(`Lỗi máy chủ. Vui lòng liên hệ quản trị viên`);
      } else {
        throw new Error(`Không có kết nối đến máy chủ`);
      }
    }
  },

  fetchAddress: async function (userId) {
    try {
      return (await axios.get(`${BASEURL}/user/customer/${userId}/address`, {headers: authHeader()})).data.data;
    } catch (error) {
      const response = error.response;
      if (response) {
        if (response.status === 403)
          throw new Error(`Máy chủ từ chối thao tác`);
        throw new Error(`Lỗi máy chủ. Vui lòng liên hệ quản trị viên`);
      } else {
        throw new Error(`Không có kết nối đến máy chủ`);
      }
    }
  },

  addAddress: async function (userId, address, longitude, latitude) {
    try {
      return (await axios.post(`${BASEURL}/user/customer/${userId}/address`, {
        address,
        longtitude: longitude,
        latitude
      }, {headers: authHeader()})).data.data;
    } catch (error) {
      const response = error.response;
      if (response) {
        if (response.status === 403)
          throw new Error(`Máy chủ từ chối thao tác`);
        throw new Error(`Lỗi máy chủ. Vui lòng liên hệ quản trị viên`);
      } else {
        throw new Error(`Không có kết nối đến máy chủ`);
      }
    }
  },

  deleteAddress: async function (userId, addressId) {
    try {
      return (await axios.delete(`${BASEURL}/user/customer/${userId}/address/${addressId}`, {headers: authHeader()})).data.data;
    } catch (error) {
      const response = error.response;
      if (response) {
        if (response.status === 403)
          throw new Error(`Máy chủ từ chối thao tác`);
        throw new Error(`Lỗi máy chủ. Vui lòng liên hệ quản trị viên`);
      } else {
        throw new Error(`Không có kết nối đến máy chủ`);
      }
    }
  }
}

export default UserApi