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
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<About />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
