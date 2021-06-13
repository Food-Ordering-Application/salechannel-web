import React, {useEffect} from "react";
import {Box} from "@material-ui/core";
import TopNavigationBar from "../../common/TopNavigationBar";
import {useDispatch, useSelector} from "react-redux";
import {showError} from "../../common/Snackbar/SnackbarSlice";
import RestaurantItemLarge from "../../../components/RestaurantItemLarge";
import {useHistory} from "react-router-dom";
import {clearFavRestaurantState, favoriteRestaurantSelector, fetchFavoriteRestaurant} from "../RestaurantFavoriteSlice";

export default function FavoriteRestaurant() {
  const dispatch = useDispatch()
  const history = useHistory()
  const {
    isFetching,
    fetchingSuccess,
    fetchingError,
    errorMessage,
    data: restaurants
  } = useSelector(favoriteRestaurantSelector)

  const onItemClick = (restaurantID) => {
    history.push(`/store/${restaurantID}`)
  }

  useEffect(() => {
    dispatch(fetchFavoriteRestaurant({}));
  }, [])

  useEffect(() => {
    if (fetchingError) {
      dispatch(showError(errorMessage));
      dispatch(clearFavRestaurantState());
    }
  }, [fetchingError])

  return (
    <Box mt={8} mx={2}>
      <TopNavigationBar label={`Nhà hàng yêu thích`} homeButton={false} isPending={isFetching}/>
      {fetchingSuccess && restaurants.map(({id, name, address, coverImageUrl, rating}) => (
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