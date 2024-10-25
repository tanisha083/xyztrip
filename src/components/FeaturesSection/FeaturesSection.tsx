// FeaturesSection Component (FeaturesSection.tsx)
import React from 'react';
import './FeaturesSection.css';
import { FaMapMarkedAlt, FaMoneyBillWave, FaStar } from 'react-icons/fa';

const FeaturesSection: React.FC = () => {
  return (
    <section className="features-section">
      <div className="features-cards">
        <div className="feature-card">
          <FaMapMarkedAlt size={40} color="#FF5733" />
          <h3>Custom Itineraries</h3>
          <p>Get a personalized itinerary tailored to your preferences.</p>
        </div>
        <div className="feature-card">
          <FaMoneyBillWave size={40} color="#FF5733" />
          <h3>Budget Friendly</h3>
          <p>Plan your trip based on your budget and get the best value.</p>
        </div>
        <div className="feature-card">
          <FaStar size={40} color="#FF5733" />
          <h3>Expert Recommendations</h3>
          <p>Receive recommendations from travel experts to make the most of your trip.</p>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
