import axios from "axios";

const BASEURL = `http://localhost:8000`;
// const BASEURL = `http://192.168.137.1:8000`;

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
  }

}

export default UserApi