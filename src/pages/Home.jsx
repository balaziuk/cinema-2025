import React from "react";
import MovieList from "../components/MovieList";
import moviesData from '..movies.js'

function Home() {
    return (
        <div>
            <MovieList movies={moviesData} />
        </div>
    );
}

export default Home;