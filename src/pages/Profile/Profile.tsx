import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { Section } from '../../types/itineraryTypes';
import { useAuth } from '../../context/authContext';

interface SavedItinerary {
  id: string;
  title: string;
  sections: Section[];
  timestamp: Date;
  userId: string;
}

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [itineraries, setItineraries] = useState<SavedItinerary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const fetchItineraries = async () => {
      if (user) {
        try {
          setLoading(true);
          setError(null);
          
          const itinerariesRef = collection(db, 'itineraries');
          const q = query(
            itinerariesRef,
            where('userId', '==', user.uid),
            orderBy('timestamp', 'desc')
          );

          const querySnapshot = await getDocs(q);
          const fetchedItineraries = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            timestamp: doc.data().timestamp?.toDate()
          })) as SavedItinerary[];

          setItineraries(fetchedItineraries);
        } catch (error) {
          console.error('Error fetching itineraries:', error);
          setError('An error occurred while fetching your itineraries. Please try again later.');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchItineraries();
  }, [user]);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        console.error('Sign-out error:', error);
      });
  };

  const viewItinerary = (itineraryId: string) => {
    navigate(`/itinerary/${itineraryId}`);
  };

  return (
    <div className="ProfilePage font-poppins min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-100">
        <div className="max-w-screen-lg mx-auto py-8 px-4 sm:px-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Your Saved Itineraries</h2>
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF5733] mx-auto mb-4"></div>
              <p className="text-lg text-gray-600">Loading your itineraries...</p>
            </div>
          ) : (
            <div className="space-y-6">
              {itineraries.length > 0 ? (
                itineraries.map((itinerary) => (
                  <div
                    key={itinerary.id}
                    className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:bg-gray-50 
                      transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                    onClick={() => viewItinerary(itinerary.id)}
                  >
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {itinerary.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Saved on: {itinerary.timestamp?.toLocaleDateString()}
                    </p>
                    <div className="mt-4 flex justify-end">
                      <button
                        className="text-[#FF5733] hover:text-[#FF7849] font-medium 
                          transition-colors duration-300"
                        onClick={(e) => {
                          e.stopPropagation();
                          viewItinerary(itinerary.id);
                        }}
                      >
                        View Details →
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 bg-white rounded-lg shadow-md">
                  <p className="text-gray-600 mb-4">No saved itineraries found.</p>
                  <button
                    onClick={() => navigate('/plan-trip')}
                    className="text-[#FF5733] hover:text-[#FF7849] font-medium transition-colors duration-300"
                  >
                    Create your first itinerary →
                  </button>
                </div>
              )}
            </div>
          )}
          <div className="mt-8 flex justify-center">
            <button
              className="h-[40px] px-6 bg-[#FF5733] hover:bg-[#FF7849] text-white font-semibold rounded
                transition-all duration-300 shadow-md hover:shadow-lg active:translate-y-0.5
                focus:outline-none focus:ring-2 focus:ring-[#FF5733] focus:ring-opacity-50"
              onClick={handleSignOut}
            >
              Sign Out
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile; 