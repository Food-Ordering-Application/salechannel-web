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
import {clearOrderState} from "../../OrderSlice";

const useStyles = makeStyles((theme) => ({
  skeleton: {
    marginBottom: theme.spacing(2),
    height: `100px`,
  }
}))

const checkAllowReview = (date1, date2) => {
  if (!date1 || !date2)
    return false
  return date2 - date1 <= 72 * 60 * 60 * 1000
}

export default function Draft({
                                isActive,
                                fetchOrders,
                                forceRefresh,
                                linkPattern = `/orders`,
                                draftName = `Đơn nháp`,
                                draftIcon,
                                allowReview = false,
                                onEmpty
                              }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  const [isLoading, setLoading] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [draft, setDraft] = useState([]);

  const onItemClick = (orderId, restaurantId) => {
    let strLink = linkPattern.replace(`{orderId}`, `${orderId}`);
    strLink = strLink.replace(`{restaurantId}`, `${restaurantId}`);
    dispatch(clearOrderState());
    history.push(strLink);
  };

  useEffect(() => {
    if (!isSuccess || forceRefresh) {
      setLoading(true);
      fetchOrders()
        .then(({orders}) => {
          setSuccess(true);
          if (orders.length === 0) {
            onEmpty()
          }
          setDraft(orders);
        })
        .catch((error) => {
          dispatch(showError(error.message));
        })
        .finally(() => {
          setLoading(false);
        })
    }
  }, [forceRefresh])

  useEffect(() => {
    if (isActive) {
      document
        .getElementById(`top`)
        .scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
    }
  }, [isActive])

  return (
    <>
      <div id={`top`}/>
      <Box hidden={!isLoading}>
        <Skeleton count={10} className={classes.skeleton}/>
      </Box>
      <Box hidden={isLoading}>
        <Box hidden={isLoading || (isSuccess && draft.length !== 0)}>
          <PlaceHolder icon={ReceiptTwoTone} text={`Không có đơn hàng nào`}/>
        </Box>
        {draft.map(({
                      id,
                      grandTotal,
                      subTotal,
                      restaurantId,
                      feedback,
                      delivery: {restaurantName, restaurantAddress, updatedAt, status},
                      invoice
                    }) => (
          <OrderHistoryItem
            key={id}
            status={status}
            name={restaurantName}
            paymentMethod={invoice?.payment?.method}
            date={updatedAt}
            cost={grandTotal || subTotal}
            onClick={() => onItemClick(id, restaurantId)}
            draftText={draftName}
            draftIcon={draftIcon}
            feedBack={allowReview && feedback}
            allowReview={allowReview && !feedback && checkAllowReview(new Date(updatedAt), new Date())}
            onReviewClick={() => history.push(`/order/${id}/review`, {step: 2, ref: '/orders'})}
            address={restaurantAddress}
          />
        ))}
      </Box>
    </>
  )
}