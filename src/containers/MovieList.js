import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import Services from '../../services.js';
import SimpleModal from '../Modal/Modal';
import styles from './MovieList.module.css';

class MovieList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      searchQuery: '',
      count: 0,
        open: false,
      movieId:0
    };
    this.services = new Services();
  }

  componentDidMount() {
    this.services.getMovies().then(data =>
      this.setState({
        movies: data.results,
          count: data.results.length,
      })
    );
    document.addEventListener('mousedown', this.handleClickOutside);
  }
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

    handleOpen = (e) => {
        const movieID = e.target.id
      this.setState(state => ({
          open: !state.open,
          movieId: movieID,

      }));
        console.log(e.target.id)
  };

  handleClickOutside = event => {
      this.setState({
          open: false
      });

  };

  render() {
    const listMovies = this.state.movies;
    const myMovies = listMovies.map(item => (
      <Grid
            key={item.id}
            item
            className={styles.grid}
            onClick={this.handleOpen}
        >
            <Card className={styles.card}>
          <CardHeader
            className={styles.cardhead}
            title={item.title}
                    subheader={item.release_date}
          />
          <CardMedia
            className={styles.media}
            image={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${item.poster_path}`}
                    title='Movie'
                    id={item.poster_path}
          />
          <CardContent>
            <Typography variant='body2' color='textSecondary' component='p'>
              {item.overview}
            </Typography>
                </CardContent>
                </Card>
      </Grid>
    ));

    return (
      <div>
            <div>{this.state.open && <SimpleModal open={this.state.open} movieId={this.state.movieId} />}</div>
        <div className={styles.root}>
          <Grid container className={styles.root} spacing={1}>
            {myMovies}
          </Grid>
        </div>
      </div>
    );
  }
}

export default MovieList;
