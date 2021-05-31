import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Box, ButtonBase, Divider, Grid, InputBase, Typography} from "@material-ui/core";
import TopNavigationBar from "../../common/TopNavigationBar";
import SearchIcon from "../../../asserts/icons/Search";
import PlacesAutocomplete, {geocodeByAddress, getLatLng} from "react-places-autocomplete";
import AddressItemLarge from "./components/AddressItemLarge";
import Ribbon from "../../common/Ribbon";
import Spinner from "../../common/Spinner";
import {Link, useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {addAddress, addressSelector, clearAddressState} from "../AddressSlice";
import {userSelector} from "../../user/UserSlice";
import {showError} from "../../common/Snackbar/SnackbarSlice";
import {EditLocationOutlined, GpsFixed} from "@material-ui/icons";
import PlaceHolder from "../../common/PlaceHolder";

const useStyles = makeStyles((theme) => ({
  input: {
    fontSize: theme.spacing(1.5),
    lineHeight: `${theme.spacing(2.5)}px`,
    width: `100%`,
  },
  dropdownContainer: {
    width: `inherit`,
    position: `absolute`,
    zIndex: 1,
    backgroundColor: "aliceblue",
  },
  placeHolder: {
    height: `50vh`,
  }
}));

export default function AddressAdding() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const {id: userId} = useSelector(userSelector);
  const {isPending, isSuccess, isError, errorMessage} = useSelector(addressSelector);

  const [suggestions, setSuggestion] = useState([]);
  const [isFetching, setFetching] = useState(false);
  const handleSearch = () => {
  };
  const [address, setAddress] = useState(``);
  const handleTextChange = (address) => setAddress(address);
  const handleSelect = (address) => {
    geocodeByAddress(address)
      .then((geocode) => getLatLng(geocode[0]))
      .then((location) => submitAddress(address, location))
      .catch((error) => console.log(error));
  };

  const submitAddress = (address, location) => {
    const {lng: longitude, lat: latitude} = location;
    dispatch(addAddress({userId, address, longitude, latitude}));
  };

  useEffect(() => {
    if (isError) {
      dispatch(showError(errorMessage));
      dispatch(clearAddressState());
    }
    if (isSuccess) {
      dispatch(clearAddressState());
      history.goBack();
    }
  }, [dispatch, isError, isSuccess]);

  const centerComponent = (
    <PlacesAutocomplete value={address}
                        onChange={handleTextChange}
                        onSelect={handleSelect}
                        debounce={1000}
    >
      {({getInputProps, suggestions, loading}) => {
        setFetching(loading);
        if (suggestions.length !== 0)
          setSuggestion(suggestions);
        return (
          <InputBase className={classes.input}
                     placeholder="Nhập địa chỉ"
                     autoFocus={true}
                     fullWidth
                     {...getInputProps()}/>
        );
      }}
    </PlacesAutocomplete>
  );

  return (
    <Box mt={8} px={2}>
      <TopNavigationBar rightIcon={isFetching ? Spinner : SearchIcon}
                        rightAction={handleSearch}
                        centerComponent={centerComponent}
                        isPending={isPending}
      />
      <Box mb={1} display="flex" alignItems="flex-end" flexDirection="column">
        <ButtonBase component={Link} to="/address/add/current-location">
          <Grid container spacing={1}>
            <Grid item>
              <Typography variant="h4">
                <Box fontSize={12}>Lấy vị trí hiện tại</Box>
              </Typography>
            </Grid>
            <Grid item>
              <Box fontSize={18} color="primary.main" component={GpsFixed}/>
            </Grid>
          </Grid>
        </ButtonBase>
      </Box>
      <Box hidden={suggestions.length === 0}>
        <Box mb={2}>
          <Typography variant="h4">
            <Box fontSize={12} color="onSurface.mediumEmphasis">Địa chỉ gợi ý</Box>
          </Typography>
        </Box>
        {suggestions.map(({placeId, description, formattedSuggestion: {mainText, secondaryText}}) => (
          <Ribbon key={placeId} onClick={() => handleSelect(description)}>
            <AddressItemLarge primaryText={mainText} secondaryText={secondaryText}/>
            <Divider variant="fullWidth"/>
          </Ribbon>
        ))}
      </Box>
      <Box hidden={suggestions.length > 0}>
        <PlaceHolder icon={EditLocationOutlined} text="Nhập địa chỉ đi bạn ơi"/>
      </Box>
    </Box>
  );
}