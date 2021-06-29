import axios from "axios";

const MAX_DISTANCE = 10000; //meter

export function getLocation(onSuccess, onError = () => {
  alert(`Vui lòng cấp quyền truy cập vị trí`)
}) {
  navigator.permissions.query({name: 'geolocation'}).then(function (result) {
    if (result.state === 'granted') {
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    } else if (result.state === 'prompt') {
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    } else if (result.state === 'denied') {
      onError();
    }
  });
}

export function getCurrentLocation(options) {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      resolve, ({code, message}) =>
        reject(Object.assign(new Error(message), {name: "PositionError", code})),
      options);
  });
};

export async function getAddress(lng, lat) {
  try {
    const {data: {results}} = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&language=vi&key=${process.env.REACT_APP_GOOGLE_API_KEY}`);
    if (results[0])
      return results[0]?.formatted_address;
    // throw new Error("Không tìm thấy địa chỉ của bạn");
    return '31-33 Nguyễn Trãi, Phường 2, quận 5, Thành phố Hồ Chí Minh'
  } catch (error) {
    throw new Error("Không tìm thấy địa chỉ của bạn");
  }
}

export async function getAddressV2(lng, lat) {
  try {
    const {data: {items}} = await axios.get(`https://discover.search.hereapi.com/v1/revgeocode?limit=1&apiKey=${process.env.REACT_APP_HERE_MAP_KEY}&resultType=houseNumber&at=${lat},${lng}&lang=vi`);
    if (items[0]) {
      const {address} = items[0];
      const result = [];
      if (address.houseNumber) {
        result.push(address.houseNumber);
      }
      if (address.street) {
        result.push(address.street);
      }
      if (address.district) {
        result.push(address.district);
      }
      if (address.city) {
        result.push(address.city);
      }
      if (address.county) {
        result.push(address.county);
      }
      return result.join(', ');
    }
    return "Không tìm thấy địa chỉ của bạn";
  } catch (error) {
    throw new Error("Không tìm thấy địa chỉ của bạn");
  }
}

export async function autoCompleteV2(text) {
  try {
    const response = await axios.get(`https://autocomplete.search.hereapi.com/v1/autocomplete?q=${text}&apiKey=${process.env.REACT_APP_HERE_MAP_KEY}&lang=vi`)
    return response.data
  } catch (error) {
    throw new Error("Không tìm thấy địa chỉ của bạn");
  }
}

export async function addressToLocationV2(text) {
  try {
    const response = await axios.get(`https://autocomplete.search.hereapi.com/v1/geocode?q=${text}&apiKey=${process.env.REACT_APP_HERE_MAP_KEY}&lang=vi`)
    return response.data
  } catch (error) {
    console.log(error)
  }
}

function degreeToRadian(deg) {
  return deg * (Math.PI / 180);
}

export function calculateDistance(point1, point2) {
  const R = 6371;
  const dLat = degreeToRadian(point2.latitude - point1.latitude);
  const dLon = degreeToRadian(point2.longitude - point1.longitude);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(degreeToRadian(point1.latitude)) *
    Math.cos(degreeToRadian(point2.latitude)) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c * 1000;
}

export function isAbleToDelivery(point1, point2) {
  //TODO: Check distance constraint

  // return calculateDistance(point1, point2) <= MAX_DISTANCE;
  return true;
}