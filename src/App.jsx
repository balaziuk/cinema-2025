import './App.css'
import MovieList from './components/MovieList'
import moviesData from './data/movies.js'

function App() {
  return (
    <div>
      <header>
        <h1>UAFlix</h1>
      </header>
      <main>
        <MovieList movies={moviesData} />
      </main>
    </div>
  )
}

export default App
