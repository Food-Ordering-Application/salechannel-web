import React, {useEffect, useState} from "react";
import {getAddress, getLocation} from "../../../helpers/location";
import {makeStyles} from "@material-ui/core/styles";

import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {userSelector} from "../../user/UserSlice";
import {addAddress, addressSelector, clearAddressState} from "../AddressSlice";
import {showError} from "../../common/Snackbar/SnackbarSlice";
import GoogleMapReact from "google-map-react";
import MarkerComponent from "./components/MarkerComponent";
import {Done} from "@material-ui/icons";
import TopNavigationBar from "../../common/TopNavigationBar";

const GoogleMapConfig = {
  // key: process.env.REACT_APP_GOOGLE_API_KEY,
  language: `vi`,
  region: `VN`,
};

const GoogleMapOptions = {
  styles: [
    {
      featureType: "transit.station.bus",
      stylers: [
        {visibility: "off"}
      ]
    },
    {
      featureType: "poi",
      elementType: "labels",
      stylers: [
        {visibility: "off"}
      ]
    },
  ]
}

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

  const [location, setLocation] = useState({lat: 10.7626700137507, lng: 106.68162377003272});
  const [address, setAddress] = useState(``);

  const handleSubmitLocation = () => {
    const {lng: longitude, lat: latitude} = location;
    dispatch(addAddress({userId, address, longitude, latitude}));
  }

  const onLocationChange = () => {
    getAddress(location.lng, location.lat)
      .then((text) => setAddress(text))
      .catch((error) => dispatch(showError(error.message)));
  }

  const handleMapClick = ({lat, lng}) => {
    setAddress(`...`);
    setLocation({lat, lng});
    onLocationChange();
  }

  useEffect(() => {
    getLocation(({coords: {longitude: lng, latitude: lat}}) => setLocation({lng, lat}));
  }, [])

  useEffect(() => {
    onLocationChange();
  }, [location])

  useEffect(() => {
    if (isError) {
      dispatch(showError(errorMessage))
      dispatch(clearAddressState())
    }
    if (isSuccess) {
      dispatch(clearAddressState())
      history.go(-1)
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
          options={GoogleMapOptions}
          center={location}
          defaultZoom={15}
          onClick={handleMapClick}>
          <MarkerComponent {...location} address={address}/>
        </GoogleMapReact>
      </div>
    </>
  );
}
