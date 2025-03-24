import React from 'react';
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import '../App.css';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <motion.div 
      className="not-found-container"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.h1 
        className="not-found-heading"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        404 - Page Not Found
      </motion.h1>
      <motion.p 
        className="not-found-text"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Oops! The page you're looking for doesn't exist or has been moved.
      </motion.p>
      <div className="not-found-buttons">
        <motion.button 
          className="not-found-button" 
          onClick={() => navigate(-1)}
          aria-label="Go back to the previous page"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          🔙 Go Back
        </motion.button>
        <motion.button 
          className="not-found-button" 
          onClick={() => navigate("/")}
          aria-label="Go to the homepage"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          🏠 Go Home
        </motion.button>
      </div>
    </motion.div>
  );
};

export default NotFound;
