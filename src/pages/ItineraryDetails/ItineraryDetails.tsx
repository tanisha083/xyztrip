import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Itinerary from '../../components/Itinerary/Itinerary';

import {  Section } from '../../types/itineraryTypes';

interface ItineraryData {
  title: string;
  sections: Section[];
}


const ItineraryDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [itinerary, setItinerary] = useState<ItineraryData | null>(null);

  useEffect(() => {
    const fetchItinerary = async () => {
      if (id) {
        const docRef = doc(db, 'itineraries', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data() as ItineraryData;
          setItinerary(data);
        } else {
          console.log('No such document!');
        }
      }
    };

    fetchItinerary();
  }, [id]);

  return (
    <div className="ItineraryDetailsPage font-poppins min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-100">
        <div className="max-w-screen-lg mx-auto py-8 px-4 sm:px-8">
          {itinerary ? (
            <>
              <Itinerary title={itinerary.title} sections={itinerary.sections} />
              <div className="mt-8 flex justify-center space-x-4">
                <button 
                  className="h-[40px] px-6 bg-[#FF5733] hover:bg-[#FF7849] text-white font-semibold rounded
                    transition-all duration-300 shadow-md hover:shadow-lg active:translate-y-0.5
                    focus:outline-none focus:ring-2 focus:ring-[#FF5733] focus:ring-opacity-50"
                  onClick={() => window.history.back()}
                >
                  Go Back
                </button>
              </div>
            </>
          ) : (
            <p className="text-gray-600 text-center">Loading itinerary...</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ItineraryDetails; 