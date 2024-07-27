// src/components/Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer className="text-center py-4 mt-auto" style={{ backgroundColor: '#92C7CF' }}>
      <div className="container">
        <div className="row">
          <div className="col">
            <a href="#home" className="text-dark">Home</a>
          </div>
          <div className="col">
            <a href="#contactus" className="text-dark">Contact Us</a>
          </div>
          <div className="col">
            <a href="#about" className="text-dark">About</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
