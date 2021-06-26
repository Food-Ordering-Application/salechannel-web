import axios from "axios";
import {authHeader} from "../helpers/header";

const BASEURL = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PRODUCTION_API : process.env.REACT_APP_LOCAL_API;


export async function getDriverLocation(driverId) {
  try {
    const response = await axios.get(`${BASEURL}/user/driver/${driverId}/location`, {headers: authHeader()})
    return response.data.data.location
  } catch (e) {
    console.log(e)
  }
}

export async function getDriverInfo(driverId) {
  try {
    const response = await axios.get(`${BASEURL}/user/driver/${driverId}/driver-info`, {headers: authHeader()})
    return response.data.data
  } catch (e) {
    console.log(e)
  }
}

export const DriverApi = {
  getDriverLocation,
  getDriverInfo,
}