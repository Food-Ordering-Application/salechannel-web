import React, {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {throttle} from "lodash";

import {clearRestaurantsListState, filterRestaurant, restaurantsListSelector} from "../RestaurantsListSlice";
import {showError} from "../../common/Snackbar/SnackbarSlice";
import {Box, Collapse, Divider, FormControl, Grid, InputBase, MenuItem, Select, Typography} from "@material-ui/core";
import RestaurantItemLarge from "../../../components/RestaurantItemLarge";
import {useHistory} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import TopNavigationBar from "../../common/TopNavigationBar";
import SearchIcon from "../../../asserts/icons/Search";
import Skeleton from "react-loading-skeleton";
import {areaConstant} from "../../../constants/areaConstant";
import FilterTitle from "./components/FilterTitle";
import Ribbon from "../../common/Ribbon";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "../../common/Spinner";

const useStyles = makeStyles((theme) => ({
  container: {
    margin: theme.spacing(12, 2, 2, 2),
  },
  skeleton: {
    marginBottom: theme.spacing(2),
  },
  textField: {
    fontSize: theme.spacing(1.5),
    borderRadius: theme.spacing(2),
    padding: theme.spacing(0, 2),
    backgroundColor: theme.palette.stateBlackOverlay.hover,
  },
  filterContainer: {
    position: "sticky",
    top: theme.spacing(6),
    backgroundColor: theme.palette.surface.light,
  }
}));

export default function Search() {
  const classes = useStyles();
  const {data: restaurants, isFetching, isError, errorMessage} = useSelector(restaurantsListSelector);
  const dispatch = useDispatch();
  const history = useHistory();
  const [area, setArea] = useState("TPHCM");

  const [name, setName] = useState(``);
  const [open, setOpen] = useState(false);

  const onAreaChange = (event) => {
    const text = `${event.target.value}`;
    setOpen(false);
    setArea(text);
    search(name, text);
  };

  const search = function (name, area) {
    dispatch(clearRestaurantsListState());
    dispatch(filterRestaurant({pageIndex: 1, area: area, name: name}));
  };

  const handleItemClick = (id) => history.push(`/store/${id}`);
  const handleSearchButtonClick = () => search(name, area);
  const handleTextChange = (event) => setName(`${event.target.value}`);
  const throttleSearch = useCallback(
    throttle(
      (name, area) => {
        search(name, area);
      },
      2000,
      {"leading": false}
    ),
    []
  );

  useEffect(function () {
    if (restaurants.length === 0) {
      search(``, area);
      //Cache history result when back from details
    }
  }, []);

  useEffect(function () {
    if (name && area)
      throttleSearch(name, area);
  }, [name]);

  useEffect(() => {
      if (isError) {
        dispatch(showError(errorMessage));
        dispatch(clearRestaurantsListState());
      }
    }
    , [isError]);

  const centerComponent = (
    <InputBase className={classes.textField}
               placeholder="Tìm kiếm cửa hàng, món ăn"
               onChange={handleTextChange}
               fullWidth
    />
  );

  const bottomComponent = (
    <>
      <Ribbon onClick={() => setOpen(!open)}>
        <Box mx={2} pb={1}>
          <Grid container alignItems="center" justify="flex-end">
            <Grid item xs>
              <FilterTitle>{areaConstant[area].name}</FilterTitle>
            </Grid>
            <Grid item>
              <Typography variant="h4">
                <Box fontSize={14} color="primary.main">Nâng cao</Box>
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Ribbon>
      <Collapse in={open}>
        <Divider variant="fullWidth" light/>
        <Box mt={2} mb={2} mx={2}>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <Typography variant="h4">
                <Box fontSize={14}>Khu vực</Box>
              </Typography>
            </Grid>
            <Grid item xs>
              <FormControl fullWidth>
                <Select value={area}
                        onChange={onAreaChange}
                >
                  {Object.keys(areaConstant).map((code) => (
                    <MenuItem key={code}
                              value={code}
                              children={areaConstant[code].name}/>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <Typography variant="h4">
                <Box fontSize={14}>Khu vực</Box>
              </Typography>
            </Grid>
            <Grid item xs>
              <FormControl fullWidth>
                <Select value={area}
                        onChange={onAreaChange}
                >
                  {Object.keys(areaConstant).map((code) => (
                    <MenuItem key={code}
                              value={code}
                              children={areaConstant[code].name}/>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
      </Collapse>
    </>
  );

  return (
    <Box>
      <TopNavigationBar rightIcon={isFetching ? Spinner : SearchIcon}
                        rightAction={handleSearchButtonClick}
                        centerComponent={centerComponent}
                        bottomComponent={bottomComponent}
      />
      <InfiniteScroll
        next={() => dispatch(filterRestaurant({append: true, pageIndex: 1, area: area, name: ""}))}
        hasMore={false}
        loader={<Skeleton height={82} count={10} className={classes.skeleton}/>}
        dataLength={restaurants.length}
        className={classes.container}
      >
        {restaurants.map(({id, name, address, coverImageUrl, rating}, index) => (
          <Box key={index} mb={2}>
            <RestaurantItemLarge name={`${name} - ${address}`}
                                 image={coverImageUrl}
                                 onClick={() => handleItemClick(id)}
                                 rating={rating}
            />
          </Box>
        ))}
      </InfiniteScroll>
    </Box>
  );
}