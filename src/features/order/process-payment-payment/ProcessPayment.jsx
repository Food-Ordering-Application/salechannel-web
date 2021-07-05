import React, {useEffect} from "react";
import {Box} from "@material-ui/core";
import TopNavigationBar from "../../common/TopNavigationBar";
import {useHistory, useParams} from "react-router-dom";
import {OrderApi} from "../../../api/OrderApi";
import {useDispatch} from "react-redux";
import {showError, showSuccess} from "../../common/Snackbar/SnackbarSlice";

export default function ProcessPayment() {
  const {id: orderId} = useParams()
  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    if (orderId) {
      OrderApi.updateZaloPayment(orderId)
        .then((data) => {
          dispatch(showSuccess("Thanh toán thành công"))
          history.replace(`/order/${orderId}`)
        })
        .catch((error) => {
          dispatch(showError(error.message))
        })
    }
  }, [])

  return (
    <Box mt={6}>
      <TopNavigationBar label={"Xử lí thanh toán"} isPending={true}/>
      <Box>{orderId}</Box>
    </Box>
  )
}