import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {analyseCurrentLocation, locationSelector} from "../home/LocationSlice";
import {useHistory, useLocation} from "react-router-dom";
import {Box} from "@material-ui/core";

export default function AnalyseLocation() {
  //Hook
  const history = useHistory()
  const location = useLocation()
  const dispatch = useDispatch()

  //Global state
  const {isSuccess} = useSelector(locationSelector)

  //Side effect
  useEffect(async () => {
    dispatch(analyseCurrentLocation({}))
  }, [])

  useEffect(() => {
    if (isSuccess) {
      history.replace(location.state?.ref || '/')
    }
  }, [isSuccess])

  return (
    <>
      <Box py={10}/>
      <div>
        <Box mx={`auto`}>Analysing your location</Box>
      </div>
    </>
  )
}