import React, {useEffect, useState} from "react";
import {Box} from "@material-ui/core";
import {getAddress, getLocation} from "../../../helpers/location";
import GoogleMap from "./components/Map";
import {InfoWindow, Marker} from 'google-maps-react';
import {makeStyles} from "@material-ui/core/styles";
import TopNavigationBar from "../../common/TopNavigationBar";
import {Done} from "@material-ui/icons";
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {addAddress, addressSelector, clearAddressState} from "../AddressSlice";
import {showError} from "../../common/Snackbar/SnackbarSlice";
import {userSelector} from "../../user/UserSlice";

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
  const [activeMarker, setMarker] = useState({});

  const handleSubmitLocation = () => {
    const {lng: longitude, lat: latitude} = location;
    dispatch(addAddress({userId, address, longitude, latitude}));
  };

  const handleMapDrag = (mapProps, map) => {
    console.log(mapProps);
    console.log(map);
  };

  useEffect(() => {
    getLocation(({coords: {longitude: lng, latitude: lat}}) => setLocation({lng, lat}));
  }, []);

  useEffect(() => {
    getAddress(location.lng, location.lat).then(({results}) => setAddress(results[0].formatted_address));
  }, [location])

  useEffect(() => {
    if (isPending) {
      console.log(`Saving...`);
    }
    if (isError) {
      dispatch(showError(errorMessage));
      dispatch(clearAddressState());
    }
    if (isSuccess) {
      dispatch(clearAddressState());
      history.replace(`/address`);
    }
  }, [isPending, isError, isSuccess, dispatch])

  return (
    <Box>
      <Box className={classes.topNavigator}>
        <TopNavigationBar label="Vị trí của bạn"
                          rightIcon={Done}
                          rightAction={handleSubmitLocation}/>
      </Box>
      <Box flexGrow={1}>
        <GoogleMap centerLocation={location} onDragend={handleMapDrag}>
          <Marker position={location}
                  onClick={(props, marker, e) => setMarker(marker)}/>
          <InfoWindow visible={true} marker={activeMarker}>
            <div>
              <p>{address}</p>
            </div>
          </InfoWindow>
        </GoogleMap>
      </Box>
    </Box>
  );
}
