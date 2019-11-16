import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import queryString from "query-string";
import { withStyles } from "@material-ui/core/styles";
import { fade } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import CircularProgress from "@material-ui/core/CircularProgress";

import SortBox from "../SortBox/SortBox";
import MovieList from "../MovieList/MovieList";
import PaginationBottom from "../Pagination/Pagination";
import { fetchMovies } from "../../actions/actions";
import { searchMovies } from "../../actions/actions";
import { setSearchQuery } from "../../actions/actions";
import { searchByDirector } from "../../actions/actions";

const styles = theme => ({
  search: {
    position: "relative",
    borderRadius: "5px",
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: "20px",
    marginLeft: "20px",
    width: "60%",
    opacity: "1"
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "#FFF",
    width: "100%"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    width: "100%"
  },
  houseIcon: {
    margin: theme.spacing(2)
  },
  noUnderline: {
    textDecoration: "none",
    color: "inherit",
    fontSize: "20px"
  },
  load: {
    display: "flex",
    marginLeft: "50%"
  },
  pagination: {
    marginTop: theme.spacing(2)
  }
});

class HomePage extends Component {
  componentDidMount() {
    const values = queryString.parse(this.props.location.search);
    this.props.location.search
      ? this.props.searchMovies(values.query, values.page) &&
        this.props.setSearchQuery(values.query)
      : this.fetchAction();
  }

  fetchAction = () => {
    this.props.fetchMovies(this.props.sort_by, this.props.currentPage);
  };

  handleButtonClicked = e => {
    this.props.searchQuery
      ? this.props.searchMovies(this.props.searchQuery) &&
        this.props.history.push(
          `/?page=${this.props.page}&query=${this.props.searchQuery}`
        )
      : this.fetchAction();
  };

  handleButtonClicked2 = e => {
    this.props.searchQuery
      ? this.props.searchByDirector(this.props.searchQuery)
      : this.fetchAction();
  };

  setSearchQuery = e => {
    this.props.setSearchQuery(e.target.value);
  };

  returnHome = () => {
    this.props.fetchMovies("popularity.desc", 1);
  };

  render() {
    const { classes } = this.props;
    const numberPages = Math.ceil(this.props.totalResults / 20);
    return (
      <div>
        <div>
          <AppBar position="static">
            <Toolbar>
              <Typography
                component={Link}
                to="/home"
                className={classes.noUnderline}
                onClick={this.returnHome}
              >
                Movie Time
              </Typography>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput
                  }}
                  value={this.props.searchQuery}
                  onInput={e => this.setSearchQuery(e)}
                  placeholder="Search ..."
                />
              </div>
              <ButtonGroup
                variant="text"
                size="medium"
                aria-label="small contained button group"
              >
                <Button
                  variant="contained"
                  fullWidth
                  value="title"
                  id="titleButton"
                  onClick={this.handleButtonClicked}
                >
                  Title
                </Button>
                <Button
                  variant="contained"
                  fullWidth
                  value="director"
                  onClick={this.handleButtonClicked2}
                >
                  Director
                </Button>
              </ButtonGroup>
            </Toolbar>
          </AppBar>
        </div>
        {this.props.loading ? (
          <div className={classes.load}>
            <p>Loading.......</p>
            <CircularProgress />
          </div>
        ) : (
          <div>
            <SortBox count={this.props.count} />
            <MovieList movies={this.props.movies} />
            {numberPages > 1 ? (
              <div className={classes.pagination}>
                <PaginationBottom
                  pages={numberPages}
                  currentPage={this.props.currentPage}
                  currentUrl={this.props.currentUrl}
                  query={this.props.currentQuery}
                />
              </div>
            ) : (
              ""
            )}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  movies: state.movies,
  error: state.error,
  searchQuery: state.searchQuery,
  count: state.count,
  sort_by: state.sort_by,
  page: state.page,
  totalResults: state.totalResults,
  currentPage: state.currentPage,
  currentUrl: state.currentUrl,
  currentQuery: state.currentQuery
});

const mapDispatchToProps = {
  fetchMovies,
  searchMovies,
  setSearchQuery,
  searchByDirector
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(HomePage)
);
