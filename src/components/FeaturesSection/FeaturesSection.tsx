// FeaturesSection Component (FeaturesSection.tsx)
import React from 'react';
import { FaMapMarkedAlt, FaMoneyBillWave, FaStar } from 'react-icons/fa';

const FeaturesSection: React.FC = () => {
  return (
    <section className="max-w-screen-lg mx-auto pt-8 pb-4 bg-gray-100 text-center font-poppins">
      <div className="flex flex-col sm:flex-row items-center justify-center flex-wrap gap-6 px-4 sm:px-8">
        <div className="flex-1 max-w-xs shadow-lg rounded-lg p-5 text-center bg-white transition-transform transform hover:-translate-y-1 hover:shadow-lg duration-200">
          <div className="flex justify-center items-center text-[#FF5733] hover:text-[#FF7849] mx-auto mb-3 transition-all duration-300 hover:scale-110">
            <FaMapMarkedAlt size={34} />
          </div>
          <h4 className="mt-1 text-xl font-bold text-gray-500">Custom Itineraries</h4>
          <p className="text-base text-gray-500 mt-1">Get a personalized itinerary tailored to your preferences.</p>
        </div>
        <div className="flex-1 max-w-xs shadow-lg rounded-lg p-5 text-center bg-white transition-transform transform hover:-translate-y-1 hover:shadow-lg duration-200">
          <div className="flex justify-center items-center text-[#FF5733] hover:text-[#FF7849] mx-auto mb-3 transition-all duration-300 hover:scale-110">
            <FaMoneyBillWave size={34} />
          </div>
          <h4 className="mt-1 text-xl font-bold text-gray-500">Budget Friendly</h4>
          <p className="text-base text-gray-500 mt-1">Plan your trip based on your budget and get the best value.</p>
        </div>
        <div className="flex-1 max-w-xs shadow-lg rounded-lg p-5 text-center bg-white transition-transform transform hover:-translate-y-1 hover:shadow-lg duration-200">
          <div className="flex justify-center items-center text-[#FF5733] hover:text-[#FF7849] mx-auto mb-3 transition-all duration-300 hover:scale-110">
            <FaStar size={34} />
          </div>
          <h4 className="mt-1 text-xl font-bold text-gray-500">Expert Recommendation</h4>
          <p className="text-base text-gray-500 mt-1">Receive recommendation from experts & make most of your trip.</p>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
