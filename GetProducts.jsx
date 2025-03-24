import React, { useState, useEffect } from "react";
import axios from "axios";

const GetProducts = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const img_url = "https://icepickgamer.pythonanywhere.com/static/images/"
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");



  const getProducts =async () => {
    setLoading(true);
    setError("");

  
  try {
   const response = await axios
    .get("https://icepickgamer.pythonanywhere.com/api/get_product_details")

      setProducts(response.data.products);
  } catch (error) {
    setError("Failed to fetch Products.Please try again");
  }finally{
    setLoading(false)
  }
};

useEffect(() =>{
  getProducts();
},[]);

const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));

    // Show modal with message
    setModalMessage(`✅ ${product.product_name} added to cart! 🛒`);
    setShowModal(true);

    // Hide modal after 2 seconds
    setTimeout(() => setShowModal(false), 2000);
  };

  return (
    <div className="products-container">
      <h2 className="products-title">🛒 Available Products</h2>

      {loading && <p className="text-center text-primary">Loading Products......</p> }
      {error && <p className="text-center text-danger">{error} </p>}

      <div className="products-grid">
        {products.map((product, index) => (
          <div key={index} className="product-card">
           <div className="card shadow h-100 d-flex flex-column"> 
            <img
              src={img_url + product.product_photo}
              alt={product.product_name}
              className="product-image"
            />
            <div>
            <h3 className="product-name">{product.product_name}</h3>
            <p className="product-description">{product.product_description}</p>
            <strong className="product-price">💰 {product.product_cost} Ksh</strong>
            <button className="add-to-cart-btn" onClick={() => addToCart(product)}>
              ➕ Add to Cart
            </button>
            </div>
            </div>
          </div>
        ))}
      </div>

      {/* Small Modal Popup */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>{modalMessage}</p>
          </div>
        </div>
      )}

      {/* Modal Styling */}
      <style>
        {`
          .modal-overlay {
            position: fixed;
            top: 20%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 100%;
            display: flex;
            justify-content: center;
            z-index: 9999;
          }
          
          .modal-content {
            background: #222;
            color: white;
            padding: 10px 20px;
            border-radius: 10px;
            text-align: center;
            font-size: 16px;
            width: 300px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
            animation: fadeIn 0.3s ease-in-out;
          }

          @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.9); }
            to { opacity: 1; transform: scale(1); }
          }
        `}
      </style>
    </div>
  );

}
export default GetProducts;
