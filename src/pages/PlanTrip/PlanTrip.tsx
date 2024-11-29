import { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './PlanTrip.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { CalendarIcon, MapPinIcon, GlobeAmericasIcon } from '@heroicons/react/24/solid';


const PlanTrip: React.FC= () => {
  const [preferences, setPreferences] = useState({
    destination: '',
    budget: '',
    interests: '',
    startDate: '',
    endDate: ''
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // const apiUrl = 'http://localhost:5001';
  const apiUrl = 'https://app-ro36oybh2a-uc.a.run.app';
  // const apiUrl = process.env.REACT_APP_API_URL || 'http://127.0.0.1:5001/triptailor-47b4b/us-central1/app';
  console.log(apiUrl);
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPreferences({
      ...preferences,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    setLoading(true);

    // Construct the prompt based on user preferences
    const prompt = `Generate a travel itinerary for ${preferences.destination} within a budget of ${preferences.budget}. Interests include ${preferences.interests}, starting from ${preferences.startDate} to ${preferences.endDate}.`;

    try {
      // Make an API call to your backend
      const response = await axios.post(`${apiUrl}/api/get-itinerary`, { prompt });

      // Navigate to results page with the generated itinerary
      navigate('/results', { state: { itinerary: response.data } });

    } catch (error) {
      console.error('Error generating itinerary:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-8 bg-gray-100 font-poppins">
        <div className="max-w-screen-lg mx-auto px-4 sm:px-8">
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 relative overflow-hidden">
            {/* Decorative Icons */}
            <div className="absolute top-8 left-8 w-12 h-12 text-emerald-500/40 hidden sm:block">
              <MapPinIcon className="w-full h-full" />
            </div>
            <div className="absolute top-8 right-8 w-12 h-12 text-sky-500/40 hidden sm:block">
              <GlobeAmericasIcon className="w-full h-full" />
            </div>

            <h2 className="text-3xl font-bold text-gray-700 text-center mb-8 font-poppins relative z-10">
              Tailor Your Perfect Trip
            </h2>

            <div className="w-full font-poppins">
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                  <p className="text-lg text-blue-600">Generating itinerary, please wait...</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                      type="text"
                      name="destination"
                      value={preferences.destination}
                      onChange={handleInputChange}
                      placeholder="Enter your destination"
                      className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-black focus:outline-none focus:ring-1 focus:ring-[#FF5733] transition-all placeholder-gray-400"
                    />
                    <input
                      type="text"
                      name="budget"
                      value={preferences.budget}
                      onChange={handleInputChange}
                      placeholder="Enter your budget"
                      className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-black focus:outline-none focus:ring-1 focus:ring-[#FF5733] transition-all placeholder-gray-400"
                    />
                    <input
                      type="text"
                      name="interests"
                      value={preferences.interests}
                      onChange={handleInputChange}
                      placeholder="E.g., sightseeing, adventure, culture"
                      className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-black focus:outline-none focus:ring-1 focus:ring-[#FF5733] transition-all placeholder-gray-400"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2 relative">
                      <label className="block text-sm font-medium text-gray-600">Start Date</label>
                      <div className="relative">
                        <input
                          type="date"
                          name="startDate"
                          value={preferences.startDate}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-black focus:outline-none focus:ring-1 focus:ring-[#FF5733] transition-all text-gray-400 [&::-webkit-calendar-picker-indicator]:opacity-0 "
                        />
                        <CalendarIcon className="h-5 w-5 text-[#FF5733] absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>
                    
                    <div className="space-y-2 relative">
                      <label className="block text-sm font-medium text-gray-600">End Date</label>
                      <div className="relative">
                        <input
                          type="date"
                          name="endDate"
                          value={preferences.endDate}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-black focus:outline-none focus:ring-1 focus:ring-[#FF5733] transition-all text-gray-400 [&::-webkit-calendar-picker-indicator]:opacity-0"
                        />
                        <CalendarIcon className="h-5 w-5 text-[#FF5733] absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  <textarea
                    placeholder="Additional comments.."
                    className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-black focus:outline-none focus:ring-1 focus:ring-[#FF5733] transition-all h-32 resize-none"
                  />

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#FF5733] to-[#FF7849] hover:from-[#FF7849] hover:to-[#FF5733] text-white font-bold py-3 px-6 rounded-lg transform transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
                  >
                    Generate Itinerary
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default PlanTrip;
