import axios from "axios";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { FaPhoneAlt, FaCreditCard } from "react-icons/fa"; // Importing icons from React Icons

const MpesaPayment = () => {
  const { product } = useLocation().state || {};

  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Function to validate phone number (expects Kenyan number starting with '254')
  const validatePhoneNumber = (phoneNumber) => {
    const phonePattern = /^254\d{9}$/; // Validates a Kenyan number starting with '254' and 9 digits
    return phonePattern.test(phoneNumber);
  };

  // Function to submit payment request
  const submit = async (e) => {
    e.preventDefault();

    // Validate the phone number before proceeding
    if (!validatePhoneNumber(phone)) {
      setError("Invalid phone number. Please enter a valid Kenyan number starting with '254'.");
      return;
    }

    // Clear any previous error messages
    setError("");
    setMessage("Please wait...");

    // Set loading state to true
    setLoading(true);

    // Create a new form data object
    const formData = new FormData();
    formData.append("phone", phone);
    formData.append("amount", product?.product_cost);

    try {
      // Connect to the backend
      const response = await axios.post("https://moja1.pythonanywhere.com/api/mpesa_payment", formData);
      setMessage(response)

      // Handle success (you can customize the response as per your backend API)
      setMessage("An Mpesa Prompt as been sent to your phone, Please Check & Complete Payment");
      setPhone(""); // Clear phone input after success
    } catch (error) {
      // Handle errors
      setMessage("");
      setError("An error occurred while processing your payment. Please try again.");
    } finally {
      // Set loading to false after the request is complete
      setLoading(false);
    }
  };

  // Handle phone input to always start with '254'
  const handlePhoneChange = (e) => {
    let value = e.target.value;

    // If the user starts with '0', change it to '254'
    if (value.startsWith("0")) {
      value = "254" + value.slice(1); // Replace 0 with 254
    }

    // Ensure the phone number starts with '254'
    if (!value.startsWith("254")) {
      setPhone(value);  // Set the value as-is if it doesn't start with '254'
    } else {
      // Only allow 254 followed by 9 digits
      if (value.length <= 12) {
        setPhone(value);  // Update phone number state
      }
    }
  };

  return (
    <div className="row justify-content-center m-5">
      <div className="col-md-6 card shadow p-4">
        {/* Add a title for the form */}
        <h2 className="text-center text-dark mb-4">Make Payment</h2>

        {/* Displaying product details */}
        <h3 className="text-center text-danger">{product?.product_name}</h3>
        <p className="text-center text-info">Cost: Ksh {product?.product_cost}</p>

        {/* Displaying error or success message */}
        {error && <div className="alert alert-danger">{error}</div>}
        {message && !error && <div className="alert alert-info">{message}</div>}

        {/* Payment form */}
        <form onSubmit={submit}>
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">
              <FaPhoneAlt className="me-2" />
              Enter your phone number
            </label>
            <input
              type="tel"
              id="phone"
              className="form-control"
              placeholder="e.g. 254712345678"
              value={phone}
              onChange={handlePhoneChange}
              required
            />
          </div>

          <div className="text-center">
            <button className="btn btn-dark w-100" type="submit" disabled={loading}>
              {loading ? (
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              ) : (
                <FaCreditCard className="me-2" />
              )}
              {loading ? "Processing..." : "Make Payment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MpesaPayment;
