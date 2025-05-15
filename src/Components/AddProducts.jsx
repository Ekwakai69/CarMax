import axios from "axios";
import { useState } from "react";

const AddProducts = () => {
  const [product_name, setProductname] = useState("");
  const [product_description, setProductdescription] = useState("");
  const [product_cost, setProductcost] = useState("");
  const [product_photo, setProductphoto] = useState(null);

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();  // Prevent the default form submission behavior
    setLoading(true);  // Set loading state to true to show the loading message
    setSuccess("");  // Clear any previous success message
    setError("");  // Clear any previous error message

    try {
      // Create a new FormData object to send the data to the backend
      const formData = new FormData();
      formData.append("product_name", product_name);
      formData.append("product_description", product_description);
      formData.append("product_cost", product_cost);
      formData.append("product_photo", product_photo);

      // Make the POST request to add the product
      const response = await axios.post("https://moja1.pythonanywhere.com/api/add_product", formData);

      // On successful submission, set the success message and stop loading
      setLoading(false);
      setSuccess(response.data.success);

      // Clear the form fields after successful submission
      setProductname("");
      setProductdescription("");
      setProductcost("");
      setProductphoto(null);

    } catch (error) {
      // On error, stop loading and set the error message
      setLoading(false);
      setError(error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="row justify-content-center m-4">
      <div className="col-md-6 card shadow card2">
        <h1>Add Product</h1>
        
        {/* Display messages */}
        {loading && <div className="alert alert-info">Please wait...</div>}
        {success && <div className="alert alert-success">{success}</div>}
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={submit}>
          <label htmlFor="product_name">Car Name</label><br />
          <input
            type="text"
            id="product_name"
            className="form-control"
            required
            value={product_name}
            onChange={(e) => setProductname(e.target.value)}  // Update state on change
          />
          
          <label htmlFor="product_description">Car Description</label><br />
          <textarea
            id="product_description"
            className="form-control"
            required
            value={product_description}
            onChange={(e) => setProductdescription(e.target.value)}  // Update state on change
          ></textarea>

          <label htmlFor="product_cost">Car Cost</label><br />
          <input
            type="number"
            id="product_cost"
            className="form-control"
            required
            value={product_cost}
            onChange={(e) => setProductcost(e.target.value)}  // Update state on change
          />

          <label htmlFor="product_photo">Car Photo</label><br />
          <input
            type="file"
            id="product_photo"
            className="form-control"
            required
            accept="image/*"
            onChange={(e) => setProductphoto(e.target.files[0])}  // Update state on file select
          />
          
          <button type="submit" className="btn btn-primary form-control mt-3">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProducts;
