export const SEARCH_MOVIES = "INCREMENT";
export const FETCH_MOVIES_BEGIN = "FETCH_MOVIES_BEGIN";
export const FETCH_MOVIES_SUCCESS = "FETCH_MOVIES_SUCCESS";
export const FETCH_MOVIES_FAILURE = "FETCH_MOVIES_FAILURE";
export const SEARCH_QUERY = "SEARCH_QUERY";
export const OPEN_MOVIE_ID = "OPEN_MOVIE_ID";
export const CLOSE_MODAL = "CLOSE_MODAL";

export const setSearchQuery = value => ({ type: SEARCH_QUERY, query: value });
export const search_movies = () => ({ type: SEARCH_MOVIES });
export const closeModal = () => ({ type: CLOSE_MODAL });
export const openMovieId = movie_id => ({
    type: OPEN_MOVIE_ID,
    movie_id: movie_id
  });

const API_KEY = process.env.REACT_APP_MOVIE_API_KEY;
const HOST = "https://api.themoviedb.org/3";
const GET_MOVIES_URL = "/discover/movie";
const SEARCH_MOVIES_URL = "/search/movie";

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
        dispatch(fetchMovieSuccess(movies));
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
