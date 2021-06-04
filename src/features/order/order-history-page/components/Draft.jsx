import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {showError} from "../../../common/Snackbar/SnackbarSlice";
import {OrderApi} from "../../../../api/OrderApi";
import {Box, LinearProgress} from "@material-ui/core";
import OrderHistoryItem from "./OrderHistoryItem";
import orderConstant from "../../../../constants/orderConstant";
import {paymentConstant} from "../../../../constants/paymentConstant";

export default function Draft() {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  const [draft, setDraft] = useState([]);

  useEffect(() => {
    setLoading(true);
    OrderApi.fetchDraft()
      .then(({orders}) => {
        console.log(orders);
        setDraft(orders);
      })
      .catch((error) => {
        dispatch(showError(error.message));
      })
      .finally(() => {
        setLoading(false);
      })
  }, []);

  return (
    <>
      <LinearProgress hidden={!isLoading}/>
      <Box hidden={isLoading}>
        {draft.map((order)=>(
          <OrderHistoryItem
            key={order.id}
            status={orderConstant.DRAFT.code}
            name={order.delivery.restaurantName}
            itemCount={1}
            date={order.delivery.updatedAt}
            cost={1}
            paymentMethod={paymentConstant.COD.code}
          />
        ))}
      </Box>
    </>
  )
}