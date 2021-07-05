import React, {useEffect} from "react";
import {Box} from "@material-ui/core";
import queryString from 'query-string'
import TopNavigationBar from "../../common/TopNavigationBar";
import {useHistory, useLocation, useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {showError, showSuccess} from "../../common/Snackbar/SnackbarSlice";

export default function ProcessPayment() {
  const {id: orderId} = useParams()
  const history = useHistory()
  const dispatch = useDispatch()
  const {search} = useLocation()
  const {status} = queryString.parse(search)

  useEffect(() => {
    if (Number(status) === 1) {
      dispatch(showSuccess("Thanh toán thành công"))
      history.replace(`/order/${orderId}`)
    } else {
      dispatch(showError("Thanh toán thất bại. Vui lòng thử lại."))
      dispatch(showError(`/checkout/${orderId}`))
    }
  }, [])

  return (
    <Box mt={6}>
      <TopNavigationBar label={"Xử lí thanh toán"} isPending={true}/>
      <Box>{JSON.stringify(status)}</Box>
    </Box>
  )
}