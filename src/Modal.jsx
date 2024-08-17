import React from 'react';

// Modal component to confirm removal of a movie from favourites
const Modal = ({ isOpen, onClose, onConfirm, movieTitle }) => {
  // If the modal is not open, don't render anything
  if (!isOpen) return null;

  return (
    // Modal background overlay
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      {/* Modal content container */}
      <div className="bg-white p-4 rounded shadow-lg w-1/3">
        {/* Modal header */}
        <h2 className="text-xl font-bold mb-4">Confirm Removal</h2>

        {/* Confirmation message */}
        <p>Are you sure you want to remove "{movieTitle}" from your favourites?</p>

        {/* Action buttons */}
        <div className="mt-4 flex justify-end">
          {/* Confirm button */}
          <button
            onClick={onConfirm}
            className="bg-red-500 text-white px-4 py-2 rounded mr-2"
          >
            Remove
          </button>

          {/* Cancel button */}
          <button
            onClick={onClose}
            className="bg-gray-300 text-black px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
