import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Box, ButtonBase, Divider, Grid, InputBase, Typography} from "@material-ui/core";
import TopNavigationBar from "../../common/TopNavigationBar";
import SearchIcon from "../../../asserts/icons/Search";
import PlacesAutocomplete, {geocodeByAddress, getLatLng} from "react-places-autocomplete";
import Spinner from "../../common/Spinner";
import {Link, useHistory, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {addAddress, addressSelector, clearAddressState} from "../AddressSlice";
import {userSelector} from "../../user/UserSlice";
import {showError} from "../../common/Snackbar/SnackbarSlice";
import {EditLocationOutlined, GpsFixed} from "@material-ui/icons";
import PlaceHolder from "../../common/PlaceHolder";
// import {addressToLocationV2, autoCompleteV2} from "../../../helpers/location";
import Ribbon from "../../common/Ribbon";
import AddressItemLarge from "./components/AddressItemLarge";
import {setDefaultLocation} from "../../home/LocationSlice";
import {addressToLocationV2} from "../../../helpers/location";
// import * as PropTypes from "prop-types";

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
  const location = useLocation()
  // const [text, setText] = useState('');
  const {id: userId, isAuthenticated} = useSelector(userSelector);
  const {isPending, isSuccess, isError, errorMessage} = useSelector(addressSelector);

  const [suggestions, setSuggestion] = useState([]);
  const [isFetching, setFetching] = useState(false);
  const handleSearch = () => {
  };
  const [address, setAddress] = useState(``);
  const handleTextChange = (address) => setAddress(address);
  const handleSelect = (address) => {
    addressToLocationV2(String(address)).then((data) => {
      const location = data.items[0]?.position || {lat: 10.762511912115652, lng: 106.68161304112337};
      submitAddress(address, location)
    })
    geocodeByAddress(address)
      .then((geocode) => getLatLng(geocode[0]))
      .then((location) => submitAddress(address, location))
      .catch((error) => console.log(error));
    // addressToLocationV2(address)
    //   .then(({items}) => {
    //     submitAddress(address, items[0]?.position)
    //   })
    //   .catch((e) => {
    //     console.log(e)
    //     history.goBack()
    //   })
  };

  const submitAddress = (address, location) => {
    const {lng: longitude, lat: latitude} = location;
    if (isAuthenticated) {
      dispatch(addAddress({userId, address, longitude, latitude}));
    } else {
      dispatch(setDefaultLocation({address, location: {longitude, latitude}}))
    }
  };

  useEffect(() => {
    if (isError) {
      dispatch(showError(errorMessage));
      dispatch(clearAddressState());
    }
    if (isSuccess) {
      dispatch(clearAddressState());
      if (location.state?.ref) {
        history.replace(location.state.ref);
      } else {
        history.goBack()
      }
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

  // useEffect(async () => {
  //   try {
  //     if (text?.length > 0 && text.length % 5 === 0) {
  //       setFetching(true)
  //       const data = await autoCompleteV2(String(text))
  //       setSuggestion(data.items)
  //     }
  //   } catch (e) {
  //     console.log(e)
  //   } finally {
  //     setFetching(false)
  //   }
  // }, [text])

  // const centerComponent = (
  //   <InputBase
  //     value={text}
  //     onChange={e => setText(String(e.target.value))}
  //     placeholder={"Nhập địa chỉ"}
  //   />
  // )

  return (
    <Box mt={8} px={2}>
      <TopNavigationBar rightIcon={isFetching ? Spinner : SearchIcon}
                        rightAction={handleSearch}
                        centerComponent={centerComponent}
                        isPending={isPending}
      />
      {isAuthenticated && (
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
      )}
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
        {/*  suggestions.length !== 0 && suggestions.map(({address: {label, street}}, index) => (*/}
        {/*    <Ribbon key={index} onClick={() => handleSelect(label)}>*/}
        {/*      <AddressItemLarge primaryText={street} secondaryText={label}/>*/}
        {/*      <Divider variant="fullWidth"/>*/}
        {/*    </Ribbon>*/}
        {/*  ))*/}
        {/*}*/}
      </Box>
      <Box hidden={suggestions.length > 0}>
        <PlaceHolder icon={EditLocationOutlined} text="Nhập địa chỉ đi bạn ơi"/>
      </Box>
    </Box>
  );
}