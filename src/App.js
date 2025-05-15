import './App.css';
import AddProducts from './Components/AddProducts';
import GetProducts from './Components/GetProducts.jsx';
import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';
import MpesaPayment from './Components/MpesaPayment.jsx';
import NavBar from './Components/NavBar.jsx';
import Footer from './Components/Footer.jsx';

import { BrowserRouter as Router, Routes,Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';



function App() {
  return (
    <Router>
      <div className="App">
       
        
          <NavBar/>
          
          
    
      <Routes>
        <Route path="/"element={<GetProducts/>}/>
        <Route path="AddProducts"element={<AddProducts/>}/>
        <Route path="SignIn"element={<SignIn/>}/>
        <Route path="SignUp"element={<SignUp/>}/>
        <Route path="MpesaPayment"element={<MpesaPayment/>}/>
      </Routes>
      <Footer/>
      </div>
  
    </Router>

   );
}

export default App;
