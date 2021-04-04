import React from "react";
import {GridList, makeStyles} from "@material-ui/core";
import FavoriteItemMedium from "./FavoriteItemMedium";

const useStyle = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: 'transparent',
    },
    list: {
      flexWrap: 'nowrap',
      transform: 'translateZ(0)',
    },
  })
);

const mockedData = [
  {
    image: 'https://i.pinimg.com/originals/b9/bf/79/b9bf79c3ec7c034cf0322fb691eefb60.jpg',
    title: 'Món ăn ưa thích của bạn',
  },
  {
    image: 'https://i.pinimg.com/originals/b9/bf/79/b9bf79c3ec7c034cf0322fb691eefb60.jpg',
    title: 'Món ăn ưa thích của bạn',
  },
  {
    image: 'https://i.pinimg.com/originals/b9/bf/79/b9bf79c3ec7c034cf0322fb691eefb60.jpg',
    title: 'Món ăn ưa thích của bạn',
  },
  {
    image: 'https://i.pinimg.com/originals/b9/bf/79/b9bf79c3ec7c034cf0322fb691eefb60.jpg',
    title: 'Món ăn ưa thích của bạn',
  },
  {
    image: 'https://i.pinimg.com/originals/b9/bf/79/b9bf79c3ec7c034cf0322fb691eefb60.jpg',
    title: 'Món ăn ưa thích của bạn',
  },
]

export default function FavoriteListHorizontal() {
  const classes = useStyle();
  return (
    <div className={classes.root}>
      <GridList className={classes.list} spacing={0} >
        {mockedData.map((data, index) =>
          <FavoriteItemMedium
            key={index}
            {...data}
            onClick={() => alert('Clicked!')}
          />
        )}
      </GridList>
    </div>
  );
}