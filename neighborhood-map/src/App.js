import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import axios from 'axios';
import SideBar from './sidebar';
import './App.css';


class App extends Component {

  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    locations: []
  };

  componentDidMount() {
    this.getLocations()
  }
  locations;

  //gets location from foursquare api
  getLocations = () => {
  const api = 'https://api.foursquare.com/v2/venues/explore?';
  const parameters = new URLSearchParams({
    client_id: 'RMSS5KJD0JNRDQLDORWATPTX503FEYT2P4U5VXNXJKS2VDYJ',
    client_secret: '5QKMF1W1TLQVQSJ1SKQDXTM2FMWMYSM1NK45KNOH2CFP5NRX',
    query: 'restaurant',
    near: 'New York',
    v: '20182507'
  });

  axios.get(`${api}${parameters}` )
    .then(
      res => {
        this.locations = res.data.response.groups[0].items;
        this.setState({
          locations: res.data.response.groups[0].items
        });
      },
      err => {
        console.log('Error', err);
      },
    );
  }

  //display info window
  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  //used to filter locations
  updateFilter = (event) => {
    this.setState({
      locations: this.locations.filter(location => location.venue.name.toLowerCase().includes(event.target.value))
    });
  }
  

  //resets info window and activemarker
  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };

  render() {
    const displayLocations = this.state.locations.map(
      location => {
        const description = `<div>${location.venue.name}</div>`
        return (
        <Marker 
          key={location.venue.id}
          onClick={this.onMarkerClick}
          title={location.venue.categories[0].name}
          name= {location.venue.name}
          position={{
            lat: location.venue.location.lat,
            lng: location.venue.location.lng
          }}
        >
        </Marker>
      )}
    );
    return (
      <div>
        <SideBar locations={this.state.locations} updateFilter={this.updateFilter}/>
        <Map 
          google={this.props.google} 
          onClick={this.onMapClicked} 
          initialCenter={{
            lat: 40.75063,
            lng: -73.9941115
          }}
        >
          {displayLocations}
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}>
              <div>
                <h1>{this.state.selectedPlace.name}</h1>
              </div>
          </InfoWindow>
        </Map>
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyB1MDOJ_HnMOjWnnZUV0Vw8EBBYc-4FCGY')
})(App);
