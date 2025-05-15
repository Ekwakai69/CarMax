import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  // Handle form submission
  const submit = async (e) => {
    e.preventDefault();
    setLoading("Please wait.....");

    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);

      const response = await axios.post("https://moja1.pythonanywhere.com/api/signin", formData);

      setLoading(""); // Clear loading message

      if (response.data && response.data.message) {
        setSuccess(response.data.message);
      }

      if (response.data.user) {
        // Store user info in localStorage
        localStorage.setItem("user", JSON.stringify(response.data.user));

        // Clear success message
        setSuccess("");

        navigate("/");
        

        // Force a page reload to trigger re-fetch of user data
        window.location.reload(); // This reloads the page to reflect the logged-in state

        // You can also navigate to the home page if needed
          // Uncomment this if you want to navigate without reload
      }

    } catch (error) {
      setLoading(""); // Clear loading message
      setError(error.message); // Set error message if request fails
    }
  };

  return (
    <div className="row justify-content-center mt-4">
      <div className="col-md-6 card shadow card2">
        <h1>Sign In</h1>
        
        {/* Display success, loading, or error messages */}
        {loading && <div className="alert alert-info">{loading}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        {error && <div className="alert alert-danger">{error}</div>}

        {/* Sign In Form */}
        <form onSubmit={submit}>
          <input
            type="email"
            placeholder="Enter Email"
            required
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          /><br />

          <input
            type="password"
            placeholder="Enter Password"
            required
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          /><br />

          <input type="submit" value="Sign In" className="btn btn-primary"/><br />

          <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
