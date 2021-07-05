import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Box} from '@material-ui/core';

import LocationCard from './components/LocationCard';
import OrderDetails from './components/OrderDetails';
import MainActionsBottom from './components/MainActionsBottom';
import TopNavigationBar from '../../common/TopNavigationBar';
import {useHistory, useLocation, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {clearOrderState, confirmOrder, fetchOrderData, orderSelector, removeItem,} from '../OrderSlice';
import {showError} from '../../common/Snackbar/SnackbarSlice';
import AddressDialog from './components/AddressDialog';
import NoteDialog from './components/NoteDialog';
import PaymentDialog from './components/PaymentDialog';
import SplashScreen from "../../common/SplashScreen";
import {paymentConstant} from "../../../constants/paymentConstant";

const useStyles = makeStyles((theme) => ({
  container: {
    margin: theme.spacing(7, 0, 16.25, 0),
    padding: theme.spacing(1.5),
  },
  mainActionsBottom: {
    position: `fixed`,
    bottom: 0,
    left: 0,
    right: 0,
  },
}));

export default function Checkout() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation()
  const {id: restaurantId} = useParams();
  const [addressOpen, setAddressOpen] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [noteOpen, setNoteOpen] = useState(false);
  const {isEmpty, isPlacing, isError, errorMessage, data, orderSuccess} = useSelector(orderSelector);

  const onItemRemove = (orderItemId) => {
    dispatch(removeItem({orderId, orderItemId}));
  }

  const onCheckOut = () => {
    dispatch(confirmOrder({orderId, note, paymentType}))
  }

  useEffect(() => {
    if (isError) {
      dispatch(showError(errorMessage));
      dispatch(clearOrderState());
    }
    if (orderSuccess) {
      if (data.paymentType === paymentConstant.ZALOPAY.code) {
        window.location.href = data?.orderUrl
        return
      }
      dispatch(clearOrderState());
      history.replace(`/order/${orderId}`);
    }
  }, [isError, dispatch, orderSuccess]);

  if (isEmpty) {
    if (location.state?.orderId) {
      dispatch(fetchOrderData({orderId: location.state?.orderId}))
      return (
        <TopNavigationBar label="Chi tiết đơn hàng" isPending={true}/>
      )
    }
    history.replace(`/store/${restaurantId}`);
    return null;
  }

  const {
    id: orderId,
    subTotal,
    delivery: {customerAddress, shippingFee},
    paymentType,
    note,
  } = data;

  return (
    <>
      <TopNavigationBar label="Chi tiết đơn hàng" isPending={isPlacing}/>
      <Box className={classes.container} hidden={isEmpty}>
        <LocationCard
          location={customerAddress}
          handleChange={() => setAddressOpen(true)}
        />
        <Box mt={2} mb={3}>
          <OrderDetails
            orderData={data}
            handleUpdateNote={() => setNoteOpen(true)}
            note={note}
            handleRemoveItem={onItemRemove}
          />
        </Box>
        <Box className={classes.mainActionsBottom}>
          <MainActionsBottom
            totalCost={subTotal + shippingFee}
            handleCheckout={onCheckOut}
            handlePaymentChange={() => setPaymentOpen(true)}
            disablePlaceOrder={!customerAddress}
          />
        </Box>
        <AddressDialog
          open={addressOpen}
          onClose={() => setAddressOpen(false)}
        />
        <PaymentDialog
          open={paymentOpen}
          onClose={() => setPaymentOpen(false)}
        />
        <NoteDialog
          open={noteOpen}
          onClose={() => setNoteOpen(false)}
        />
      </Box>
      <SplashScreen style={2} display={isPlacing}/>
    </>
  );
}
