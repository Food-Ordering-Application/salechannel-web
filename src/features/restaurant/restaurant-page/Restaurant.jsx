import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import TopNavigationBar from "../../../components/TopNavigationBar";
import RestaurantInfoSumary from "../../../components/RestaurantInfoSumary";
import Label from "../../../components/Label";
import RecommendedMenuHorizontal from "../../../components/RecommendedMenuHorizontal";
import MenuVertical from "../../../components/MenuVertical";
import ScrollToShowBackground from "../../../components/ScrollToShowBackground";
import CategoryMenu from "../../../components/CategoryMenu";
import {Box, LinearProgress} from "@material-ui/core";
import CartSummaryBottom from "../../../components/CartSummaryBottom";
import theme from "../../../asserts/Theme";
import {fetchRestaurant, restaurantSelector} from "../RestaurantSlice";
import {showError} from "../../common/Snackbar/SnackbarSlice";

const useStyles = makeStyles(theme => ({
    container: {},
    root: {},
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
    content: {
      transform: `translateY(-60px)`,
      width: `100%`,
      zIndex: 10,
    },
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
    }
  })
);

const mockedData = {
  name: `Nhà hàng hải sản cá Trend - Nguyễn Văn Cừ`,
  distance: 1.2,
  address: `224 Nguyễn Văn Cừ, Phường 4, Quận 5, Thành phố Hồ Chí Minh`,
  cover: `https://images.foody.vn/res/g21/208155/prof/s576x330/foody-mobile-img_0954-jpg-344-635947742274439596.jpg`,
  isFavorite: true,
}

const productList = {
  "Tráng miệng": [
    {
      name: `Cơm gà xối mỡ`,
      description: `Cam, Soda, Hoa cúc`,
      price: 59000,
      image: `https://hoangviettravel.vn/wp-content/uploads/2020/10/com-ga-xoi-mo-quan12.jpg`,
    },
    {
      name: `Cơm gà xối mỡ`,
      description: `Cam, Soda, Hoa cúc`,
      price: 59000,
      image: `https://hoangviettravel.vn/wp-content/uploads/2020/10/com-ga-xoi-mo-quan12.jpg`,
    },
    {
      name: `Cơm gà xối mỡ`,
      description: `Cam, Soda, Hoa cúc`,
      price: 59000,
      image: `https://hoangviettravel.vn/wp-content/uploads/2020/10/com-ga-xoi-mo-quan12.jpg`,
    },
    {
      name: `Cơm gà xối mỡ`,
      description: `Cam, Soda, Hoa cúc`,
      price: 59000,
      image: `https://hoangviettravel.vn/wp-content/uploads/2020/10/com-ga-xoi-mo-quan12.jpg`,
    },
    {
      name: `Cơm gà xối mỡ`,
      description: `Cam, Soda, Hoa cúc`,
      price: 59000,
      image: `https://hoangviettravel.vn/wp-content/uploads/2020/10/com-ga-xoi-mo-quan12.jpg`,
    },
  ],
  "Món đặc trưng": [
    {
      name: `Cơm gà xối mỡ`,
      description: `Cam, Soda, Hoa cúc`,
      price: 59000,
      image: `https://hoangviettravel.vn/wp-content/uploads/2020/10/com-ga-xoi-mo-quan12.jpg`,
    },
    {
      name: `Cơm gà xối mỡ`,
      description: `Cam, Soda, Hoa cúc`,
      price: 59000,
      image: `https://hoangviettravel.vn/wp-content/uploads/2020/10/com-ga-xoi-mo-quan12.jpg`,
    },
    {
      name: `Cơm gà xối mỡ`,
      description: `Cam, Soda, Hoa cúc`,
      price: 59000,
      image: `https://hoangviettravel.vn/wp-content/uploads/2020/10/com-ga-xoi-mo-quan12.jpg`,
    },
    {
      name: `Cơm gà xối mỡ`,
      description: `Cam, Soda, Hoa cúc`,
      price: 59000,
      image: `https://hoangviettravel.vn/wp-content/uploads/2020/10/com-ga-xoi-mo-quan12.jpg`,
    },
    {
      name: `Cơm gà xối mỡ`,
      description: `Cam, Soda, Hoa cúc`,
      price: 59000,
      image: `https://hoangviettravel.vn/wp-content/uploads/2020/10/com-ga-xoi-mo-quan12.jpg`,
    },
    {
      name: `Cơm gà xối mỡ`,
      description: `Cam, Soda, Hoa cúc`,
      price: 59000,
      image: `https://hoangviettravel.vn/wp-content/uploads/2020/10/com-ga-xoi-mo-quan12.jpg`,
    },
  ],
  "Thức uống": [
    {
      name: `Cơm gà xối mỡ`,
      description: `Cam, Soda, Hoa cúc`,
      price: 59000,
      image: `https://hoangviettravel.vn/wp-content/uploads/2020/10/com-ga-xoi-mo-quan12.jpg`,
    },
    {
      name: `Cơm gà xối mỡ`,
      description: `Cam, Soda, Hoa cúc`,
      price: 59000,
      image: `https://hoangviettravel.vn/wp-content/uploads/2020/10/com-ga-xoi-mo-quan12.jpg`,
    },
    {
      name: `Cơm gà xối mỡ`,
      description: `Cam, Soda, Hoa cúc`,
      price: 59000,
      image: `https://hoangviettravel.vn/wp-content/uploads/2020/10/com-ga-xoi-mo-quan12.jpg`,
    },
    {
      name: `Cơm gà xối mỡ`,
      description: `Cam, Soda, Hoa cúc`,
      price: 59000,
      image: `https://hoangviettravel.vn/wp-content/uploads/2020/10/com-ga-xoi-mo-quan12.jpg`,
    },
  ],
};

