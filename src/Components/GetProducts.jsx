import { useEffect, useState } from "react";
import axios from "axios";
import '../App.css';
import { useNavigate } from "react-router-dom";
import Carousel from "./Carousel";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { FaSearch } from 'react-icons/fa';

const GetProducts = () => {
  const [products, setProduct] = useState([]);
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);
  const [sortOption, setSortOption] = useState("default");

  const navigate = useNavigate();

  const getProducts = async () => {
    setLoading("Please wait.......");

    try {
      const response = await axios.get("https://moja1.pythonanywhere.com/api/get_product_details");
      setProduct(response.data);
      setLoading("");
    } catch (error) {
      setLoading("");
      setError(error.message);
    }
  };

  useEffect(() => {
    if (!products.length) {
      getProducts();
    }
  }, [products]);

  useEffect(() => {
    if (!products || products.length === 0) return;

    const filtered = products.filter((product) =>
      product.product_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.product_description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    let sorted = [...filtered];
    if (sortOption === "priceLowToHigh") {
      sorted = sorted.sort((a, b) => parseFloat(a.product_cost) - parseFloat(b.product_cost));
    } else if (sortOption === "priceHighToLow") {
      sorted = sorted.sort((a, b) => parseFloat(b.product_cost) - parseFloat(a.product_cost));
    } else if (sortOption === "alphabetical") {
      sorted = sorted.sort((a, b) => a.product_name.localeCompare(b.product_name));
    }

    setFilteredProducts(sorted);
  }, [searchQuery, products, sortOption]);

  const img_url = "https://moja1.pythonanywhere.com/static/images/";

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <div className="container-fluid">
      <Carousel />
      <h1 className="my-4 text-center">Available Products</h1>

      <div className="text-center mb-4">
        {loading && <p>{loading}</p>}
        {error && <p className="text-danger">{error}</p>}
      </div>

      <div className="d-flex justify-content-center mb-4">
        <div className="input-group w-50">
          <input
            type="text"
            className="form-control rounded-start"
            placeholder="Search for cars"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <span className="input-group-text rounded-end">
            <FaSearch />
          </span>
        </div>
      </div>

      <div className="d-flex justify-content-center mb-4">
        <select
          className="form-select w-50"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="default">Sort by</option>
          <option value="priceLowToHigh">Price: Low to High</option>
          <option value="priceHighToLow">Price: High to Low</option>
          <option value="alphabetical">Alphabetical Order</option>
        </select>
      </div>

      <div className="row">
        {currentProducts.map((product) => (
          <div key={product.product_id} className="col-md-3 mb-4">
            <div className="card shadow-sm d-flex flex-column h-100" style={{ backgroundColor: 'transparent' }}>
              <img
                src={img_url + product.product_photo}
                alt="Product Image"
                className="card-img-top mt-4"
                style={{ objectFit: "cover", height: "200px" }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{product.product_name}</h5>
                <p className="card-text text-muted">{product.product_description}</p>
                <p className="text-warning">{product.product_cost}</p>
                <button
                  className="btn btn-primary w-100 mt-2"
                  onClick={() => navigate("MpesaPayment", { state: { product } })}
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="d-flex justify-content-center mt-4">
        <nav>
          <ul className="pagination">
            {currentPage > 1 && (
              <li className="page-item">
                <button className="page-link" onClick={() => paginate(currentPage - 1)}>
                  Previous
                </button>
              </li>
            )}
            {[...Array(totalPages)].map((_, index) => (
              <li
                key={index}
                className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
              >
                <button className="page-link" onClick={() => paginate(index + 1)}>
                  {index + 1}
                </button>
              </li>
            ))}
            {currentPage < totalPages && (
              <li className="page-item">
                <button className="page-link" onClick={() => paginate(currentPage + 1)}>
                  Next
                </button>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default GetProducts;
