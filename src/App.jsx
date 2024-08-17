import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './Login';
import Browse from './Browse';
import Favourites from './Favourites';

function App() {
  // State management for various aspects of the app
  const [isLoggedIn, setIsLoggedIn] = useState(false);  // Track if the user is logged in
  const [favourites, setFavourites] = useState([]);     // Store the list of favourite movies
  const [searchQuery, setSearchQuery] = useState('');   // Track the current search query
  const [movies, setMovies] = useState([]);             // Store the list of movies retrieved from the API
  const [loading, setLoading] = useState(false);        // Manage the loading state for the API call
  const [error, setError] = useState(null);             // Store any error messages from the API

  const API_KEY = process.env.key;  // Replace with your actual OMDb API key

  // Function to add a movie to the favourites list
  const addToFavourites = (movie) => {
    setFavourites([...favourites, movie]);
  };

  // Function to remove a movie from the favourites list
  const removeFromFavourites = (imdbID) => {
    setFavourites(favourites.filter(movie => movie.imdbID !== imdbID));
  };

  // Function to handle searching for movies using the OMDb API
  const handleSearch = async () => {
    if (!searchQuery) return;  // Exit if the search query is empty

    setLoading(true);
    setError(null);

    try {
      // Fetch movies from the OMDb API based on the search query
      const response = await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${searchQuery}`);
      const data = await response.json();

      if (data.Response === 'True') {
        setMovies(data.Search);  // Set the retrieved movies to the state
      } else {
        setError(data.Error);    // Set an error message if the API response is not successful
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');  // Handle any other errors
    }

    setLoading(false);
  };

  return (
    <Router>
      <div className="flex">
        {/* Navigation bar, only visible when the user is logged in */}
        {isLoggedIn && (
          <nav className="w-64 md:w-48 sm:w-20 min-h-screen bg-gray-800 text-white p-4">
            <ul className="space-y-4">
              {/* Home link */}
              <li className="p-2 bg-gray-800 rounded-full flex justify-center">
                <Link to="/" className="hover:text-blue-500 text-blue-400 hover:bg-white hover:rounded-full px-2 py-3">
                  <span className="block lg:hidden md:block text-xl">H</span>
                  <span className="hidden lg:block">Home</span>
                </Link>
              </li>
              {/* Browse link */}
              <li className="p-2 bg-gray-800 rounded-full flex justify-center">
                <Link to="/browse" className="hover:text-blue-500 text-blue-400 hover:bg-white hover:rounded-full px-2 py-3">
                  <span className="block lg:hidden md:block text-xl">B</span>
                  <span className="hidden lg:block">Browse</span>
                </Link>
              </li>
              {/* Favourites link */}
              <li className="p-2 bg-gray-800 rounded-full flex justify-center">
                <Link to="/favourites" className="hover:text-blue-500 text-blue-400 hover:bg-white hover:rounded-full px-2 py-3">
                  <span className="block lg:hidden md:block text-xl">F</span>
                  <span className="hidden lg:block">Favourites</span>
                </Link>
              </li>
            </ul>
          </nav>
        )}
        <div className="flex-1">
          {/* Define the routes for the application */}
          <Routes>
            {/* Route for the login page, only shown if the user is not logged in */}
            {!isLoggedIn ? (
              <Route path="/" element={<Login onLogin={() => setIsLoggedIn(true)} />} />
            ) : (
              <>
                {/* Home page route */}
                <Route 
                  path="/" 
                  element={
                    <div className="h-screen flex flex-col justify-center items-center bg-cover bg-center" 
                         style={{ backgroundImage: 'url("home2.jpg")', margin: 0, padding: 0 }}>
                      <h1 className="text-white text-4xl md:text-6xl font-bold mb-8 text-center font-mono" 
                          style={{ WebkitTextStroke: '1.5px black' }}>
                        HOME OF MOVIE MANIA
                      </h1>
                      <Link to="/browse" 
                            className="bg-blue-500 text-white px-8 py-3 rounded-full text-lg md:text-xl hover:bg-blue-600 transition duration-300 font-mono">
                        GET STARTED &#8658;
                      </Link>
                    </div>
                  } 
                />
                {/* Browse page route */}
                <Route 
                  path="/browse" 
                  element={
                    <Browse 
                      searchQuery={searchQuery}
                      setSearchQuery={setSearchQuery}
                      movies={movies}
                      loading={loading}
                      error={error}
                      handleSearch={handleSearch}
                      addToFavourites={addToFavourites}
                    />
                  } 
                />
                {/* Favourites page route */}
                <Route 
                  path="/favourites" 
                  element={<Favourites favourites={favourites} removeFromFavourites={removeFromFavourites} />} 
                />
              </>
            )}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
