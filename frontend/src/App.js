import './App.css';
import React from 'react';
import NavBar from './Components/NavBar';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import HomePage from './Components/HomePage'
import ProductsPage from './Components/ProductsPage';
import ServicesApplicationsPage from './Components/ServicesApplicationsPage';
import LoginPage from './Components/LoginPage';
import RegisterPage from './Components/RegisterPage';
function App() {
  return (
    <Router>
      <NavBar/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/Products' element={<ProductsPage/>}/>
        <Route path='/ServicesApplications' element={<ServicesApplicationsPage/>}/>
        <Route path='/Login' element={<LoginPage/>}/>
        <Route path='/Register' element={<RegisterPage/>}/>
      </Routes>
    </Router>
    
  );
}

export default App;
