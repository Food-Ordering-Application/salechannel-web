import React from 'react';
import {GoogleApiWrapper, Map} from 'google-maps-react';

const styles = {
  position: `relative`,
  width: `100%`,
  height: `50vh`,
};

export function MapContainer({centerLocation, ...props}) {

  return (
    <div id='googleMaps'>
      <Map
        google={props.google}
        initialCenter={centerLocation}
        center={centerLocation}
        {...props}
        containerStyle={styles}
        visible={true}
      >
        {props.children}
      </Map>
    </div>
  )
}

const RestaurantLocation = GoogleApiWrapper({
  apiKey: `${process.env.REACT_APP_GOOGLE_API_KEY}`
})(MapContainer);

export default RestaurantLocation;