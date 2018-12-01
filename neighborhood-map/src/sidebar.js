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
        console.log(props);
        console.log('this state', this.state);
    }

    openMarker(name) {
        console.log(this.state.markers);
        this.state.markers.forEach(
            marker => {
                // console.log('marker', marker)
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
            restaurant => (
                <li aria-label='location name' key={restaurant.referralId} onClick={() => {this.openMarker(restaurant.venue.name)}} value={restaurant.venue.name}>
                    {restaurant.venue.name}
                </li>
            )
        )
        return (
            <Menu>
                <form>
                    <label>
                        <h3>Search</h3>
                        <input type='text' name='searchLocation' onChange={this.props? this.props.updateFilter : 0}/>
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