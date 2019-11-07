const initialState = {
  loading: false,
  count: 0,
  movies: [],
  searchQuery: "",
  movie_id: 0,
  open: false,
  language: "en-US",
  sort_by: "primary_release_date.asc",
  include_adult: false,
  page: 1,
  include_video: false,
  isOldestFirst: false,
  totalResults: 0,
  currentPage: 1,
  currentMovie: null
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH_MOVIES_BEGIN":
      return {
        ...state,
        loading: true,
        error: null
      };
    case "FETCH_MOVIES_SUCCESS":
      return {
        ...state,
        loading: false,
        movies: action.payload,
        count: action.payload.length
      };
    case "UPDATE_TOTAL_RESULTS":
      return {
        ...state,
        totalResults: action.payload
      };

    case "FETCH_MOVIES_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        movies: []
      };
    case "SEARCH_QUERY":
      return {
        ...state,
        searchQuery: action.query
      };
    case "OPEN_MOVIE_ID":
      return {
        ...state,
        currentMovie: action.filteredMovie,
        title: action.title,
        overview: action.overview,
        release_date: action.release_date,
        poster_path: action.poster_path,
        open: true
      };
    case "CLOSE_MODAL":
      return {
        ...state,
        open: false
      };
    case "SET_MOVIES":
      return {
        movies: action.movies
      };
    case "SET_MOVIE_INFO":
      return {
        ...state
      };
    default:
      return state;
  }
}
