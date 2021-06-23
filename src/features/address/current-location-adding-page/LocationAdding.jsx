import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";

// import mapboxgl from '!mapbox-gl';
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {userSelector} from "../../user/UserSlice";
import {addAddress, addressSelector, clearAddressState} from "../AddressSlice";
import {getAddressV2, getLocation} from "../../../helpers/location";
import {showError} from "../../common/Snackbar/SnackbarSlice";
import TopNavigationBar from "../../../components/TopNavigationBar";
import GoogleMapReact from "google-map-react";
import MarkerComponent from "./components/MarkerComponent";
import {Done} from "@material-ui/icons"; // eslint-disable-line import/no-webpack-loader-syntax

// mapboxgl.accessToken = process.env.REACT_APP_MAP_BOX_KEY;

const GoogleMapConfig = {
  // key: process.env.REACT_APP_GOOGLE_API_KEY,
  key: null,
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
  },
  mapContainer: {
    height: `100vh`,
    width: `100%`,
  }
}));

export default function LocationAdding() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const {id: userId} = useSelector(userSelector);
  const {isPending, isError, isSuccess, errorMessage} = useSelector(addressSelector);

  const [location, setLocation] = useState({lat: 49.2827291, lng: -123.1207375});
  const [address, setAddress] = useState(``);

  const handleSubmitLocation = () => {
    const {lng: longitude, lat: latitude} = location;
    dispatch(addAddress({userId, address, longitude, latitude}));
  }

  const onLocationChange = () => {
    getAddressV2(location.lng, location.lat)
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

  // const mapContainer = useRef(null);
  // const map = useRef(null);
  // const [lng, setLng] = useState(-70.9);
  // const [lat, setLat] = useState(42.35);
  // const [zoom, setZoom] = useState(9);
  //
  // useEffect(() => {
  //   if (map.current) return; // initialize map only once
  //   map.current = new mapboxgl.Map({
  //     container: mapContainer.current,
  //     style: 'mapbox://styles/mapbox/streets-v11',
  //     center: [lng, lat],
  //     zoom: zoom
  //   });
  // });
  // useEffect(() => {
  //     getLocation(({coords: {longitude: lng, latitude: lat}}) => setLocation({lng, lat}));
  //   }, [])
  //
  //
  // useEffect(() => {
  //   if (!map.current) return; // wait for map to initialize
  //   map.current.on('move', () => {
  //     setLng(map.current.getCenter().lng.toFixed(4));
  //     setLat(map.current.getCenter().lat.toFixed(4));
  //     setZoom(map.current.getZoom().toFixed(2));
  //   });
  // });
  //
  // return (
  //   <div>
  //     <div ref={mapContainer} className={classes.mapContainer}/>
  //   </div>
  // );
}

