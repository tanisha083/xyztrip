import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Itinerary from '../../components/Itinerary/Itinerary';
const ItineraryDetails = () => {
    const { id } = useParams();
    const [itinerary, setItinerary] = useState(null);
    useEffect(() => {
        const fetchItinerary = async () => {
            if (id) {
                const docRef = doc(db, 'itineraries', id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setItinerary(data);
                }
                else {
                    console.log('No such document!');
                }
            }
        };
        fetchItinerary();
    }, [id]);
    return (_jsxs("div", { className: "ItineraryDetailsPage font-poppins min-h-screen flex flex-col", children: [_jsx(Header, {}), _jsx("main", { className: "flex-grow bg-gray-100", children: _jsx("div", { className: "max-w-screen-lg mx-auto py-8 px-4 sm:px-8", children: itinerary ? (_jsxs(_Fragment, { children: [_jsx(Itinerary, { title: itinerary.title, sections: itinerary.sections }), _jsx("div", { className: "mt-8 flex justify-center space-x-4", children: _jsx("button", { className: "h-[40px] px-6 bg-[#FF5733] hover:bg-[#FF7849] text-white font-semibold rounded\n                    transition-all duration-300 shadow-md hover:shadow-lg active:translate-y-0.5\n                    focus:outline-none focus:ring-2 focus:ring-[#FF5733] focus:ring-opacity-50", onClick: () => window.history.back(), children: "Go Back" }) })] })) : (_jsx("p", { className: "text-gray-600 text-center", children: "Loading itinerary..." })) }) }), _jsx(Footer, {})] }));
};
export default ItineraryDetails;
