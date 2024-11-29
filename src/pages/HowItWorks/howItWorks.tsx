import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

import { FaClipboardList, FaCog, FaSmile } from 'react-icons/fa';

const HowItWorks: React.FC = () => {
  return (
    <div className="font-poppins bg-gray-100">
      <Header />
      <main className="max-w-screen-lg mx-auto text-center my-10 px-4 sm:px-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-2 text-gray-600">How TripTailor works</h2>
        <div className="flex flex-col justify-center items-center gap-10 py-6">
          <div className="flex flex-col items-center">
            <div className="text-[#FF5733] text-2xl mb-4 transition-transform transform hover:scale-110">
              <FaClipboardList size={32} />
            </div>
            <p className="text-lg text-gray-600 max-w-md">
              <strong>Enter Details:</strong> Provide your destination, budget, interests, and travel dates.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-[#FF5733] text-2xl mb-4 transition-transform transform hover:scale-110">
              <FaCog size={32} />
            </div>
            <p className="text-lg text-gray-600 max-w-md">
              <strong>Generate Itinerary:</strong> Our AI processes your input to create a customized travel plan, tailored to your preferences.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-[#FF5733] text-2xl mb-4 transition-transform transform hover:scale-110">
              <FaSmile size={32} />
            </div>
            <p className="text-lg text-gray-600 max-w-md">
              <strong>Enjoy Your Trip:</strong> Access your detailed itinerary complete with highlights, activities, and recommendations.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HowItWorks;