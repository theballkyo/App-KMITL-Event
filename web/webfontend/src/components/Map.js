import React from 'react'
import {
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps"

const Map_ = withGoogleMap(props => (
  
  <GoogleMap
    defaultZoom={16}
    defaultCenter={{ lat: props.markers.length < 1 ? 13.7310109 : props.markers[0].position.lat, 
      lng: props.markers.length < 1 ? 100.7810176 : props.markers[0].position.lng}}
    onClick={props.onMapClick}
  >
  {props.markers.map(marker => (
    <Marker
      {...marker}
    />
  ))}
  </GoogleMap>
));

const Map = ({onClick, markers}) => (
  <Map_
    containerElement={
      <div style={{ height: `350px` }} />
    }
    mapElement={
      <div style={{ height: `100%` }} />
    }
    onMapClick={onClick}
    markers={markers}
  />
)
export default Map