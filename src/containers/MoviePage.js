import React, { Component } from 'react';
import MovieIcon from '@material-ui/icons/Movie';

class MoviePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            searchQuery: ''
        };
    }

    render() {
        return (
            <div>
                <h2>MoviePage component</h2>
                <MovieIcon/>
            </div>
        )
    }
}

export default MoviePage;
