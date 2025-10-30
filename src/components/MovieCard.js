import React from 'react';

/**
 * Hand-written MovieCard component
 * Displays movie information in a visually appealing card format
 * 
 * @param {Object} movie - Movie data from OMDb API
 * @param {Function} onClick - Function to handle click events
 */
const MovieCard = ({ movie, onClick }) => {
  const posterUrl = movie.Poster !== 'N/A' ? movie.Poster : null;
  const placeholderImage = 'https://via.placeholder.com/500x750?text=No+Image';
  
  // Extract rating from OMDb format (different from TMDb)
  const rating = movie.imdbRating ? parseFloat(movie.imdbRating) : null;
  
  return (
    <div onClick={onClick} className="movie-card">
      <div className="movie-poster">
        <img
          src={posterUrl || placeholderImage}
          alt={movie.Title}
          loading="lazy"
        />
        {rating && (
          <div className="movie-rating">
            <span className="star-icon">★</span>
            <span>{rating}</span>
          </div>
        )}
      </div>
      <div className="movie-content">
        <h3 className="movie-title">{movie.Title}</h3>
        <p className="movie-year">
          {movie.Year || 'N/A'}
          {movie.Type && ` • ${movie.Type.charAt(0).toUpperCase() + movie.Type.slice(1)}`}
        </p>
        <p className="movie-overview">
          {movie.Plot || 'No description available'}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
