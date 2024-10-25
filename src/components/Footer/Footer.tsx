import React from 'react';
import './Footer.css';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="App-footer">
      <div className="footer-content">
        <nav className="footer-nav">
          <a href="/about">About</a>
          <a href="/terms">Terms of Service</a>
          <a href="/privacy">Privacy Policy</a>
        </nav>
        <div className="social-media-links">
          <FaFacebook size={30} />
          <FaTwitter size={30} />
          <FaInstagram size={30} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
