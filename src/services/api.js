//const API_KEY = import.meta.env.VITE_API_KEY;
const API_TOKEN = import.meta.env.VITE_API_TOKEN;
const BASE_URL = 'https://api.themoviedb.org/3';

// For use with the API Token, not the API Key
const options = {
  headers: {
    accept: 'application/json',
    'Authorization': `Bearer ${API_TOKEN}`
  }
}

export const getPopularMovies = async () => {
  // API KEY for Request URL
  // const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);

  // API TOKEN for Request Header
  const response = await fetch(`${BASE_URL}/movie/popular?language=en-US&page=1`, options);
  const data = await response.json();

  return data.results;
}

export const searchMovies = async (query) => {
  const response = await fetch(`${BASE_URL}/search/movie?query=${encodeURIComponent(query)}&language=en-US&page=1`, options);
  const data = await response.json();

  return data.results;
}

