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

const useStyles = makeStyles((theme) => ({
  text: {
    fontSize: theme.spacing(1.5),
    color: theme.palette.onSurface.mediumEmphasis,
  },
  map: {
    padding: theme.spacing(2),
    width: `200px`,
    height: `200px`,
  },
}));

export default function RestaurantInfo() {
  const {id} = useParams();
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const {isError, isFetching, isSuccess, restaurant} = useSelector(restaurantSelector);

  useEffect(() => {
    if (!isSuccess) {
      dispatch(fetchRestaurant({id}));
    }
  }, []);

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
          <Title text="Địa chỉ"/>
          <Typography variant="h5">
            <Box className={classes.text}>{restaurant.address}</Box>
          </Typography>
        </Box>
        <Box mt={2}>
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