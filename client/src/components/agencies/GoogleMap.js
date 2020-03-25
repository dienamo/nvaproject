import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import React from 'react'
 
export class MapContainer extends React.Component {
  render() {
    return (
      <Map google={this.props.google} zoom={10} initialCenter={{
        lat: 14.4974,
        lng: -16.46660948
      }}>
 
        <Marker onClick={this.onMarkerClick}
                name={'Current location'} />
 
        <InfoWindow onClose={this.onInfoWindowClose}>
            <div>
              <h1>place</h1>
            </div>
        </InfoWindow>
      </Map>
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: ""
})(MapContainer)