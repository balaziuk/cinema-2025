import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CinemaHall from '../components/CinemaHall';
import moviesData from '../data/movies';
import '../bookingStyles.css'

function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  
  useEffect(() => {
    // Знаходимо фільм за id
    const selectedMovie = moviesData.find(m => m.id === parseInt(id) || m.id === id);
    
    if (selectedMovie) {
      setMovie(selectedMovie);
    } else {
      // Якщо фільм не знайдено повертаємося на головну
      alert('Фільм не знайдено');
      navigate('/');
    }
  }, [id, navigate]);
  
  if (!movie) {
    return <div className="loading">Завантаження...</div>;
  }
  
  return (
    <div className="booking-page">
      <div className="movie-info-header">
        <img 
          src={movie.posterUrl} 
          alt={movie.title} 
          className="movie-poster-small"
          onError={(e) => {
            e.target.src = '/images/placeholder.jpg';
          }}
        />
        <div className="movie-header-details">
          <h1>{movie.title}</h1>
          <p className="genre-badge-b">{movie.genre}</p>
          <p className="showtime">Сеанс: {movie.showtime}</p>
        </div>
        <button className="back-to-list-button" onClick={() => navigate('/')}>
          &larr; Назад до списку
        </button>
      </div>
      
      <CinemaHall movieId={movie.id} movieTitle={movie.title} />
    </div>
  );
}

export default Booking;