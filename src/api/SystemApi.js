import axios from "axios";
import {authHeader} from "../helpers/header";

const BASEURL = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PRODUCTION_API : process.env.REACT_APP_LOCAL_API;

async function fetchMetadata() {
  try {
    const res = await axios.get(`${BASEURL}/meta/get-metadata`);
    return res.data.data;
  } catch (error) {
    if (error.response) {
      throw new Error("Lỗi máy chủ");
    } else {
      throw new Error(`Không có kết nối đến máy chủ`);
    }
  }
}

async function setDefaultAddress(customerID, customerAddressID) {
  try {
    const res = await axios.patch(`${BASEURL}/user/customer/${customerID}/address/${customerAddressID}/update-default-address`,
      undefined,
      {headers: authHeader()});
    return res.data.data;
  } catch (error) {
    if (error.response) {
      throw new Error("Lỗi máy chủ");
    } else {
      throw new Error(`Không có kết nối đến máy chủ`);
    }
  }
}

async function fetchDistrict() {
  try {
    const res = await axios.post(
      `${BASEURL}/geocode/get-districts`,
      {cityId: 5},
      {headers: authHeader()}
  );
    return res.data.data;
  } catch (error) {
    if (error.response) {
      throw new Error("Lỗi máy chủ");
    } else {
      throw new Error(`Không có kết nối đến máy chủ`);
    }
  }
}

export const SystemApi = {
  fetchMetadata,
  setDefaultAddress,
  fetchDistrict,
}