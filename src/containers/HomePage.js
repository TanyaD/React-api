import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

import SortBox from '../SortBox/SortBox';
import styles from '../HomePage/HomePage.module.css';
import Services from '../../services.js';

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
    const listMovies = this.state.movies;
    const myMovies = listMovies.map(item => (
      <Grid
        key={item.id}
        item
        component={Link}
        to='/moviepage'
        className={styles.grid}
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
        <SortBox count={this.state.count} />
        <div className={styles.root}>
          <Grid container className={styles.root} spacing={1}>
            {myMovies}
          </Grid>
        </div>
      </div>
    );
  }
}

export default HomePage;
