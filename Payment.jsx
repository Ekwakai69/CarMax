"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Payment = () => {
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    updateTotalAmount();
  }, []);

  const updateTotalAmount = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalPrice = cart.reduce((total, item) => total + (item.product_cost || 0), 0);
    setAmount(totalPrice); // Auto-set amount from cart
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");

    if (!phone.match(/^2547\d{8}$/)) {
      setLoading(false);
      setError("❌ Invalid phone number. Use format: 2547XXXXXXXX");
      return;
    }
    if (amount <= 0) {
      setLoading(false);
      setError("🛒 Your cart is empty. Add products first.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("phone", phone);
      formData.append("amount", amount);

      const response = await axios.post(
        "https://icepickgamer.pythonanywhere.com/api/mpesa_payment",
        formData, 
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setSuccess("✅ Payment successful: " + response.data.message);

      // ✅ Clear user input and cart data after successful payment
      setPhone("");
      localStorage.removeItem("cart"); // Clear cart
      updateTotalAmount(); // Refresh amount (should be 0)

    } catch (error) {
      setError("❌ Payment failed. " + (error.response?.data?.error || "Try again later."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="row justify-content-center mt-4">
      <div className="col-md-5 card shadow p-4" style={{ backgroundColor: "#AF8F2C", color: "#000", border: "2px solid #000", borderRadius: "10px" }}>
        <h1 className="text-center" style={{ color: "#000" }}>💰 M-Pesa Payment</h1>

        {/* Status messages */}
        {loading && <p className="text-dark">⏳ Processing payment, please wait...</p>}
        {success && <p className="text-success">{success}</p>}
        {error && <p className="text-danger">{error}</p>}

        <form onSubmit={handlePayment}>
          {/* Phone input */}
          <input
            type="tel"
            placeholder="📞 Enter Phone Number"
            className="form-control"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={{ backgroundColor: "#AF8F2C", color: "#000", border: "1px solid black" }}
          /><br/>

          {/* Amount input (disabled, auto-filled) */}
          <input
            type="number"
            placeholder="💵 Total Amount"
            className="form-control"
            value={amount}
            disabled
            style={{ backgroundColor: "#AF8F2C", color: "#000", border: "1px solid black" }}
          /><br/>

          {/* Submit button */}
          <button type="submit" className="btn fw-bold px-4 py-2" style={{ backgroundColor: "black", color: "gold", border: "2px solid black" }} disabled={loading}>
            {loading ? "Processing..." : "Pay Now"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Payment;
