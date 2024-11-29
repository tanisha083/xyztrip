import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './ResultsPage.css';
// import { User } from 'firebase/auth';
import { doc, setDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
// import Itinerary from '../../components/Itinerary/Itinerary';
import { Section } from '../../types/itineraryTypes';
import { useAuth } from '../../context/authContext';

interface ParsedItinerary {
  title: string;
  sections: Section[];
}

const ResultsPage: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [parsedItinerary, setParsedItinerary] = useState<ParsedItinerary | null>(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Extract the itinerary from location.state
    console.log("Location State:", location.state);
  
    const itineraryData = location.state?.itinerary?.response;
  
    if (itineraryData) {
      try {
        // Handle the case where itineraryData might already be an object
        const parsedData: ParsedItinerary = typeof itineraryData === 'string' 
          ? JSON.parse(itineraryData) 
          : itineraryData;
  
        console.log("Parsed Itinerary Data:", parsedData);
        setParsedItinerary(parsedData);
      } catch (err) {
        console.error("Error parsing itinerary data:", err);
      }
    } else {
      console.error("No itinerary data found in location.state.");
    }
  }, [location.state]);

  const saveItinerary = async () => {
    if (!parsedItinerary || !user) return;

    try {
      const itineraryRef = doc(collection(db, 'itineraries'));
      const itineraryData = {
        ...parsedItinerary,
        userId: user.uid,
        timestamp: new Date(),
        id: itineraryRef.id
      };

      await setDoc(itineraryRef, itineraryData);
      console.log('Itinerary saved successfully!');
      setShowPopup(true);
    } catch (error) {
      console.error('Error saving itinerary:', error);
    }
  };

  return (
    <div className="ResultsPage font-poppins min-h-screen flex flex-col">
      <Header/>
      <main className="flex-grow bg-gray-100">
        <div className="max-w-screen-lg mx-auto py-8 px-4 sm:px-8">
          {parsedItinerary ? (
            <>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                {parsedItinerary.title}
              </h2>
              <div className="space-y-6">
                {parsedItinerary.sections && parsedItinerary.sections.length > 0 ? (
                  parsedItinerary.sections.map((section, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md p-6">
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">
                        {section.time}
                      </h3>
                      <div className="space-y-4">
                        {section.activities.map((activity, idx) => (
                          <div key={idx} className="bg-gray-50 rounded-lg p-4">
                            <div className="grid gap-2">
                              <div className="text-gray-800">
                                <span className="font-semibold">Activity:</span> {activity.activity}
                              </div>
                              <div className="text-gray-700">
                                <span className="font-semibold">Rating:</span> {activity.rating}
                              </div>
                              {activity.weather && (
                                <div className="text-gray-700">
                                  <span className="font-semibold">Weather:</span> {activity.weather}
                                </div>
                              )}
                              <div className="text-gray-700">
                                <span className="font-semibold">Duration:</span> {activity.duration}
                              </div>
                              {activity.budget && (
                                <div className="text-gray-700">
                                  <span className="font-semibold">Budget:</span> {activity.budget}
                                </div>
                              )}
                              {activity.comments && (
                                <div className="text-gray-700">
                                  <span className="font-semibold">Comments:</span> {activity.comments}
                                </div>
                              )}
                              {activity.commute_time && (
                                <div className="text-gray-700">
                                  <span className="font-semibold">Commute Time:</span> {activity.commute_time}
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600 text-center">No itinerary sections available.</p>
                )}
              </div>
              <div className="mt-8 flex justify-center space-x-4">
                <button 
                  className="h-[40px] px-6 bg-[#FF5733] hover:bg-[#FF7849] text-white font-semibold rounded
                    transition-all duration-300 shadow-md hover:shadow-lg active:translate-y-0.5
                    focus:outline-none focus:ring-2 focus:ring-[#FF5733] focus:ring-opacity-50"
                  onClick={() => navigate('/plan-trip')}
                >
                  Go Back
                </button>
                <button 
                  className="h-[40px] px-6 bg-green-500 hover:bg-green-600 text-white font-semibold rounded
                    transition-all duration-300 shadow-md hover:shadow-lg active:translate-y-0.5
                    focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                  onClick={saveItinerary}
                >
                  Save Itinerary
                </button>
              </div>
            </>
          ) : (
            <p className="text-gray-600 text-center">Loading itinerary... Please wait or try again.</p>
          )}
        </div>
      </main>
      <Footer />
      {showPopup && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <p className="text-gray-800 mb-4">Itinerary saved successfully!</p>
            <button
              className="h-[40px] px-6 bg-[#FF5733] hover:bg-[#FF7849] text-white font-semibold rounded
                transition-all duration-300 shadow-md hover:shadow-lg active:translate-y-0.5
                focus:outline-none focus:ring-2 focus:ring-[#FF5733] focus:ring-opacity-50"
              onClick={() => setShowPopup(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultsPage;
