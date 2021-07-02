import React, {useEffect, useRef, useState} from "react";

import ReactMapGL, {FlyToInterpolator, Marker, WebMercatorViewport} from "react-map-gl"
import TopNavigationBar from "../common/TopNavigationBar";
import {makeStyles} from "@material-ui/core/styles";
import {useDispatch, useSelector} from "react-redux";
import {fetchOrderData, orderSelector} from "../order/OrderSlice";
import {useParams} from "react-router-dom";
import {DriverApi} from "../../api/RiderApi";
import Pusher from "pusher-js";
import {useSize} from "react-hook-size";
import {Motorcycle, Refresh, Store} from "@material-ui/icons";
import {IconButton} from "@material-ui/core";
import Customer from "../../asserts/icons/marker_person.svg"
import Restaurant from "../../asserts/icons/marker_restaurant.svg"
import Shipper from "../../asserts/icons/marker_shipper.svg"

import 'mapbox-gl/dist/mapbox-gl.css'

const useStyles = makeStyles((theme) => ({
  mapContainer: {
    marginTop: `48px`,
  },
  sideBar: {
    position: "fixed",
    right: 0,
    bottom: 0,
    zIndex: 2,
    display: "flex",
    flexDirection: "column",
  },
  picker: {
    width: theme.spacing(4),
    transform: `translate(-50%, -100%)`,
  }
}))

export default function DriverLocation() {

  const mapContainerRef = React.useRef(null)
  const focusDriverBtn = useRef(null)
  const {width, height} = useSize(mapContainerRef)

  const classes = useStyles()
  const dispatch = useDispatch()
  const {id: orderId} = useParams()

  const [viewport, setViewport] = useState({
    latitude: 10.7058661,
    longitude: 106.7049702,
    zoom: 10,
  })
  const [lPending, setPending] = useState(false)
  const [customer, setCustomer] = useState([106.68157012684986, 10.76249083188875])
  const [restaurant, setRestaurant] = useState([106.68157012684986, 10.76249083188875])
  const [driver, setDriver] = useState([106.68157012684986, 10.76249083188875])

  const {isSuccess: oOK, isRequesting: oPending, data: oData} = useSelector(orderSelector)

  const boundTo = function (location1, location2) {
    const {longitude, latitude, zoom} = new WebMercatorViewport({...viewport, width, height})
      .fitBounds([location1, location2], {
        padding: 20,
        offset: [-50, -50]
      })
    setViewport({
      ...viewport,
      longitude,
      latitude,
      zoom,
      transitionDuration: 2500,
      transitionInterpolator: new FlyToInterpolator(),
    })
  }

  const flyTo = function (location) {
    setViewport({
      ...viewport,
      longitude: location[0],
      latitude: location[1],
      zoom: 15,
      transitionDuration: 1500,
      transitionInterpolator: new FlyToInterpolator(),
      width,
      height,
    })
  }

  const getDriverLocation = () => {
    const {delivery} = oData
    if (!delivery || !delivery.driverId)
      return
    setPending(true)
    DriverApi.getDriverLocation(delivery.driverId)
      .then((_location) => {
        setDriver([_location.longitude, _location.latitude])
        focusDriverBtn.current?.click()
      })
      .catch((e) => console.log(e))
      .finally(() => setPending(false))
  }

  useEffect(() => {
    if (!oOK) {
      dispatch(fetchOrderData({orderId}))
    } else {
      const {delivery: {customerGeom, restaurantGeom}} = oData
      setCustomer(customerGeom.coordinates)
      setRestaurant(restaurantGeom.coordinates)
      getDriverLocation()
    }
  }, [oOK])

  useEffect(function () {
    const pusher = new Pusher('29ff5ecb5e2501177186', {
      cluster: 'ap1'
    })
    const channel = pusher.subscribe(`order_${orderId}`)
    channel.bind("delivery-location", function (__location) {
      setDriver([__location.longitude, __location.latitude])
      focusDriverBtn.current?.click()
    })
  }, [])

  return (
    <>
      <TopNavigationBar
        label={"Vị trí tài xế"}
        isPending={oPending || lPending}
        rightIcon={Refresh}
        rightAction={() => getDriverLocation()}
      />
      <div ref={mapContainerRef} className={classes.mapContainer}>
        <ReactMapGL
          width={"100vw"}
          height={"calc(100vh - 48px)"}
          {...viewport}
          mapboxApiAccessToken={process.env.REACT_APP_MAP_BOX_KEY}
          mapStyle={"mapbox://styles/mapbox/streets-v11"}
          onViewportChange={(_viewport) => {
            setViewport(_viewport)
          }}
        >
          <Marker longitude={customer[0]} latitude={customer[1]}>
            <img className={classes.picker} src={Customer} alt={"Customer location"}/>
          </Marker>
          <Marker longitude={restaurant[0]} latitude={restaurant[1]}>
            <img className={classes.picker} src={Restaurant} alt={"Restaurant location"}/>
          </Marker>
          <Marker longitude={driver[0]} latitude={driver[1]}>
            <img className={classes.picker} src={Shipper} alt={"Shipper loation"}/>
          </Marker>
        </ReactMapGL>
      </div>
      <div className={classes.sideBar}>
        <IconButton onClick={() => boundTo(driver, restaurant)}>
          <Store/>
        </IconButton>
        <IconButton ref={focusDriverBtn} onClick={() => boundTo(driver, customer)}>
          <Motorcycle/>
        </IconButton>
      </div>
    </>
  )
}