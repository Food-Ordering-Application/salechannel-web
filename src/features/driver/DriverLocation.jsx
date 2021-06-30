import React, {useEffect, useState} from "react";

import ReactMapGL, {FlyToInterpolator, Marker, WebMercatorViewport} from "react-map-gl"
import TopNavigationBar from "../common/TopNavigationBar";
import {makeStyles} from "@material-ui/core/styles";
import {useDispatch, useSelector} from "react-redux";
import {fetchOrderData, orderSelector} from "../order/OrderSlice";
import {useParams} from "react-router-dom";
import {DriverApi} from "../../api/RiderApi";
import Pusher from "pusher-js";
import {useSize} from "react-hook-size";
import {Motorcycle, PersonPinCircleTwoTone, Refresh, Store, StorefrontTwoTone} from "@material-ui/icons";
import {IconButton} from "@material-ui/core";

import 'mapbox-gl/dist/mapbox-gl.css'
import CustomerMarker from "../../asserts/icons/CustomerMarker";
import CustomerIcon from "../../asserts/icons/marker_person.svg"

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
  }
}))

const dataConverter = (long, lat) => ({
  "geometry": {"type": "Point", "coordinates": [long, lat]},
  "type": "Feature",
  "properties": {}
})

// export function _DriverLocation() {
//
//   const {id: orderId} = useParams()
//   const classes = useStyles()
//   const dispatch = useDispatch()
//   const history = useHistory()
//
//   const {isSuccess, data: orderData} = useSelector(orderSelector);
//
//
//   useEffect(() => {
//     const map = MapboxAPI.getMapInstance('map');
//
//     const {delivery: {driverId, customerGeom}} = orderData
//
//     map.on('load', function () {
//
//       const pusher = new Pusher('29ff5ecb5e2501177186', {
//         cluster: 'ap1'
//       });
//
//       const channel = pusher.subscribe(`order_${orderId}`);
//
//       channel.bind("delivery-location", function (data) {
//         const _data = {
//           "geometry": {"type": "Point", "coordinates": [data.longitude, data.latitude]},
//           "type": "Feature",
//           "properties": {}
//         }
//         map.getSource('drone').setData(_data);
//         map.fitBounds([
//           _data.geometry.coordinates,
//           customerGeom.coordinates,
//         ], {padding: 100});
//       })
//
//       map.addSource('drone', {
//         type: 'geojson', data: {
//           "geometry": {"type": "Point", "coordinates": [106.6139235315213, 10.762321401332274]},
//           "type": "Feature",
//           "properties": {}
//         }
//       });
//       map.addLayer({
//         'id': 'drone',
//         'type': 'symbol',
//         'source': 'drone',
//         'layout': {
//           'icon-image': 'rocket-15'
//         }
//       });
//       map.addSource('customer', {type: 'geojson', data: customerGeom});
//       map.addLayer({
//         'id': 'customer',
//         'type': 'symbol',
//         'source': 'customer',
//         'layout': {
//           'icon-image': 'rocket-15'
//         }
//       });
//
//       DriverApi.getDriverLocation(driverId).then((_location) => {
//         map.getSource('drone').setData({
//           "geometry": {"type": "Point", "coordinates": [_location?.longitude, _location?.latitude]},
//           "type": "Feature",
//           "properties": {}
//         })
//       })
//
//
//       map.flyTo({
//         center: customerGeom.coordinates,
//         speed: 0.5
//       });
//
//
//     });
//   }, [])
//
//   if (!isSuccess) {
//     history.replace(`order/${orderId}`)
//     return null
//   }
//
//   return (
//     <>
//       <TopNavigationBar label={`Vị trí tài xế`} homeButton={false}/>
//       <div id="map" className={classes.mapContainer}/>
//     </>
//   )
// }

// const useStyles = makeStyles((theme) => ({
//   mapContainer: {
//     position: "fixed",
//     top: "48px",
//   }
// }))

