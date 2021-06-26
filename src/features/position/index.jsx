import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {analyseCurrentLocation, locationSelector} from "../home/LocationSlice";
import {useHistory, useLocation} from "react-router-dom";
import {Box} from "@material-ui/core";
import {fetchMetadata, metadataSelector} from "../home/MetadataSlice";

export default function AnalyseLocation() {
  //Hook
  const history = useHistory()
  const location = useLocation()
  const dispatch = useDispatch()

  //Global state
  const {isSuccess: lSuccess, location: currentLocation, address} = useSelector(locationSelector)
  const {isSuccess: mSuccess} = useSelector(metadataSelector)

  //Side effect
  useEffect(() => {
    if (!lSuccess) {
      dispatch(analyseCurrentLocation({}))
    } else {
      if (!mSuccess) {
        dispatch(fetchMetadata({latitude: 10.759092606200658, longitude: 106.6829820685133}))
        // dispatch(fetchMetadata({latitude: currentLocation.latitude, longitude: currentLocation.longitude}))
      } else {
        history.replace(location.state?.ref || '/')
      }
    }
  }, [lSuccess, mSuccess])

  return (
    <>
      <Box py={10}/>
      <div>
        {lSuccess ? (
          <Box>
            <Box>Giao hàng đến</Box>
            <Box>{address}</Box>
          </Box>
        ) : (
          <Box mx={`auto`}>Analysing your location</Box>
        )}
      </div>
    </>
  )
}