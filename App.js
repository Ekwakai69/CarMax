import React from 'react';
import { BrowserRouter, Route, Routes, Link, Navigate } from 'react-router-dom';
import './App.css';
import Signup from './Components/Signup';
import Signin from './Components/Signin';
import GetProducts from './Components/GetProducts';
import AddProduct from './Components/AddProduct';
import Payment from './Components/Payment';
import NotFound from './Components/NotFound';
import 'bootstrap/dist/css/bootstrap.min.css';
import GetProductsCart from "./Components/GetProductsCart";

const App = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

const AppContent = () => {
  return (
    <div className='App'>
      <nav>
        <Link className="link1" to="/signup">Signup</Link>
        <Link className="link2" to="/signin">Signin</Link>
        <Link className="link3" to="/getproducts">Get Products</Link>
        <Link className="link4" to="/addproduct">Add Product</Link>
        <Link className="link5" to="/payment">Payment</Link>
        <Link className='link6' to="/getproductcart">🛒Cart</Link>
      </nav>

      <header className='App-header'>
        <h1>Regal Time Pieces</h1>
      </header>

      <Routes>
        <Route path="/" element={<Navigate to="/getproducts" replace />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/getproducts' element={<GetProducts />} />
        <Route path='/addproduct' element={<AddProduct />} />
        <Route path='/payment' element={<Payment />} />
        <Route path='/getproductcart' element={<GetProductsCart />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
