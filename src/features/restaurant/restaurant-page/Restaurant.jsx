import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {useDispatch, useSelector} from "react-redux";
import {useHistory, useParams} from "react-router-dom";
import TopNavigationBar from "../../../components/TopNavigationBar";
import RestaurantInfoSumary from "../../../components/RestaurantInfoSumary";
import MenuVertical from "../../../components/MenuVertical";
import ScrollToShowBackground from "../../../components/ScrollToShowBackground";
import CategoryMenu from "../../../components/CategoryMenu";
import {Box, LinearProgress} from "@material-ui/core";
import CartSummaryBottom from "../../../components/CartSummaryBottom";
import theme from "../../../asserts/Theme";
import {clearRestaurantState, fetchRestaurant, restaurantSelector, setFavoriteRestaurant} from "../RestaurantSlice";
import {showError} from "../../common/Snackbar/SnackbarSlice";
import {clearMenuState, fetchMenu, menuSelector} from "../MenuSlice";
import {clearOrder, fetchOrder, orderSelector} from "../../order/OrderSlice";
import {userSelector} from "../../user/UserSlice";
import RestaurantClosedAlert from "./components/RestaurantCloseAlert";
import OutForDeliveryAlert from "./components/OutForDeliveryAlert";

const useStyles = makeStyles(theme => ({
    topNavigationBar: {
      position: `fixed`,
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1,
    },
    cover: {
      width: `100%`,
    },
    content: ({cartIsAppear}) => ({
      transform: `translateY(-60px)`,
      width: `100%`,
      zIndex: 10,
      marginBottom: cartIsAppear ? theme.spacing(6) : theme.spacing(2)
    }),
    info: {
      margin: `0 auto`,
    },
    label: {
      padding: theme.spacing(2),
    },
    recommendMenu: {
      padding: theme.spacing(0, 0),
    },
    menu: {
      padding: theme.spacing(1, 2),
    },
    fab: {
      position: `fixed`,
      left: 0,
      right: 0,
      display: `flex`,
      justifyContent: `center`,
      zIndex: 1,
    },
    cart: {
      position: `fixed`,
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 5,
      display: `flex`,
    }
  })
);

export default function Restaurant() {
  const [cart, setToCart] = useState([]);
  const {id: customerId, isAuthenticated} = useSelector(userSelector);
  const restaurant = useSelector(restaurantSelector);
  const menu = useSelector(menuSelector);
  const {isEmpty: cartIsEmpty, data: cartData, isCreating} = useSelector(orderSelector);
  const orderState = useSelector(orderSelector);
  const history = useHistory();
  const dispatch = useDispatch();
  const {id} = useParams();
  const classes = useStyles({cartIsAppear: !cartIsEmpty});

  const handleFavoriteChange = () => {
    const isFavorite = restaurant.restaurant?.isFavorite;
    const restaurantId = restaurant.restaurant?.id;
    dispatch(setFavoriteRestaurant({restaurantId, isFavorite: !isFavorite}));
  };
  const handleAddToCart = (product) => {
    const newCart = [...cart, product];
    setToCart(newCart);
  };

  /*
  HANDLE CONSTANT
   */

  useEffect(() => {
    dispatch(clearRestaurantState());
    dispatch(clearMenuState());
    dispatch(clearOrder());
    dispatch(fetchRestaurant({id: id}));
    dispatch(fetchMenu({id: id}));
    if (isAuthenticated) {
      dispatch(fetchOrder({restaurantId: id, customerId: customerId}));
    }
  }, [id]);

  /*
  HANDLE ERROR
   */

  useEffect(() => {
    if (restaurant.isError) {
      dispatch(showError(restaurant.errorMessage));
      dispatch(clearRestaurantState());
      history.replace(`/search`);
    }
    if (menu.isError) {
      dispatch(showError(menu.errorMessage));
      dispatch(clearMenuState());
      history.replace(`/search`);
    }
  }, [restaurant.isError, menu.isError]);

  if (restaurant.isSuccess && menu.isSuccess) {
    const categoryMenu = menu.menu.map(category => ({name: category.name, count: category.menuItems.length}));
    const restaurantData = restaurant.restaurant;
    const distance = null;
    return (
      <>
        <ScrollToShowBackground>
          <div className={classes.topNavigationBar}>
            <TopNavigationBar
              onFavoriteClick={handleFavoriteChange}
              isFavorite={restaurant.restaurant?.isFavorite}
            />
          </div>
        </ScrollToShowBackground>
        <Box className={classes.fab} bottom={cartIsEmpty > 0 ? theme.spacing(2) : theme.spacing(8)}>
          <CategoryMenu categoryList={categoryMenu} onclick={(index) => alert(index)}/>
        </Box>
        <Box className={classes.cart}>
          {(!cartIsEmpty || isCreating) &&
          <CartSummaryBottom isLoading={isCreating} cart={cartData} toCheckout={`/checkout/${id}`}/>}
        </Box>

        <img className={classes.cover} src={restaurantData.coverImageUrl} alt={restaurantData.name}/>
        <div className={classes.content}>
          <div className={classes.info}>
            <RestaurantInfoSumary id={restaurantData["id"]}
                                  name={restaurantData?.name}
                                  address={restaurantData?.address}
                                  distance={distance}
            />
          </div>
          {/*<div className={classes.label}>*/}
          {/*  <Label uppercase>Recommended</Label>*/}
          {/*</div>*/}
          {/*<div className={classes.recommendMenu}>*/}
          {/*  <RecommendedMenuHorizontal/>*/}
          {/*</div>*/}
          <div className={classes.menu}>
            <MenuVertical productList={menu.menu}
                          onAddToCart={handleAddToCart}
                          orderItems={(orderState.data && orderState.data.orderItems) || []}/>
          </div>
          <RestaurantClosedAlert open={!restaurant.isOpen}/>
          <OutForDeliveryAlert open={!restaurant?.isAbleToDelivery}/>
        </div>
      </>
    );
  }

  return (
    <LinearProgress color="primary"/>
  )
}