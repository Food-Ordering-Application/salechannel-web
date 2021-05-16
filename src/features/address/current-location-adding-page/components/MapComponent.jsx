import React, {useState} from "react";
import GoogleMapReact from "google-map-react";
import MarkerComponent from "./MarkerComponent";
import {getAddress} from "../../../../helpers/location";

const config = {
  key: process.env.REACT_APP_GOOGLE_API_KEY,
  language: `vi`,
  region: `VN`,
};

const center = {
  lat: 59.95,
  lng: 30.33,
};

export default function MapComponent() {
  const [cord, setCord] = useState(center);
  const [address, setAddress] = useState(``);

  return (
    <div style={{width: `100%`, height: `100vh`}}>
      <GoogleMapReact bootstrapURLKeys={config}
                      defaultCenter={center}
                      defaultZoom={16}
                      onClick={({lat, lng}) => {
                        setAddress(``);
                        setCord({lat, lng});
                        getAddress(lng, lat).then(({results}) => setAddress(results[0].formatted_address));
                      }}>
        <MarkerComponent lat={cord.lat} lng={cord.lng} address={address}/>
      </GoogleMapReact>
    </div>
  );
}