import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { fade } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import ButtonGroup from "@material-ui/core/ButtonGroup";

import SortBox from "../SortBox/SortBox";
import MovieList from "../MovieList/MovieList";
import { fetchMV } from "../../actions/actions";
import { searchMovies }  from "../../actions/actions";
import { setSearchQuery } from "../../actions/actions";


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
  }
});

class HomePage extends Component {
  componentDidMount() {
    this.fetchAction();
  }

  fetchAction = () => {
    this.props.fetchMV();
  };

  handleButtonClicked = e => {
    this.props.searchMovies(this.props.searchQuery)
  };

  setSearchQuery=(e)=>{
   // console.log(e.target.value, "e.target.value <<<")
    this.props.setSearchQuery(e.target.value)
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        <div>
          <AppBar position="static">
            <Toolbar>
              <Typography
                component={Link}
                to="/home"
                className={classes.noUnderline}
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
                  onInput={e => this.setSearchQuery(e) }
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
                  onClick={this.handleButtonClicked}
                >
                  Title
                </Button>
                <Button
                  variant="contained"
                  fullWidth
                  value="director"
                  onClick={this.handleButtonClicked}
                >
                  Director
                </Button>
                <Button
                  variant="contained"
                  fullWidth
                  value="year"
                  onClick={this.handleButtonClicked}
                >
                  Year
                </Button>
              </ButtonGroup>
            </Toolbar>
          </AppBar>
        </div>
        <SortBox count={this.props.count} />
        <MovieList movies={this.props.movies} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  movies: state.movies,
  error: state.error,
  searchQuery: state.searchQuery
});

const mapDispatchToProps = {
  fetchMV,
  searchMovies,
  setSearchQuery
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(HomePage)
);
