import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Home } from 'lucide-react';

const Navbar = () => {
  const [navHeight, setNavHeight] = useState('100vh');
  const [isNavVisible, setIsNavVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const totalScroll = docHeight - windowHeight;
      const scrolled = scrollTop / totalScroll;

      setNavHeight(`${scrolled * 100}vh`);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleNav = () => {
    setIsNavVisible((prev) => !prev);
  };

  return (
    <>
      <button
        onClick={toggleNav}
        className="fixed top-4 left-4 z-50 p-2 rounded-md bg-gray-800 text-white hover:bg-gray-700 md:hidden"
      >
        {isNavVisible ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
      </button>
      <nav
        className={`fixed top-0 left-0 bg-gray-800 text-white p-4 h-screen transition-all ${isNavVisible ? 'w-64' : 'w-16'}`}
        style={{ height: navHeight }}
      >
        <div className="flex flex-col items-center">
          <Link to="/" className="mb-4">
            <Home size={24} className="text-white hover:text-blue-500" />
          </Link>
          <img
            src="https://img.logoipsum.com/243.svg"
            alt="Logo"
            className={`mb-6 transition-all ${isNavVisible ? 'w-32' : 'w-0'}`}
          />
        </div>
        <ul className="flex flex-col items-start">
          <li className="mb-4">
            <Link to="/browse" className="hover:text-blue-500">
              Browse
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/favourites" className="hover:text-blue-500">
              Favourites
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
