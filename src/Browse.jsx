import React from 'react';

const Browse = ({
  searchQuery,
  setSearchQuery,
  movies,
  loading,
  error,
  handleSearch,
  addToFavourites,
}) => {
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
      <h1 className="text-5xl font-bold mb-8 text-black mt-2 font-mono" style={{ WebkitTextStroke: '.5px white' }}>
        Browse Movies
      </h1>
      <div className="mb-8 flex flex-col sm:flex-row justify-center items-center">
        <input
          type="text"
          placeholder="Search for movies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown} // Add event listener for Enter key
          className="p-3 border rounded w-full sm:w-64 mb-4 sm:mb-0 sm:mr-4"
        />
        <button onClick={handleSearch} className="bg-blue-500 text-white px-6 py-3 rounded font-mono">
          Search
        </button>
      </div>
      {loading && <div className="spinner"></div>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full px-4 sm:px-6 lg:px-10">
        {movies.map((movie) => (
          <div key={movie.imdbID} className="border p-4 rounded bg-white shadow-lg">
            <img src={movie.Poster} alt={movie.Title} className="w-full h-64 object-cover mb-2" />
            <h2 className="text-lg font-bold">{movie.Title}</h2>
            <p>{movie.Year}</p>
            <button
              onClick={() => addToFavourites(movie)}
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
