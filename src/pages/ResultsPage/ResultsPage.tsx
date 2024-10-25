import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './ResultsPage.css';
import { User } from 'firebase/auth';

interface Activity {
  activity: string;
  rating: string;
  weather?: string;
  duration: string;
  budget?: string;
  comments?: string;
  commute_time?: string;
}

interface ItinerarySection {
  time: string;
  activities: Activity[];
}

interface ParsedItinerary {
  title: string;
  sections: ItinerarySection[];
}

interface ResultsPageProps {
  user: User | null;
}

const ResultsPage: React.FC<ResultsPageProps> = ({ user }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [parsedItinerary, setParsedItinerary] = useState<ParsedItinerary | null>(null);

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

  return (
    <div className="ResultsPage">
      <Header user={user} />
      <main className="main">
        <div className="results-container">
          {parsedItinerary ? (
            <>
              <h2 className="results-title">{parsedItinerary.title}</h2>
              <div className="itinerary-content">
                {parsedItinerary.sections && parsedItinerary.sections.length > 0 ? (
                  parsedItinerary.sections.map((section, index) => (
                    <div key={index} className="itinerary-section">
                      <h3 className="section-time">{section.time}</h3>
                      <ul className="activities-list">
                        {section.activities.map((activity, idx) => (
                          <li key={idx} className="activity">
                            <div className="activity-name">
                              <strong>Activity:</strong> {activity.activity}
                            </div>
                            <div className="activity-rating">
                              <strong>Rating:</strong> {activity.rating}
                            </div>
                            {activity.weather && (
                              <div className="activity-weather">
                                <strong>Weather:</strong> {activity.weather}
                              </div>
                            )}
                            <div className="activity-duration">
                              <strong>Duration:</strong> {activity.duration}
                            </div>
                            {activity.budget && (
                              <div className="activity-budget">
                                <strong>Budget:</strong> {activity.budget}
                              </div>
                            )}
                            {activity.comments && (
                              <div className="activity-comments">
                                <strong>Comments:</strong> {activity.comments}
                              </div>
                            )}
                            {activity.commute_time && (
                              <div className="activity-commute-time">
                                <strong>Commute Time:</strong> {activity.commute_time}
                              </div>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))
                ) : (
                  <p>No itinerary sections available.</p>
                )}
              </div>
            </>
          ) : (
            <p>Loading itinerary... Please wait or try again.</p>
          )}
          <button className="go-back-button" onClick={() => navigate('/plan-trip')}>
            Go Back
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ResultsPage;
