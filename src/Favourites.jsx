import React, { useState } from 'react';
import Modal from './Modal';

const Favourites = ({ favourites, removeFromFavourites }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const openModal = (movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    if (selectedMovie) {
      removeFromFavourites(selectedMovie.imdbID);
      setSelectedMovie(null);
    }
    setIsModalOpen(false);
  };

  const handleClose = () => {
    setSelectedMovie(null);
    setIsModalOpen(false);
  };

  return (
    <div
      className="min-h-screen  bg-cover bg-center flex flex-col items-center justify-center"
      style={{
        backgroundImage: "url('fav3.jpg')", // Replace with the URL of your background image
      }}
    >
      <h1 className="text-5xl font-bold mb-8 mt-8  text-white font-mono" style={{ WebkitTextStroke: '1px black' }}>My Favourites</h1>
      {favourites.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full px-4 sm:px-0">
          {favourites.map((movie) => (
            <div key={movie.imdbID} className="border p-4 rounded bg-white shadow-lg">
              <img src={movie.Poster} alt={movie.Title} className="w-full h-64 object-cover mb-2" />
              <h2 className="text-lg font-bold">{movie.Title}</h2>
              <p>{movie.Year}</p>
              <button
                onClick={() => openModal(movie)}
                className="mt-2 bg-red-500 text-white px-4 py-2 rounded"
              >
                Remove from Favourites
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-black text-3xl font-mono" style={{ WebkitTextStroke: '.5px white' }}>No favourites yet.</p>
      )}
      <Modal
        isOpen={isModalOpen}
        onClose={handleClose}
        onConfirm={handleConfirm}
        movieTitle={selectedMovie?.Title}
      />
    </div>
  );
};

export default Favourites;
