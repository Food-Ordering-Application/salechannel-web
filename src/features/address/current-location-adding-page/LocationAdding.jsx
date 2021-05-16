import React, {useEffect, useState} from "react";
import {getAddress, getLocation} from "../../../helpers/location";
import {makeStyles} from "@material-ui/core/styles";
import TopNavigationBar from "../../common/TopNavigationBar";
import {Done} from "@material-ui/icons";
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {addAddress, addressSelector, clearAddressState} from "../AddressSlice";
import {showError} from "../../common/Snackbar/SnackbarSlice";
import {userSelector} from "../../user/UserSlice";
import GoogleMapReact from "google-map-react";
import MarkerComponent from "./components/MarkerComponent";

const GoogleMapConfig = {
  key: process.env.REACT_APP_GOOGLE_API_KEY,
  language: `vi`,
  region: `VN`,
};

const useStyles = makeStyles((theme) => ({
  topNavigator: {
    position: `fixed`,
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  }
}));

export default function LocationAdding() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const {id: userId} = useSelector(userSelector);
  const {isPending, isError, isSuccess, errorMessage} = useSelector(addressSelector);

  const [location, setLocation] = useState({lat: 49.2827291, lng: -123.1207375,});
  const [address, setAddress] = useState(``);

  const handleSubmitLocation = () => {
    const {lng: longitude, lat: latitude} = location;
    dispatch(addAddress({userId, address, longitude, latitude}));
  }

  const handleMapClick = ({lat, lng}) => {
    setAddress(``);
    setLocation({lat, lng});
    getAddress(lng, lat).then(({results}) => setAddress(results[0].formatted_address));
  }

  useEffect(() => {
    getLocation(({coords: {longitude: lng, latitude: lat}}) => setLocation({lng, lat}));
  }, [])

  useEffect(() => {
    getAddress(location.lng, location.lat).then(({results}) => setAddress(results[0].formatted_address));
  }, [location])

  useEffect(() => {
    if (isError) {
      dispatch(showError(errorMessage))
      dispatch(clearAddressState())
    }
    if (isSuccess) {
      dispatch(clearAddressState())
      history.go(-2)
    }
  }, [isError, isSuccess, dispatch])

  return (
    <>
      <TopNavigationBar label="Vị trí của bạn"
                        rightIcon={Done}
                        rightAction={handleSubmitLocation}
                        isPending={isPending}/>
      <div style={{width: `100%`, height: `100vh`}}>
        <GoogleMapReact
          bootstrapURLKeys={GoogleMapConfig}
          center={location}
          defaultZoom={15}
          onClick={handleMapClick}>
          <MarkerComponent {...location} address={address}/>
        </GoogleMapReact>
      </div>
    </>
  );
}
