import React, {useEffect, useRef, useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import {useDispatch, useSelector} from "react-redux";
import {fetchOrderData, orderSelector, updateOrderStatus} from "../order/OrderSlice";
import ReactMapboxGl, {Layer, Feature} from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import {DriverApi} from "../../api/RiderApi";
import {MapboxAPI} from "../../helpers/mapbox";
import Pusher from "pusher-js";
import TopNavigationBar from "../common/TopNavigationBar";

const Map = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAP_BOX_KEY
});

const useStyles = makeStyles((theme) => ({
  mapContainer: {
    marginTop: `48px`,
    height: "calc(100vh - 48px)",
    width: `100%`,
  }
}))

const dataConverter = (long, lat) => ({
  "geometry": {"type": "Point", "coordinates": [long, lat]},
  "type": "Feature",
  "properties": {}
})

export default function DriverLocation() {

  const {id: orderId} = useParams()
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()

  const {isSuccess, data: orderData} = useSelector(orderSelector);


  useEffect(() => {
    const map = MapboxAPI.getMapInstance('map');

    const {delivery: {driverId, customerGeom}} = orderData

    map.on('load', function () {

      const pusher = new Pusher('29ff5ecb5e2501177186', {
        cluster: 'ap1'
      });

      const channel = pusher.subscribe(`order_${orderId}`);

      channel.bind("delivery-location", function (data) {
        const _data = {
          "geometry": {"type": "Point", "coordinates": [data.longitude, data.latitude]},
          "type": "Feature",
          "properties": {}
        }
        map.getSource('drone').setData(_data);
        map.fitBounds([
          _data.geometry.coordinates,
          customerGeom.coordinates,
        ], {padding: 100});
      })

      map.addSource('drone', {
        type: 'geojson', data: {
          "geometry": {"type": "Point", "coordinates": [106.6139235315213, 10.762321401332274]},
          "type": "Feature",
          "properties": {}
        }
      });
      map.addLayer({
        'id': 'drone',
        'type': 'symbol',
        'source': 'drone',
        'layout': {
          'icon-image': 'rocket-15'
        }
      });
      map.addSource('customer', {type: 'geojson', data: customerGeom});
      map.addLayer({
        'id': 'customer',
        'type': 'symbol',
        'source': 'customer',
        'layout': {
          'icon-image': 'rocket-15'
        }
      });

      DriverApi.getDriverLocation(driverId).then((_location) => {
        map.getSource('drone').setData({
          "geometry": {"type": "Point", "coordinates": [_location.longitude, _location.latitude]},
          "type": "Feature",
          "properties": {}
        })
      })


      map.flyTo({
        center: customerGeom.coordinates,
        speed: 0.5
      });
    });
  }, [])

  // const {isSuccess, data: {delivery}} = useSelector(orderSelector)
  //
  // const [driver, setDriver] = useState({
  //   "latitude": 10.754902742289849,
  //   "longitude": 106.67038252476121
  // })
  //
  //
  // useEffect(async () => {
  //   if (!isSuccess) {
  //     dispatch(fetchOrderData({orderId}))
  //   }
  // }, [isSuccess])
  //
  //
  // useEffect(() => {
  //   if (isSuccess) {
  //     const {customerGeom, restaurantGeom, driverId} = delivery;
  //     console.log(customerGeom, restaurantGeom)
  //     DriverApi.getDriverLocation(driverId).then((data) => console.log(data))
  //
  //   }
  // }, [isSuccess])
  if (!isSuccess) {
    history.replace(`order/${orderId}`)
    return null
  }

  return (
    // <Map
    //   style="mapbox://styles/mapbox/streets-v8"
    //   containerStyle={{
    //     height: '100vh',
    //     width: '100%'
    //   }}
    // >
    //   <Layer type="symbol" id="marker" layout={{'icon-image': 'rocket-15'}}>
    //     <Feature coordinates={[39.657325, -4.024902]}/>
    //   </Layer>
    // </Map>
    <>
      <TopNavigationBar label={`Vị trí tài xế`} homeButton={false} />
      <div id="map" className={classes.mapContainer}/>
    </>
  )
}