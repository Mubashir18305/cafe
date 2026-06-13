import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { FaInstagram, FaFacebook, FaTwitter, FaYoutube } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer text-light">
      <div className="container">
        <div className="footer-grid">
          {/* Column 1: Brand */}
          <div className="footer-col brand-col">
            <h3 className="footer-logo text-display">Cafe</h3>
            <p className="tagline text-body">Where Ideas Brew. Think. Sip. Belong.</p>
            <div className="social-icons">
              <a href="#" className="social-link"><FaInstagram size={20} /></a>
              <a href="#" className="social-link"><FaFacebook size={20} /></a>
              <a href="#" className="social-link"><FaTwitter size={20} /></a>
              <a href="#" className="social-link"><FaYoutube size={20} /></a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-col">
            <h4 className="footer-heading text-ui">Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/menu">Menu</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/events">Events</Link></li>
              <li><Link to="/gallery">Gallery</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Column 3: Visit Us */}
          <div className="footer-col">
            <h4 className="footer-heading text-ui">Visit Us</h4>
            <ul className="footer-info">
              <li>
                <MapPin size={18} className="info-icon" />
                <span>address</span>
              </li>
              <li>
                <Clock size={18} className="info-icon" />
                <span>
                  Mon-Fri: 8:00 AM - 10:00 PM<br/>
                  Sat-Sun: 9:00 AM - 11:00 PM
                </span>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="footer-col">
            <h4 className="footer-heading text-ui">Contact</h4>
            <ul className="footer-info">
              <li>
                <Phone size={18} className="info-icon" />
                <span>{import.meta.env.VITE_WHATSAPP_NUMBER}</span>
              </li>
              <li>
                <Mail size={18} className="info-icon" />
                <span>hello@cafe.in</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Cafe | All rights reserved.</p>
          <div className="footer-legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
