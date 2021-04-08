import React from "react";
import {makeStyles} from "@material-ui/core/styles";

import RestaurantItemLarge from "./RestaurantItemLarge";
import {useHistory} from "react-router-dom";


const useStyles = makeStyles(theme => ({
    item: {
      marginBottom: theme.spacing(2),
    },
  })
);

const mockedData = [
  {
    image: 'https://i.pinimg.com/originals/b9/bf/79/b9bf79c3ec7c034cf0322fb691eefb60.jpg',
    name: 'Nhà hàng Trend',
    description: 'Cam, Soda, Hoa cúc',
    rating: 5,
    timeToPrepare: 15,
    averagePrice: 59000,
  },
  {
    image: 'https://i.pinimg.com/originals/b9/bf/79/b9bf79c3ec7c034cf0322fb691eefb60.jpg',
    name: 'Nhà hàng Trend',
    description: 'Cam, Soda, Hoa cúc',
    rating: 5,
    timeToPrepare: 15,
    averagePrice: 59000,
  },
  {
    image: 'https://i.pinimg.com/originals/b9/bf/79/b9bf79c3ec7c034cf0322fb691eefb60.jpg',
    name: 'Nhà hàng Trend',
    description: 'Cam, Soda, Hoa cúc',
    rating: 5,
    timeToPrepare: 15,
    averagePrice: 59000,
  },
  {
    image: 'https://i.pinimg.com/originals/b9/bf/79/b9bf79c3ec7c034cf0322fb691eefb60.jpg',
    name: 'Nhà hàng Trend',
    description: 'Cam, Soda, Hoa cúc',
    rating: 5,
    timeToPrepare: 15,
    averagePrice: 59000,
  },
  {
    image: 'https://i.pinimg.com/originals/b9/bf/79/b9bf79c3ec7c034cf0322fb691eefb60.jpg',
    name: 'Nhà hàng Trend',
    description: 'Cam, Soda, Hoa cúc',
    rating: 5,
    timeToPrepare: 15,
    averagePrice: 59000,
  },
];

export default function RestaurantListVertical() {
  const classes = useStyles();
  const history = useHistory();

  return (
    mockedData.map((data, index) => (
        <div key={index} className={classes.item}>
          <RestaurantItemLarge {...data} onClick={() => history.push(`/store`)}/>
        </div>
      )
    )
  );
}