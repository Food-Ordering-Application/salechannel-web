import React from 'react';
import {GoogleApiWrapper, Map} from 'google-maps-react';

export function MapContainer({centerLocation, ...props}) {
  return (
    <div id='googleMaps'>
      <Map
        google={props.google}
        initialCenter={centerLocation}
        center={centerLocation}
        onClick={(data) => console.log(data)}
        {...props}
      >
        {props.children}
      </Map>
    </div>
  )
}

export default GoogleApiWrapper({
  apiKey: `${process.env.REACT_APP_GOOGLE_API_KEY}`
})(MapContainer);