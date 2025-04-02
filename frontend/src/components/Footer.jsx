// Footer.js
import React from 'react';
import '../Styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>COMPANY NAME</h3>
          <p>Here you can use rows and columns to organize your footer content. Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
        </div>
        
        <div className="footer-section">
          <h3>PRODUCTS</h3>
          <ul>
            <li>MDBootstrap</li>
            <li>MDWordPress</li>
            <li>BrandFlow</li>
            <li>Bootstrap Angular</li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>USEFUL LINKS</h3>
          <ul>
            <li>Your Account</li>
            <li>Become an Affiliate</li>
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
        <p>© 2020 Copyright: MDBootstrap.com</p>
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