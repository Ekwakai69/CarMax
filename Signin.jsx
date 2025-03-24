import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Feedback states
  const [loading, setLoading] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  // Submit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading('⏳ Processing, please wait...');
    setSuccess('');
    setError('');

    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);

      const response = await axios.post('https://icepickgamer.pythonanywhere.com/api/signin', formData);
      setLoading('');

      if (response.data.user) {
        setSuccess('✅ ' + response.data.Message);
        setError('');
        navigate('/');
      } else {
        setSuccess('⚠️ ' + response.data.Message);
      }
    } catch (error) {
      setLoading('');
      setSuccess('');
      setError('❌ ' + (error.Message));
    }
  };

  return (
    <div className="row justify-content-center mt-4">
      <div className="col-md-4 card shadow p-4" style={{ backgroundColor: '#AF8F2C', color: '#000', border: '2px solid #000', borderRadius: '10px' }}>
        <h1 className="text-center" style={{ color: '#000' }}>Sign In</h1>

        {loading && <p className="text-dark">{loading}</p>}
        {success && <p className="text-success">{success}</p>}
        {error && <p className="text-danger">{error}</p>}

        <form onSubmit={handleSubmit}>
          {/* Email input */}
          <input
            type="email"
            placeholder="📧 Enter Your Email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ backgroundColor: '#AF8F2C', color: '#000', border: '1px solid black' }}
          /><br/>

          {/* Password input */}
          <input
            type="password"
            placeholder="🔑 Enter Your Password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ backgroundColor: '#AF8F2C', color: '#000', border: '1px solid black' }}
          /><br/>

          {/* Submit button */}
          <button type="submit" className="btn fw-bold px-4 py-2" style={{ backgroundColor: 'black', color: 'gold', border: '2px solid black' }}>
            🔓 Sign In
          </button>
        </form>

        <p className="mt-3 text-center">
          Don't have an account? <Link to="/signup" style={{ color: '#000', fontWeight: 'bold' }}>🚀 Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Signin;
