import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { collection, getDocs, query, where, orderBy, deleteDoc, doc } from 'firebase/firestore';
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

  const deleteItinerary = async (e: React.MouseEvent, itineraryId: string) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this itinerary?')) {
      try {
        await deleteDoc(doc(db, 'itineraries', itineraryId));
        setItineraries(prevItineraries => 
          prevItineraries.filter(itinerary => itinerary.id !== itineraryId)
        );
      } catch (error) {
        console.error('Error deleting itinerary:', error);
        setError('Failed to delete itinerary. Please try again.');
      }
    }
  };

  return (
    <div className="ProfilePage font-poppins min-h-screen flex flex-col bg-gray-100">
      <Header />
      <main className="flex-grow">
        <div className="max-w-screen-xl mx-auto py-12 px-4 sm:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-4xl font-bold text-gray-800">Your Saved Itineraries</h2>
            <button
              onClick={() => navigate('/plan-trip')}
              className="px-6 py-2 bg-[#FF5733] hover:bg-[#FF7849] text-white font-medium rounded-lg
                transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2"
            >
              <span>Create New</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
          
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-r-lg">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm">{error}</p>
                </div>
              </div>
            </div>
          )}

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#FF5733] mx-auto mb-4"></div>
              <p className="text-lg text-gray-600">Loading your itineraries...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {itineraries.length > 0 ? (
                itineraries.map((itinerary) => (
                  <div
                    key={itinerary.id}
                    className="bg-white rounded-xl shadow-sm hover:shadow-xl p-6 
                      transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
                    onClick={() => viewItinerary(itinerary.id)}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-semibold text-gray-800 line-clamp-2">
                        {itinerary.title}
                      </h3>
                      <div className="flex gap-2">
                        <button
                          onClick={(e) => deleteItinerary(e, itinerary.id)}
                          className="p-2 text-gray-600 bg-gray-200 hover:text-[#FF5733] hover:bg-gray-300 
                            rounded-full transition-colors duration-300 font-poppins"
                          title="Delete Itinerary"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 mb-4">
                      Saved on: {itinerary.timestamp?.toLocaleDateString()}
                    </p>
                    <div className="flex justify-end">
                      <button
                        className="px-4 py-2 text-gray-600 bg-gray-200 hover:text-[#FF5733] hover:bg-gray-300 
                          rounded transition-colors duration-300 inline-flex items-center gap-2 font-poppins"
                        onClick={(e) => {
                          e.stopPropagation();
                          viewItinerary(itinerary.id);
                        }}
                      >
                        View Details
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full">
                  <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
                    <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                        d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="text-gray-600 mb-4">No saved itineraries found.</p>
                    <button
                      onClick={() => navigate('/plan-trip')}
                      className="inline-flex items-center gap-2 text-[#FF5733] hover:text-[#FF7849] 
                        font-medium transition-colors duration-300"
                    >
                      Create your first itinerary
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
          
          <div className="mt-12 flex justify-center">
            <button
              className="px-8 py-3 bg-[#FF5733] hover:bg-[#FF7849] text-white font-medium rounded-lg
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