const categoryList = Object.keys(productList).map(name => ({name: name, count: productList[name].length}));

export default function Restaurant() {
  const classes = useStyles();
  const [info, setInfo] = useState(mockedData);
  const [cart, setToCart] = useState([]);
  const {restaurant, isFetching, isError, isSuccess, errorMessage} = useSelector(restaurantSelector);
  const dispatch = useDispatch();
  const {id} = useParams();
  console.log(id);

  const handleFavoriteChange = () => {
    const newInfo = {...info};
    newInfo.isFavorite = !info.isFavorite;
    setInfo(newInfo);
  };
  const handleAddToCart = (product) => {
    const newCart = [...cart, product];
    setToCart(newCart);
  }

  useEffect(() => {
    dispatch(fetchRestaurant({id: id}));
  }, []);

  useEffect(() => {
    if (isError)
      dispatch(showError(errorMessage));
  }, [isError]);

  if (isSuccess)
    return (
      <>
        <ScrollToShowBackground>
          <div className={classes.topNavigationBar}>
            <TopNavigationBar
              onFavoriteClick={handleFavoriteChange}
              {...info}
            />
          </div>
        </ScrollToShowBackground>
        <Box className={classes.fab} bottom={cart.length > 0 ? theme.spacing(8) : theme.spacing(2)}>
          <CategoryMenu categoryList={categoryList} onclick={(index) => alert(index)}/>
        </Box>
        <Box className={classes.cart} display={cart.length > 0 ? `flex` : `none`}>
          <CartSummaryBottom cart={cart}/>
        </Box>

        <img className={classes.cover} src={restaurant.coverImageUrl} alt={mockedData.name}/>
        <div className={classes.content}>
          <div className={classes.info}>
            <RestaurantInfoSumary name={`${restaurant.name} - ${restaurant.address}`}
                                  address={restaurant.address}
                                  distance={2.5}
            />
          </div>
          <div className={classes.label}>
            <Label uppercase>Recommended</Label>
          </div>
          <div className={classes.recommendMenu}>
            <RecommendedMenuHorizontal/>
          </div>
          <div>{JSON.stringify(restaurant)}</div>
          <div className={classes.menu}>
            <MenuVertical productList={productList} onAddToCart={handleAddToCart}/>
          </div>
        </div>
      </>
    );

  return <LinearProgress color="primary"/>
}