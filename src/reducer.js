const initialState = {
  loading: false,
  count: 0,
  movies: [],
  searchQuery: "",
  movie_id: 0,
  open: false,
  sort_by: "popularity.desc",
  page: 1,
  totalResults: 0,
  currentPage: 1,
  currentMovie: null,
  currentUrl: "",
  currentQuery: ""
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "ACTIVATE_PAGE":
      return {
        ...state,
        currentPage: action.currentPage
      };
    case "FETCH_MOVIES_BEGIN":
      return {
        ...state,
        loading: true,
        error: null,
        currentPage: action.currentPage
      };
    case "FETCH_MOVIES_SUCCESS":
      return {
        ...state,
        loading: false,
        movies: action.payload,
        count: action.payload.length,
        currentUrl: action.currentUrl,
        currentQuery: action.currentQuery
      };
    case "UPDATE_TOTAL_RESULTS":
      return {
        ...state,
        totalResults: action.payload,
        sort_by: action.currentSort
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
        currentMovie: action.filteredMovies,
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
        ...state,
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
