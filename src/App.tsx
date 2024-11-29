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
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/plan-trip" element={<ProtectedRoute><PlanTrip /></ProtectedRoute>} />
            <Route path="/results" element={<ProtectedRoute><ResultsPage /></ProtectedRoute>} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/itinerary/:id" element={<ProtectedRoute><ItineraryDetails /></ProtectedRoute>} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
