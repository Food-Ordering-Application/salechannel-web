import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Box} from "@material-ui/core";

import LocationCard from "./components/LocationCard";
import OrderDetails from "./components/OrderDetails";
import CouponList from "./components/CouponList";
import MainActionsBottom from "./components/MainActionsBottom";
import TopNavigationBar from "../../common/TopNavigationBar";
import {useHistory, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {clearOrderState, confirmOrder, orderSelector, removeItem, setPaymentType} from "../OrderSlice";
import {showError} from "../../common/Snackbar/SnackbarSlice";
import AddressDialog from "./components/AddressDialog";
import NoteDialog from "./components/NoteDialog";
import PaymentDialog from "./components/PaymentDialog";


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
  const [addressOpen, setAddressOpen] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [noteOpen, setNoteOpen] = useState(false);
  const [note, setNote] = useState(``);

  const {isEmpty, isError, errorMessage, data, orderSuccess} = useSelector(orderSelector);

  const handlePaymentTypeChange = (paymentType) => {
    dispatch(setPaymentType(paymentType));
  }

  useEffect(() => {
    if (isError) {
      dispatch(showError(errorMessage));
      dispatch(clearOrderState());
    }
    if (orderSuccess) {
      alert("Đặt hàng thành công!");
      history.replace(`/checkout/${orderId}`);
    }
  }, [isError, dispatch, orderSuccess]);

  if (isEmpty) {
    history.push(`/store/${restaurantId}`);
    return null;
  }

  const {id: orderId, subTotal, delivery: {customerAddress, shippingFee}, paymentType} = data;

  return (
    <Box mt={6} mb={16.25} p={1.5}>
      <Box className={classes.topNavigationBar}>
        <TopNavigationBar label="Check out"/>
      </Box>
      <Box>
        <LocationCard location={customerAddress}
                      handleChange={() => setAddressOpen(true)}/>
      </Box>
      <Box mt={2} mb={3}>
        <OrderDetails orderData={data}
                      handleUpdateNote={() => setNoteOpen(true)}
                      note={note}
                      handleRemoveItem={(orderItemId) => {
                        dispatch(removeItem({orderId, orderItemId}));
                      }}/>
      </Box>
      <Box mx={-1.5}>
        <CouponList/>
      </Box>
      <Box className={classes.mainActionsBottom}>
        <MainActionsBottom totalCost={subTotal + shippingFee}
                           handleCheckout={() => dispatch(confirmOrder({orderId, note, paymentType}))}
                           handlePaymentChange={() => setPaymentOpen(true)}
                           disablePlaceOrder={!customerAddress}/>
      </Box>
      <AddressDialog open={addressOpen} onClose={() => setAddressOpen(false)}/>
      <PaymentDialog open={paymentOpen}
                     onClose={() => setPaymentOpen(false)}
                     onChange={(paymentType) => handlePaymentTypeChange(paymentType)}/>
      <NoteDialog note={note}
                  open={noteOpen}
                  onClose={() => setNoteOpen(false)}
                  onSubmit={(text) => setNote(text)}/>
    </Box>
  );
}