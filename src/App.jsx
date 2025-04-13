import './App.css'
import MovieList from './components/MovieList'
import moviesData from './data/movies.js'

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <div className="header-background"></div>
        <div className="header-content">
          <h1 className="app-title">UAFlix</h1>
          <p>Знайдіть та забронюйте квитки на найкращі фільми</p>
        </div>
      </header>
      <main>
        <MovieList movies={moviesData} />
      </main>
    </div>
  )
}

export default App
