import React, {useEffect, useState} from "react";
import {Avatar, Box, Chip, Grid, TextField, Typography} from "@material-ui/core";
import TopNavigationBar from "../../common/TopNavigationBar";
import {makeStyles} from "@material-ui/core/styles";
import {useHistory, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {clearOrderState, fetchOrderData, orderSelector} from "../OrderSlice";
import {showError} from "../../common/Snackbar/SnackbarSlice";
import {Rating} from "@material-ui/lab";
import {clearRestaurantState, fetchRestaurant, restaurantSelector} from "../../restaurant/RestaurantSlice";
import * as PropTypes from "prop-types";
import {Star} from "@material-ui/icons";
import BottomButton from "../../common/BottomButton";

const reviewConstant = [
  {
    title: `Ngon xỉu`,
    selected: false,
  },
  {
    title: `Tươi sạch`,
    selected: false,
  },
  {
    title: `No căn bụng`,
    selected: false,
  },
  {
    title: `Đóng gói đẹp`,
    selected: false,
  },
  {
    title: `Đáng đồng tiền`,
    selected: false,
  },
];

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

function StarBorderIcon(props) {
  return null;
}

StarBorderIcon.propTypes = {fontSize: PropTypes.string};
export default function OrderReview() {
  //Styles
  const classes = useStyles()

  //Local state
  const {id: orderId} = useParams()
  const [label, setLabel] = useState(`đơn hàng`)
  const [rating, setRating] = useState(4)
  const [review, setReview] = useState(``)
  const [suggestion, setSuggestion] = useState(reviewConstant);
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

  //Hook
  const dispatch = useDispatch()
  const history = useHistory()

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
      <TopNavigationBar
        label={`Đánh giá ${label}`}
        isPending={oFetching || rFetching}
      />
    )
  }

  //Callback
  const onRatingChange = (event, newValue) => {
    setRating(newValue);
  }
  const onReviewChange = (event) => {
    event.preventDefault()
    setReview(`${event.target.value}`)
  }

  return (
    <>
      <TopNavigationBar label={`Đánh giá ${label}`}/>
      <Grid container justify={`center`} alignItems={`center`} className={classes.container}>
        <Grid item>
          <Grid container direction={`column`} justify={`center`} alignItems={`center`} spacing={2}>
            <Grid item>
              <Avatar src={restaurant?.coverImageUrl} className={classes.avatar}/>
            </Grid>
            <Grid item>
              <Typography variant="h3">
                <Box textAlign={`center`} marginX={2
                }>
                  {`Bạn thấy "Nhà hàng ${restaurant?.name}" sao?`}
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
              <Box display={`flex`} flexDirection={`row`} flexWrap={`wrap`} justifyContent={`center`}>
                {suggestion.map((data, index) => (
                  <Box key={index} mx={0.5} my={1}>
                    <Chip label={data.title}/>
                  </Box>
                ))}
              </Box>
            </Grid>
            <Grid item>
              <Box py={5}/>
            </Grid>
            <Grid item>
              <TextField
                value={review}
                onChange={onReviewChange}
                placeholder={`Để lại cảm nhận của bạn`}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <BottomButton variant={`contained`} disabled={review.length === 0}>
        Gửi
      </BottomButton>
    </>
  )
}