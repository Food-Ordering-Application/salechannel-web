import React, {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {throttle} from "lodash";

import {clearRestaurantsListState, filterRestaurant, restaurantsListSelector} from "../RestaurantsListSlice";
import {showError} from "../../common/Snackbar/SnackbarSlice";
import {Box, FormControl, Grid, InputBase, InputLabel, MenuItem, Select} from "@material-ui/core";
import RestaurantItemLarge from "../../../components/RestaurantItemLarge";
import {useHistory} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import TopNavigationBar from "../../common/TopNavigationBar";
import SearchIcon from "../../../asserts/icons/Search";
import Skeleton from "react-loading-skeleton";

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
  const [area, setArea] = useState("TPHCM");

  const [result, setResult] = useState(``);
  const [name, setName] = useState(``);

  const onAreaChange = (event) => {
    setArea(event.target.value);
    search();
  };

  const search = function () {
    dispatch(clearRestaurantsListState());
    dispatch(filterRestaurant({pageIndex: 1, area: area, name: name}));
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
        // temp.push(
        //   <Button key={"14225362"} onClick={() => {
        //     dispatch(clearRestaurantsListState());
        //     dispatch(filterRestaurant({pageIndex: 1, area: "TPHCM", name: name, append: true}));
        //   }}>Load more</Button>
        // );
        setResult(temp);
      }
      if (isFetching) {
        setResult(
          <Box mb={2}>
            {Array(10).fill(
              <Box mb={2}>
                <Skeleton height={82}/>
              </Box>
            )}
          </Box>
        );
      }
    }
    , [isError, isSuccess, isFetching]);

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
      <Box mt={8} mx={2}>
        <Box pb={2}>
          <Grid container justify="space-between">
            <Grid item xs>
              <FormControl variant="filled">
                <InputLabel id="demo-simple-select-label">Khu vực</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={area}
                  onChange={onAreaChange}
                >
                  <MenuItem value={`TPHCM`}>TP. Hồ Chí Minh</MenuItem>
                  <MenuItem value={`HANOI`}>Hà Hội</MenuItem>
                  <MenuItem value={`BACNINH`}>Bắc Ninh</MenuItem>
                  <MenuItem value={`LAMDONG`}>Lâm Đồng</MenuItem>
                  <MenuItem value={`BINHDUONG`}>Bình Dương</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs hidden>
              <FormControl variant="filled">
                <InputLabel id="demo-simple-select-label">Khu vực</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={area}
                  onChange={onAreaChange}
                >
                  <MenuItem value={`TPHCM`}>TP. Hồ Chí Minh</MenuItem>
                  <MenuItem value={`HANOI`}>Hà Hội</MenuItem>
                  <MenuItem value={`BACNINH`}>Bắc Ninh</MenuItem>
                  <MenuItem value={`LAMDONG`}>Lâm Đồng</MenuItem>
                  <MenuItem value={`BINHDUONG`}>Bình Dương</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
        <>{result}</>
      </Box>
    </Box>
  );
}