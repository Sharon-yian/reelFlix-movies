import React from 'react';
import { Link } from 'react-router-dom';

/**
 * 404 Not Found page with hand-written styling
 * Created by: Movie Explorer Team
 * Date: October 2025
 */
const NotFound = () => {
  return (
    <div className="container">
      <div className="paper text-center" style={{ maxWidth: '600px', margin: '6rem auto' }}>
        <h1 className="paper-heading">404 - Page Not Found</h1>
        
        <div className="paper-content">
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>
            🎬
          </div>
          
          <p className="mb-6">
            Oops! Looks like this scene didn't make the final cut.
          </p>
          
          <p className="mb-8">
            The page you're looking for has gone missing from our movie collection.
            Perhaps it's off to Hollywood seeking fame and fortune!
          </p>
          
          <Link to="/" className="hand-drawn-btn">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
