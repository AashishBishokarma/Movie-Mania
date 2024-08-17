import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import Login from './Login';
import Browse from './Browse';
import Favourites from './Favourites';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [favourites, setFavourites] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = '46bb2204';  // Replace with your actual OMDb API key

  const addToFavourites = (movie) => {
    setFavourites([...favourites, movie]);
  };

  const removeFromFavourites = (imdbID) => {
    setFavourites(favourites.filter(movie => movie.imdbID !== imdbID));
  };

  const handleSearch = async () => {
    if (!searchQuery) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${searchQuery}`);
      const data = await response.json();

      if (data.Response === 'True') {
        setMovies(data.Search);
      } else {
        setError(data.Error);
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }

    setLoading(false);
  };

  return (
    <Router>
      <div className="flex">
        {isLoggedIn && (
          <nav className="w-64 md:w-48 sm:w-20 min-h-screen bg-gray-800 text-white p-4">
            <ul className="space-y-4">
              <li className="p-2 bg-gray-800 rounded-full flex justify-center">
                <Link to="/" className="hover:text-blue-500 text-blue-400 hover:bg-white hover:rounded-full px-2 py-3">
                  <span className="block lg:hidden md:block text-xl">H</span>
                  <span className="hidden lg:block">Home</span>
                </Link>
              </li>
              <li className="p-2 bg-gray-800 rounded-full flex justify-center">
                <Link to="/browse" className="hover:text-blue-500 text-blue-400 hover:bg-white hover:rounded-full px-2 py-3">
                  <span className="block lg:hidden md:block text-xl">B</span>
                  <span className="hidden lg:block">Browse</span>
                </Link>
              </li>
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
          <Routes>
            {!isLoggedIn ? (
              <Route path="/" element={<Login onLogin={() => setIsLoggedIn(true)} />} />
            ) : (
              <>
                <Route 
                  path="/" 
                  element={
                    <div className="h-screen flex flex-col justify-center items-center bg-cover bg-center" 
                         style={{ backgroundImage: 'url("home2.jpg")',
                                  margin: 0,
                                  padding: 0,
                          }}>
                      <h1 className="text-white text-4xl md:text-6xl font-bold mb-8 text-center font-mono" style={{ WebkitTextStroke: '1.5px black' }}>
                      HOME OF MOVIE MANIA
                      </h1>
                      <Link to="/browse" className="bg-blue-500 text-white px-8 py-3 rounded-full text-lg md:text-xl hover:bg-blue-600 transition duration-300 font-mono">
                        GET STARTED &#8658;
                      </Link>
                    </div>
                  } 
                />
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
