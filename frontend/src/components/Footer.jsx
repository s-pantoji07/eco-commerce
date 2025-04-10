// Footer.js
import React from 'react';
import '../Styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Oragnio</h3>
          <p>Shop with Purpose. Sustain the Future</p>
        </div>
        
        {/* <div className="footer-section">
          <h3>PRODUCTS</h3>
          <ul>
            <li></li>
            <li>MDWordPress</li>
            <li>BrandFlow</li>
            <li>Bootstrap Angular</li>
          </ul>
        </div> */}
        
        <div className="footer-section">
          <h3>USEFUL LINKS</h3>
          <ul>
            <li>Your Account</li>
            <li>About Us</li>
            <li>Shipping Rates</li>
            <li>Help</li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>CONTACT</h3>
          <p><i className="fa fa-home"></i> New York, NY 10012, US</p>
          <p><i className="fa fa-envelope"></i> info@gmail.com</p>
          <p><i className="fa fa-phone"></i> + 01 234 567 88</p>
          <p><i className="fa fa-print"></i> + 01 234 567 89</p>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>© 2025 Copyright: Oragnio.com</p>
        <div className="social-icons">
          <a href="#"><i className="fa fa-facebook-f"></i></a>
          <a href="#"><i className="fa fa-twitter"></i></a>
          <a href="#"><i className="fa fa-google-plus"></i></a>
          <a href="#"><i className="fa fa-linkedin"></i></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;