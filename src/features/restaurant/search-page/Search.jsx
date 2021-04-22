import React, {useEffect} from "react";
import {filterRestaurant, restaurantsListSelector} from "../RestaurantsListSlice";
import {useDispatch, useSelector} from "react-redux";
import {showError} from "../../common/Snackbar/SnackbarSlice";
import {Box, LinearProgress} from "@material-ui/core";
import RestaurantItemLarge from "../../../components/RestaurantItemLarge";

export default function Search() {
  const {restaurants, isFetching, isError, isSuccess, errorMessage} = useSelector(restaurantsListSelector);
  const dispatch = useDispatch();

  console.log(isFetching);

  useEffect(() => {
    dispatch(filterRestaurant({pageIndex: 1, area: "TPHCM", category: "CAFEDESSERT"}));
  }, []);

  useEffect(() => {
    if (isError) {
      dispatch(showError(errorMessage));
    }
  }, [isError, dispatch]);

  if (isSuccess) {
    console.log(restaurants);
    return (
      <Box>
        {
          restaurants.map(({name, address, coverImageUrl}, index) => (
            <RestaurantItemLarge key={index} name={`${name} - ${address}`} image={coverImageUrl}/>
          ))
        }
      </Box>
    );
  }

  return (
    <LinearProgress color="primary"/>
  );


}