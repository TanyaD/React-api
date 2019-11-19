import reducer from "../reducers/reducer";

const defaultState = {
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
const movies = [
  {
    popularity: 384.312,
    vote_count: 5638,
    video: false,
    poster_path: "/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg",
    id: 475557,
    adult: false,
    backdrop_path: "/n6bUvigpRFqSwmPp1m2YADdbRBc.jpg",
    original_language: "en",
    original_title: "Joker",
    genre_ids: [80, 18, 53],
    title: "Joker",
    vote_average: 8.4,
    overview:
      "During the 1980s, a failed stand-up comedian is driven insane and turns to a life of crime and chaos in Gotham City while becoming an infamous psychopathic crime figure.",
    release_date: "2019-10-02"
  }
];

describe("reducer", () => {
  it("should return default state", () => {
    expect(reducer(undefined, {})).toEqual(defaultState);
  });

  it("should update current page", () => {
    expect(
      reducer(defaultState, { type: "ACTIVATE_PAGE", currentPage: 2 })
    ).toEqual({
      ...defaultState,
      currentPage: 2
    });
  });

  it("should begin fetch", () => {
    expect(
      reducer(defaultState, { type: "FETCH_MOVIES_BEGIN", currentPage: 2 })
    ).toEqual({
      ...defaultState,
      loading: true,
      error: null,
      currentPage: 2
    });
  });

  it("should fetch movies", () => {
    expect(
      reducer(defaultState, {
        type: "FETCH_MOVIES_SUCCESS",
        currentUrl: "/3/search/movie",
        payload: movies,
        currentQuery: "test"
      })
    ).toEqual({
      ...defaultState,
      loading: false,
      count: 1,
      movies: movies,
      currentUrl: "/3/search/movie",
      currentQuery: "test"
    });
  });

  it("should update total results", () => {
    expect(
      reducer(defaultState, {
        type: "UPDATE_TOTAL_RESULTS",
        payload: 100,
        currentSort: "popularity.desc"
      })
    ).toEqual({
      ...defaultState,
      sort_by: "popularity.desc",
      totalResults: 100
    });
  });

  it("should display error on fetch", () => {
    expect(
      reducer(defaultState, {
        type: "FETCH_MOVIES_FAILURE",
        payload: "some error"
      })
    ).toEqual({
      ...defaultState,
      error: "some error",
      loading: false,
      movies: []
    });
  });

  it("should update search query", () => {
    expect(
      reducer(defaultState, {
        type: "SEARCH_QUERY",
        query: "test query"
      })
    ).toEqual({
      ...defaultState,
      searchQuery: "test query"
    });
  });

  it("should open movie id", () => {
    expect(
      reducer(defaultState, {
        type: "OPEN_MOVIE_ID",
        filteredMovies: movies,
        title: movies[0].title,
        overview: movies[0].overview,
        release_date: movies[0].release_date,
        poster_path: movies[0].poster_path
      })
    ).toEqual({
      ...defaultState,
      open: true,
      currentMovie: movies,
      title: "Joker",
      overview:
        "During the 1980s, a failed stand-up comedian is driven insane and turns to a life of crime and chaos in Gotham City while becoming an infamous psychopathic crime figure.",
      release_date: "2019-10-02",
      poster_path: "/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg"
    });
  });

  it("should close modal", () => {
    expect(reducer(defaultState, { type: "CLOSE_MODAL" })).toEqual({
      ...defaultState,
      open: false
    });
  });
});
