import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaUser, FaSignInAlt, FaHome, FaPlusCircle, FaSignOutAlt } from 'react-icons/fa';

export const NavBar = () => {
  const [user, setUser] = useState(null); // Store user information (username and role)
  const navigate = useNavigate(); // For navigation after logout

  // Fetch user information from localStorage on mount and set the state
  const getUserFromLocalStorage = () => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    return storedUser ? { username: storedUser.username, role: storedUser.role } : null;
  };

  // Update the user state on mount and whenever localStorage changes
  useEffect(() => {
    setUser(getUserFromLocalStorage()); // Initialize user state with localStorage data
  }, []); // Runs only once on component mount

  // Handle logout process
  const handleLogout = () => {
    localStorage.removeItem('user'); // Clear user from localStorage
    setUser(null); // Clear the user state to reflect logout
    navigate('/SignIn'); // Redirect to SignIn page
  };

  return (
    <nav className="navbar navbar-expand-md navbar-light bg-light">
      <Link to="/" className="navbar-brand fw-bolder">CarMax</Link>

      <button 
        className="navbar-toggler" 
        data-bs-toggle="collapse" 
        data-bs-target="#navbarcollapse" 
        aria-controls="navbarcollapse" 
        aria-expanded="false" 
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarcollapse">
        <div className="navbar-nav ms-auto d-flex justify-content-end w-100">
          {/* Home Link */}
          <NavLink to="/" className="nav-link d-flex align-items-center ms-3">
            <FaHome className="me-2" /> Home
          </NavLink>

          {/* Admin Only Add Products Link */}
          {user?.role === 'admin' && (
            <NavLink to="/AddProducts" className="nav-link d-flex align-items-center ms-3">
              <FaPlusCircle className="me-2" /> Add Products
            </NavLink>
          )}

          {/* User login/logout */}
          {user ? (
            <>
              <span className="nav-link ms-3">Welcome, {user.username}</span>
              <button 
                className="nav-link btn btn-link ms-3"
                onClick={handleLogout}
              >
                <FaSignOutAlt className="me-2" /> Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/SignUp" className="nav-link ms-3">
                <FaUser className="me-2" /> Sign Up
              </NavLink>
              <NavLink to="/SignIn" className="nav-link ms-3">
                <FaSignInAlt className="me-2" /> Sign In
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
