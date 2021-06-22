import axios from "axios";

const BASEURL = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PRODUCTION_API : process.env.REACT_APP_LOCAL_API;

async function fetchMetadata() {
  try {
    const res = await axios.get(`${BASEURL}/meta/get-metadata`);
    return res.data.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.message);
    } else {
      throw new Error(`Không có kết nối đến máy chủ`);
    }
  }
}

export const SystemApi = {
  fetchMetadata,
}