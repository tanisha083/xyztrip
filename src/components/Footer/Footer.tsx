import React from 'react';
import { FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="font-poppins bg-gray-100">
      <div className="max-w-screen-lg mx-auto py-4 px-4 sm:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <nav className="flex flex-col md:flex-row gap-4 md:gap-6 w-full md:w-auto items-center md:items-start">
          <a 
            href="/about" 
            className="text-gray-600 hover:text-[#FF5733] hover:bg-gray-200 px-4 py-2 rounded transition-colors text-center md:text-left"
          >
            About
          </a>
          <a 
            href="/terms" 
            className="text-gray-600 hover:text-[#FF5733] hover:bg-gray-200 px-4 py-2 rounded transition-colors text-center md:text-left"
          >
            Terms of Service
          </a>
          <a 
            href="/privacy" 
            className="text-gray-600 hover:text-[#FF5733] hover:bg-gray-200 px-4 py-2 rounded transition-colors text-center md:text-left"
          >
            Privacy Policy
          </a>
        </nav>
        <div className="flex gap-6 justify-center w-full md:w-auto">
          <a 
            href="https://x.com/trip_tailor_" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-[#FF5733] hover:text-[#FF7849] cursor-pointer transition-all duration-300 hover:scale-110"
          >
            <FaTwitter size={28} />
          </a>
          <a 
            href="https://www.instagram.com/triptailor.contact/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-[#FF5733] hover:text-[#FF7849] cursor-pointer transition-all duration-300 hover:scale-110"
          >
            <FaInstagram size={28} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
