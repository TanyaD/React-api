import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Box from "@material-ui/core/Box";
import { connect } from "react-redux";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import { fetchMovies } from "../../actions/actions";

const styles = theme => ({
  formControl: {
    minWidth: "120px"
  },
  listView: {
    display: "block"
  },
  card: {
    maxWidth: 345,
    height: "100%"
  },
  media: {
    height: 0,
    paddingTop: "56.25%"
  },
  cardhead: {
    height: "15%"
  }
});

class SortBox extends Component {
  handleChange = e => {
    const sortType =
      e.target.value === "1" ? "release_date.desc" : "release_date.asc";
    this.props.fetchMovies(sortType, this.props.currentPage);
  };

  render() {
    const { totalResults, currentPage, numberPages, classes} = this.props;
    const resultStart = currentPage * 20 - 20;
    //if on last page display totalresults, else display number of movies on current page
    const resultLimit =
      currentPage === numberPages ? totalResults : currentPage * 20;
    return (
      <div style={{ width: "100%" }}>
        <Box display="flex" bgcolor="grey.100">
          {totalResults > 0 ? (
            <Box pt={3} ml={10} flexGrow={1}>
              Results: {resultStart} &#8211; {resultLimit} out of {totalResults}
            </Box>
          ) : (
            <Box pt={3} ml={10} flexGrow={1}>
              No results found for "{this.props.searchQuery}"
            </Box>
          )}
          <Box p={1} mr={10}>
            <div>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-controlled-open-select-label">
                  Sort By
                </InputLabel>
                <Select
                  value={0}
                  inputProps={{
                    name: "name",
                    id: "uncontrolled-native"
                  }}
                  onChange={this.handleChange}
                >
                  <MenuItem value="0">Select...</MenuItem>
                  <MenuItem value="1">Newest First</MenuItem>
                  <MenuItem value="2">Oldest First</MenuItem>
                </Select>
              </FormControl>
            </div>
          </Box>
        </Box>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  movies: state.movies,
  error: state.error,
  searchQuery: state.searchQuery,
  totalResults: state.totalResults,
  sort_by: state.sort_by,
  page: state.page,
  currentPage: state.currentPage,
  totalResults: state.totalResults
});

const mapDispatchToProps = {
  fetchMovies
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SortBox)
);
