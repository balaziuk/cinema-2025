import React, { useState } from 'react';

function MovieCard({ movie }) {
  const [isFavorite, setIsFavorite] = useState(false);
  
  const toggleFavorite = () => {
    setIsFavorite(prev => !prev);
  };
  
  // Функція для відображення зірочок на основі рейтингу
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={`full-${i}`}>★</span>);
    }
    
    if (hasHalfStar) {
      stars.push(<span key="half">☆</span>);
    }
    
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} style={{ opacity: 0.3 }}>☆</span>);
    }
    
    return stars;
  };
  
  const handleBooking = () => {
    alert(`Бронювання фільму: ${movie.title} на сеанс ${movie.showtime}`);
  };

  return (
    <div className="movie-card">
      <div style={{ overflow: 'hidden' }}>
        <img 
          src={movie.posterUrl} 
          alt={movie.title} 
          className="movie-poster" 
          onError={(e) => {
            e.target.src = '/images/placeholder.jpg'; // Запасне зображення, якщо основне не завантажилось
          }}
        />
      </div>
      <div className="movie-info">
        <span className="genre-badge">{movie.genre}</span>
        <h3 className="movie-title">{movie.title}</h3>
        <p className="movie-description">{movie.description}</p>
        
        <div className="rating">
          <div className="rating-stars">{renderStars(movie.rating)}</div>
          <span>{movie.rating.toFixed(1)}</span>
        </div>
        
        <div className="movie-details">
          <span className="movie-showtime">Сеанс: {movie.showtime}</span>
        </div>
        
        <div className="movie-actions">
          <button className="book-button" onClick={handleBooking}>
            Забронювати
          </button>
          <button 
            className={`favorite-button ${isFavorite ? 'active' : ''}`} 
            onClick={toggleFavorite}
          >
            {isFavorite ? '♡' : '♡'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;