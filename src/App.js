import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import Home from './pages/Home/Home';
import PlanTrip from './pages/PlanTrip/PlanTrip';
import ResultsPage from './pages/ResultsPage/ResultsPage';
import SignUp from './pages/Auth/SignUp';
import SignIn from './pages/Auth/SignIn';
import About from './pages/About/about';
import Contact from './pages/Contacts/contacts';
import HowItWorks from './pages/HowItWorks/howItWorks';
import Terms from './pages/Terms/terms';
import Privacy from './pages/Privacy/privacy';
import Profile from './pages/Profile/Profile';
import ItineraryDetails from './pages/ItineraryDetails/ItineraryDetails';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
// import Header from './components/Header/Header';
function App() {
    return (_jsx(AuthProvider, { children: _jsx(Router, { children: _jsx("div", { className: "App", children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Home, {}) }), _jsx(Route, { path: "/plan-trip", element: _jsx(ProtectedRoute, { children: _jsx(PlanTrip, {}) }) }), _jsx(Route, { path: "/results", element: _jsx(ProtectedRoute, { children: _jsx(ResultsPage, {}) }) }), _jsx(Route, { path: "/sign-up", element: _jsx(SignUp, {}) }), _jsx(Route, { path: "/sign-in", element: _jsx(SignIn, {}) }), _jsx(Route, { path: "/about", element: _jsx(About, {}) }), _jsx(Route, { path: "/contact", element: _jsx(Contact, {}) }), _jsx(Route, { path: "/how-it-works", element: _jsx(HowItWorks, {}) }), _jsx(Route, { path: "/terms", element: _jsx(Terms, {}) }), _jsx(Route, { path: "/privacy", element: _jsx(Privacy, {}) }), _jsx(Route, { path: "/profile", element: _jsx(ProtectedRoute, { children: _jsx(Profile, {}) }) }), _jsx(Route, { path: "/itinerary/:id", element: _jsx(ProtectedRoute, { children: _jsx(ItineraryDetails, {}) }) })] }) }) }) }));
}
export default App;
