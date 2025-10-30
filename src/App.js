import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from "./pages/SignUp";
import AddMovie from './pages/AddMovie';
import About from './pages/About';
import NotFound from './pages/NotFound';
import './index.css';

/* ================================================== */
/* Navbar – Fixed Mobile + Auth + Dark Mode           */
/* ================================================== */
const Navbar = () => {
  const { currentUser, logout } = useAuth();

  const toggleMobileMenu = () => {
    const menu = document.querySelector('.mobile-nav-links');
    menu.classList.toggle('active');
  };

  const toggleDarkMode = () => {
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');
    localStorage.setItem('dark-mode', isDark ? 'true' : 'false');
  };

  React.useEffect(() => {
    if (localStorage.getItem('dark-mode') === 'true') {
      document.body.classList.add('dark-theme');
    }
  }, []);

  return (
    <header className="bg-black text-white shadow-lg sticky top-0 z-50">
      <nav className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <div className="text-2xl font-bold text-red-600">
          <Link to="/">reelFlix</Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          Menu
        </button>

        {/* Desktop Nav */}
        <ul className="hidden md:flex space-x-6 text-lg items-center">
          <li><Link to="/" className="hover:text-red-600">Home</Link></li>
          <li><Link to="/about" className="hover:text-red-600">About</Link></li>
          <li><Link to="/add" className="hover:text-red-600">Add Movie</Link></li>

          {currentUser ? (
            <>
              <li className="flex items-center gap-2">
                <img
                  src={currentUser.photoURL || '/default-avatar.png'}
                  alt="Avatar"
                  className="w-8 h-8 rounded-full"
                />
                <span className="hidden lg:inline">
                  Hi, {currentUser.displayName?.split(' ')[0]}
                </span>
              </li>
              <li>
                <button onClick={logout} className="text-red-400 hover:underline">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li><Link to="/login" className="hover:text-red-600">Login</Link></li>
              <li><Link to="/signup" className="hover:text-red-600">SignUp</Link></li>
            </>
          )}
        </ul>

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full bg-gray-800 hover:bg-gray-700"
        >
          <svg className="w-5 h-5 hidden dark:block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white">
            <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/>
          </svg>
          <svg className="w-5 h-5 block dark:hidden" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="yellow">
            <path d="M12,17c-2.76,0-5-2.24-5-5s2.24-5,5-5s5,2.24,5,5S14.76,17,12,17z M12,5c-3.87,0-7,3.13-7,7s3.13,7,7,7s7-3.13,7-7 S15.87,5,12,5L12,5z"/>
          </svg>
        </button>
      </nav>

      {/* Mobile Dropdown */}
      <div className="md:hidden bg-gray-900">
        <ul className="mobile-nav-links hidden flex-col space-y-4 py-4 px-6 text-lg">
          <li><Link to="/" onClick={toggleMobileMenu}>Home</Link></li>
          <li><Link to="/about" onClick={toggleMobileMenu}>About</Link></li>
          <li><Link to="/add" onClick={toggleMobileMenu}>Add Movie</Link></li>
          {currentUser ? (
            <>
              <li className="flex items-center gap-2">
                <img src={currentUser.photoURL} alt="Avatar" className="w-6 h-6 rounded-full" />
                <span>{currentUser.displayName?.split(' ')[0]}</span>
              </li>
              <li><button onClick={logout} className="text-red-400">Logout</button></li>
            </>
          ) : (
            <>
              <li><Link to="/login" onClick={toggleMobileMenu}>Login</Link></li>
              <li><Link to="/signup" onClick={toggleMobileMenu}>SignUp</Link></li>
            </>
          )}
        </ul>
      </div>
    </header>
  );
};

/* ================================================== */
/* Footer                                             */
/* ================================================== */
const Footer = () => (
  <footer className="bg-gray-900 text-white py-10 mt-20">
    <div className="container mx-auto px-6 text-center">
      <p>&copy; {new Date().getFullYear()} reelFlix-movies. All rights reserved.</p>
    </div>
  </footer>
);

/* ================================================== */
/* Main App                                           */
/* ================================================== */
function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          
            <div className="min-h-screen bg-gray-100 dark:bg-black text-black dark:text-white transition-colors">
              <Navbar />
              <main className="container mx-auto px-6 py-10">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/add" element={<AddMovie />} />
                  <Route path="/about" element={<About />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
            </div>
          
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
