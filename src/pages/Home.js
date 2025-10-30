import React, { useState, useEffect, useCallback } from 'react';
import Slider from "react-slick";
import { tmdbService } from "../services/tmdbService";
import MovieCard from '../components/MovieCard';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('popular');
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const fetchMovies = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let data;
      if (searchQuery) {
        data = await tmdbService.searchMovies(searchQuery);
        setMovies(data.Search || []);
      } else {
        switch (category) {
          case 'now_playing':
            data = await tmdbService.getNowPlayingMovies();
            break;
          case 'top_rated':
            data = await tmdbService.getTopRatedMovies();
            break;
          default:
            data = await tmdbService.getPopularMovies();
        }
        setMovies(data.Search || []);
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
      setError('Failed to load movies. Please check your API key and try again.');
    } finally {
      setLoading(false);
    }
  }, [searchQuery, category]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const handleSearchInputChange = (e) => setSearchQuery(e.target.value);
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchMovies();
  };

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setSearchQuery('');
  };

  const handleMovieClick = async (movie) => {
    setLoading(true);
    try {
      const fullMovie = await tmdbService.getMovieById(movie.imdbID);
      setSelectedMovie(fullMovie);
      setShowModal(true);
    } catch (error) {
      console.error('Error fetching movie details:', error);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => setShowModal(false);

  // Slick carousel settings
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 6,
    slidesToScroll: 3,
    arrows: true,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 4 } },
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <div className="hero text-center py-16 bg-gradient-to-r from-purple-700 to-indigo-900 text-white">
        <h1 className="text-4xl font-bold mb-4">Discover Amazing Movies</h1>
        <p className="mb-6 text-lg opacity-90">Search through thousands of movies and find your next favorite</p>

        <form className="flex justify-center gap-2" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            className="w-80 p-2 rounded-md text-black"
            placeholder="Search for movies..."
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
          <button type="submit" className="bg-orange-500 px-5 py-2 rounded-md hover:bg-orange-400">
            Search
          </button>
        </form>
      </div>

      {/* Category Buttons */}
      <div className="flex justify-center gap-4 py-6">
        {["popular", "now_playing", "top_rated"].map((cat) => (
          <button
            key={cat}
            className={`px-4 py-2 rounded-md ${
              category === cat ? "bg-red-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
            onClick={() => handleCategoryChange(cat)}
          >
            {cat.replace("_", " ").toUpperCase()}
          </button>
        ))}
      </div>

      {/* Movies Section */}
      <div className="container mx-auto px-6">
        {loading ? (
          <p className="text-center text-gray-400">Loading amazing movies...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : movies.length > 0 ? (
          <Slider {...sliderSettings}>
            {movies.map((movie) => (
              <div key={movie.imdbID} onClick={() => handleMovieClick(movie)}>
                <MovieCard movie={movie} />
              </div>
            ))}
          </Slider>
        ) : (
          <p className="text-center text-gray-400">No movies found. Try another search.</p>
        )}
      </div>

      {/* Modal */}
      {showModal && selectedMovie && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50" onClick={closeModal}>
          <div className="bg-gray-900 text-white rounded-lg p-6 max-w-4xl w-full relative" onClick={(e) => e.stopPropagation()}>
            <button className="absolute top-4 right-4 text-2xl" onClick={closeModal}>
              ×
            </button>
            <div className="grid md:grid-cols-2 gap-6">
              <img
                src={selectedMovie.Poster !== 'N/A' ? selectedMovie.Poster : 'https://via.placeholder.com/300x450?text=No+Image'}
                alt={selectedMovie.Title}
                className="rounded-md"
              />
              <div>
                <h2 className="text-3xl font-bold mb-2">{selectedMovie.Title}</h2>
                <p className="text-gray-400 mb-4">{selectedMovie.Year}</p>
                <p><strong>Genre:</strong> {selectedMovie.Genre}</p>
                <p><strong>Director:</strong> {selectedMovie.Director}</p>
                <p><strong>Actors:</strong> {selectedMovie.Actors}</p>
                <p><strong>Plot:</strong> {selectedMovie.Plot}</p>
                <p><strong>Rating:</strong> {selectedMovie.imdbRating}/10</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;