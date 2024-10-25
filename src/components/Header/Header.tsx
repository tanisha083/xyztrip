import React, { useState } from 'react';
import './Header.css';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signOut, User } from 'firebase/auth';

interface HeaderProps {
  user: User | null;
}

const Header: React.FC<HeaderProps> = ({ user }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        console.error('Sign-out error:', error);
      });
  };

  return (
    <header className="App-header">
      <div className="header-container">
        <div className="logo">
          <a href="/">TripTailor</a>
        </div>
        <button className="menu-toggle" onClick={toggleMenu}>
          ☰
        </button>
        <nav className={`navigation ${menuOpen ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/how-it-works">How It Works</a>
          <a href="/contact">Contact</a>
        </nav>
        <div className="auth-buttons">
          {user ? (
            <>
              <button className="auth-button" onClick={handleSignOut}>
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link to="/sign-in">
                <button className="auth-button">Sign In / Sign Up</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
