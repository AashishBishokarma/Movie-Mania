import React from 'react';

const Modal = ({ isOpen, onClose, onConfirm, movieTitle }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded shadow-lg w-1/3">
        <h2 className="text-xl font-bold mb-4">Confirm Removal</h2>
        <p>Are you sure you want to remove "{movieTitle}" from your favourites?</p>
        <div className="mt-4 flex justify-end">
          <button
            onClick={onConfirm}
            className="bg-red-500 text-white px-4 py-2 rounded mr-2"
          >
            Remove
          </button>
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
