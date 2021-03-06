import axios from "axios"

const BASEURL = `http://localhost:8000`;

const CustomerService = {

  register: async function (phoneNumber, password) {
    try {
      const res = await axios.post(`${BASEURL}/customer`, {phoneNumber, password});
      return res.data.data;
    } catch (error) {
      const res = error.response;
      if (res.status === 409)
        throw new Error(`Tài khoản đã tồn tại`);
      throw new Error(`Lỗi máy chủ. Vui lòng liên hệ quản trị viên`);
    }
  },

  login: async function (phoneNumber, password) {
    try {
      const res = await axios.post(`${BASEURL}/customer/login`, {phoneNumber, password});
      return res.data.data;
    } catch (error) {
      const res = error.response;
      if (res.status === 401)
        throw new Error(`Số điện thoại hoặc mật khẩu không đúng`);
      throw new Error(`Lỗi máy chủ. Vui lòng liên hệ quản trị viên`);
    }
  },

  requestOTP: async function (token) {
    try {
      await axios.post(`${BASEURL}/customer/send-otp`, {}, {headers: {"Authorization": `Bearer ${token}`}});
      return true;
    } catch (error) {
      throw new Error(`Lỗi máy chủ. Vui lòng liên hệ quản trị viên`);
    }
  },

  submitOTP: async function (otp, token) {
    try {
      await axios.post(`${BASEURL}/customer/verify-otp`, {otp}, {headers: {"Authorization": `Bearer ${token}`}});
      return true;
    } catch (error) {
      const res = error.response;
      if (res.status === 401)
        throw new Error(`Mã OTP không đúng`);
      throw new Error(`Lỗi máy chủ. Vui lòng liên hệ quản trị viên`);
    }
  }

}

export default CustomerService;