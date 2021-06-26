import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Box, Button, Dialog, DialogContent, Grid, IconButton, Slide, Typography} from "@material-ui/core";
import {HighlightOff} from "@material-ui/icons";
import theme from "../../../asserts/Theme";
import QuantityButtonGroup from "../../../components/QuantityButtonGroup";
import {currencyFormatter} from "../../../untils/formatter";
import ToppingGroup from "./components/ToppingGroup";
import {useDispatch, useSelector} from "react-redux";
import {addItem, clearOrderState, createOrder, orderSelector} from "../../order/OrderSlice";
import {userSelector} from "../../user/UserSlice";
import {restaurantSelector} from "../RestaurantSlice";
import {showError, showInfo} from "../../common/Snackbar/SnackbarSlice";
import Skeleton from "react-loading-skeleton";
import {useHistory, useLocation} from "react-router-dom";

const useStyles = makeStyles(theme => ({
    root: {},
    contentRoot: {
      padding: 0,
      marginBottom: theme.spacing(7),
      "&:first-child": {
        padding: 0,
      }
    },
    dialog: {
      width: `100%`,
      borderRadius: theme.spacing(2, 2, 0, 0),
      margin: 0,
      alignSelf: `flex-end`,
    },
    image: {
      maxHeight: theme.spacing(34),
      width: `100%`,
      objectFit: `cover`,
    },
    exit: {
      position: `absolute`,
      top: 0,
      left: 0,
      color: theme.palette.surface.light,
    },
    actionBottom: {
      position: `absolute`,
      bottom: 0,
      left: 0,
      right: 0,
      background: `white`,
    }
  })
);

const Transition = React.forwardRef((props, thisRef) => {
  return <Slide direction="up" {...props} ref={thisRef} timeout={{enter: 450, exit: 650}}/>;
});

export default function ProductDetail({open, handleClose, product, onSubmit, isPending}) {
  const {price: basePrice, toppingGroups} = product;
  const classes = useStyles();
  const [value, setValue] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [pricePerUnit, setPricePerUnit] = useState(basePrice);
  const [toppings, setToppings] = useState([]);
  const {id: userId, isAuthenticated} = useSelector(userSelector);
  const {restaurant} = useSelector(restaurantSelector);
  const orderState = useSelector(orderSelector);
  const dispatch = useDispatch();
  const history = useHistory()
  const location = useLocation()


  useEffect(() => {
    if (open) {
      document
        .getElementById(`top`)
        ?.scrollIntoView();
    }
  }, [open]);

  useEffect(() => {
    setPricePerUnit(basePrice);
  }, [basePrice]);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      dispatch(showInfo(`Bạn cần đăng nhập để tiếp tục!`))
      history.replace({
        pathname: `/login`,
        state: {ref: location.pathname}
      });
      return
    }
    onSubmit({
      name: product.name,
      quantity: quantity,
      price: pricePerUnit,
    });
    const menuItem = {...product, quantity};
    if (orderState.isEmpty) {
      dispatch(createOrder({userId, restaurantId: restaurant.id, menuItem, topping: toppings}));
    } else {
      dispatch(addItem({orderId: orderState.data.id, menuItem, topping: toppings}));
    }
    handleClose();
    setQuantity(1);
    setToppings([]);
  };

  useEffect(() => {
    if (orderState.isError) {
      dispatch(showError(orderState.errorMessage));
      dispatch(clearOrderState());
    }
    if (orderState.isSuccess) {
      dispatch(clearOrderState());
    }
  }, [orderState.isError, orderState.isSuccess]);

  const handleToppingChange = (groupIndex, selectedToppings) => {
    const newArr = [...toppings];
    newArr[groupIndex] = selectedToppings;
    setToppings(newArr);

    let toppingPrice = 0;
    for (let i = 0; i < newArr.length; i++) {
      for (let j = 0; newArr[i] && (j < newArr[i].length); j++) {
        toppingPrice += newArr[i][j].price;
      }
    }

    setPricePerUnit(basePrice + toppingPrice);
  }

  // const RadioButtonLabel = ({name, price}) => (
  //   <Box width={1} display="flex" alignItems="center">
  //     <Box flexGrow={1}>
  //       <Typography variant="h6">
  //         <Box fontSize={11}>{name}</Box>
  //       </Typography>
  //     </Box>
  //     <Box>
  //       <Typography variant="h6">
  //         <Box fontSize={14} color="onSurface.disabled">{currencyFormatter(price)}</Box>
  //       </Typography>
  //     </Box>
  //   </Box>
  // );

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
      classes={{paper: classes.dialog}}
    >
      <DialogContent className={classes.contentRoot}>
        <IconButton className={classes.exit} onClick={handleClose}>
          <HighlightOff/>
        </IconButton>
        <div id={`top`}/>
        <img className={classes.image}
             alt={product.name}
             src={product.imageUrl}/>
        <Box id="container" p={2}>
          <Box id="Label" pb={2} display="flex" alignItems="center">
            <Box flexGrow={1}>
              <Typography variant="h4">
                <Box fontSize={16}>{product.name}</Box>
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6">
                <Box fontSize={14} color="onSurface.disabled">{currencyFormatter(product.price)}</Box>
              </Typography>
            </Box>
          </Box>

          {
            isPending
              ? (<Box mx={-2}>
                <Skeleton count={9} height={40}/>
              </Box>)
              : (<Box mx={-2}>
                  {toppingGroups.map((data, index) => <ToppingGroup key={data.id}
                                                                    toppingGroup={data}
                                                                    onChange={(selectedToppings) => handleToppingChange(index, selectedToppings)}/>
                  )}
                </Box>
              )
          }

          {/*<Box id="Options" hidden>*/}
          {/*  <RadioGroup value={value} onChange={handleChange}>{*/}
          {/*    product.toppingGroups[0].toppingItems.map(({description, price}, index) => (*/}
          {/*      <>*/}
          {/*        <StyledFormControlLabel key={index}*/}
          {/*                                value={description}*/}
          {/*                                control={<Radio color="primary"/>}*/}
          {/*                                label={<RadioButtonLabel name={description} price={price}/>}/>*/}
          {/*        <Box mx={-2}>*/}
          {/*          <Divider variant="fullWidth"/>*/}
          {/*        </Box>*/}
          {/*      </>*/}
          {/*    ))*/}
          {/*  }</RadioGroup>*/}
          {/*</Box>*/}
          <div className={classes.actionBottom}>
            <Box p={2}>
              <Grid container spacing={2} alignItems={`center`}>
                <Grid item>
                  <QuantityButtonGroup value={quantity} onChange={(value) => setQuantity(value)}/>
                </Grid>
                <Grid item xs>
                  <Button color="primary"
                          variant="contained"
                          fullWidth
                          style={{borderRadius: theme.spacing(1)}}
                          onClick={handleAddToCart}
                  >
                    <Typography variant="h3">
                      <Box fontSize={theme.spacing(2)} color={`onPrimary.highEmphasis`}>
                        {`Thêm ● ${currencyFormatter(quantity * pricePerUnit)}`}
                      </Box>
                    </Typography>
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </div>
        </Box>
      </DialogContent>
    </Dialog>
  );
}