import React from 'react';
import {makeStyles, GridList} from '@material-ui/core';
import CategoryItemMedium from "./CategoryItemMedium";


const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      flexWrap: 'nowrap',
      transform: 'translateZ(0)',
    },
  })
);

const mockedData = [
  {
    image: 'https://i.pinimg.com/originals/b9/bf/79/b9bf79c3ec7c034cf0322fb691eefb60.jpg',
    name: 'Hamburger',
  },
  {
    image: 'https://i.pinimg.com/originals/b9/bf/79/b9bf79c3ec7c034cf0322fb691eefb60.jpg',
    name: 'Combo',
  },
  {
    image: 'https://i.pinimg.com/originals/b9/bf/79/b9bf79c3ec7c034cf0322fb691eefb60.jpg',
    name: 'Pizza',
  },
  {
    image: 'https://i.pinimg.com/originals/b9/bf/79/b9bf79c3ec7c034cf0322fb691eefb60.jpg',
    name: 'Hot dog',
  },
  {
    image: 'https://i.pinimg.com/originals/b9/bf/79/b9bf79c3ec7c034cf0322fb691eefb60.jpg',
    name: 'Hamburger',
  },
  {
    image: 'https://i.pinimg.com/originals/b9/bf/79/b9bf79c3ec7c034cf0322fb691eefb60.jpg',
    name: 'Hamburger',
  },
]

export default function CategoryListHorizontal() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GridList className={classes.gridList} cellHeight={'auto'} spacing={0}>
        {mockedData.map((data, index) => (
          <CategoryItemMedium key={index} {...data}
                              onClick={() => alert('Clicked!')}/>
        ))}
      </GridList>
    </div>
  );
}
