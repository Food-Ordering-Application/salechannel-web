import {Dialog, DialogTitle, List, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {addressSelector, fetchAddress} from "../../../address/AddressSlice";
import {useEffect} from "react";
import {userSelector} from "../../../user/UserSlice";
import {clearOrderState, orderSelector, updateAddress} from "../../OrderSlice";
import {Link} from "react-router-dom";
import {AddCircle} from "@material-ui/icons";

export default function AddressDialog({open, onClose}) {
  const {data: addresses} = useSelector(addressSelector);
  const {id: userId} = useSelector(userSelector);
  const {data: {id: orderId}, isSuccess} = useSelector(orderSelector)
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
      <DialogTitle>Địa chỉ nhận hàng</DialogTitle>
      <List>
        {addresses.map(({address, id}) => (
          <ListItem button key={id} onClick={() => handleItemClick(id)}>
            <ListItemText primary={address}/>
          </ListItem>
        ))}
        <ListItem component={Link} to={`/address`}>
          <ListItemIcon>
            <AddCircle color="primary"/>
          </ListItemIcon>
          <ListItemText primary={`Thêm địa chỉ mới`}/>
        </ListItem>
      </List>
    </Dialog>
  );
}