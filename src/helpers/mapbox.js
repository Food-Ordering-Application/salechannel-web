import axios from "axios";
import {getCurrentLocation} from "./location";

const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

mapboxgl.accessToken = `${process.env.REACT_APP_MAP_BOX_KEY}`;

const getMapInstance = (elementID) => {
  return (new mapboxgl.Map({
    container: elementID,
    style: 'mapbox://styles/mapbox/streets-v11'
  }))
}

const autoComplete = async (longitude, latitude) => {
  const {coords:{latitude: lat, longitude: lon}} = await getCurrentLocation();
  console.log(lat, lon);
  // const {data: {features}} = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${process.env.REACT_APP_MAP_BOX_KEY}&country=VN&language=vi`);
  const {data: {features}} = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lon},${lat}.json?access_token=${process.env.REACT_APP_MAP_BOX_KEY}&country=VN&language=vi&types=country,region,district,place`);
  console.log(features);
  return true
}

export const MapboxAPI = {
  getMapInstance,
  autoComplete,
}