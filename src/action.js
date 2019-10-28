export const SEARCH_MOVIES = "INCREMENT";
export const search_movies = () => ({ type: SEARCH_MOVIES});
export const FETCH_MOVIES_BEGIN = "FETCH_MOVIES_BEGIN";
export const FETCH_MOVIES_SUCCESS = "FETCH_MOVIES_SUCCESS";
export const FETCH_MOVIES_FAILURE = "FETCH_MOVIES_FAILURE";

export const SEARCH_QUERY = "SEARCH_QUERY";
export const setSearchQuery = (value) => ({ type: SEARCH_QUERY, query:value });

export const OPEN_MOVIE_ID = "OPEN_MOVIE_ID";
export const openMovieId = (movie_id) => ({ type: OPEN_MOVIE_ID, movie_id:movie_id });

export const CLOSE_MODAL = "CLOSE_MODAL";
export const closeModal = () => ({ type: CLOSE_MODAL });

const API_KEY = process.env.REACT_APP_MOVIE_API_KEY;
const HOST = 'https://api.themoviedb.org/3';
const GET_MOVIES_URL = '/discover/movie';
const SEARCH_MOVIES_URL = '/search/movie';
export const fetchMVBegin = () => ({
  type: FETCH_MOVIES_BEGIN
});

export const fetchMVSuccess = movies => ({
  type: FETCH_MOVIES_SUCCESS,
  payload: movies
});

export const fetchMVFailure = error => ({
  type: FETCH_MOVIES_FAILURE,
  payload: { error }
});

export function fetchMV() {
  const API_KEY = process.env.REACT_APP_MOVIE_API_KEY;
  return async dispatch => {
    dispatch(fetchMVBegin());
    return fetch(
      `${HOST}${GET_MOVIES_URL}?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=2`
    )
      .then(res => res.json())
      .then(json => {
        const movies = json.results;
        dispatch(fetchMVSuccess(movies));
        return json;
      })
      .catch(error => dispatch(fetchMVFailure(error)));
  };
}
