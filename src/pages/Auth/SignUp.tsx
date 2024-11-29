import React, { useState } from 'react';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './SignUp.css';


const SignUp: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  // Email and password sign-up handler
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // Successful sign-up, user will be automatically redirected
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  // Google sign-up handler
  const handleGoogleSignUp = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  return (
    <>
      <Header />
      <div className="auth-container">
        <h2>Sign Up</h2>
        <form onSubmit={handleSignUp}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button type="submit">Sign Up</button>
          {error && <p className="error-message">{error}</p>}
        </form>
        <button onClick={handleGoogleSignUp}>Sign Up with Google</button>
      </div>
      <Footer />
    </>
  );
};

export default SignUp;
