import React, {useEffect} from "react";
import {Box} from "@material-ui/core";
import TopNavigationBar from "../../common/TopNavigationBar";
import {useDispatch, useSelector} from "react-redux";
import {showError, showInfo} from "../../common/Snackbar/SnackbarSlice";
import RestaurantItemLarge from "../../../components/RestaurantItemLarge";
import {useHistory} from "react-router-dom";
import {clearFavRestaurantState, favoriteRestaurantSelector, fetchFavoriteRestaurant} from "../RestaurantFavoriteSlice";
import {locationSelector} from "../../home/LocationSlice";
import {userSelector} from "../../user/UserSlice";

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

  const {isAuthenticated} = useSelector(userSelector)

  const {isSuccess: lOK, location: userLocation} = useSelector(locationSelector)

  const onItemClick = (restaurantID) => {
    history.push(`/store/${restaurantID}`)
  }

  useEffect(() => {
    if (isAuthenticated)
      dispatch(fetchFavoriteRestaurant({}));
  }, [])

  useEffect(() => {
    if (fetchingError) {
      dispatch(showError(errorMessage));
      dispatch(clearFavRestaurantState());
    }
  }, [fetchingError])

  if (!isAuthenticated) {
    history.replace('/login', {ref: '/store/favorite'})
    dispatch(showInfo(`Bạn cần đăng nhập để tiếp tục`))
    return null
  }

  if (!lOK) {
    history.replace('/')
    return null
  }

  return (
    <Box mt={8} mx={2}>
      <TopNavigationBar label={`Nhà hàng yêu thích`} homeButton={false} isPending={isFetching}/>
      {fetchingSuccess && restaurants.map(({
                                             id,
                                             name,
                                             address,
                                             coverImageUrl,
                                             numRate,
                                             rating,
                                             merchantIdInPayPal,
                                             position
                                           }) => (
        <Box key={id} mb={2}>
          <RestaurantItemLarge description={address}
                               name={name}
                               image={coverImageUrl}
                               onClick={() => onItemClick(id)}
                               rating={rating}
                               numRate={numRate}
                               paypalId={merchantIdInPayPal}
                               location={position}
                               customerLocation={userLocation}
          />
        </Box>
      ))}
    </Box>
  )
}