import React from "react";

function MovieCard({ movie }) { 
    return (
        <div>
            <img src={movie.posterUrl} alt={movie.title} />
            <div>
                <h3>{movie.title}</h3>
                <p>{movie.description}</p>
                <div>
                    <span>{movie.genre}</span>
                    <span>{movie.showtime}</span>
                </div>
            </div>
        </div>
    );
}

export default MovieCard;