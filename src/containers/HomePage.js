import React, { Component } from 'react';

import SortBox from '../SortBox/SortBox';
import Services from '../../services.js';
import MovieList from '../MovieList/MovieList';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      searchQuery: '',
      count: 0
    };
    this.services = new Services();
  }

  componentDidMount() {
    this.services.getMovies().then(data =>
      this.setState({
        movies: data.results,
        count: data.results.length
      })
    );
  }

  render() {
    return (
      <div>
        <SortBox count={this.state.count} />
        <MovieList />
      </div>
    );
  }
}

export default HomePage;
