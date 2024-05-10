import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import About from './pages/About'

function App() {

  return (
    <div className="font-sans">
      {/* Router component to handle routing */}
      <Router>
        {/* Navbar component */}
        <Navbar />
        {/* Routes component to define routes */}
        <Routes>
          {/* Route for login page */}
          <Route path="/login" element={<Login />} />
          {/* Route for signup page */}
          <Route path="/signup" element={<Signup />} />
          {/* Route for home page */}
          <Route path="/" element={<Home />} />
          {/* Route for about page */}
          <Route path="/about-us" element={<About />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
