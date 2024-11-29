import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { useAuth } from '../../context/authContext';

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();
  const { user } = useAuth();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        console.error('Sign-out error:', error);
      });
  };

  return (
    <header className="font-poppins bg-gray-100">
      <div className="max-w-screen-lg mx-auto py-4 px-4 sm:px-8 flex items-center justify-between">
        <div className="logo mr-4">
          <a href="/" className="text-2xl md:text-3xl font-bold text-gray-800 hover:text-[#FF5733] transition-colors">
            TripTailor
          </a>
        </div>

        <nav 
          className={`${
            menuOpen ? 'flex' : 'hidden'
          } md:flex absolute md:relative top-20 md:top-0 right-4 md:right-0 
          flex-col md:flex-row bg-gray-100 md:bg-transparent
          w-48 md:w-auto p-4 md:p-0 rounded-lg md:rounded-none
          shadow-lg md:shadow-none z-50 md:z-auto
          space-y-2 md:space-y-0 md:space-x-2`}
          onClick={() => setMenuOpen(false)}
        >
          <a href="/" className="px-4 py-2 text-gray-600 hover:text-[#FF5733] hover:bg-gray-200 rounded transition-colors">
            Home
          </a>
          <a href="/about" className="px-4 py-2 text-gray-600 hover:text-[#FF5733] hover:bg-gray-200 rounded transition-colors">
            About
          </a>
          <a href="/how-it-works" className="px-4 py-2 text-gray-600 hover:text-[#FF5733] hover:bg-gray-200 rounded transition-colors">
            How It Works
          </a>
          <a href="/contact" className="px-4 py-2 text-gray-600 hover:text-[#FF5733] hover:bg-gray-200 rounded transition-colors">
            Contact
          </a>
          {user && (
            <a href="/profile" className="px-4 py-2 text-gray-600 hover:text-[#FF5733] hover:bg-gray-200 rounded transition-colors">
              Profile
            </a>
          )}
        </nav>

        <div className="flex items-center gap-2">
          <button 
            className="md:hidden h-[38px] aspect-square flex items-center justify-center 
              bg-gray-200 text-gray-600 hover:bg-gray-300 rounded 
              transition-colors"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            ☰
          </button>

          {user ? (
            <button
              onClick={handleSignOut}
              className="h-[40px] px-6 ml-4 bg-[#FF5733] hover:bg-[#FF7849] text-white font-semibold rounded
                transition-all duration-300 shadow-md hover:shadow-lg active:translate-y-0.5
                focus:outline-none focus:ring-2 focus:ring-[#FF5733] focus:ring-opacity-50 flex items-center justify-center"
            >
              Sign Out
            </button>
          ) : (
            <Link to="/sign-in" className="ml-4">
              <button
                className="h-[40px] px-6 bg-[#FF5733] hover:bg-[#FF7849] text-white font-semibold rounded
                  transition-all duration-300 shadow-md hover:shadow-lg active:translate-y-0.5
                  focus:outline-none focus:ring-2 focus:ring-[#FF5733] focus:ring-opacity-50 flex items-center justify-center"
              >
                <span className="block md:hidden">Sign Up</span>
                <span className="hidden md:block">Sign In / Sign Up</span>
              </button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
