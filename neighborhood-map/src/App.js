import React, { Component } from 'react';
import axios from 'axios';
import SideBar from './sidebar';
import './App.css';

class App extends Component {

  state = {
    restaurants: [],
    map: null,
    markers: [],
    infoWindows: [],
  }

  restaurants;

  componentDidMount() {
    window.initMap = this.initMap;
    this.getLocations();
  }

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
          this.restaurants = res.data.response.groups[0].items;
          this.setState({
            restaurants: res.data.response.groups[0].items
          }, loadScript());
        },
        err => {
         this.setState({
          loadingError: true,
          errorMsg: err
         });
        },
      );
  } 
  
  updateFilter = (event) => {
    this.setState({
      restaurants: this.restaurants.filter(restaurant => restaurant.venue.name.toLowerCase().includes(event.target.value))
    });
            
    this.state.markers.forEach(
      marker => {marker.setMap(null)}
    );
    this.state.markers = [];
    this.state.infoWindows = [];
    this.generateMarkerAndInfoWindow(this.state.map);
  }
  
  initMap = () => {
    let map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 40.7408666, lng: -73.9879822},
      zoom: 14
    });
    this.setState({map});
    this.generateMarkerAndInfoWindow(map);
  }

  generateMarkerAndInfoWindow(map) {
    this.state.restaurants.map(restaurant => {
      let contentString = `${restaurant.venue.name}`;
      let infowindow = new window.google.maps.InfoWindow({
        name:restaurant.venue.name,
        content: contentString
      });
      let marker = new window.google.maps.Marker({
        position: {lat: restaurant.venue.location.lat , lng: restaurant.venue.location.lng},
        animation: window.google.maps.Animation.DROP,
        map: map,
        title: restaurant.venue.name
      });
      this.state.infoWindows.push(infowindow);
      this.state.markers.push(marker);
      marker.addListener('click', function() {
        infowindow.open(map, marker)
      });
      
      
    });
  }

  render() {
    if (this.state.loadingError) {
      return (
        <div>
          <h4>Error loading locations {this.state.errorMsg}</h4>
        </div>
      )
    }
    return (
      <div>
        <SideBar 
          restaurants={this.state.restaurants} 
          markers={this.state.markers} 
          infoWindows={this.state.infoWindows}
          updateFilter={this.updateFilter}
          map={this.state.map}
        />
        <div id='map'></div>
      </div>
    )
  }
}

function loadScript() {
  let index = window.document.getElementsByTagName('script')[0];
  let script = window.document.createElement('script');
  script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyB1MDOJ_HnMOjWnnZUV0Vw8EBBYc-4FCGY&callback=initMap';
  script.async = true;
  script.defer = true;
  index.parentNode.insertBefore(script, index);
}

export default App;