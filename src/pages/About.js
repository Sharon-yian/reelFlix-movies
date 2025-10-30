import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="container">
      <div className="paper">
        <h1 className="paper-heading">About reelFlix Movies</h1>

        <div className="paper-content">
          <p>
            reelFlix is a hand-crafted single-page application built with React 
            that allows users to discover, search, and explore movies using the 
            Open Movie Database (TMDb) API.
          </p>

          <h2 className="mt-8">Features</h2>
          <ul className="space-y-2">
            <li>Search thousands of movies from TMDb's extensive database</li>
            <li>Browse curated collections of popular, now playing, and top-rated movies</li>
            <li>Secure user authentication with Firebase (Email/Password & Google Sign-In)</li>
            <li>Custom hand-written styling with light and dark mode</li>
            <li>Responsive design that works beautifully on any device</li>
            <li>Add movies to your personal list (authenticated users)</li>
          </ul>

          <h2 className="mt-8">Technologies Used</h2>
          <div className="row mt-4">
            <div className="col hand-drawn-card">
              <h3 className="mb-2">Frontend</h3>
              <ul className="space-y-1">
                <li>• React 19</li>
                <li>• React Router DOM 7</li>
                <li>• Custom CSS</li>
                <li>• Context API</li>
              </ul>
            </div>
            <div className="col hand-drawn-card">
              <h3 className="mb-2">Backend & APIs</h3>
              <ul className="space-y-1">
                <li>• Firebase Authentication</li>
                <li>• tmdb API</li>
                <li>• Vanilla Fetch API</li>
              </ul>
            </div>
          </div>

          <h2 className="mt-8">Getting Started</h2>
          <div className="hand-drawn-card mt-4 mb-6">
            <h3 className="mb-3">
              Configuration Required
            </h3>
            <p className="mb-3">
              To run this application, you'll need to configure:
            </p>
            <ol className="space-y-2">
              <li>
                <strong>TMDb API Key:</strong> Get it from{' '}
                <a
                  href="https://www.omdbapi.com/apikey.aspx"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  TMDb API Key Registration
                </a>
              </li>
              <li>
                <strong>Firebase Configuration:</strong> Create a project at{' '}
                <a
                  href="https://console.firebase.google.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Firebase Console
                </a>
              </li>
            </ol>
          </div>

          <h2 className="mt-8">Design Philosophy</h2>
          <p className="mb-4">
            The reelFlix app features a unique hand-written aesthetic, purposefully moving away 
            from generic framework-based designs. We've crafted a custom styling approach that gives 
            the application a more personalized, artisanal feel.
          </p>

          <div className="hand-drawn-card mt-4 mb-6">
            <h3 className="mb-3">
              Key Design Elements
            </h3>
            <ul className="space-y-1">
              <li>• <strong>Hand-drawn borders and shapes:</strong> Irregular, organic styling</li>
              <li>• <strong>Carefully selected typography:</strong> Blending readability with personality</li>
              <li>• <strong>Paper-like textures:</strong> Creating depth and tactile feel</li>
              <li>• <strong>Custom animations:</strong> Subtle, thoughtful interactions</li>
              <li>• <strong>Consistent color palette:</strong> Balanced across light and dark modes</li>
            </ul>
          </div>

          <div className="mt-8 text-center">
            <Link to="/" className="hand-drawn-btn">
              Start Exploring Movies
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
