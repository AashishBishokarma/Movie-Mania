import React from 'react';

const Browse = ({
  searchQuery,      // Current search query input by the user
  setSearchQuery,   // Function to update the search query state
  movies,           // Array of movies retrieved from the OMDb API
  loading,          // Boolean to indicate if the API call is in progress
  error,            // Error message if the API call fails
  handleSearch,     // Function to initiate the search for movies
  addToFavourites,  // Function to add a movie to the favourites list
}) => {

  // Function to handle the "Enter" key press for triggering the search
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch(); // Trigger search when Enter is pressed
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col justify-center items-center"
      style={{
        backgroundImage: "url('browse.jpg')", // Replace with the actual URL of your background image
      }}
    >
      {/* Page title */}
      <h1 className="text-5xl font-bold mb-8 text-black mt-2 font-mono" style={{ WebkitTextStroke: '.5px white' }}>
        Browse Movies
      </h1>

      {/* Search input and button */}
      <div className="mb-8 flex flex-col sm:flex-row justify-center items-center">
        <input
          type="text"
          placeholder="Search for movies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}  // Update search query state
          onKeyDown={handleKeyDown}                        // Add event listener for Enter key
          className="p-3 border rounded w-full sm:w-64 mb-4 sm:mb-0 sm:mr-4"
        />
        <button onClick={handleSearch} className="bg-blue-500 text-white px-6 py-3 rounded font-mono">
          Search
        </button>
      </div>

      {/* Loading spinner (visible while the API call is in progress) */}
      {loading && <div className="spinner"></div>}

      {/* Error message (visible if there's an error in the API call) */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Movie grid displaying search results */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full px-4 sm:px-6 lg:px-10">
        {movies.map((movie) => (
          <div key={movie.imdbID} className="border p-4 rounded bg-white shadow-lg">
            <img src={movie.Poster} alt={movie.Title} className="w-full h-64 object-cover mb-2" />
            <h2 className="text-lg font-bold">{movie.Title}</h2>
            <p>{movie.Year}</p>
            <button
              onClick={() => addToFavourites(movie)}  // Add the movie to the favourites list
              className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 font-mono"
            >
              Add to Favourites
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Browse;
