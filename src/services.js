const API_KEY = process.env.REACT_APP_MOVIE_API_KEY;
const HOST = 'https://api.themoviedb.org';
const GET_MOVIES = '/3/movie/now_playing';

class Services {
  async getMovies() {
    const path = `${HOST}${GET_MOVIES}?api_key=${API_KEY}`;
    return await fetch(path).then(response => response.json());
  }
}

export default Services;
