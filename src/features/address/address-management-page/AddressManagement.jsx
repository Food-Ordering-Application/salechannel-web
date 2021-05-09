import React, {useEffect} from "react";
import {Box} from "@material-ui/core";
import TopNavigationBar from "../../common/TopNavigationBar";
import AddressItem from "./components/AddressItem";
import BottomButton from "../../common/BottomButton";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {addressSelector, clearAddressState, deleteAddress, fetchAddress} from "../AddressSlice";
import {userSelector} from "../../user/UserSlice";
import {showError} from "../../common/Snackbar/SnackbarSlice";
import PlaceHolder from "../../common/PlaceHolder";
import LocationIcon from "../../../asserts/icons/Location";

export default function AddressManagement() {
  const dispatch = useDispatch();
  const {id: userId} = useSelector(userSelector);
  const {data: address, isPending, isSuccess, isError, errorMessage} = useSelector(addressSelector);

  const handleDeleteAddress = (addressId) => {
    dispatch(deleteAddress({userId, addressId}));
  };

  useEffect(() => {
    dispatch(fetchAddress({userId}));
  }, [userId, dispatch]);

  useEffect(() => {
    if (isError) {
      dispatch(showError(errorMessage));
      dispatch(clearAddressState());
    }
    if (isSuccess) {
      dispatch(clearAddressState());
    }
  }, [isError, isSuccess, dispatch]);

  return (
    <Box my={6} mx={2}>
      <TopNavigationBar label="Địa chỉ giao hàng" isPending={isPending}/>
      <Box pt={2}>
        {address.map((data) => (
          <Box mb={2} key={data.id}>
            <AddressItem addressText={data.address}
                         deleteAction={() => handleDeleteAddress(data.id)}/>
          </Box>
        ))}
      </Box>
      <Box hidden={address.length > 0}>
        <PlaceHolder icon={LocationIcon} text="Bạn chưa lưu địa chỉ nào"/>
      </Box>
      <BottomButton variant="contained" component={Link} to="/address/add">
        Thêm địa chỉ mới
      </BottomButton>
    </Box>
  );
}