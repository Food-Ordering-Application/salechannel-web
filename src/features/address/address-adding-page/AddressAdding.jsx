import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Box, ButtonBase, Divider, Grid, InputBase, Typography} from "@material-ui/core";
import TopNavigationBar from "../../common/TopNavigationBar";
import SearchIcon from "../../../asserts/icons/Search";
import AddressItem from "../address-management-page/components/AddressItem";
import LocationIcon from "../../../asserts/icons/Location";
import PlacesAutocomplete, {geocodeByAddress, getLatLng} from "react-places-autocomplete";
import AddressItemLarge from "./components/AddressItemLarge";
import Ribbon from "../../common/Ribbon";
import Spinner from "../../common/Spinner";
import {Link} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {},
  topNavigator: {
    position: `fixed`,
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
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
  }
}));

const mockedData = [
  `227 Nguyễn Văn Cừ, phường 4, quận 5, Thành phố Hồ Chính Minh`,
  `25 Nguyễn Trãi, phường 2, quận 5, Thành phố Hồ Chính Minh`,
  `26 Nguyễn Trãi, phường 2, quận 5, Thành phố Hồ Chính Minh`,
  `27 Nguyễn Trãi, phường 2, quận 5, Thành phố Hồ Chính Minh`,
]

export default function AddressAdding() {
  const classes = useStyles();
  const [suggestions, setSuggestion] = useState([]);
  const [isFetching, setFetching] = useState(false);
  const handleSearch = () => {
  };
  const [address, setAddress] = useState();
  const handleTextChange = (address) => setAddress(address);
  const handleSelect = (address) => {
    console.log(address);
    geocodeByAddress(address)
      .then((geocode) => getLatLng(geocode[0]))
      .then((location) => callAPI(address, location))
      .catch((error) => console.log(error));
  };
  const callAPI = (address, location) => {
    alert(`${address} ${JSON.stringify(location)}`);
  };

  const centerComponent = (
    <PlacesAutocomplete value={address}
                        onChange={handleTextChange}
                        onSelect={handleSelect}
                        debounce={2000}
    >
      {({getInputProps, suggestions, loading}) => {
        setFetching(loading);
        if (suggestions.length !== 0)
          setSuggestion(suggestions);
        return (
          <InputBase className={classes.input}
                     placeholder="Nhập địa chỉ"
                     fullWidth
                     {...getInputProps()}/>
        );
      }}
    </PlacesAutocomplete>
  );

  return (
    <Box mt={8} px={2}>
      <Box className={classes.topNavigator}>
        <TopNavigationBar rightIcon={isFetching ? Spinner : SearchIcon}
                          rightAction={handleSearch}
                          centerComponent={centerComponent}
        />
      </Box>
      <Box mb={1} display="flex" alignItems="flex-end" flexDirection="column">
        <ButtonBase component={Link} to="/address/add/current-location">
          <Grid container spacing={1}>
            <Grid item>
              <Typography variant="h4">
                <Box fontSize={12}>Lấy vị trí hiện tại</Box>
              </Typography>
            </Grid>
            <Grid item>
              <Box fontSize={18} color="primary.main" component={LocationIcon}/>
            </Grid>
          </Grid>
        </ButtonBase>
      </Box>
      <Box mb={2} hidden={suggestions.length === 0}>
        <Box mb={0.5}>
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
      <Box mb={1}>
        <Typography variant="h4">
          <Box fontSize={12} color="onSurface.mediumEmphasis">Địa chỉ đã lưu</Box>
        </Typography>
      </Box>
      {
        mockedData.map((data, index) => (
          <Box mb={2}>
            <AddressItem key={index} addressText={data}/>
          </Box>
        ))
      }
    </Box>
  );
}