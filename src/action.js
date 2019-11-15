export const SEARCH_MOVIES = "INCREMENT";
export const FETCH_MOVIES_BEGIN = "FETCH_MOVIES_BEGIN";
export const FETCH_MOVIES_SUCCESS = "FETCH_MOVIES_SUCCESS";
export const FETCH_MOVIES_FAILURE = "FETCH_MOVIES_FAILURE";
export const SEARCH_QUERY = "SEARCH_QUERY";
export const OPEN_MOVIE_ID = "OPEN_MOVIE_ID";
export const CLOSE_MODAL = "CLOSE_MODAL";
export const SET_MOVIES = "SET_MOVIES";
export const UPDATE_TOTAL_RESULTS = "UPDATE_TOTAL_RESULTS";
export const SET_MOVIE_INFO = "SET_MOVIE_INFO";

const API_KEY = process.env.REACT_APP_MOVIE_API_KEY;
const HOST = "https://api.themoviedb.org/3";
const GET_MOVIES_URL = "/discover/movie";
const SEARCH_MOVIES_URL = "/search/movie";

export const setSearchQuery = value => ({ type: SEARCH_QUERY, query: value });
export const setMovielist = newMovies => ({
  type: SET_MOVIES,
  movies: newMovies
});
export const viewMovieInfo = id => ({ type: SET_MOVIE_INFO, id: id });
export const search_movies = () => ({ type: SEARCH_MOVIES });
export const closeModal = () => ({ type: CLOSE_MODAL });

export const openMovieId = filteredMovie => ({
  type: OPEN_MOVIE_ID,
  filteredMovie: filteredMovie,
  title: filteredMovie[0].title,
  overview: filteredMovie[0].overview,
  release_date: filteredMovie[0].release_date,
  poster_path: filteredMovie[0].poster_path
});

export const fetchMovieBegin = () => ({
  type: FETCH_MOVIES_BEGIN
});

export const fetchMovieSuccess = movies => ({
  type: FETCH_MOVIES_SUCCESS,
  payload: movies
});

export const fetchMovieFailure = error => ({
  type: FETCH_MOVIES_FAILURE,
  payload: { error }
});

export const updateMovieResults = totalResults => ({
  type: UPDATE_TOTAL_RESULTS,
  payload: totalResults
});

export function fetchMovie() {
  const API_KEY = process.env.REACT_APP_MOVIE_API_KEY;
  const url = new URL(`${HOST}${GET_MOVIES_URL}?api_key=${API_KEY}`),
    params = { language: "en-US" };
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
  return async dispatch => {
    dispatch(fetchMovieBegin());
    return fetch(url)
      .then(res => res.json())
      .then(json => {
        const movies = json.results;
        const totalResults = json.total_results;
        dispatch(fetchMovieSuccess(movies));
        dispatch(updateMovieResults(totalResults));
        Object.keys(params).forEach(key =>
          url.searchParams.append(key, params[key])
        );
        return json;
      })
      .catch(error => dispatch(fetchMovieFailure(error)));
  };
}

export const searchMovies = (query, language, page) => {
  return async dispatch => {
    dispatch(fetchMovieBegin());
    return fetch(
      `${HOST}${SEARCH_MOVIES_URL}?api_key=${API_KEY}&language=${language}&page=${page}&query=${query}`
    )
      .then(res => res.json())
      .then(json => {
        const movies = json.results;
        dispatch(fetchMovieSuccess(movies));
        return json;
      })
      .catch(error => dispatch(fetchMovieFailure(error)));
  };
};

export const searchByDirector = query => {
  return async dispatch => {
    dispatch(fetchMovieBegin());
    return fetch(
      `${HOST}/search/person?api_key=${API_KEY}&language=en-US&page=1&include_adult=false&query=${query}`
    )
      .then(res => res.json())
      .then(json => {
        const movies = json.results[0].known_for;
        dispatch(fetchMovieSuccess(movies));
        return json;
      })
      .catch(error => dispatch(fetchMovieFailure(error)));
  };
};


