import Home from './pages/Home.jsx'
import Booikg from './pages/Booking.jsx'
import  { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/booking/:id" element={<Booikg />} />
          </Routes>
    </Router>
  );
}


export default App;
