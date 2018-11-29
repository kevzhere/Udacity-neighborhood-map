import React, { Component } from 'react';
import {slide as Menu } from 'react-burger-menu';

class SideBar extends Component {

    state = {
        locations: [],
        filter: '',
        loc: []
    }

    componentWillReceiveProps(props){
        this.setState({
            locations: props.locations,
            updateFilter: props.updateFilter
        });
    }

    render(){
        const displayLocation =  this.state.locations.map(
                location =>(
                    <li key={location.venue.id} aria-label="location name">
                        {location.venue.name}
                    </li>
                )
            );
        return (
            <Menu>
                <form>
                    <label>
                        <h3>Search</h3>
                        <input type='text' name='searchLocation' onChange={this.props? this.props.updateFilter : 0}/>
                        {displayLocation}
                    </label>
                </form>

            </Menu>
        );
    }
}

export default SideBar;