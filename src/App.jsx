import './App.css'
import Home from './pages/Home.jsx'
import Booikg from './pages/Booking.jsx'
import  { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <div className="header-background"></div>
          <div className="header-content">
            <h1 className="app-title">UAFlix</h1>
            <p>Знайдіть та забронюйте квитки на найкращі фільми</p>
          </div>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/booking/:movieId" element={<Booikg />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}


export default App;
