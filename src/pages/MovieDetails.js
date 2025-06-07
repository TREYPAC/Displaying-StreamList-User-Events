import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const API_KEY = 'cacf01236ab904e663b33acec17311af';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const [detailsRes, videosRes, creditsRes] = await Promise.all([
          fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`),
          fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`),
          fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`)
        ]);

        const detailsData = await detailsRes.json();
        const videosData = await videosRes.json();
        const creditsData = await creditsRes.json();

        setMovie(detailsData);
        setTrailer(videosData.results?.find(v => v.type === 'Trailer' && v.site === 'YouTube'));
        setCast(creditsData.cast?.slice(0, 5));
      } catch (err) {
        console.error('Error fetching movie data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  if (loading) return <div style={{ padding: 30 }}>Loading movie...</div>;
  if (!movie || movie.success === false) return <div style={{ padding: 30 }}>Movie not found.</div>;

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif', maxWidth: '900px', margin: 'auto' }}>
      <button
        onClick={() => navigate(-1)}
        style={{ marginBottom: 20, padding: '8px 16px', cursor: 'pointer' }}
      >
        ← Back
      </button>

      <h1>{movie.title}</h1>
      <p><strong>Release Date:</strong> {movie.release_date}</p>
      <p><strong>Rating:</strong> {movie.vote_average} / 10</p>

      {movie.genres && (
        <p><strong>Genres:</strong> {movie.genres.map(g => g.name).join(', ')}</p>
      )}

      <p style={{ marginTop: '20px' }}><strong>Overview:</strong> {movie.overview}</p>

      {movie.poster_path && (
        <img
          src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`}
          alt={movie.title}
          style={{ width: '100%', maxWidth: '300px', borderRadius: '8px', marginTop: '20px' }}
        />
      )}

      {trailer && (
        <div style={{ marginTop: '30px' }}>
          <h3>Trailer</h3>
          <iframe
            width="100%"
            height="400"
            src={`https://www.youtube.com/embed/${trailer.key}`}
            title="Trailer"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}

      {cast.length > 0 && (
        <div style={{ marginTop: '30px' }}>
          <h3>Top Cast</h3>
          <ul>
            {cast.map((actor) => (
              <li key={actor.id}>
                {actor.name} as <em>{actor.character}</em>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
