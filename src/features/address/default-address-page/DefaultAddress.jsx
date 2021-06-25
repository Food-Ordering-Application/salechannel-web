import {Box, Divider, InputBase, Typography} from "@material-ui/core";
import TopNavigationBar from "../../common/TopNavigationBar";
import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import SearchIcon from "../../../asserts/icons/Search";
import Spinner from "../../common/Spinner";
import Ribbon from "../../common/Ribbon";
import AddressItemLarge from "../address-adding-page/components/AddressItemLarge";
import {addressToLocationV2, autoCompleteV2} from "../../../helpers/location";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import {setDefaultLocation} from "../../home/LocationSlice";
import {clearMetadataState} from "../../home/MetadataSlice";

const useStyles = makeStyles((theme) => ({
  searchField: {
    backgroundColor: theme.palette.stateBlackOverlay.pressed,
    borderRadius: "25px",
    display: "flex",
    flexDirection: "row",
  },
  input: {
    padding: theme.spacing(0.5),
    color: theme.palette.gray.l2,
  },
  icon: {
    padding: theme.spacing(1),
    color: theme.palette.gray.l2,
  }
}))

export default function DefaultAddress() {

  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()

  const [isLoading, setLoading] = useState(false)
  const [isSaving, setSaving] = useState(false)

  const [text, setText] = useState('')
  const [suggestions, setSuggestion] = useState([])

  const handleSelect = (address) => {
    setSaving(true)
    addressToLocationV2(address)
      .then(({items}) => {
        dispatch(setDefaultLocation({address, location: items[0]?.position}))
        dispatch(clearMetadataState())
      })
      .catch((e) => {
        console.log(e)
      })
      .finally(() => {
        setSaving(false)
        history.replace(`/location/analyse`);
      })
  }

  useEffect(() => {
    if (text?.length > 0 && text.length % 5 === 0) {
      setLoading(true)
      autoCompleteV2(String(text))
        .then((data) => {
          setSuggestion(data.items)
        })
        .catch((e) => {
          console.log(e)
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [text])

  return (
    <Box mt={6}>
      <TopNavigationBar label={"Địa chỉ giao hàng"} homeButton={false} isPending={isSaving}/>
      <Box p={2}>
        <div className={classes.searchField}>
          <Box className={classes.icon} component={isLoading ? Spinner : SearchIcon}/>
          <InputBase
            className={classes.input}
            placeholder={"Nhập địa chỉ"}
            onChange={(event) => setText(String(event.target.value))}
            fullWidth
            autoFocus
          />
        </div>
      </Box>
      {suggestions.length !== 0 && (
        <Box m={2}>
          <Typography variant="h4">
            <Box fontSize={12} color="onSurface.mediumEmphasis">Địa chỉ gợi ý</Box>
          </Typography>
          <Box mt={2}>
            {suggestions.length !== 0 && suggestions.map(({address: {label, street}}, index) => (
              <Ribbon key={index} onClick={() => handleSelect(label)}>
                <AddressItemLarge primaryText={street} secondaryText={label}/>
                <Divider variant="fullWidth"/>
              </Ribbon>
            ))}
          </Box>
        </Box>)}
    </Box>
  )
}