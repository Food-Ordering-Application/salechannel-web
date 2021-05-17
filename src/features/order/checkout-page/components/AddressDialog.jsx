import {
  Box,
  Dialog,
  DialogTitle, Divider,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography
} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {addressSelector, fetchAddress} from "../../../address/AddressSlice";
import {useEffect} from "react";
import {userSelector} from "../../../user/UserSlice";
import {clearOrderState, orderSelector, updateAddress} from "../../OrderSlice";
import {Link} from "react-router-dom";
import {AddCircle} from "@material-ui/icons";

export default function AddressDialog({open, onClose}) {
  const {data: addresses, isPending: isFetchingAddress} = useSelector(addressSelector);
  const {id: userId} = useSelector(userSelector);
  const {data: {id: orderId}, isSuccess, isRequesting: isSubmittingAddress} = useSelector(orderSelector)
  const dispatch = useDispatch();

  useEffect(() => {
    if (open) {
      dispatch(fetchAddress({userId}));
    }
  }, [open]);

  useEffect(() => {
    if (isSuccess) {
      onClose();
      dispatch(clearOrderState());
    }
  }, [isSuccess]);

  const handleItemClick = (customerAddressId) => {
    dispatch(updateAddress({customerId: userId, orderId, customerAddressId}));
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle disableTypography>
        <Typography variant="h4">
          <Box textAlign="center" color="onSurface.highEmphasis">Địa chỉ nhận hàng</Box>
        </Typography>
      </DialogTitle>
      <Divider variant="fullWidth"/>
      <Box p={2} hidden={!isFetchingAddress}>
        <LinearProgress hidden={!isFetchingAddress}/>
      </Box>
      <Box hidden={isFetchingAddress}>
        <List>
          {addresses.map(({address, id}) => (
            <ListItem button key={id} onClick={() => handleItemClick(id)}>
              <ListItemText primary={address}/>
            </ListItem>
          ))}
          <Divider variant="fullWidth"/>
          <ListItem component={Link} to={`/address`}>
            <ListItemIcon>
              <AddCircle color="primary"/>
            </ListItemIcon>
            <ListItemText primary={`Thêm địa chỉ mới`}/>
          </ListItem>
        </List>
      </Box>
      <Box position="absolute" left={0} right={0} bottom={0} hidden={!isSubmittingAddress}>
        <LinearProgress/>
      </Box>
    </Dialog>
  );
}