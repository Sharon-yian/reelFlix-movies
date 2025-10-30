import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AddMovie = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    year: '',
    genre: '',
    director: '',
    rating: '',
    description: '',
  });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  if (!currentUser) {
    navigate('/login');
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.title || !formData.year || !formData.genre) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      
      console.log('Movie data to save:', formData);
      setSuccess('Movie added successfully!');
      
      // Reset form
      setFormData({
        title: '',
        year: '',
        genre: '',
        director: '',
        rating: '',
        description: '',
      });

      // Redirect after 2 seconds
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      setError('Failed to add movie. Please try again.');
    }
  };

  return (
    <div className="container">
      <div className="form-container paper">
        <h1 className="paper-heading">Add a Movie to Your Collection</h1>

        {success && (
          <div className="message" style={{ color: 'var(--success)' }}>
            {success}
          </div>
        )}

        {error && (
          <div className="message error-message">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="paper-content">
          <div className="form-group">
            <label htmlFor="title" className="form-label">
              Movie Title *
            </label>
            <input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter movie title"
            />
          </div>

          <div className="row">
            <div className="col form-group">
              <label htmlFor="year" className="form-label">
                Release Year *
              </label>
              <input
                id="year"
                name="year"
                type="number"
                value={formData.year}
                onChange={handleChange}
                className="form-input"
                placeholder="2024"
                min="1900"
                max="2100"
              />
            </div>

            <div className="col form-group">
              <label htmlFor="genre" className="form-label">
                Genre *
              </label>
              <select
                id="genre"
                name="genre"
                value={formData.genre}
                onChange={handleChange}
                className="form-input"
              >
                <option value="">Select genre</option>
                <option value="Action">Action</option>
                <option value="Comedy">Comedy</option>
                <option value="Drama">Drama</option>
                <option value="Horror">Horror</option>
                <option value="Sci-Fi">Sci-Fi</option>
                <option value="Thriller">Thriller</option>
                <option value="Romance">Romance</option>
                <option value="Adventure">Adventure</option>
                <option value="Animation">Animation</option>
              </select>
            </div>
          </div>

          <div className="row">
            <div className="col form-group">
              <label htmlFor="director" className="form-label">
                Director
              </label>
              <input
                id="director"
                name="director"
                type="text"
                value={formData.director}
                onChange={handleChange}
                className="form-input"
                placeholder="Director name"
              />
            </div>

            <div className="col form-group">
              <label htmlFor="rating" className="form-label">
                Your Rating (1-10)
              </label>
              <input
                id="rating"
                name="rating"
                type="number"
                value={formData.rating}
                onChange={handleChange}
                className="form-input"
                placeholder="8.5"
                min="1"
                max="10"
                step="0.1"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="form-input"
              placeholder="Add your thoughts about this movie..."
            />
          </div>

          <div className="row mt-6">
            <div className="col">
              <button type="submit" className="btn btn-primary w-full">
                Add Movie
              </button>
            </div>
            <div className="col">
              <button
                type="button"
                className="hand-drawn-btn w-full"
                onClick={() => navigate('/')}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMovie;
