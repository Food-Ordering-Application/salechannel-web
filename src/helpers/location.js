import axios from "axios";

export function getLocation(onSuccess) {
  return navigator.geolocation.getCurrentPosition(
    onSuccess,
    (error) => alert(JSON.stringify(error))
  );
}

export async function getAddress(lng, lat){
  return (await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&language=vi&key=${process.env.REACT_APP_LOCAL_API}`)).data;
}