import React, {useEffect, useState} from "react";
import {Avatar, Box, Chip, Grid, TextField, Typography} from "@material-ui/core";
import TopNavigationBar from "../../common/TopNavigationBar";
import {makeStyles} from "@material-ui/core/styles";
import {useHistory, useLocation, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {clearOrderState, fetchOrderData, orderSelector} from "../OrderSlice";
import {showError, showSuccess} from "../../common/Snackbar/SnackbarSlice";
import {Rating} from "@material-ui/lab";
import {clearRestaurantState, fetchRestaurant, restaurantSelector} from "../../restaurant/RestaurantSlice";
import {Star} from "@material-ui/icons";
import BottomButton from "../../common/BottomButton";
import {metadataSelector} from "../../home/MetadataSlice";
import {OrderApi} from "../../../api/OrderApi";

const useStyles = makeStyles((theme) => ({
    container: {
      width: `100%`,
      height: `100vh`,
    },
    avatar: {
      width: `75px`,
      height: `75px`,
    }
  })
)

export default function OrderReview() {
  //Styles
  const classes = useStyles()
  const location = useLocation()
  const dispatch = useDispatch()
  const history = useHistory()

  //Local state
  const {id: orderId} = useParams()
  const [step, setStep] = useState(location.state?.step || 2)
  const [rating, setRating] = useState(5)
  const [review, setReview] = useState(``)
  const [suggestion, setSuggestion] = useState([])
  const [isPending, setPending] = useState(false)

  const [focus, setFocus] = useState(false)

  const {isSuccess: mOK, data: mData} = useSelector(metadataSelector)

  //Global state
  const {
    isRequesting: oFetching,
    isSuccess: oSuccess,
    isError: oError,
    errorMessage: oErrorMessage,
    data: order
  } = useSelector(orderSelector)

  const {
    isRequesting: rFetching,
    isSuccess: rSuccess,
    isError: rError,
    errorMessage: rErrorMessage,
    restaurant
  } = useSelector(restaurantSelector)

  //Side effect
  useEffect(() => {
    if (!oSuccess) {
      dispatch(clearOrderState())
      dispatch(fetchOrderData({orderId}))
    }
  }, [])

  useEffect(() => {
    if (oSuccess && !rSuccess) {
      dispatch(clearRestaurantState())
      dispatch(fetchRestaurant({id: order?.restaurantId}))
    }
  }, [oSuccess])

  useEffect(() => {
    if (!mOK) {
      history.replace('/location/analyse', {ref: location.pathname})
    } else {
      const {feedbackReason} = mData
      const filtered = feedbackReason
        .filter((feedback) => feedback.rate === rating && feedback.type === step)
        .map((data) => ({...data, selected: false}))
      setSuggestion(filtered)
    }
  }, [rating])

  useEffect(() => {
    if (oError) {
      dispatch(showError(oErrorMessage))
      dispatch(clearOrderState())
      // history.replace(`/orders`)
    }
    if (rError) {
      dispatch(showError(rError))
      dispatch(clearRestaurantState())
      // history.replace(`/orders`)
    }
  }, [oError, rError])

  if (!oSuccess || !rSuccess) {
    return (
      <TopNavigationBar label={`Đánh giá ${step === 1 ? "tài xế" : "nhà hàng"}`} isPending={true}/>
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
    if (step === 1) {
      setPending(true)
      OrderApi.rateDriver(orderId, reasonIds, rating, review)
        .then((data) => {
          dispatch(showSuccess("Cảm ơn bạn đã đánh giá tài xế!"))
          history.replace("/")
        })
        .catch((e) => {
          dispatch(showError(e.message))
        })
        .finally(() => {
          setPending(false)
        })
    }
    if (step === 2) {
      setPending(true)
      OrderApi.rateRestaurant(orderId, reasonIds, rating, review)
        .then((data) => {
          dispatch(showSuccess("Cảm ơn bạn đã đánh giá nhà hàng!"))
          history.goBack()
        })
        .catch((e) => {
          dispatch(showError(e.message))
        })
        .finally(() => {
          setPending(false)
        })
    }
  }

  return (
    <>
      <TopNavigationBar label={`Đánh giá ${step === 1 ? "tài xế" : "nhà hàng"}`}/>
      <Grid container justify={`center`} alignItems={`center`} wrap={`nowrap`}>
        <Grid item>
          <Grid container direction={`column`} justify={`center`} alignItems={`center`} spacing={2}
                className={classes.container} wrap={`nowrap`}>
            {step === 1 ? (
              <>
                <Grid item>
                  <Typography variant="h3">
                    <Box textAlign={`center`} m={2}>Vui lòng đánh giá tài xế của chúng tôi!</Box>
                  </Typography>
                </Grid>
                <Grid item>
                  {/*<Avatar src={order.driverInfo?.avatar} className={classes.avatar}/>*/}
                  <Avatar src={"https://www.shareicon.net/data/128x128/2016/06/27/787157_people_512x512.png"} className={classes.avatar}/>
                </Grid>
                <Grid item>
                  <Typography variant="h5">
                    <Box textAlign={`center`} m={2}>
                      {/*{`Tài xế: ${order.driverInfo?.name}`}*/}
                      {`Tài xế: ${"Nguyễn Thị Bích Ngọc"}`}
                    </Box>
                  </Typography>
                </Grid>
              </>
            ) : (
              <>
                <Grid item>
                  <Avatar src={restaurant?.coverImageUrl} className={classes.avatar}/>
                </Grid>
                <Grid item>
                  <Typography variant="h3">
                    <Box textAlign={`center`} mx={2}>
                      {`Bạn thấy "Nhà hàng ${restaurant?.name}" thế nào?`}
                    </Box>
                  </Typography>
                </Grid>
              </>
            )}
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
              <Box display={`flex`} flexDirection={`row`} flexWrap={`wrap`} justifyContent={`center`}>
                {suggestion.map(({id, content, selected}) => (
                  <Box p={0.5}>
                    <Chip
                      key={id}
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
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {!focus && (
        <BottomButton
          variant={`contained`}
          disabled={isPending}
          onClick={() => onSubmit()}
        >
          Gửi
        </BottomButton>
      )
      }
    </>
  )

  // //Driver review
  // return (
  //   <>
  //     <TopNavigationBar label={`Đánh giá tài xế`}/>
  //     <Grid container direction={`column`} justify={`center`} alignItems={`center`} className={classes.container}>
  //       <Grid item>
  //         <Typography variant="h3">
  //           <Box textAlign={`center`} m={2}>Vui lòng đánh giá tài xế của chúng tôi!</Box>
  //         </Typography>
  //       </Grid>
  //       <Grid item>
  //         <Avatar src={driverData?.avatar} className={classes.avatar}/>
  //       </Grid>
  //       <Grid item>
  //         <Typography variant="h5">
  //           <Box textAlign={`center`} m={2}>
  //             {`Tài xế: ${driverData?.name}`}
  //           </Box>
  //         </Typography>
  //       </Grid>
  //       <Grid item>
  //         <Rating
  //           name={`ratingOrder`}
  //           value={rating}
  //           onChange={onRatingChange}
  //           size={`large`}
  //           icon={<Star/>}
  //         />
  //       </Grid>
  //       <Grid item>
  //         <Box display={`flex`} flexDirection={`row`} flexWrap={`wrap`} justifyContent={`center`} p={2}>
  //           {suggestion.map(({id, content, selected}) => (
  //             <Box key={id} mx={0.5} my={1}>
  //               <Chip
  //                 label={content}
  //                 color={selected ? "primary" : "default"}
  //                 variant={selected ? "default" : "outlined"}
  //                 onClick={() => onChipClick(id)}
  //               />
  //             </Box>
  //           ))}
  //         </Box>
  //       </Grid>
  //       <Grid item>
  //         <Box py={3}/>
  //       </Grid>
  //       <Grid item>
  //         <TextField
  //           value={review}
  //           onChange={onReviewChange}
  //           placeholder={`Để lại cảm nhận của bạn`}
  //         />
  //       </Grid>
  //     </Grid>
  //     <div className={classes.bottom}>
  //       <BottomButton variant={`contained`} onClick={() => onSubmit()}>
  //         Gửi
  //       </BottomButton>
  //     </div>
  //   </>
  // )
}