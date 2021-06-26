import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {locationSelector, setDefaultLocation} from "../home/LocationSlice";
import {useHistory, useLocation} from "react-router-dom";
import {Box, CircularProgress, Grid, Typography} from "@material-ui/core";
import {fetchMetadata, metadataSelector} from "../home/MetadataSlice";
import {userSelector} from "../user/UserSlice";
import {getAddress, getCurrentLocation} from "../../helpers/location";
import UserApi from "../../api/UserApi";
import {makeStyles} from "@material-ui/core/styles";
import {LocationOnTwoTone} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  iconContainer: {
    width: "100%",
    height: "55vh",
  },
  picker: {
    animationDuration: "2s",
    animationIterationCount: "infinite",
    transformOrigin: "bottom"
  },
  bounce: {
    animationName: "bounce",
    animationTimingFunction: "ease-in-out",
  },
  "@keyframes bounce": {
    "0%": {
      transform: "translateY(0)",
    },
    "50%": {
      transform: "translateY(100px)",
    },
    "100%": {
      transform: "translateY(0)",
    },
  }
}))

export default function AnalyseLocation() {
  //Hook
  const classes = useStyles()
  const history = useHistory()
  const location = useLocation()
  const dispatch = useDispatch()

  //Global state
  const {isAuthenticated, id: customerId} = useSelector(userSelector)
  const {isSuccess: lSuccess, location: currentLocation, address} = useSelector(locationSelector)
  const {isSuccess: mSuccess} = useSelector(metadataSelector)

  useEffect(async () => {
    //Đã có thì không cần fetch lại
    if (lSuccess) return

    //Chưa có địa chỉ
    if (isAuthenticated) {
      //Đã đăng nhập
      try {
        const {customerAddress: {address, geom: {coordinates}}} = await UserApi.getDefaultAddress(customerId)
        const location = {longitude: coordinates[0], latitude: coordinates[1]}
        dispatch(setDefaultLocation({location, address}))
      } catch (e) {
        console.log(e, "Default Error")
        try {
          //Lấy được GPS
          const {coords: {latitude, longitude}} = await getCurrentLocation()
          const location = {longitude, latitude}
          const address = await getAddress(longitude, latitude)
          dispatch(setDefaultLocation({location, address}))
        } catch (e) {
          console.log(e, "GPS Error")
          //Không lấy được GPS: Nhập địa chỉ thủ công
          history.replace('/address/add', {ref: '/'})
        }
      }
    } else {
      //Chưa đăng nhập
      try {
        //Lấy được GPS
        const {coords: {latitude, longitude}} = await getCurrentLocation()
        const location = {longitude, latitude}
        const address = await getAddress(longitude, latitude)
        dispatch(setDefaultLocation({location, address}))
      } catch (e) {
        //Không lấy được GPS
        dispatch(setDefaultLocation({location: null, address: null}))
      }
    }
  }, [])

  // Side effect
  useEffect(() => {
    if (lSuccess) {
      if (!mSuccess) {
        const longitude = currentLocation?.longitude || 106.6829820685133
        const latitude = currentLocation?.latitude || 10.759092606200658
        dispatch(fetchMetadata({longitude, latitude}))
      } else {
        history.replace(location.state?.ref || '/')
      }
    }
  }, [lSuccess, mSuccess])

  return (
    <div>
      <Grid container direction={"column"} justify={"flex-end"} alignItems={"center"} className={classes.iconContainer}>
        <Grid item>
          <div>
            <Box className={`${classes.picker} ${classes.bounce}`} fontSize={150} color={"primary.main"} component={LocationOnTwoTone}/>
          </div>
        </Grid>
      </Grid>
      <Grid container direction={"column"} justify={"flex-end"} alignItems={"center"} className={classes.textContainer}>
        <Grid item>
          <Box p={4}>
            {lSuccess && address ? (
              <Box textAlign={"center"}>
                <Box pb={1}>
                  <Typography variant={"h4"}>Giao hàng đến</Typography>
                </Box>
                <Typography variant={"h6"}>{address}</Typography>
              </Box>
            ):(
              <CircularProgress/>
            )}
          </Box>
        </Grid>
      </Grid>
    </div>
  )
}