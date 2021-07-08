import React, {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {throttle} from "lodash";

import {
  clearRestaurantsListState,
  filterRestaurant,
  restaurantsListSelector,
  setCategoryIds
} from "../RestaurantsListSlice";
import {showError} from "../../common/Snackbar/SnackbarSlice";
import {Box, InputBase} from "@material-ui/core";
import RestaurantItemLarge from "../../../components/RestaurantItemLarge";
import {useHistory} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import TopNavigationBar from "../../common/TopNavigationBar";
import SearchIcon from "../../../asserts/icons/Search";
import Skeleton from "react-loading-skeleton";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "../../common/Spinner";
import {metadataSelector} from "../../home/MetadataSlice";
import {locationSelector} from "../../home/LocationSlice";
import RestaurantFilter from "./components/Filter";
import PlaceHolder from "../../common/PlaceHolder";

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
  const {
    data: restaurants,
    isSuccess: rOK,
    isFetching,
    isError,
    errorMessage,
    categoryIds,
    sortId,
    filterIds,
    areaIds,
    hasMore
  } = useSelector(restaurantsListSelector);
  const {isSuccess: mReady, data: metadata} = useSelector(metadataSelector)
  const {isSuccess: lReady, location: userLocation} = useSelector(locationSelector)
  const dispatch = useDispatch();
  const history = useHistory();
  const [area, setArea] = useState("TPHCM");

  const [name, setName] = useState(``);

  const [page, setPage] = useState(1)

  const search = function (name, area) {
    dispatch(clearRestaurantsListState());
    setPage(1)
    dispatch(filterRestaurant({
      pageIndex: 1,
      area: area,
      categoryIds,
      name,
      sortId,
      filterIds,
      areaIds,
      cityId: metadata.city?.id,
      position: userLocation
    }));
  };

  const handleBack = () => {
    history.goBack()
    dispatch(setCategoryIds([]))
  }

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

  useEffect(() => {
    if (categoryIds?.length > 0)
      dispatch(filterRestaurant({
        pageIndex: 1,
        area: area,
        categoryIds,
        name,
        sortId,
        filterIds,
        areaIds,
        cityId: metadata.city?.id,
        position: userLocation
      }));
  }, [])

  if (!mReady || !lReady) {
    history.replace('/location/analyse', {ref: `/search`})
  }

  const centerComponent = (
    <InputBase className={classes.textField}
               placeholder="Tìm kiếm cửa hàng, món ăn"
               onChange={handleTextChange}
               onFocus={(e) => e.target.select()}
               value={name}
               fullWidth
               autoFocus
    />
  );

  return (
    <Box>
      <TopNavigationBar rightIcon={isFetching ? Spinner : SearchIcon}
                        rightAction={handleSearchButtonClick}
                        leftAction={handleBack}
                        centerComponent={centerComponent}
                        bottomComponent={<RestaurantFilter onSubmit={() => search(name, area)}/>}
      />
      {rOK && restaurants.length === 0 && (
        <PlaceHolder icon={SearchIcon} text={"Không tìm thấy nhà hàng"}/>
      )}
      <InfiniteScroll
        next={() => {
          setPage(page + 1)
          dispatch(filterRestaurant({
            pageIndex: page + 1,
            area: area,
            categoryIds,
            name,
            sortId,
            filterIds,
            areaIds,
            cityId: metadata.city?.id,
            position: userLocation,
            append: true,
          }));
        }}
        hasMore={hasMore}
        loader={<Skeleton height={82} count={10} className={classes.skeleton}/>}
        dataLength={restaurants.length}
        className={classes.container}
        scrollThreshold={0.60}
      >
        {restaurants.map(({id, name, address, coverImageUrl, rating, numRate, merchantIdInPayPal, position}) => (
          <Box key={id} mb={2}>
            <RestaurantItemLarge name={`${name}`}
                                 description={address}
                                 image={coverImageUrl}
                                 onClick={() => handleItemClick(id)}
                                 rating={rating}
                                 numRate={numRate}
                                 paypalId={merchantIdInPayPal}
                                 location={position}
                                 customerLocation={userLocation}
            />
          </Box>
        ))}
      </InfiniteScroll>
    </Box>
  );
}