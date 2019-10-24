const initialState = {
  data: [],
  loading: false,
  count: 0,
  movies: []
};
export default function reducer(state = initialState, action) {

  switch (action.type) {
    case "FETCH_MV_BEGIN":
      return {
        ...state,
        loading: true,
        error: null
      };

    case "FETCH_MV_SUCCESS":
      return {
        ...state,
        loading: false,
        data: action.payload,
        movies: action.payload
      };

    case "FETCH_MV_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        data: [],
        movies: []
      };
    default:
      return state;
  }
}
