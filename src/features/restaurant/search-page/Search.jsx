import React, {useCallback, useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {throttle} from "lodash";

import {clearRestaurantsListState, filterRestaurant, restaurantsListSelector} from "../RestaurantsListSlice";
import {showError} from "../../common/Snackbar/SnackbarSlice";
import {Box, Button, InputBase} from "@material-ui/core";
import RestaurantItemLarge from "../../../components/RestaurantItemLarge";
import {useHistory} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import TopNavigationBar from "../../common/TopNavigationBar";
import SearchIcon from "../../../asserts/icons/Search";

const useStyles = makeStyles((theme) => ({
  topNavigator: {
    position: `fixed`,
    top: 0,
    left: 0,
    right: 0,
  },
  textField: {
    fontSize: theme.spacing(1.5),
  }
}));

export default function Search() {
  const classes = useStyles();
  const {data, isError, isSuccess, isFetching, errorMessage} = useSelector(restaurantsListSelector);
  const dispatch = useDispatch();
  const history = useHistory();

  const [result, setResult] = useState(``);
  const [name, setName] = useState(``);

  const ref = useRef();

  const search = (name) => {
    dispatch(clearRestaurantsListState());
    dispatch(filterRestaurant({pageIndex: 1, area: "TPHCM", name: name}));
  };

  const handleItemClick = (id) => history.push(`/store/${id}`);
  const handleSearchButtonClick = () => search(name);
  const handleTextChange = (event) => setName(`${event.target.value}`);
  const throttleSearch = useCallback(
    throttle(
      (name) => search(name),
      2000,
      {"leading": false}
    ),
    []
  );

  useEffect(() => {
    if (data.length === 0) {
      search();
      //Cache history result when back from details
    }
  }, []);

  useEffect(() => {
    if (name && name.length !== 0)
      throttleSearch(name);
  }, [name]);

  useEffect(() => {
      if (isError) {
        dispatch(showError(errorMessage));
      }
      if (isSuccess) {
        const temp = data.map(({id, name, address, coverImageUrl, rating}, index) => (
          <Box mb={2}>
            <RestaurantItemLarge key={index}
                                 name={`${name} - ${address}`}
                                 image={coverImageUrl}
                                 onClick={() => handleItemClick(id)}
                                 rating={rating}
            />
          </Box>
        ));
        temp.push(
          <Button key={"14225362"} onClick={() => {
            dispatch(clearRestaurantsListState());
            dispatch(filterRestaurant({pageIndex: 1, area: "TPHCM", name: name, append: true}));
          }}>Load more</Button>
        );
        setResult(temp);
      }
    }
    , [isError, isSuccess]);

  return (
    <Box>
      <TopNavigationBar rightIcon={SearchIcon}
                        rightAction={handleSearchButtonClick}
                        centerComponent={(
                          <InputBase className={classes.textField}
                                     placeholder="Tìm kiếm cửa hàng, món ăn"
                                     onChange={handleTextChange} fullWidth/>
                        )}
      />
      <Box mt={8} mx={2}>{result}</Box>
    </Box>
  );
}