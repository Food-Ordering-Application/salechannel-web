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
  const {isSuccess: lSuccess} = useSelector(locationSelector)
  const {isSuccess: mSuccess} = useSelector(metadataSelector)

  //Side effect
  useEffect(async () => {
    dispatch(analyseCurrentLocation({}))
    dispatch(fetchMetadata({latitude: 10.759092606200658, longitude: 106.6829820685133}))
  }, [])

  useEffect(() => {
    if (lSuccess && mSuccess) {
      history.replace(location.state?.ref || '/')
    }
  }, [lSuccess, mSuccess])

  return (
    <>
      <Box py={10}/>
      <div>
        <Box mx={`auto`}>Analysing your location</Box>
      </div>
    </>
  )
}