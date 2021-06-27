import React, {useEffect, useState} from "react";
import {Avatar, Box, Chip, Grid, TextField, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {useHistory, useLocation, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import TopNavigationBar from "../common/TopNavigationBar";
import {metadataSelector} from "../home/MetadataSlice";
import {DriverApi} from "../../api/RiderApi";
import {showError} from "../common/Snackbar/SnackbarSlice";
import BottomButton from "../common/BottomButton";
import {Rating} from "@material-ui/lab";
import {Star} from "@material-ui/icons";

const INIT_RATTING = 5

const useStyles = makeStyles((theme) => ({
    container: {
      width: `100%`,
      height: `90vh`,
    },
    avatar: {
      width: `75px`,
      height: `75px`,
    },
    bottom: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 2,
    }
  })
)

export default function DriverReview() {
  //Styles
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()

  //Local state
  const {id: driverId} = useParams()
  const [rating, setRating] = useState(INIT_RATTING)
  const [review, setReview] = useState(``)
  const [suggestion, setSuggestion] = useState([])

  //Global state
  const {isSuccess: mOK, data: mData} = useSelector(metadataSelector)

  //Driver data
  const [dOK, setOK] = useState(false)
  const [dPending, setPending] = useState(false)
  const [driverData, setData] = useState({
    phoneNumber: "",
    name: "",
    licensePlate: "",
    avatar: ""
  })

  //Side Effect
  useEffect(() => {
    if (!mOK) {
      history.replace('/location/analyse', {ref: location.pathname})
    } else {
      const {feedbackReason} = mData
      const filtered = feedbackReason
        .filter((feedback) => feedback.rate === rating && feedback.type === 1)
        .map((data) => ({...data, selected: false}))
      setSuggestion(filtered)
    }
  }, [mOK, rating])

  useEffect(() => {
    if (!dOK) {
      setPending(true)
      DriverApi.getDriverInfo(driverId)
        .then(({driverInfo}) => {
          console.log(driverInfo)
          setData(driverInfo)
        })
        .catch((e) => {
          console.log(e)
          dispatch(showError("Mã tài xế không hợp lệ!"))
        })
        .finally(() => {
          setPending(false)
        })
    }
  }, [dOK, driverId])

  if (dPending) {
    return (
      <TopNavigationBar label={`Đánh giá tài xế`} isPending={true}/>
    )
  }

  //Callback
  const onRatingChange = (event, newValue) => {
    if (newValue < 1) return
    setRating(newValue);
  }

  const onReviewChange = (event) => {
    event.preventDefault()
    setReview(`${event.target.value}`)
  }

  const onChipClick = (id) => {
    const newArr = [...suggestion]
    for (let i = 0; i < suggestion.length; i++) {
      if (suggestion[i].id === id) {
        newArr[i].selected = !suggestion[i].selected
        setSuggestion(newArr)
        return
      }
    }
  }

  const onSubmit = () => {
    const reasonIds = []
    for (let i = 0; i < suggestion.length; i++) {
      if (suggestion[i].selected) {
        reasonIds.push(suggestion[i].id)
      }
    }
    console.log(reasonIds)
    // DriverApi.rate(driverId, reasonIds, rating, review)
    //   .then((data) => {
    //     console.log(data)
    //   })
    //   .catch((e) => {
    //     console.log(e)
    //   })
  }

  return (
    <>
      <TopNavigationBar label={`Đánh giá tài xế`}/>
      <Grid container direction={`column`} justify={`center`} alignItems={`center`} className={classes.container}>
        <Grid item>
          <Typography variant="h3">
            <Box textAlign={`center`} m={2}>Vui lòng đánh giá tài xế của chúng tôi!</Box>
          </Typography>
        </Grid>
        <Grid item>
          <Avatar src={driverData?.avatar} className={classes.avatar}/>
        </Grid>
        <Grid item>
          <Typography variant="h5">
            <Box textAlign={`center`} m={2}>
              {`Tài xế: ${driverData?.name}`}
            </Box>
          </Typography>
        </Grid>
        <Grid item>
          <Rating
            name={`ratingOrder`}
            value={rating}
            onChange={onRatingChange}
            size={`large`}
            icon={<Star/>}
          />
        </Grid>
        <Grid item>
          <Box display={`flex`} flexDirection={`row`} flexWrap={`wrap`} justifyContent={`center`} p={2}>
            {suggestion.map(({id, content, selected}) => (
              <Box key={id} mx={0.5} my={1}>
                <Chip
                  label={content}
                  color={selected ? "primary" : "default"}
                  variant={selected ? "default" : "outlined"}
                  onClick={() => onChipClick(id)}
                />
              </Box>
            ))}
          </Box>
        </Grid>
        <Grid item>
          <Box py={3}/>
        </Grid>
        <Grid item>
          <TextField
            value={review}
            onChange={onReviewChange}
            placeholder={`Để lại cảm nhận của bạn`}
          />
        </Grid>
      </Grid>
      <div className={classes.bottom}>
        <BottomButton variant={`contained`} onClick={() => onSubmit()}>
          Gửi
        </BottomButton>
      </div>
    </>
  )
}