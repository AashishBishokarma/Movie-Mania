import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const navigate = useNavigate();

  // Function to handle login and redirection
  const handleLogin = () => {
    onLogin(); // Trigger state change in the App component
    navigate('/'); // Redirect to the home page
  };

  // Function to handle key down events on the password input
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleLogin(); // Trigger login on pressing Enter
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center h-screen bg-cover bg-center"
      style={{ backgroundImage: 'url("login image.jpg")' }} // Replace with your image URL
    >
      <h1 className="text-white text-4xl md:text-6xl font-bold mb-8 text-center font-mono">
        WELCOME TO MOVIE MANIA
      </h1>
      <div className="w-72 md:w-96 bg-white p-8 rounded-lg shadow-lg mt-40">
        <input
          type="text"
          placeholder="Username"
          className="w-full mb-4 p-2 border border-gray-300 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-2 border border-gray-300 rounded"
          onKeyDown={handleKeyDown} // Add event listener for Enter key
        />
        <button
          onClick={handleLogin}
          className="w-full mb-4 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300"
        >
          Login
        </button>
        <hr className="w-4/5 mx-auto border-t-2 border-gray-300 mb-4" />
        <button className="w-full mb-2 bg-red-500 text-white py-2 rounded hover:bg-red-600 transition duration-300">
          Login with Google
        </button>
        <button className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800 transition duration-300">
          Login with Facebook
        </button>
      </div>
    </div>
  );
};

export default Login;
