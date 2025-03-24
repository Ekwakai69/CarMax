import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  // Feedback states
  const [loading, setLoading] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  // Submit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading('⏳ Processing, please wait...');
    setSuccess('');
    setError('');

    try {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('email', email);
      formData.append('phone', phone);
      formData.append('password', password);

      const response = await axios.post('https://icepickgamer.pythonanywhere.com/api/signup', formData);
      setLoading('');
      setSuccess('✅ ' + (response.data.Success || 'Signup successful!'));
      setUsername('');
      setEmail('');
      setPhone('');
      setPassword('');
    } catch (error) {
      setLoading('');
      setSuccess('');
      setError('❌ ' + (error.response?.data?.message || error.message || 'Something went wrong!'));
    }
  };

  return (
    <div className="row justify-content-center mt-4">
      <div className="col-md-4 card shadow p-4" style={{ backgroundColor: '#AF8F2C', color: '#000', border: '2px solid #000', borderRadius: '10px' }}>
        <h1 className="text-center" style={{ color: '#000' }}> Sign Up</h1>

        {loading && <p className="text-dark">{loading}</p>}
        {success && <p className="text-success">{success}</p>}
        {error && <p className="text-danger">{error}</p>}

        <form onSubmit={handleSubmit}>
          {/* Username input */}
          <input
            type="text"
            placeholder="👤 Enter Username"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ backgroundColor: '#AF8F2C', color: '#000', border: '1px solid black' }}
          /><br/>

          {/* Email input */}
          <input
            type="email"
            placeholder="📧 Enter Email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ backgroundColor: '#AF8F2C', color: '#000', border: '1px solid black' }}
          /><br/>

          {/* Phone input */}
          <input
            type="tel"
            placeholder="📞 Enter Phone Number"
            className="form-control"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={{ backgroundColor: '#AF8F2C', color: '#000', border: '1px solid black' }}
          /><br/>

          {/* Password input */}
          <input
            type="password"
            placeholder="🔑 Enter Password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ backgroundColor: '#AF8F2C', color: '#000', border: '1px solid black' }}
          /><br/>

          {/* Submit button */}
          <button type="submit" className="btn fw-bold px-4 py-2" style={{ backgroundColor: 'black', color: 'gold', border: '2px solid black' }}>
            🚀 Sign Up
          </button>
        </form>

        <p className="mt-3 text-center">
          Already have an account? <Link to="/signin" style={{ color: '#000', fontWeight: 'bold' }}>🔓 Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
