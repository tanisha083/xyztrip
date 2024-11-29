import React from 'react';
import { useNavigate } from 'react-router-dom';
import travelImage from '../../assets/full-shot-travel-concept-with-landmarks.jpg';

const MainBanner: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section 
      className="relative mx-4 sm:mx-8 md:mx-[110px] py-6 sm:py-8 px-4 sm:px-8 flex items-center justify-center overflow-hidden rounded-lg font-poppins
        bg-cover bg-center min-h-[500px] sm:min-h-[450px] max-h-[600px] h-[70vh] sm:h-[60vh] backdrop-blur-sm"
      style={{ backgroundImage: `url(${travelImage})` }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* Content container */}
      <div className="relative z-20 text-center text-white bg-white/5 py-6 sm:py-7 px-10 rounded-xl 
        shadow-[0_8px_20px_rgba(0,0,0,0.4)] max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-normal mb-3 sm:mb-4 
          drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] leading-tight">
          Create Your Perfect <br className="hidden sm:block" />
          Travel Itinerary
        </h1>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-5 sm:mb-7
          drop-shadow-[1px_1px_5px_rgba(0,0,0,0.3)] font-semibold">
          Personalized plans for your next adventure
        </p>
        <button
          onClick={() => navigate('/plan-trip')}
          className="px-4 sm:px-8 py-2 sm:py-4 bg-[#FF5733] hover:bg-[#FF5733] text-white font-bold rounded-lg
            shadow-md transition-transform duration-300 hover:scale-105 active:scale-95
            focus:outline-none focus:ring-2 focus:ring-[#FF5733] focus:ring-opacity-50
            text-xs sm:text-base animate-bounce pulse-effect"
        >
          Start Planning
        </button>
      </div>
    </section>
  );
};

export default MainBanner;
