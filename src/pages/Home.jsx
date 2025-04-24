import { useState, useEffect } from 'react';
import { getPopularMovies, searchMovies } from '../services/api'
import MovieCard from '../components/MovieCard';
import '../css/Home.css';

function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
      } catch (err) {
        console.error(err);
        setError("Failed to load popular movies. Please try again later.");
      }
      finally {
        setLoading(false);
      }
    };

    loadPopularMovies();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    if (loading) return;

    setLoading(true);
    try {
      const searchResults = await searchMovies(searchQuery);
      setMovies(searchResults);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to search movies. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home">
      <h1 className="home-title">Popular Movies</h1>
      <form onSubmit={handleSearch} className="search-form">

        <input
          type="text"
          placeholder="Search movies..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <button type="submit" className="search-btn">
          Search
        </button>

      </form>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="movies-grid">
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      )}

      {/* <div className="movies-grid"> */}
      {/*   {movies.map( */}
      {/*     (movie) => */}
      {/*       movie.title.toLowerCase().startsWith(searchQuery.toLowerCase()) && ( */}
      {/*         <MovieCard movie={movie} key={movie.id} /> */}
      {/*       ) */}
      {/*   )} */}
      {/* </div> */}
    </div>
  );
};

export default Home;

