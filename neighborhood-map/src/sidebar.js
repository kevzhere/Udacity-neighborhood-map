import React, { Component } from 'react';
import {slide as Menu } from 'react-burger-menu';

class SideBar extends Component {

    state = {
        locations: [],
        filter: '',
        displayLocations: []
    }

    componentWillReceiveProps(props){
        this.setState({
            locations: props.locations,
            updateFilter: props.updateFilter,
            displayLocations: props.displayLocations
        });
        
    }

    makeMarker(locationInfo) {
        locationInfo.onClick(locationInfo);
    }

    render(){
        const displayLocation =  this.state.locations.map(
                (location) => (
                    <li key={location.key} aria-label='location name' onClick={this.makeMarker.bind(this, location.props)}>
                        {location.props.name}
                    </li>
                )
            );
        return (
            <Menu>
                <form>
                    <label>
                        <h3>Search</h3>
                        <input type='text' name='searchLocation' onChange={this.props? this.props.updateFilter : 0}/>
                        {/* <ol> */}
                            {displayLocation}
                        {/* </ol> */}
                    </label>
                </form>

            </Menu>
        );
    }
}

export default SideBar;