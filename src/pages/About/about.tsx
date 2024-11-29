import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { FaMapMarkedAlt, FaPlaneDeparture, FaSmile } from 'react-icons/fa';

const About: React.FC = () => {
  return (
    <div className="font-poppins bg-gray-100">
      <Header />
      <main className="max-w-screen-lg mx-auto text-center my-10 px-4 sm:px-8">
        <h2 className="text-3xl md:text-3xl font-bold mb-6 text-gray-600">About TripTailor</h2>
        <div className="flex flex-col justify-center items-center gap-12 py-8">
          <div className="flex flex-col items-center">
            <div className="text-[#FF5733] transition-transform transform hover:scale-110 text-6xl mb-4">
              <FaMapMarkedAlt size={32} />
            </div>
            <p className="text-lg text-gray-600 max-w-md">
              Plan your journey with ease using our intuitive map interface.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-[#FF5733] transition-transform transform hover:scale-110 text-6xl mb-4">
              <FaPlaneDeparture size={32} />
            </div>
            <p className="text-lg text-gray-600 max-w-md">
              Get personalized travel itineraries tailored to your preferences.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-[#FF5733] transition-transform transform hover:scale-110 text-6xl mb-4">
              <FaSmile size={32} />
            </div>
            <p className="text-lg text-gray-600 max-w-md">
              Enjoy a seamless and memorable travel experience.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;