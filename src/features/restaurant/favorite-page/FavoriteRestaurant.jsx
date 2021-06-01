import React, {useEffect} from "react";
import {Box} from "@material-ui/core";
import TopNavigationBar from "../../common/TopNavigationBar";
import {useDispatch, useSelector} from "react-redux";
import {clearRestaurantsListState, filterRestaurant, restaurantsListSelector} from "../RestaurantsListSlice";
import Skeleton from "react-loading-skeleton";
import {areaConstant} from "../../../constants/areaConstant";
import {showError} from "../../common/Snackbar/SnackbarSlice";
import RestaurantItemLarge from "../../../components/RestaurantItemLarge";
import {useHistory} from "react-router-dom";

export default function FavoriteRestaurant() {
  const dispatch = useDispatch()
  const history = useHistory()
  const {isFetching, isSuccess, isError, errorMessage, data: restaurants} = useSelector(restaurantsListSelector)

  const onItemClick = (restaurantID) => {
    history.push(`/store/${restaurantID}`)
  }

  useEffect(() => {
    dispatch(filterRestaurant({name: '', area: areaConstant.TPHCM.code}));
  }, [])

  useEffect(() => {
    if (isError) {
      dispatch(showError(errorMessage));
      dispatch(clearRestaurantsListState());
    }
  }, [isError])

  return (
    <Box mt={8} mx={2}>
      <TopNavigationBar label={`Nhà hàng yêu thích`} homeButton={false}/>
      {isFetching && <Skeleton height={82}/>}
      {isSuccess && restaurants.map(({id, name, address, coverImageUrl, rating}) => (
        <Box key={id} mb={2}>
          <RestaurantItemLarge name={`${name} - ${address}`}
                               image={coverImageUrl}
                               onClick={() => onItemClick(id)}
                               rating={rating}
          />
        </Box>
      ))}
    </Box>
  )
}