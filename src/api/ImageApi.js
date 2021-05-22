import axios from "axios";
import FormData from "form-data";

const BASE_URL = `https://api.imgbb.com/1/upload`;

export const ImageApi = {
  upload: async (image) => {
    const formData = new FormData();
    formData.append('key', process.env.REACT_APP_IMAGE_API_KEY);
    formData.append('image', image);
    try {
      const response = await axios.post(BASE_URL, formData, {headers: {'content-type': 'multipart/form-data'}});
      return response.data.data;
    } catch (e) {
      throw new Error(`Lỗi khi tải lên tập tin`);
    }
  }
}