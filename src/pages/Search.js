import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(() => {
    const saved = localStorage.getItem('tmdbResults');
    return saved ? JSON.parse(saved) : [];
  });

  const API_KEY = 'cacf01236ab904e663b33acec17311af';

  const searchMovies = async () => {
    if (!query) return;
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
    );
    const data = await response.json();
    setResults(data.results || []);
    localStorage.setItem('tmdbResults', JSON.stringify(data.results || []));
    localStorage.setItem('tmdbQuery', query);
  };

  useEffect(() => {
    const savedQuery = localStorage.getItem('tmdbQuery');
    const savedResults = localStorage.getItem('tmdbResults');
    if (savedQuery) setQuery(savedQuery);
    if (savedResults) setResults(JSON.parse(savedResults));
  }, []);

  const saveToWatchlist = (movie) => {
    const existing = JSON.parse(localStorage.getItem('watchlist')) || [];
    const alreadySaved = existing.some((item) => item.id === movie.id);
    if (!alreadySaved) {
      const updated = [...existing, movie];
      localStorage.setItem('watchlist', JSON.stringify(updated));
      alert(`${movie.title} added to your watchlist!`);
    } else {
      alert(`${movie.title} is already in your watchlist.`);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Search Movies</h2>
      <div style={{ marginBottom: '16px' }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter movie name"
          style={{
            padding: '10px',
            width: '300px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            marginRight: '10px',
          }}
        />
        <button
          onClick={searchMovies}
          style={{
            padding: '10px 20px',
            backgroundColor: '#222',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
        >
          Search
        </button>
      </div>

      {results.length > 0 && <h3>Showing results for: {query}</h3>}

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '1rem' }}>
        {results.map((movie) => (
          <div key={movie.id} style={{ width: '200px' }}>
            <Link
              to={`/movie/${movie.id}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              {movie.poster_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                  style={{ width: '100%', borderRadius: '6px' }}
                />
              )}
              <h4>{movie.title}</h4>
              <p>Release: {movie.release_date}</p>
            </Link>
            <button
              onClick={() => saveToWatchlist(movie)}
              style={{
                marginTop: '8px',
                padding: '6px 12px',
                backgroundColor: '#444',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                width: '100%',
              }}
            >
              Save to Watchlist
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
