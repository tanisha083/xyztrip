// import React, { useState } from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { User } from 'firebase/auth';
import './SignIn.css';


interface SignInProps {
  user: User | null;
}

const SignIn: React.FC<SignInProps> = ({ user }) => {
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [error, setError] = useState('');
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  // const handleSignIn = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   try {
  //     await signInWithEmailAndPassword(auth, email, password);
  //     // Successful sign-in, user will be automatically redirected
  //   } catch (err) {
  //     if (err instanceof Error) {
  //       setError(err.message);
  //     } else {
  //       setError('An unexpected error occurred');
  //     }
  //   }
  // };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Header user={user} />
      <div className="auth-container">
        <h2>Sign In</h2>
        {/* <form onSubmit={handleSignIn}>
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
          <button type="submit">Sign In</button>
          {error && <p className="error-message">{error}</p>}
        </form> */}
        <button onClick={handleGoogleSignIn}>Sign In with Google</button>
      </div>
      <Footer />
    </>
  );
};

export default SignIn;