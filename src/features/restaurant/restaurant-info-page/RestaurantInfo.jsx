import React, {useEffect} from "react";
import {Box, Typography} from "@material-ui/core";
import TopNavigationBar from "../../common/TopNavigationBar";
import GoogleMap from "./components/RestaurantLocation";
import Title from "./components/Title";
import {makeStyles} from "@material-ui/core/styles";
import {useHistory, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {clearRestaurantState, fetchRestaurant, restaurantSelector} from "../RestaurantSlice";
import OpenHourItem from "./components/OpenHourItem";
import {weekDayOfToday} from "../../../untils/formatter";
import {Marker} from "google-maps-react";
import {showError} from "../../common/Snackbar/SnackbarSlice";
// import ReactMapGL, {FlyToInterpolator, Marker} from "react-map-gl"
//import {LocationOn} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  text: {
    fontSize: theme.spacing(1.5),
    color: theme.palette.onSurface.mediumEmphasis,
  },
  marker: {
    transform: `translateX(-50%) translateY(-100%)`,
  }
}));

export default function RestaurantInfo() {
  const {id} = useParams();
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  //
  // const [viewport, setViewport] = useState({
  //   latitude: 45.211,
  //   longitude: -75.6903,
  //   zoom: 15,
  // })
  const {isError, isFetching, isSuccess, restaurant} = useSelector(restaurantSelector);

  useEffect(() => {
    if (!isSuccess) {
      dispatch(fetchRestaurant({id}));
    }
    // else {
    //   setViewport({
    //     ...viewport,
    //     longitude: restaurant["position"]?.longitude,
    //     latitude: restaurant["position"]?.latitude,
    //     zoom: 15,
    //     transitionDuration: 5000,
    //     transitionInterpolator: new FlyToInterpolator(),
    //   })
    // }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      dispatch(showError(`Nhà hàng không hợp lệ`));
      dispatch(clearRestaurantState());
      history.replace("/");
    }
  }, [isError]);

  return (
    <Box mt={6}>
      <TopNavigationBar label="Thông tin nhà hàng" isPending={isFetching}/>
      {isSuccess && <Box p={2}>
        <Box>
          <Title text="Thanh toán"/>
          <Typography variant="h5">
            <Box className={classes.text}>
              <span>Tiền mặt</span>
              {restaurant?.merchantIdInPayPal&&(
                <span>, PayPal</span>
              )}
            </Box>
          </Typography>
        </Box>
        <Box mt={0.5}>
          <Title text="Số điện thoại"/>
          <Typography variant="h5">
            <Box className={classes.text}>{restaurant.phone}</Box>
          </Typography>
        </Box>
        <Box mt={0.5}>
          <Title text="Địa chỉ"/>
          <Typography variant="h5">
            <Box className={classes.text}>{restaurant.address}</Box>
          </Typography>
        </Box>
        <Box mt={2}>
          {/*<ReactMapGL*/}
          {/*  width={"100%"}*/}
          {/*  height={"400px"}*/}
          {/*  {...viewport}*/}
          {/*  mapboxApiAccessToken={process.env.REACT_APP_MAP_BOX_KEY}*/}
          {/*  mapStyle={"mapbox://styles/mapbox/streets-v11"}*/}
          {/*  onViewportChange={(_viewport) => setViewport(_viewport)}*/}
          {/*>*/}
          {/*  <Marker*/}
          {/*    longitude={restaurant["position"]?.longitude}*/}
          {/*    latitude={restaurant["position"]?.latitude}*/}
          {/*  >*/}
          {/*    <div className={classes.marker}>*/}
          {/*      <Box fontSize={40} color={'status.EXPIRED'} component={LocationOn}/>*/}
          {/*    </div>*/}
          {/*  </Marker>*/}
          {/*</ReactMapGL>*/}
          <GoogleMap centerLocation={{
            lat: restaurant["position"]?.latitude,
            lng: restaurant["position"]?.longitude,
          }}>
            <Marker position={{
              lat: restaurant["position"]?.latitude,
              lng: restaurant["position"]?.longitude,
            }}/>
          </GoogleMap>
        </Box>
        <Box mt={1}>
          <Title text="Giờ mở cửa"/>
          <Box ml={2}>
            {restaurant["openHours"].map((openHour, index) => (
              <Box mb={1} key={index}>
                <OpenHourItem dayOfWeek={openHour.day}
                              fromHour={openHour.fromHour}
                              fromMinute={openHour.fromMinute}
                              toHour={openHour.toHour}
                              toMinute={openHour.toMinute}
                              highlighted={openHour.day === weekDayOfToday()}/>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>}
    </Box>
  );
}