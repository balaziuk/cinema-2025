import React from 'react';

function MovieCard({ movie }) {
  return (
    <div className="movie-card">
      <div style={{ overflow: 'hidden' }}>
        <img 
          src={movie.posterUrl} 
          alt={movie.title} 
          className="movie-poster" 
          onError={(e) => {
            e.target.src = '/images/placeholder.jpg'; 
          }}
        />
      </div>
      <div className="movie-info">
        <span className="genre-badge">{movie.genre}</span>
        <h3 className="movie-title">{movie.title}</h3>
        <p className="movie-description">{movie.description}</p>
        
        <div className="rating">
          <div className="rating-stars">{(movie.rating)}</div>
          <span>{movie.rating.toFixed(1)}</span>
        </div>
        
        <div className="movie-details">
          <span className="movie-showtime">Сеанс: {movie.showtime}</span>
        </div>
        
        <div className="movie-actions">
          <button className="book-button">
            Забронювати
          </button>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;