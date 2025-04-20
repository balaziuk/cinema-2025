import React from "react";
import MovieList from "../components/MovieList";
import moviesData from "../data/movies"; // Імпортуємо дані фільмів

function Home() {
    return (
        <div>
            <MovieList movies={moviesData} />
        </div>
    );
}

export default Home;