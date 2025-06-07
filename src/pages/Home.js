import React, { useEffect, useState } from 'react';

const API_KEY = 'cacf01236ab904e663b33acec17311af';

const Home = () => {
  const [featured, setFeatured] = useState(null);
  const [watchlist, setWatchlist] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('watchlist');
    if (saved) setWatchlist(JSON.parse(saved));

    fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => {
        const movies = data.results || [];
        const random = movies[Math.floor(Math.random() * movies.length)];
        setFeatured(random);
      })
      .catch(console.error);
  }, []);

  const handleSearch = async () => {
    if (!query.trim()) return;
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
    );
    const data = await response.json();
    const movie = data.results?.[0];
    if (movie) {
      const exists = watchlist.some((m) => m.id === movie.id);
      if (!exists) {
        const updated = [...watchlist, movie];
        setWatchlist(updated);
        localStorage.setItem('watchlist', JSON.stringify(updated));
      }
    }
    setQuery('');
  };

  const addFeaturedToWatchlist = () => {
    if (!featured || watchlist.some((m) => m.id === featured.id)) return;
    const updated = [...watchlist, featured];
    setWatchlist(updated);
    localStorage.setItem('watchlist', JSON.stringify(updated));
  };

  const toggleWatched = (index) => {
    const updated = [...watchlist];
    updated[index].watched = !updated[index].watched;
    setWatchlist(updated);
    localStorage.setItem('watchlist', JSON.stringify(updated));
  };

  const deleteFromWatchlist = (index) => {
    const updated = watchlist.filter((_, i) => i !== index);
    setWatchlist(updated);
    localStorage.setItem('watchlist', JSON.stringify(updated));
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif', background: '#f4f4f4' }}>
      {/* Header */}
      <h1
        style={{
          textAlign: 'center',
          fontSize: '3rem',
          fontFamily: '"Bebas Neue", sans-serif',
          letterSpacing: '2px',
          marginBottom: '10px'
        }}
      >
        MY WATCHLIST
      </h1>

      {/* Search */}
      <div style={{ textAlign: 'center', margin: '30px 0' }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search and add movie"
          style={{
            padding: '10px',
            width: '250px',
            borderRadius: '6px',
            border: '1px solid #ccc',
            marginRight: '8px'
          }}
        />
        <button
          onClick={handleSearch}
          style={{
            padding: '10px 16px',
            background: '#222',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          Add
        </button>
      </div>

      {/* Watchlist Section */}
      <div style={{
        maxHeight: '500px',
        overflowY: 'auto',
        paddingRight: '10px',
        margin: '0 auto 40px',
        width: '100%',
      }}>
        {watchlist.length === 0 ? (
          <div style={{ textAlign: 'center', opacity: 0.7 }}>
            <img
              src="/play-placeholder.png"
              alt="Add movies"
              style={{ width: '140px', margin: '20px auto' }}
            />
            <p style={{ fontSize: '1rem' }}>Your watchlist is empty. Search and add something!</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'center' }}>
            {watchlist.map((movie, index) => (
              <div
                key={movie.id}
                style={{
                  width: '180px',
                  background: '#fff',
                  padding: '12px',
                  borderRadius: '8px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  textAlign: 'center'
                }}
              >
                {movie.poster_path && (
                  <img
                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                    alt={movie.title}
                    style={{
                      width: '100%',
                      borderRadius: '6px',
                      opacity: movie.watched ? 0.5 : 1,
                      marginBottom: '10px'
                    }}
                  />
                )}
                <h4 style={{ textDecoration: movie.watched ? 'line-through' : 'none' }}>
                  {movie.title}
                </h4>
                <p style={{ fontSize: '0.85rem' }}>Release: {movie.release_date}</p>
                <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                  <label style={{ fontSize: '0.85rem' }}>
                    <input
                      type="checkbox"
                      checked={movie.watched || false}
                      onChange={() => toggleWatched(index)}
                      style={{ marginRight: '5px' }}
                    />
                    Watched
                  </label>
                  <button
                    onClick={() => deleteFromWatchlist(index)}
                    title="Remove"
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '1.1rem',
                      color: '#c00'
                    }}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Section Divider */}
      <hr style={{ margin: '40px auto', width: '60%', borderColor: '#ddd' }} />

      {/* Movie Suggestion Block */}
      {featured && (
        <div
          style={{
            marginTop: '20px',
            textAlign: 'center',
            background: '#fff',
            padding: '20px',
            borderRadius: '12px',
            maxWidth: '400px',
            marginInline: 'auto',
            boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
          }}
        >
          <h3 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.8rem' }}>
            🍿 Movie Suggestion
          </h3>
          <img
            src={`https://image.tmdb.org/t/p/w300${featured.poster_path}`}
            alt={featured.title}
            style={{
              width: '100%',
              maxHeight: '350px',
              objectFit: 'cover',
              borderRadius: '10px',
              margin: '12px 0'
            }}
          />
          <h4>{featured.title}</h4>
          <p style={{ fontSize: '0.9rem' }}>Release: {featured.release_date}</p>
          {!watchlist.some((m) => m.id === featured.id) && (
            <button
              onClick={addFeaturedToWatchlist}
              style={{
                marginTop: '10px',
                padding: '10px 16px',
                background: '#444',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              ➕ Add to Watchlist
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
