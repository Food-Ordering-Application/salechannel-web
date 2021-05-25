import axios from "axios";
import {authHeader, getUserId} from "../helpers/header";

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

  requestOTP: async function (phoneNumber, recaptchaToken) {
    try {
      await axios.post(`${BASEURL}/user/customer/send-otp`, {
        phoneNumber,
        recaptchaToken,
      }, {headers: authHeader()});
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

  fetchUser: async function (id) {
    try {
      return (await axios.get(`${BASEURL}/user/customer/${id}`, {headers: authHeader()})).data.data;
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

  updateUser: async function (name, avatar, email, gender) {
    try {
      const response = await axios.patch(`${BASEURL}/user/customer/${getUserId()}/update-info`,
        {name, avatar, email, gender},
        {headers: authHeader()});
      return response.data;
    } catch (error) {
      const response = error.response;
      if (response) {
        if (response.status === 403)
          throw new Error(`Token không hợp lệ`);
        if (response.status === 409)
          throw new Error(`Trùng email với tài khoản khác`);
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
  },

  resetPasswordRequest: async function (email) {
    try {
      return (await axios.post(`${BASEURL}/user/customer/reset-password`,
        {email}
      )).data;
    } catch (error) {
      const response = error.response;
      if (response) {
        throw new Error(`Email không tồn tại`);
      } else {
        throw new Error(`Không có kết nối đến máy chủ`);
      }
    }
  },

  resetPasswordVerify: async function (resetToken) {
    try {
      return (await axios.get(`${BASEURL}/user/customer/reset-password/${resetToken}`)).data.data;
    } catch (error) {
      const response = error.response;
      console.log(response);
      if (response) {
        if (response.status === 404)
          throw new Error(`Yêu cầu đổi mật khẩu hết hạn hoặc không hợp lệ`);
        throw new Error(`Lỗi máy chủ. Vui lòng liên hệ quản trị viên`);
      } else {
        throw new Error(`Không có kết nối đến máy chủ`);
      }
    }
  },

  submitNewPassword: async function (customerId, password, resetToken) {
    try {
      return (await axios.patch(`${BASEURL}/user/customer/new-password`,
        {customerId, password, resetToken}
      )).data;
    } catch (error) {
      const response = error.response;
      if (response) {
        throw new Error(`Lỗi máy chủ. Vui lòng liên hệ quản trị viên`);
      } else {
        throw new Error(`Không có kết nối đến máy chủ`);
      }
    }
  },

  verifyEmail: async function (verifyEmailToken) {
    try {
      await axios.get(`/user/customer/verify-email/${verifyEmailToken}`, {headers: authHeader()});
      return true;
    } catch (error) {
      const response = error.response;
      if (response) {
        throw new Error(`Yêu cầu xác thực hết hạn hoặc không hợp lệ`);
      } else {
        throw new Error(`Không có kết nối đến máy chủ`);
      }
    }
  }
}

export default UserApi