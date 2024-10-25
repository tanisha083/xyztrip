import { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios'; // Add axios for making API requests
import { useNavigate } from 'react-router-dom';
import './PlanTrip.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { User } from 'firebase/auth';

interface PlanTripProps {
  user: User | null;
}

const PlanTrip: React.FC<PlanTripProps> = ({ user }) => {
  const [preferences, setPreferences] = useState({
    destination: '',
    budget: '',
    interests: '',
    startDate: '',
    endDate: ''
  });

  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate(); // Use navigate hook

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPreferences({
      ...preferences,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Set loading to true
    setLoading(true);

    // Construct the prompt based on user preferences
    const prompt = `Generate a travel itinerary for ${preferences.destination} within a budget of ${preferences.budget}. Interests include ${preferences.interests}, starting from ${preferences.startDate} to ${preferences.endDate}.`;

    try {
      // Make an API call to your backend
      const response = await axios.post('http://localhost:5001/api/get-itinerary', { prompt });

      // Navigate to results page with the generated itinerary
      navigate('/results', { state: { itinerary: response.data } });

    } catch (error) {
      console.error('Error generating itinerary:', error);
    } finally {
      // Set loading to false
      setLoading(false);
    }
  };

  return (
    <div className="PlanTripPage">
      <Header user={user} />
      <main className="main">
        <div className="chatbox-container">
          <h2 className='chatbox-title'>Tailor Your Perfect Trip</h2>
          <div className="chatbox">
            {loading ? (
  <div className="loading-message">
    <div className="loading-spinner"></div>
    <p>Generating itinerary, please wait...</p>
  </div>
) : (
              <form onSubmit={handleSubmit} className="preferences-form">
                <input
                  type="text"
                  name="destination"
                  value={preferences.destination}
                  onChange={handleInputChange}
                  placeholder="Enter your destination"
                  className="chatbox-input"
                />
                <input
                  type="text"
                  name="budget"
                  value={preferences.budget}
                  onChange={handleInputChange}
                  placeholder="Enter your budget"
                  className="chatbox-input"
                />
                <input
                  type="text"
                  name="interests"
                  value={preferences.interests}
                  onChange={handleInputChange}
                  placeholder="E.g., sightseeing, adventure, culture"
                  className="chatbox-input"
                />
                <div className="date-input-container">
                  <label htmlFor="startDate" className="date-input-label">Start Date</label>
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={preferences.startDate}
                    onChange={handleInputChange}
                    className="date-input"
                  />
                </div>
                <div className="date-input-container">
                  <label htmlFor="endDate" className="date-input-label">End Date</label>
                  <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    value={preferences.endDate}
                    onChange={handleInputChange}
                    className="date-input"
                  />
                </div>
                <textarea
                  placeholder="Additional comments.."
                  className="chatbox-comment"
                ></textarea>
                <button type="submit" className="chatbox-submit">Generate Itinerary</button>
              </form>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default PlanTrip;
