import React, {useEffect} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Box} from "@material-ui/core";

import LocationCard from "./components/LocationCard";
import OrderDetails from "./components/OrderDetails";
import CouponList from "./components/CouponList";
import MainActionsBottom from "./components/MainActionsBottom";
import TopNavigationBar from "../../common/TopNavigationBar";
import {useHistory, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {clearOrderState, orderSelector, removeItem} from "../OrderSlice";
import {showError} from "../../common/Snackbar/SnackbarSlice";


const useStyles = makeStyles((theme) => ({
  topNavigationBar: {
    position: `fixed`,
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  mainActionsBottom: {
    position: `fixed`,
    bottom: 0,
    left: 0,
    right: 0,
  }
}));

export default function Checkout() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const {id: restaurantId} = useParams();

  const {isEmpty, isError, errorMessage, data} = useSelector(orderSelector);

  useEffect(() => {
    if (isError) {
      dispatch(showError(errorMessage));
      dispatch(clearOrderState());
    }
  }, [isError, dispatch]);

  if (isEmpty) {
    history.push(`/store/${restaurantId}`);
    return null;
  }

  const {id: orderId} = data;

  return (
    <Box mt={6} p={1}>
      <Box className={classes.topNavigationBar}>
        <TopNavigationBar label="Check out"/>
      </Box>
      <Box>
        <LocationCard location={"225 Nguyễn Văn Cừ, phường 4, quận 5, Thành phố Hồ Chí Minh"}/>
      </Box>
      <Box my={2}>
        <OrderDetails orderData={data}
                      handleRemoveItem={(orderItemId) => {
                        dispatch(removeItem({orderId, orderItemId}));
                      }}/>
      </Box>
      <Box mx={-1}>
        <CouponList/>
      </Box>
      <Box py={10}/>
      <Box className={classes.mainActionsBottom}>
        <MainActionsBottom totalCost={58000} handleCheckout={() => history.push(`/order`)}/>
      </Box>
    </Box>
  );
}