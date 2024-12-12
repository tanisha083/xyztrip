import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './PlanTrip.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { CalendarIcon, MapPinIcon, GlobeAmericasIcon } from '@heroicons/react/24/solid';
const PlanTrip = () => {
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
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPreferences({
            ...preferences,
            [name]: value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        // Construct the prompt based on user preferences
        const prompt = `Generate a travel itinerary for ${preferences.destination} within a budget of ${preferences.budget}. Interests include ${preferences.interests}, starting from ${preferences.startDate} to ${preferences.endDate}.`;
        try {
            // Make an API call to your backend
            const response = await axios.post(`${apiUrl}/api/get-itinerary`, { prompt });
            // Navigate to results page with the generated itinerary
            navigate('/results', { state: { itinerary: response.data } });
        }
        catch (error) {
            console.error('Error generating itinerary:', error);
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsxs("div", { className: "min-h-screen flex flex-col", children: [_jsx(Header, {}), _jsx("main", { className: "flex-1 py-8 bg-gray-100 font-poppins", children: _jsx("div", { className: "max-w-screen-lg mx-auto px-4 sm:px-8", children: _jsxs("div", { className: "bg-white rounded-xl shadow-lg p-6 md:p-8 relative overflow-hidden", children: [_jsx("div", { className: "absolute top-8 left-8 w-12 h-12 text-emerald-500/40 hidden sm:block", children: _jsx(MapPinIcon, { className: "w-full h-full" }) }), _jsx("div", { className: "absolute top-8 right-8 w-12 h-12 text-sky-500/40 hidden sm:block", children: _jsx(GlobeAmericasIcon, { className: "w-full h-full" }) }), _jsx("h2", { className: "text-3xl font-bold text-gray-700 text-center mb-8 font-poppins relative z-10", children: "Tailor Your Perfect Trip" }), _jsx("div", { className: "w-full font-poppins", children: loading ? (_jsxs("div", { className: "text-center py-8", children: [_jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4" }), _jsx("p", { className: "text-lg text-blue-600", children: "Generating itinerary, please wait..." })] })) : (_jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [_jsx("input", { type: "text", name: "destination", value: preferences.destination, onChange: handleInputChange, placeholder: "Enter your destination", className: "w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-black focus:outline-none focus:ring-1 focus:ring-[#FF5733] transition-all placeholder-gray-400" }), _jsx("input", { type: "text", name: "budget", value: preferences.budget, onChange: handleInputChange, placeholder: "Enter your budget", className: "w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-black focus:outline-none focus:ring-1 focus:ring-[#FF5733] transition-all placeholder-gray-400" }), _jsx("input", { type: "text", name: "interests", value: preferences.interests, onChange: handleInputChange, placeholder: "E.g., sightseeing, adventure, culture", className: "w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-black focus:outline-none focus:ring-1 focus:ring-[#FF5733] transition-all placeholder-gray-400" })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { className: "space-y-2 relative", children: [_jsx("label", { className: "block text-sm font-medium text-gray-600", children: "Start Date" }), _jsxs("div", { className: "relative", children: [_jsx("input", { type: "date", name: "startDate", value: preferences.startDate, onChange: handleInputChange, className: "w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-black focus:outline-none focus:ring-1 focus:ring-[#FF5733] transition-all text-gray-400 [&::-webkit-calendar-picker-indicator]:opacity-0 " }), _jsx(CalendarIcon, { className: "h-5 w-5 text-[#FF5733] absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" })] })] }), _jsxs("div", { className: "space-y-2 relative", children: [_jsx("label", { className: "block text-sm font-medium text-gray-600", children: "End Date" }), _jsxs("div", { className: "relative", children: [_jsx("input", { type: "date", name: "endDate", value: preferences.endDate, onChange: handleInputChange, className: "w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-black focus:outline-none focus:ring-1 focus:ring-[#FF5733] transition-all text-gray-400 [&::-webkit-calendar-picker-indicator]:opacity-0" }), _jsx(CalendarIcon, { className: "h-5 w-5 text-[#FF5733] absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" })] })] })] }), _jsx("textarea", { placeholder: "Additional comments..", className: "w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-black focus:outline-none focus:ring-1 focus:ring-[#FF5733] transition-all h-32 resize-none" }), _jsx("button", { type: "submit", className: "w-full bg-gradient-to-r from-[#FF5733] to-[#FF7849] hover:from-[#FF7849] hover:to-[#FF5733] text-white font-bold py-3 px-6 rounded-lg transform transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl", children: "Generate Itinerary" })] })) })] }) }) }), _jsx(Footer, {})] }));
};
export default PlanTrip;
