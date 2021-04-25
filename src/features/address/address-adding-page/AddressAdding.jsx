import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Box, ButtonBase, Grid, InputBase, Typography} from "@material-ui/core";
import TopNavigationBar from "../../common/TopNavigationBar";
import SearchIcon from "../../../asserts/icons/Search";
import AddressItem from "../address-management-page/components/AddressItem";
import LocationIcon from "../../../asserts/icons/Location";

const useStyles = makeStyles((theme) => ({
  root: {},
  topNavigator: {
    position: `fixed`,
    top: 0,
    left: 0,
    right: 0,
  },
  input: {
    fontSize: theme.spacing(1.5),
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
  const handleSearch = () => {
    alert(`Developping...`);
  };
  const [address, setAddress] = useState();
  const handleTextChange = (event) => {
    setAddress(`${event.target.value}`);
  };

  return (
    <Box mt={8} px={2}>
      <Box className={classes.topNavigator}>
        <TopNavigationBar rightIcon={SearchIcon}
                          rightAction={handleSearch}
                          centerComponent={
                            <InputBase className={classes.input}
                                       placeholder="Nhập địa chỉ"
                                       onChange={handleTextChange}
                                       fullWidth/>
                          }
        />
      </Box>
      <Box mb={2}>
        <ButtonBase>
          <Grid container spacing={1}>
            <Grid item>
              <Box fontSize={18} color="primary.main" component={LocationIcon}/>
            </Grid>
            <Grid item>
              <Typography variant="h4">
                <Box fontSize={12}>Lấy vị trí hiện tại</Box>
              </Typography>
            </Grid>
          </Grid>
        </ButtonBase>
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