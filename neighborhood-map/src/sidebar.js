import React, { Component } from 'react';
import {slide as Menu } from 'react-burger-menu';

class SideBar extends Component {

    state = {
        restaurants: [],
        filter: '',
        displayLocations: [],
        markers: [],
        infoWindows: [],
        map: null
    }

    componentWillReceiveProps(props){
        this.setState({
            restaurants: props.restaurants,
            updateFilter: props.updateFilter,
            markers: props.markers,
            infoWindows: props.infoWindows,
            map: props.map
        });
    }

    openMarker(name) {
        this.state.markers.forEach(
            marker => {
                if (name === marker.title) {
                    this.state.infoWindows.forEach(
                        infoWindow => {
                            if (marker.title === infoWindow.name) {
                                infoWindow.open(this.state.map, marker);
                            }
                        }
                    )
                }
            }
        )
    }

    render(){
        const displayLocation = this.state.restaurants.map(
            (restaurant, index) => (
                <li aria-label='location name' key={restaurant.referralId} onClick={() => {this.openMarker(restaurant.venue.name)}} value={restaurant.venue.name} tabIndex={index+1}>
                    {restaurant.venue.name}
                </li>
            )
        )
        return (
            <Menu>
                <form>
                    <label>
                        <h3>Search</h3>
                        <input tabIndex="0" type='text' name='searchLocation' onChange={this.props? this.props.updateFilter : 0} aria-labelledby="Search Box"/>
                        <ol>
                            {displayLocation}
                        </ol>
                    </label>
                </form>

            </Menu>
        );
    }
}

export default SideBar;