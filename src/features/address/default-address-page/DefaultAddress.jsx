// import {Box, Divider, InputBase, Typography} from "@material-ui/core";
// import TopNavigationBar from "../../common/TopNavigationBar";
// import React, {useEffect, useState} from "react";
// import {makeStyles} from "@material-ui/core/styles";
// import SearchIcon from "../../../asserts/icons/Search";
// import Spinner from "../../common/Spinner";
// import Ribbon from "../../common/Ribbon";
// import AddressItemLarge from "../address-adding-page/components/AddressItemLarge";
// import {addressToLocationV2, autoCompleteV2} from "../../../helpers/location";
// import {useDispatch} from "react-redux";
// import {useHistory} from "react-router-dom";
// import {setDefaultLocation} from "../../home/LocationSlice";
// import {clearMetadataState} from "../../home/MetadataSlice";
//
// const useStyles = makeStyles((theme) => ({
//   searchField: {
//     backgroundColor: theme.palette.stateBlackOverlay.pressed,
//     borderRadius: "25px",
//     display: "flex",
//     flexDirection: "row",
//   },
//   input: {
//     padding: theme.spacing(0.5),
//     color: theme.palette.gray.l2,
//   },
//   icon: {
//     padding: theme.spacing(1),
//     color: theme.palette.gray.l2,
//   }
// }))
//
// export default function DefaultAddress() {
//
//   const classes = useStyles()
//   const dispatch = useDispatch()
//   const history = useHistory()
//
//   const [isLoading, setLoading] = useState(false)
//   const [isSaving, setSaving] = useState(false)
//
//   const [text, setText] = useState('')
//   const [suggestions, setSuggestion] = useState([])
//
//   const handleSelect = (address) => {
//     setSaving(true)
//     addressToLocationV2(address)
//       .then(({items}) => {
//         dispatch(setDefaultLocation({address, location: items[0]?.position}))
//         dispatch(clearMetadataState())
//       })
//       .catch((e) => {
//         console.log(e)
//       })
//       .finally(() => {
//         setSaving(false)
//         history.replace(`/location/analyse`);
//       })
//   }
//
//   useEffect(() => {
//     if (text?.length > 0 && text.length % 5 === 0) {
//       setLoading(true)
//       autoCompleteV2(String(text))
//         .then((data) => {
//           setSuggestion(data.items)
//         })
//         .catch((e) => {
//           console.log(e)
//         })
//         .finally(() => {
//           setLoading(false)
//         })
//     }
//   }, [text])
//
//   return (
//     <Box mt={6}>
//       <TopNavigationBar label={"Địa chỉ giao hàng"} homeButton={false} isPending={isSaving}/>
//       <Box p={2}>
//         <div className={classes.searchField}>
//           <Box className={classes.icon} component={isLoading ? Spinner : SearchIcon}/>
//           <InputBase
//             className={classes.input}
//             placeholder={"Nhập địa chỉ"}
//             onChange={(event) => setText(String(event.target.value))}
//             fullWidth
//             autoFocus
//           />
//         </div>
//       </Box>
//       {suggestions.length !== 0 && (
//         <Box m={2}>
//           <Typography variant="h4">
//             <Box fontSize={12} color="onSurface.mediumEmphasis">Địa chỉ gợi ý</Box>
//           </Typography>
//           <Box mt={2}>
//             {suggestions.length !== 0 && suggestions.map(({address: {label, street}}, index) => (
//               <Ribbon key={index} onClick={() => handleSelect(label)}>
//                 <AddressItemLarge primaryText={street} secondaryText={label}/>
//                 <Divider variant="fullWidth"/>
//               </Ribbon>
//             ))}
//           </Box>
//         </Box>)}
//     </Box>
//   )
// }

import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Box, ButtonBase, Divider, Grid, InputBase, Typography} from "@material-ui/core";
import TopNavigationBar from "../../common/TopNavigationBar";
import SearchIcon from "../../../asserts/icons/Search";
import PlacesAutocomplete, {geocodeByAddress, getLatLng} from "react-places-autocomplete";
import Spinner from "../../common/Spinner";
import {Link, useHistory, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {addAddress, addressSelector, clearAddressState, fetchAddress} from "../AddressSlice";
import {userSelector} from "../../user/UserSlice";
import {showError} from "../../common/Snackbar/SnackbarSlice";
import {EditLocationOutlined, GpsFixed} from "@material-ui/icons";
import PlaceHolder from "../../common/PlaceHolder";
import Ribbon from "../../common/Ribbon";
import AddressItemLarge from "../address-adding-page/components/AddressItemLarge";
import {clearLocationState, setDefaultLocation} from "../../home/LocationSlice";
import {SystemApi} from "../../../api/SystemApi";
import {clearMetadataState} from "../../home/MetadataSlice";

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

export default function DefaultAddress() {
  // HOOK
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()
  // GLOBAL STATE
  const {id: userId, isAuthenticated} = useSelector(userSelector)
  const {isPending, isSuccess, isError, errorMessage, data: addresses} = useSelector(addressSelector)
  // LOCAL STATE
  const [suggestions, setSuggestion] = useState([])
  const [isFetching, setFetching] = useState(false)
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
    // if (isSuccess) {
    //   dispatch(clearAddressState());
    //   if (location.state?.ref) {
    //     history.replace(location.state?.ref);
    //   } else {
    //     history.goBack()
    //   }
    // }
  }, [dispatch, isError]);

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

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchAddress({userId}))
    }
  }, [])

  if (isAuthenticated) {
    return (
      <Box mt={8} mx={2}>
        <TopNavigationBar label="Giao hàng đến" isPending={isPending}/>
        {isSuccess && (addresses.map((data) => (
            <Ribbon key={data?.id} onClick={() => {
              SystemApi
                .setDefaultAddress(userId, data?.id)
                .then(() => {
                  dispatch(clearLocationState())
                  dispatch(clearMetadataState())
                  history.replace('/')
                })
                .catch((e) => {
                  console.log(e)
                  dispatch(showError("Lỗi khi đặt địa chỉ mặc định"))
                })
            }}>
              <AddressItemLarge primaryText={data?.address}/>
              <Divider variant="fullWidth"/>
            </Ribbon>
          ))
        )}
      </Box>
    )
  }

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
      </Box>
      <Box hidden={suggestions.length > 0}>
        <PlaceHolder icon={EditLocationOutlined} text="Nhập địa chỉ đi bạn ơi"/>
      </Box>
    </Box>
  );
}