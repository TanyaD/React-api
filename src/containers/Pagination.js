import React, { Component } from "react";
import { connect } from "react-redux";
import { ThemeProvider } from "@zendeskgarden/react-theming";
import { Pagination } from "@zendeskgarden/react-pagination";
import "@zendeskgarden/react-pagination/dist/styles.css";

import {
  activatePage,
  fetchMovies,
  searchMovies,
  searchByDirector
} from "../../actions/actions";

class PaginationBottom extends Component {
  loadPage = page => {
    const currentUrl = this.props.currentUrl;
    const currentQuery = this.props.currentQuery;
    const searchMoviesUrl = "/3/search/movie";
    const searchDirectorUrl = "/3/search/person";

    if (currentUrl === searchDirectorUrl) {
      this.props.searchByDirector(currentQuery, page);
      this.props.activatePage(page);
    } else if (currentUrl === searchMoviesUrl) {
      this.props.searchMovies(currentQuery, page);
      this.props.activatePage(page);
    } else {
      this.props.fetchMovies(this.props.sort_by, page);
      this.props.activatePage(page);
    }
  };
  render() {
    return (
      <div>
        <ThemeProvider>
          <Pagination
            totalPages={this.props.pages}
            currentPage={this.props.currentPage}
            onChange={page => this.loadPage(page)}
          />
        </ThemeProvider>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.loading,
  movies: state.movies,
  open: state.open,
  currentPage: state.currentPage,
  someId: state.someId,
  currentUrl: state.currentUrl,
  currentQuery: state.currentQuery,
  sort_by: state.sort_by
});

const mapDispatchToProps = {
  activatePage,
  fetchMovies,
  searchMovies,
  searchByDirector
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaginationBottom);
