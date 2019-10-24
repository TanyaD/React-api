export const FETCH_MV_BEGIN = "FETCH_MV_BEGIN";
export const FETCH_MV_SUCCESS = "FETCH_MV_SUCCESS";
export const FETCH_MV_FAILURE = "FETCH_MV_FAILURE";

export const fetchMVBegin = () => ({
  type: FETCH_MV_BEGIN
});

export const fetchMVSuccess = movies => ({
  type: FETCH_MV_SUCCESS,
  payload: movies
});

export const fetchMVFailure = error => ({
  type: FETCH_MV_FAILURE,
  payload: { error }
});

export function fetchMV() {
    const API_KEY=process.env.REACT_APP_MOVIE_API_KEY;
  return async dispatch => {
    dispatch(fetchMVBegin());
    return fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=2`
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
