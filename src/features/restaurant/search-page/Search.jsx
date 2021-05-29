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

const useStyles = makeStyles((theme) => ({
  topNavigator: {
    position: `fixed`,
    top: 0,
    left: 0,
    right: 0,
  },
  textField: {
    fontSize: theme.spacing(1.5),
  },
  filterContainer: {
    position: "sticky",
    top: theme.spacing(6),
    backgroundColor: theme.palette.surface.light,
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
  const handleSearchButtonClick = () => search(name);
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

  useEffect(() => {
    if (data.length === 0) {
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
        </Box>
      </Collapse>
    </>
  );

  return (
    <Box>
      <TopNavigationBar rightIcon={SearchIcon}
                        rightAction={handleSearchButtonClick}
                        centerComponent={(
                          <InputBase className={classes.textField}
                                     placeholder="Tìm kiếm cửa hàng, món ăn"
                                     onChange={handleTextChange} fullWidth/>
                        )}
                        bottomComponent={bottomComponent}
      />
      <Box mt={12.75} mx={2}>
        {result}
      </Box>
    </Box>
  );
}