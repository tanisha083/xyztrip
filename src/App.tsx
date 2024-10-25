import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';

import { auth } from './firebase/firebaseConfig';

import Home from './pages/Home/Home';
import PlanTrip from './pages/PlanTrip/PlanTrip';
import ResultsPage from './pages/ResultsPage/ResultsPage';
import SignUp from './pages/Auth/SignUp';
import SignIn from './pages/Auth/SignIn';


// import Header from './components/Header/Header';

function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, [auth]);

  return (
    <Router>
      <div className="App">
        {/* <Header user={user} /> */}
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/plan-trip" element={user ? <PlanTrip user={user}/> : <SignIn user={user} />} />
          <Route path="/results" element={user ? <ResultsPage user={user}/> : <SignIn user={user} />} />
          <Route path="/sign-up" element={<SignUp user={user} />} />
          <Route path="/sign-in" element={<SignIn user={user} />} />
        </Routes>
      </div>
      {/* <Footer /> */}
    </Router>
  );
}

export default App;
