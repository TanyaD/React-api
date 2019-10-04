import React, { Component } from 'react';
import HomeIcon from '@material-ui/icons/Home';

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null
        };
    }

    render() {
        return (
            <div>
                <h2>HomePage component</h2>
                <HomeIcon />
             </div>
        )
    }
}

export default HomePage;

