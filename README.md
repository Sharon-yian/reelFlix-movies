##  reelFlix Movies

**reelFlix Movies** is a Netflix-inspired web app that allows users to discover, explore, and manage their favorite movies.  
It integrates **The Movie Database (TMDB) API** for real-time movie data and **Firebase Authentication** for secure login — all within a sleek, responsive, and immersive interface.
Designed to bring the cinematic experience to your browser  fast, beautiful, and personal.

---

## **Problem Statement**

In the streaming age, users are overwhelmed by endless movie options spread across multiple platforms.  
Finding **accurate**, **updated**, and **visually engaging** movie information can be frustrating.  
Many apps are cluttered, slow, or require subscriptions just to explore movie data.

---

## **Solution**

**reelFlix Movies** offers a unified and elegant platform for movie lovers to:

- Browse trending and top-rated movies in real-time  
- Search through thousands of titles instantly  
- Access in-depth movie details including ratings, genres, and cast  
- Log in securely using **Firebase** (Email/Password or Google)  
- Personalize their experience with **dark/light themes**  
- Access the platform seamlessly on any device  


---

##  **Movie Features**

###  1. **Movie Discovery**
- Browse movies from **TMDB API**
- Switch between categories: **Popular**, **Now Playing**, **Top Rated**
- Infinite discovery powered by real-time data

###  2. **Smart Search**
- Instantly search thousands of movies  
- Debounced search input for performance  
- Displays search results dynamically

###  3. **Movie Details Modal**
- Click on any movie to view:
  - Poster & title
  - Release year
  - Genre & director
  - Cast & IMDB rating
  - Box office and awards (if available)
- Beautiful modal pop-up with smooth animations

###  4. **User Favorites (Coming Soon)**
- Logged-in users will be able to save movies to “My List”
- Data stored securely with Firebase Firestore

### 5. **Theme System**
- Toggle between light and dark mode  
- Saves user preference in `localStorage`  
- Adapts automatically to system theme

###  6. **Fully Responsive**
- Mobile-first design  
- Optimized grids for all screen sizes  
- Smooth animations using Tailwind CSS utilities

---

##  **Tech used**

| Layer and Tools 
|
| **Frontend** - React , React Router  
| **Styling** -Tailwind CSS 
| **State Management** - React Context API 
| **Authentication** - Firebase 
| **API Integration**- TMDB (The Movie Database) 
| **HTTP Client** - Axios 

---

## **Project Structure**

reelFlix-movies/
├── public/
├── src/
│ ├── components/ # UI components (Navbar, MovieCard, etc.)
│ ├── context/ # Auth & Theme contexts
│ ├── pages/ # Home, Login, Signup, AddMovie, About
│ ├── services/ # TMDB API integration
│ ├── firebase.js # Firebase configuration
│ ├── App.js # Routing setup
│ └── index.js # Entry point
└── package.json