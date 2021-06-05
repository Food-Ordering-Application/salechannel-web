import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {showError} from "../../../common/Snackbar/SnackbarSlice";
import {Box} from "@material-ui/core";
import OrderHistoryItem from "./OrderHistoryItem";
import {useHistory} from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import {makeStyles} from "@material-ui/core/styles";
import PlaceHolder from "../../../common/PlaceHolder";
import {ReceiptTwoTone} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  skeleton: {
    marginBottom: theme.spacing(2),
    height: `100px`,
  }
}))

export default function Draft({isActive, fetchOrders}) {
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  const [isLoading, setLoading] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [draft, setDraft] = useState([]);

  useEffect(() => {
    if (isActive && !isSuccess) {
      setLoading(true);
      fetchOrders()
        .then(({orders}) => {
          setSuccess(true);
          setDraft(orders);
        })
        .catch((error) => {
          dispatch(showError(error.message));
        })
        .finally(() => {
          setLoading(false);
        })
    }
  }, [isActive]);

  return (
    <>
      <Box hidden={!isLoading}>
        <Skeleton count={10} className={classes.skeleton}/>
      </Box>
      <Box hidden={isLoading}>
        <Box hidden={isLoading || (isSuccess && draft.length !== 0)}>
          <PlaceHolder icon={ReceiptTwoTone} text={`Không có đơn hàng nào`}/>
        </Box>
        {draft.map(({id, subTotal, restaurantId, delivery: {restaurantName, updatedAt, status}}) => (
          <OrderHistoryItem
            key={id}
            status={status}
            name={restaurantName}
            itemCount={1}
            date={updatedAt}
            cost={subTotal}
            onClick={() => history.push(`/store/${restaurantId}`)}
          />
        ))}
      </Box>
    </>
  )
}