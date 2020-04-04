import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import React from 'react'
 
export class MapContainer extends React.Component {
  render() {
    
    if(!this.props.agencymap) return 'Chargement...'
    const lat = this.props.agencymap[0]
    const lng = this.props.agencymap[1]
    return (
      <div style={{ height: '56vh', width: '100%' , position:'relative'}}>
      <Map google={this.props.google} zoom={14} initialCenter={{
        lat: lat,
        lng: lng
      }}>
 
        <Marker 
                name={'Current location'} />
 
        <InfoWindow onClose={this.onInfoWindowClose}>
            <div>
              <h1>place</h1>
            </div>
        </InfoWindow>
      </Map>
      </div>
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: ""
})(MapContainer)