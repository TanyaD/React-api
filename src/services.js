const API_KEY = process.env.REACT_APP_MOVIE_API_KEY;
const HOST = 'https://api.themoviedb.org';
const GET_MOVIES = '/3/movie/now_playing';
const SEARCH_MOVIES = '/search/movie';
const SEARCH_GENRES = '/genre/movie/list';

class Services {
  async getMovies() {
    const path = `${HOST}${GET_MOVIES}?api_key=${API_KEY}`;
    return await fetch(path).then(response => response.json());
  }
  async searchMovies(query) {
    const inputQuery = query
    const path = `${HOST}${SEARCH_MOVIES}?api_key=${API_KEY}&language=en-US&page=1&include_adult=false&query=${inputQuery}`
    return await fetch(path).then(response => response.json());
    }
}

export default Services;
