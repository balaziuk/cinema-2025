import React, {useState} from "react";
import MovieCard from "./MovieCard";

function MovieList({ movies }) { 
    const [searchTerm, setSearchTerm] = useState('');
    const filteredMovies = movies.filter(movie => 
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <div>
                <input
                    type="text"
                    placeholder="пошук фільму..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div>
                {filteredMovies.length > 0 ? (
                    filteredMovies.map(movie => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))
                ) : (
                    <p>Фільми не знайдено</p>
                )}
            </div>
        </div>
    )
}

export default MovieList;