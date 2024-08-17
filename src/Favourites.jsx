import React, { useState } from 'react';
import Modal from './Modal';

const Favourites = ({ favourites, removeFromFavourites }) => {
  // State to manage the modal visibility and the selected movie for removal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  // Function to open the modal and set the selected movie for removal
  const openModal = (movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  // Function to confirm the removal of the selected movie from favourites
  const handleConfirm = () => {
    if (selectedMovie) {
      removeFromFavourites(selectedMovie.imdbID);
      setSelectedMovie(null); // Clear the selected movie after removal
    }
    setIsModalOpen(false); // Close the modal
  };

  // Function to close the modal without removing the movie
  const handleClose = () => {
    setSelectedMovie(null); // Clear the selected movie
    setIsModalOpen(false);   // Close the modal
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center"
      style={{
        backgroundImage: "url('fav3.jpg')", // Replace with the URL of your background image
      }}
    >
      {/* Page title */}
      <h1 className="text-5xl font-bold mb-8 mt-8 text-white font-mono" style={{ WebkitTextStroke: '1px black' }}>
        My Favourites
      </h1>

      {/* Conditional rendering for favourites list */}
      {favourites.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full px-4 sm:px-0">
          {favourites.map((movie) => (
            <div key={movie.imdbID} className="border p-4 rounded bg-white shadow-lg">
              <img src={movie.Poster} alt={movie.Title} className="w-full h-64 object-cover mb-2" />
              <h2 className="text-lg font-bold">{movie.Title}</h2>
              <p>{movie.Year}</p>
              <button
                onClick={() => openModal(movie)} // Open modal on button click
                className="mt-2 bg-red-500 text-white px-4 py-2 rounded"
              >
                Remove from Favourites
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-black text-3xl font-mono" style={{ WebkitTextStroke: '.5px white' }}>
          No favourites yet.
        </p>
      )}

      {/* Modal component for confirming removal */}
      <Modal
        isOpen={isModalOpen}          // Control the modal visibility
        onClose={handleClose}         // Function to close the modal
        onConfirm={handleConfirm}     // Function to confirm the removal
        movieTitle={selectedMovie?.Title} // Pass the selected movie's title to the modal
      />
    </div>
  );
};

export default Favourites;
