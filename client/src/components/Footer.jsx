import React from 'react';

const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="footer-content" style={{ justifyContent: 'center' }}>
        <p className="footer-text">
          TripVault &copy; {new Date().getFullYear()} — Built with <span className="heart-icon">❤️</span> for 
          <span className="internship-badge"> CodGen Full Stack Internship</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
