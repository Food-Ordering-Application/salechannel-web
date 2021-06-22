import React from 'react';
import {GridList, makeStyles} from '@material-ui/core';
import CategoryItemMedium from "./CategoryItemMedium";
import {useDispatch, useSelector} from "react-redux";
import {metadataSelector} from "../features/home/MetadataSlice";
import {setCategoryIds} from "../features/restaurant/RestaurantsListSlice";
import {useHistory} from "react-router-dom";


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
)

export default function CategoryListHorizontal() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()
  const {isSuccess, data} = useSelector(metadataSelector)

  if (!isSuccess) return null

  const {categories} = data;

  return (
    <div className={classes.root}>
      <GridList className={classes.gridList} cellHeight={'auto'} spacing={0}>
        {categories.map((data) => (
          <CategoryItemMedium
            key={data?.id}
            image={data?.iconUrl}
            name={data?.name}
            onClick={() => {
              dispatch(setCategoryIds([data.id]))
              history.push(`search`)
            }}
          />
        ))}
      </GridList>
    </div>
  );
}
