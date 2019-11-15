export const FETCH_MOVIES_BEGIN = "FETCH_MOVIES_BEGIN";
export const FETCH_MOVIES_SUCCESS = "FETCH_MOVIES_SUCCESS";
export const FETCH_MOVIES_FAILURE = "FETCH_MOVIES_FAILURE";
export const SEARCH_QUERY = "SEARCH_QUERY";
export const OPEN_MOVIE_ID = "OPEN_MOVIE_ID";
export const CLOSE_MODAL = "CLOSE_MODAL";
export const SET_MOVIES = "SET_MOVIES";
export const UPDATE_TOTAL_RESULTS = "UPDATE_TOTAL_RESULTS";
export const SET_MOVIE_INFO = "SET_MOVIE_INFO";
export const ACTIVATE_PAGE = "ACTIVATE_PAGE";

const apiKey = process.env.REACT_APP_MOVIE_API_KEY;
const base = "https://api.themoviedb.org";

export const setSearchQuery = value => ({ type: SEARCH_QUERY, query: value });
export const setMovielist = newMovies => ({
  type: SET_MOVIES,
  movies: newMovies
});
export const viewMovieInfo = id => ({ type: SET_MOVIE_INFO, id: id });
export const closeModal = () => ({ type: CLOSE_MODAL });

export const openMovieId = filteredMovies => ({
  type: OPEN_MOVIE_ID,
  filteredMovies: filteredMovies,
  title: filteredMovies[0].title,
  overview: filteredMovies[0].overview,
  release_date: filteredMovies[0].release_date,
  poster_path: filteredMovies[0].poster_path
});

export const activatePage = currentPage => ({
  type: ACTIVATE_PAGE,
  currentPage: currentPage
});

export const fetchMovieBegin = currentPage => ({
  type: FETCH_MOVIES_BEGIN,
  currentPage: currentPage
});

export const fetchMovieSuccess = (movies, url, query) => ({
  type: FETCH_MOVIES_SUCCESS,
  payload: movies,
  currentUrl: url,
  currentQuery: query
});

export const fetchMovieFailure = error => ({
  type: FETCH_MOVIES_FAILURE,
  payload: { error }
});

export const updateMovieResults = (totalResults, sort_by) => ({
  type: UPDATE_TOTAL_RESULTS,
  payload: totalResults,
  currentSort: sort_by
});

function fetchData(url, base, params) {
  const newUrl = new URL(`${url}?api_key=${apiKey}`, base);
  Object.keys(params).forEach(key =>
    newUrl.searchParams.append(key, params[key])
  );
  return fetch(newUrl).then(res => res.json());
}

export function fetchMovies(sort_by, page) {
  return async dispatch => {
    dispatch(fetchMovieBegin(1));
    const path = "/3/discover/movie";
    return fetchData(path, `${base}`, {
      sort_by: sort_by,
      page: page
    })
      .then(json => {
        const movies = json.results;
        const totalResults = json.total_results;
        dispatch(updateMovieResults(totalResults, sort_by));
        dispatch(fetchMovieSuccess(movies, path));
        return json;
      })
      .catch(error => dispatch(fetchMovieFailure(error)));
  };
}

export const searchMovies = (query, page) => {
  return async dispatch => {
    dispatch(fetchMovieBegin(1));
    const path = "/3/search/movie";
    return fetchData(path, `${base}`, {
      query: query,
      page: page
    })
      .then(json => {
        const movies = json.results;
        const totalResults = json.total_results;
        dispatch(updateMovieResults(totalResults));
        dispatch(fetchMovieSuccess(movies, path, query));
        return json;
      })
      .catch(error => dispatch(fetchMovieFailure(error)));
  };
};

export const searchByDirector = (query, page) => {
  return async dispatch => {
    dispatch(fetchMovieBegin(1));
    const path = "/3/search/person";
    return fetchData(path, `${base}`, {
      query: query,
      page: page
    })
      .then(json => {
        const movies = json.results[0].known_for;
        const totalResults = movies.length;
        dispatch(updateMovieResults(totalResults));
        dispatch(fetchMovieSuccess(movies, path, query));
        return json;
      })
      .catch(error => dispatch(fetchMovieFailure(error)));
  };
};
