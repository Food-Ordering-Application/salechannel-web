import React from "react";
import {makeStyles} from "@material-ui/core/styles";

import RestaurantItemLarge from "./RestaurantItemLarge";
import {useHistory} from "react-router-dom";
import {useSelector} from "react-redux";
import {metadataSelector} from "../features/home/MetadataSlice";
import {locationSelector} from "../features/home/LocationSlice";


const useStyles = makeStyles(theme => ({
    item: {
      marginBottom: theme.spacing(2),
    },
  })
);

export default function RestaurantListVertical() {
  const classes = useStyles()
  const history = useHistory()
  const {isSuccess: mOk, data} = useSelector(metadataSelector)
  const {isSuccess: lOk, location: userLocation} = useSelector(locationSelector)
  if (!mOk || !lOk) return null

  const {restaurants} = data

  return (
    restaurants.map((data) => (
        <div key={data?.id} className={classes.item}>
          <RestaurantItemLarge
            rating={data?.rating}
            description={data?.address}
            name={`${data?.name}`}
            image={data?.coverImageUrl}
            location={data?.position}
            customerLocation={userLocation}
            paypalId={data?.merchantIdInPayPal}
            onClick={() => history.push(`/store/${data?.id}`)}/>
        </div>
      )
    )
  );
}