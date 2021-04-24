import React, {useEffect} from "react";
import {filterRestaurant, restaurantsListSelector} from "../RestaurantsListSlice";
import {useDispatch, useSelector} from "react-redux";
import {showError} from "../../common/Snackbar/SnackbarSlice";
import {Box, LinearProgress} from "@material-ui/core";
import RestaurantItemLarge from "../../../components/RestaurantItemLarge";
import {useHistory} from "react-router-dom";

export default function Search() {
  const {restaurants, isError, isSuccess, errorMessage} = useSelector(restaurantsListSelector);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleItemClick = (id) => {
    history.push(`/store/${id}`);
  }

  useEffect(() => {
    dispatch(filterRestaurant({pageIndex: 1, area: "TPHCM", category: "CAFEDESSERT"}));
  }, []);

  useEffect(() => {
    if (isError) {
      dispatch(showError(errorMessage));
    }
  }, [isError, dispatch]);

  if (isSuccess) {
    return (
      <Box>
        {
          restaurants.map(({id, name, address, coverImageUrl}, index) => (
            <RestaurantItemLarge key={index}
                                 name={`${name} - ${address}`}
                                 image={coverImageUrl}
                                 onClick={() => handleItemClick(id)}
            />
          ))
        }
      </Box>
    );
  }

  return (
    <LinearProgress color="primary"/>
  );


}