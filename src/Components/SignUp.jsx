import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");

  const navigate = useNavigate();  // Initialize useNavigate

  // Submit function to handle form submission
  const submit = async (e) => {
    e.preventDefault();  // Prevent page reload
    setLoading("Please wait.....");

    try {
      // Prepare the form data
      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("phone", phone);

      // Send POST request to backend API
      const response = await axios.post("https://moja1.pythonanywhere.com/api/signup", formData);

      // Log the entire response to see the structure
      console.log(response);

      setLoading("");  // Clear loading message

      // If the response is successful, set success message
      if (response.data && response.data.message) {
        setSuccess(response.data.message);
      } else {
        // Handle case when message is not in response
        setError("Signup failed, please try again.");
      }

      // Redirect to GetProducts page upon successful signup
      navigate("/SignIn");  // Change the redirect path to /getproducts

    } catch (error) {
      setLoading("");  // Clear loading message
      setError(error.message);  // Set error message if request fails
    }
  };

  return (
    <div className="row justify-content-center mt-4">
      <div className="col-md-6 card shadow card2">
        <h1>Sign Up</h1>
        {loading && <div className="alert alert-info">{loading}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={submit}>
          <input
            type="text"
            placeholder="Enter Username"
            required
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          /><br />

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

          <input
            type="tel"
            placeholder="Enter Phone"
            required
            className="form-control"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          /><br />

          <input type="submit" value="Sign up" className="btn btn-primary"/><br />

          <p>Already have an account? <Link to="/SignIn">Sign In</Link></p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
