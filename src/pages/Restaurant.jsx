import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import TopNavigationBar from "../components/TopNavigationBar";
import RestaurantInfoSumary from "../components/RestaurantInfoSumary";
import Label from "../components/Label";
import RecommendedMenuHorizontal from "../components/RecommendedMenuHorizontal";
import MenuVertical from "../components/MenuVertical";
import ScrollToShowBackground from "../components/ScrollToShowBackground";
import CategoryMenu from "../components/CategoryMenu";

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
      marginInline: `auto`,
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
      bottom: theme.spacing(2),
      left: 0,
      right: 0,
      display: `flex`,
      justifyContent: `center`,
      zIndex: 1,
    },
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

  const handleFavoriteChange = () => {
    const newInfo = {...info};
    newInfo.isFavorite = !info.isFavorite;
    setInfo(newInfo);
  }

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

      <div className={classes.fab}>
        <CategoryMenu categoryList={categoryList} onclick={(index) => alert(index)}/>
      </div>
      <img className={classes.cover} src={mockedData.cover} alt={mockedData.name}/>
      <div className={classes.content}>
        <div className={classes.info}>
          <RestaurantInfoSumary {...mockedData}/>
        </div>
        <div className={classes.label}>
          <Label uppercase>Recommended</Label>
        </div>
        <div className={classes.recommendMenu}>
          <RecommendedMenuHorizontal/>
        </div>
        <div className={classes.menu}>
          <MenuVertical productList={productList}/>
        </div>
      </div>
    </>
  );
}