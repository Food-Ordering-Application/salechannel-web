import React, {useEffect, useState} from "react";
import {Box} from "@material-ui/core";
import {getAddress, getLocation} from "../../../helpers/location";
import GoogleMap from "./components/Map";
import {InfoWindow, Marker} from 'google-maps-react';
import {makeStyles} from "@material-ui/core/styles";
import TopNavigationBar from "../../common/TopNavigationBar";
import {Done} from "@material-ui/icons";

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
  const [location, setLocation] = useState({lat: 49.2827291, lng: -123.1207375,});
  const [address, setAddress] = useState(``);
  const classes = useStyles();
  const [activeMarker, setMarker] = useState({});

  const handleSubmitLocation = () => {
    alert(`${address} ${JSON.stringify(location)}`);
  };

  const handleMapDrag = (mapProps, map) => {
    console.log(mapProps);
    console.log(map);
  };

  useEffect(() => {
    getLocation(({coords: {longitude: lng, latitude: lat}}) => setLocation({lat, lng}));
  }, []);

  useEffect(() => {
    getAddress(location.lng, location.lat).then(({results}) => setAddress(results[0].formatted_address));
  }, [location])

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
          <InfoWindow visible={true} marker={activeMarker} >
            <div>
              <p>{address}</p>
            </div>
          </InfoWindow>
        </GoogleMap>
      </Box>
    </Box>
  );
}