export default function DriverLocation() {

  const mapRef = React.useRef(null);
  const mapContainerRef = React.useRef(null);
  const {width, height} = useSize(mapContainerRef);

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
//     let padding = 20
//
//     const bounds = [ [-74.05, 40.598], [-73.767185, 40.862] ] // or whatever
//     const { offsetHeight: height, offsetWidth: width } = mapRef.getContainer()
//
// // If you have some media queries where the map size changes, adjust these
// // if (breakpoint === 'mobile' || breakpoint === 'tablet') padding = 25
// // else padding = 100
//
// // You could certainly improve on this, but I found it easiest to simply jump
// // ship and set the padding to nothing instead of recalculating what would fit.
//     if (padding * 2 > height || padding * 2 > width) padding = 0

    const {longitude, latitude, zoom} = new WebMercatorViewport({...viewport, width, height})
      .fitBounds([location1, location2], {
        padding: 20,
        offset: [-50, -100]
      })
    setViewport({
      ...viewport,
      longitude,
      latitude,
      zoom,
      transitionDuration: 1000,
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
        flyTo([_location.longitude, _location.latitude])
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
      flyTo([__location.longitude, __location.latitude])
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
          ref={mapRef}
          width={"100vw"}
          height={"100vh"}
          {...viewport}
          mapboxApiAccessToken={process.env.REACT_APP_MAP_BOX_KEY}
          mapStyle={"mapbox://styles/mapbox/streets-v11"}
          onViewportChange={(_viewport) => {
            setViewport(_viewport)
          }}
        >
          <Marker longitude={customer[0]} latitude={customer[1]}>
            <div onClick={() => boundTo(customer, restaurant)}>
              <CustomerMarker style={{fontSize: 40, color: `#FF6B35`}}/>
              {/*<CustomerIcon/>*/}
            </div>
          </Marker>
          <Marker longitude={restaurant[0]} latitude={restaurant[1]}>
            <div>
              <StorefrontTwoTone style={{fontSize: 40, color: `#FF6B35`}}/>
            </div>
          </Marker>
          <Marker longitude={driver[0]} latitude={driver[1]}>
            <div>
              <Motorcycle style={{fontSize: 50, color: `#FF6B35`}}/>
            </div>
          </Marker>
        </ReactMapGL>
      </div>
      <div className={classes.sideBar}>
        <IconButton onClick={() => boundTo(driver, restaurant)}>
          <Store/>
        </IconButton>
        <IconButton onClick={() => boundTo(driver, customer)}>
          <Motorcycle/>
        </IconButton>
      </div>
    </>
  )
}

// export default function DriverLocation() {
//   const mapContainer = useRef(null)
//   const map = useRef(null)
//   const [lng, setLng] = useState(-70.9)
//   const [lat, setLat] = useState(42.35)
//   const [zoom, setZoom] = useState(9)
//
//   const classes = useStyles()
//
//   useEffect(() => {
//     if (map.current) return;
//     map.current = new mapboxgl.Map({
//       container: mapContainer.current,
//       style: 'mapbox://styles/mapbox/streets-v11',
//       center: [lng, lat],
//       zoom: zoom
//     })
//   })
//
//   useEffect(() => {
//     if (!map.current) return
//     map.current.on('move', () => {
//       setLng(map.current.getCenter().lng)
//       setLat(map.current.getCenter().lat)
//       setZoom(map.current.getZoom())
//     });
//   });
//
//   useEffect(() => {
//     if (!map.current) return
//
//     const url = 'https://wanderdrone.appspot.com/'
//
//     map.current.on(`load`, function () {
//       map.current.addSource('customer', {
//         type: 'geojson',
//         data: {
//           "geometry": {"type": "Point", "coordinates": [140.64341573121357, -37.91364617130208]},
//           "type": "Feature",
//           "properties": {}
//         }
//       })
//       map.current.addLayer({
//         'id': 'customer',
//         'type': 'symbol',
//         'source': 'customer',
//         'layout': {
//           'icon-image': 'airport-15',
//           'icon-size': 2,
//         }
//       })
//       map.current.flyTo({
//         center: [140.64341573121357, -37.91364617130208],
//         speed: 1
//       })
//
//
//       // Load an image from an external URL.
//       // map.current.loadImage(
//       //   'https://upload.wikimedia.org/wikipedia/commons/7/7c/201408_cat.png',
//       //   function (error, image) {
//       //     if (error) throw error;
//       //
//       //     map.current.addImage('cat', image);
//       //
//       //     map.current.addSource('point', {
//       //       'type': 'geojson',
//       //       'data': {
//       //         'type': 'FeatureCollection',
//       //         'features': [
//       //           {
//       //             'type': 'Feature',
//       //             'geometry': {
//       //               'type': 'Point',
//       //               'coordinates': [140.64341573121357, -37.91364617130208],
//       //
//       //             }
//       //           }
//       //         ]
//       //       }
//       //     });
//       //
//       //     map.current.addLayer({
//       //       'id': 'points',
//       //       'type': 'symbol',
//       //       'source': 'point',
//       //       'layout': {
//       //         'icon-image': 'cat',
//       //         'icon-size': 0.25
//       //       }
//       //     });
//       //   }
//       // );
//     })
//   }, [])
//
//   return (
//     <div>
//       <TopNavigationBar label={`Vị trí tài xế`} homeButton={false}/>
//       <div ref={mapContainer} className={classes.mapContainer}/>
//     </div>
//   )
// }

// export function __DriverLocation(){
//
//   const Map = ReactMapboxGl({
//     accessToken: process.env.REACT_APP_MAP_BOX_KEY
//   });
//
//   return(
//     <>
//       <TopNavigationBar label={"Vị trí tài xế"} homeButton={false}/>
//       <Map
//         style="mapbox://styles/mapbox/streets-v11"
//         movingMethod={"flyTo"}
//         containerStyle={{
//           height: '100vh',
//           width: '100vw'
//         }}
//       >
//         <Layer sourceId="" type="symbol" id="marker" layout={{ 'icon-image': 'rocket-15', 'icon-size': 2,}}>
//           <Feature coordinates={[-0.481747846041145, 51.3233379650232]} />
//         </Layer>
//       </Map>;
//     </>
//   )
// }