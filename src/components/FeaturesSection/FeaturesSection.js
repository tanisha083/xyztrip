import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// FeaturesSection Component (FeaturesSection.tsx)
// import React from 'react';
import { FaMapMarkedAlt, FaMoneyBillWave, FaStar } from 'react-icons/fa';
const FeaturesSection = () => {
    return (_jsx("section", { className: "max-w-screen-lg mx-auto pt-8 pb-4 bg-gray-100 text-center font-poppins", children: _jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-center flex-wrap gap-6 px-4 sm:px-8", children: [_jsxs("div", { className: "flex-1 max-w-xs shadow-lg rounded-lg p-5 text-center bg-white transition-transform transform hover:-translate-y-1 hover:shadow-lg duration-200", children: [_jsx("div", { className: "flex justify-center items-center text-[#FF5733] hover:text-[#FF7849] mx-auto mb-3 transition-all duration-300 hover:scale-110", children: _jsx(FaMapMarkedAlt, { size: 34 }) }), _jsx("h4", { className: "mt-1 text-xl font-bold text-gray-500", children: "Custom Itineraries" }), _jsx("p", { className: "text-base text-gray-500 mt-1", children: "Get a personalized itinerary tailored to your preferences." })] }), _jsxs("div", { className: "flex-1 max-w-xs shadow-lg rounded-lg p-5 text-center bg-white transition-transform transform hover:-translate-y-1 hover:shadow-lg duration-200", children: [_jsx("div", { className: "flex justify-center items-center text-[#FF5733] hover:text-[#FF7849] mx-auto mb-3 transition-all duration-300 hover:scale-110", children: _jsx(FaMoneyBillWave, { size: 34 }) }), _jsx("h4", { className: "mt-1 text-xl font-bold text-gray-500", children: "Budget Friendly" }), _jsx("p", { className: "text-base text-gray-500 mt-1", children: "Plan your trip based on your budget and get the best value." })] }), _jsxs("div", { className: "flex-1 max-w-xs shadow-lg rounded-lg p-5 text-center bg-white transition-transform transform hover:-translate-y-1 hover:shadow-lg duration-200", children: [_jsx("div", { className: "flex justify-center items-center text-[#FF5733] hover:text-[#FF7849] mx-auto mb-3 transition-all duration-300 hover:scale-110", children: _jsx(FaStar, { size: 34 }) }), _jsx("h4", { className: "mt-1 text-xl font-bold text-gray-500", children: "Curated Suggestions" }), _jsx("p", { className: "text-base text-gray-500 mt-1", children: "Discover top-rated destinations, activities, and places to explore, all tailored to enhance your trip." })] })] }) }));
};
export default FeaturesSection;