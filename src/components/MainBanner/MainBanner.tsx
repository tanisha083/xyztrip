import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MainBanner.css';
import travelImage from '../../assets/full-shot-travel-concept-with-landmarks.jpg';

const MainBanner: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/plan-trip');
  };

  return (
    <section className="main-banner" style={{ backgroundImage: `url(${travelImage})` }}>
      <div className="banner-content">
        <h1>Create Your Perfect Travel Itinerary</h1>
        <p>Personalized plans for your next adventure</p>
        <button
          className="start-planning-banner-button"
          onClick={handleClick}
        >
          Start Planning
        </button>
      </div>
    </section>
  );
};

export default MainBanner;
