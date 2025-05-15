import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { FaFacebook, FaInstagram, FaTimes, FaTiktok } from 'react-icons/fa'; // Import social media icons

const Footer = () => {
  return (
    <footer className="bg-dark text-center text-lg-start mt-5 border-top shadow-sm text-white">
      <div className="container p-4">
        <div className="row">
          {/* About */}
          <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
            <h5 className="text-uppercase fw-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>CarMax</h5>
            <p className="text-light" style={{ fontFamily: 'Roboto, sans-serif' }}>

At CarMax, we make finding your perfect car easy and stress-free. With a wide range of vehicles to choose from, we offer quality options for every budget and need. Whether you're after a family car or something sporty, we’ve got you covered.

Our friendly team is here to help every step of the way, from browsing to financing and beyond. We believe in honesty, transparency, and making sure you drive off happy.

Come see us at CarMax—we’re excited to help you find your next ride!

            </p>
          </div>

          {/* Links */}
          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase fw-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>Quick Links</h5>
            <ul className="list-unstyled mb-0">
              <li><Link to="/" className="text-white text-decoration-none">Home</Link></li>
              <li><Link to="/signup" className="text-white text-decoration-none">Sign Up</Link></li>
              <li><Link to="/signin" className="text-white text-decoration-none">Sign In</Link></li>
              <li><Link to="/contact" className="text-white text-decoration-none">Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase fw-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>Contact</h5>
            <p className="text-light mb-1">Phone: +254 741 235 316</p>
            <p className="text-light mb-1">Email: info@carmax.com</p>
            <p className="text-light">Nairobi, Kenya</p>
          </div>
        </div>
      </div>

      {/* Social Media Icons */}
      <div className="d-flex justify-content-center py-3">
        <Link to="https://www.facebook.com" className="btn btn-outline-primary me-3" target="_blank">
          <FaFacebook size={24} />
        </Link>
        <Link to="https://www.instagram.com//m.o.j.a_1" className="btn btn-outline-danger me-3" target="_blank">
          <FaInstagram size={24} />
        </Link>
        <Link to="https://www.tiktok.com" className="btn btn-outline-light me-3" target="_blank">
          <FaTiktok size={24} />
        </Link>
        <Link to="https://www.twitter.com" className="btn btn-outline-info" target="_blank">
          <FaTimes size={24} /> {/* 'X' icon used for Twitter here */}
        </Link>
      </div>

      {/* Copyright */}
      <div className="text-center p-3 bg-secondary text-white">
        © {new Date().getFullYear()} CarMax | All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;
