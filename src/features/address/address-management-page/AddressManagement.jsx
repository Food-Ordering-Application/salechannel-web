import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Box} from "@material-ui/core";
import TopNavigationBar from "../../common/TopNavigationBar";
import AddressItem from "./components/AddressItem";
import BottomButton from "../../common/BottomButton";
import {Link} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  topNavigator: {
    position: `fixed`,
    top: 0,
    left: 0,
    right: 0,
  },
  bottomButton: {
    position: `fixed`,
    bottom: 0,
    left: 0,
    right: 0,
    padding: theme.spacing(0, 2, 2, 2),
  },

}));

const mockedData = [
  `227 Nguyễn Văn Cừ, phường 4, quận 5, Thành phố Hồ Chí Minh`,
  `25 Nguyễn Trãi, phường 2, quận 5, Thành phố Hồ Chí Minh`,
  `26 Nguyễn Trãi, phường 2, quận 5, Thành phố Hồ Chí Minh`,
  `27 Nguyễn Trãi, phường 2, quận 5, Thành phố Hồ Chí Minh`,
];

export default function AddressManagement() {
  const classes = useStyles();
  const [address, setAddress] = useState(mockedData);

  const handleDeleteAddress = (index) => {
    const newState = [...address];
    newState.splice(index, 1);
    setAddress(newState);
  }

  return (
    <Box my={8} mx={2}>
      <Box className={classes.topNavigator}>
        <TopNavigationBar label="Địa chỉ giao hàng"/>
      </Box>
      {
        address.map((data, index) => (
          <Box pb={2}>
            <AddressItem key={index}
                         addressText={data}
                         deleteAction={() => handleDeleteAddress(index)}/>
          </Box>
        ))
      }
      <Box className={classes.bottomButton}>
        <BottomButton variant="contained" component={Link} to={"/address/add"}>
          Thêm địa chỉ mới
        </BottomButton>
      </Box>
    </Box>
  );
}