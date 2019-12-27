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
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

import SortBox from "../SortBox/SortBox";
import MovieList from "../MovieList/MovieList";
import PaginationBottom from "../Pagination/Pagination";
import { fetchMovies } from "../../actions/actions";
import { searchMovies } from "../../actions/actions";
import { setSearchQuery } from "../../actions/actions";
import { searchByDirector, activatePage } from "../../actions/actions";

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
    width: "100%",
    padding: "0" + " !important",
    paddingLeft: "35px" + " !important"
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

export class HomePage extends Component {
  componentDidMount() {
    window.addEventListener("popstate", this.onBackButtonEvent);
    this.loadData();
  }

  onBackButtonEvent = () => {
    const decodedUrl = decodeURIComponent(this.props.location.pathname);
    this.loadData(decodedUrl);
  };

  loadData = url => {
    let values;
    //check if call triggered on the window popstate event
    if (url) {
      values = queryString.parse(url.substr(url.indexOf("/") + 1));
    } else {
      values = this.props.location.pathname
        ? queryString.parse(
            this.props.location.pathname.substr(
              this.props.location.pathname.indexOf("/") + 1
            )
          )
        : "";
    }
    const currentPage = values.page ? parseInt(values.page, 10) : 1;
    if (values && values.query) {
      this.props.searchMovies(values.query, values.page);
      this.props.setSearchQuery(values.query);
      this.props.activatePage(currentPage);
    } else if (values && values.director) {
      this.props.searchByDirector(values.director);
    } else {
      this.props.fetchMovies("popularity.desc", values.page);
      this.props.activatePage(currentPage);
    }
  };

  fetchAction = () => {
    this.props.fetchMovies(this.props.sort_by, this.props.currentPage);
  };

  handleTitleClicked = e => {
    this.props.searchQuery
      ? this.props.searchMovies(this.props.searchQuery) &&
        this.props.history.push(
          encodeURIComponent(
            `?page=${this.props.page}&query=${this.props.searchQuery}`
          )
        )
      : this.fetchAction();
  };

  handleDirectorClicked = e => {
    this.props.searchQuery
      ? this.props.searchByDirector(this.props.searchQuery) &&
        this.props.history.push(
          encodeURIComponent(
            `/?page=${this.props.page}&director=${this.props.searchQuery}`
          )
        )
      : this.fetchAction();
  };

  setSearchQuery = e => {
    this.props.setSearchQuery(e.target.value);
  };

  returnHome = () => {
    this.props.fetchMovies("popularity.desc", 1);
  };

  setValue = value => {
    this.props.setSearchQuery(value);
  };

  componentWillUnmount() {
    window.onpopstate = () => {};
  }

  render() {
    const { classes } = this.props;
    const numberPages = Math.ceil(this.props.totalResults / 20);
    const disabled = !this.props.searchQuery.length;
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
                <Autocomplete
                  classes={{
                    inputRoot: classes.inputRoot
                  }}
                  inputValue={this.props.searchQuery}
                  id="combo-box-demo"
                  options={this.props.movies}
                  getOptionLabel={option => option.title}
                  renderInput={params => (
                    <TextField {...params} variant="outlined" fullWidth />
                  )}
                  onInputChange={(event, value, reason) => {
                    if (event && event.target && reason === "input") {
                      this.setValue(value);
                    }
                  }}
                  onClose={event => {
                    if (
                      event.target.textContent &&
                      event.target.textContent.trim() !== ""
                    ) {
                      this.setValue(event.target.textContent);
                    }
                  }}
                />
              </div>
              <ButtonGroup
                variant="text"
                size="medium"
                aria-label="small contained button group"
              >
                <Button
                disabled={disabled}
                  variant="contained"
                  fullWidth
                  value="title"
                  id="titleButton"
                  onClick={this.handleTitleClicked}
                >
                  Title
                </Button>
                <Button
                disabled={disabled}
                  variant="contained"
                  fullWidth
                  value="director"
                  id="btnDirector"
                  onClick={this.handleDirectorClicked}
                >
                  Director
                </Button>
              </ButtonGroup>
            </Toolbar>
          </AppBar>
        </div>
        {this.props.loading ? (
          <div className={classes.load}>
            <div id="loadingText">
              <p>Loading.......</p>
            </div>
            <CircularProgress />
          </div>
        ) : (
          <div>
            <SortBox
              totalResults={this.props.totalResults}
              numberPages={numberPages}
            />
            <MovieList movies={this.props.movies} />
            {numberPages > 1 ? (
              <div className={classes.pagination}>
                <PaginationBottom
                  pages={numberPages}
                  currentUrl={this.props.currentUrl}
                  query={this.props.currentQuery}
                  history={this.props.history}
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
  loading: state.loading,
  movies: state.movies,
  error: state.error,
  searchQuery: state.searchQuery,
  sort_by: state.sort_by,
  page: state.page,
  currentPage: state.currentPage,
  currentUrl: state.currentUrl,
  currentQuery: state.currentQuery,
  totalResults: state.totalResults
});

const mapDispatchToProps = {
  fetchMovies,
  searchMovies,
  setSearchQuery,
  searchByDirector,
  activatePage
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(HomePage)
);
