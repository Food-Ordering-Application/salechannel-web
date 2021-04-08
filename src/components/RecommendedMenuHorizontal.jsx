import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {GridList} from "@material-ui/core";
import RecommendedItemMedium from "./RecommendedItemMedium";

const useStyles = makeStyles(theme=>({
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
    name: `Phở nhỏ`,
    image: `https://toplist.vn/images/800px/pho-bo-thai-can-347645.jpg`,
    price: 50000,
  },
  {
    name: `Phở nhỏ`,
    image: `https://toplist.vn/images/800px/pho-bo-thai-can-347645.jpg`,
    price: 50000,
  },
  {
    name: `Phở nhỏ`,
    image: `https://toplist.vn/images/800px/pho-bo-thai-can-347645.jpg`,
    price: 50000,
  },
  {
    name: `Phở nhỏ`,
    image: `https://toplist.vn/images/800px/pho-bo-thai-can-347645.jpg`,
    price: 50000,
  },
  {
    name: `Phở nhỏ`,
    image: `https://toplist.vn/images/800px/pho-bo-thai-can-347645.jpg`,
    price: 50000,
  },
  {
    name: `Phở nhỏ`,
    image: `https://toplist.vn/images/800px/pho-bo-thai-can-347645.jpg`,
    price: 50000,
  },
  {
    name: `Phở nhỏ`,
    image: `https://toplist.vn/images/800px/pho-bo-thai-can-347645.jpg`,
    price: 50000,
  },
];

export default function RecommendedMenuHorizontal(){
  const classes = useStyles();

  return(
    <div className={classes.root}>
      <GridList className={classes.gridList} cellHeight={'auto'} spacing={0}>
        {mockedData.map((data, index) => (
          <RecommendedItemMedium key={index} {...data}
                              onClick={() => alert('Clicked!')}/>
        ))}
      </GridList>
    </div>
  );
}