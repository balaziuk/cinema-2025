import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard';

function MovieList({ movies }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMovies, setFilteredMovies] = useState(movies);
  const [animationKey, setAnimationKey] = useState(0);
  
  useEffect(() => {
    const results = movies.filter(movie =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setAnimationKey(prev => prev + 1);
    setFilteredMovies(results);
  }, [searchTerm, movies]);

  return (
    <div className="movie-list-container">
      <div className="search-container">
        <input
          type="text"
          placeholder="Пошук фільмів..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>
      
      <div className="movie-list" key={animationKey}>
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie, index) => (
            <div key={movie.id} style={{"--item-index": index}}>
              <MovieCard movie={movie} />
            </div>
          ))
        ) : (
          <p className="no-results">Фільмів не знайдено</p>
        )}
      </div>
    </div>
  );
}

export default MovieList;