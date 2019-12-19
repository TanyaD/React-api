import React, { Component } from "react";
import { connect } from "react-redux";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import DialogView from "../Dialog/Dialog";
import styles from "./MovieList.module.css";
import { openMovieId } from "../../actions/actions";
import { closeModal } from "../../actions/actions";
import Camera from "../../images/analog-art-camera-390089.jpg";

class MovieList extends Component {
  handleClickOpen = e => {
    const all = this.props.movies;
    const id = parseInt(e.target.id, 10);
    const filteredMovies = all.filter(movie => movie.id === id);
    this.props.openMovieId(filteredMovies);
  };

  handleClose = () => {
    this.props.closeModal();
  };

  render() {
    const listMovies = this.props.movies;
    const myMovies = listMovies.map((item, index) => (
      <Grid key={index} item className={styles.grid}>
        <Card className={styles.card}>
          <CardHeader
            className={styles.cardhead}
            title={item.title}
            subheader={item.release_date}
          />
          {item.poster_path ? (
            <CardMedia
              className={styles.media}
              image={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${item.poster_path}`}
              title={item.original_title}
              id={item.id}
              onClick={e => this.handleClickOpen(e)}
            />
          ) : (
            <CardMedia
              className={styles.media}
              image={Camera}
              title={item.original_title}
              id={item.id}
              onClick={e => this.handleClickOpen(e)}
            />
          )}
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {item.overview}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    ));
    return (
      <div>
        <DialogView open={this.props.open} handleClose={this.handleClose} />
        <div className={styles.root}>
          <Grid container className={styles.root} spacing={1} xs={12}>
            {myMovies}
          </Grid>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.loading,
  movies: state.movies,
  open: state.open
});

const mapDispatchToProps = {
  openMovieId,
  closeModal
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MovieList);
