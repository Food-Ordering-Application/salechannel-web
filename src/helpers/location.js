import axios from "axios";

export function getLocation(onSuccess) {
  return navigator.geolocation.getCurrentPosition(
    onSuccess,
    (error) => alert(JSON.stringify(error))
  );
}

export async function getAddress(lng, lat) {
  try {
    const {data: {results}} = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&language=vi&key=${process.env.REACT_APP_GOOGLE_API_KEY}`);
    if (results[0])
      return results[0]?.formatted_address;
    return "Không tìm thấy địa chỉ của bạn";
  } catch (error) {
    throw new Error("Không tìm thấy địa chỉ của bạn");
  }
}