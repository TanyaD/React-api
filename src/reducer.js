const initialState = {
  loading: false,
  count: 0,
  movies: [],
  searchQuery:'',
  movie_id:0,
  open: false
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
        movies: action.payload
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
            searchQuery: action.query,
          };
      case "OPEN_MOVIE_ID":
          return {
            ...state,
            movie_id: action.movie_id,
            open: true
          };
          case "CLOSE_MODAL":
            return{
              ...state,
              open: false
            };
    default:
      return state;
  }
}
