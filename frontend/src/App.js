import './App.css';
import React, { useState } from 'react';
import NavBar from './Components/NavBar';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import HomePage from './Components/HomePage'
import ProductsPage from './Components/ProductsPage';
import ServicesApplicationsPage from './Components/ServicesApplicationsPage';
import LoginPage from './Components/LoginPage';
import RegisterPage from './Components/RegisterPage';
import { setAuthToken } from './Contexts/setAuthToken';
import CleoPage from './Components/CleoPage';
import ContactPage from './Components/ContactPage'
import AboutPage from './Components/AboutPage';
import ErrorPage from './Components/ErrorPage';
const token = localStorage.getItem("token");
if (token) {
  setAuthToken(token);
}
function App() {
  return (
      <Router>
      <NavBar/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/Products' element={<ProductsPage/>}/>
        <Route path='/Contact' element={<ContactPage/>}/>
        <Route path='/ServicesApplications' element={<ServicesApplicationsPage/>}/>
        <Route path='/Login' element={<LoginPage/>}/>
        <Route path='/Register' element={<RegisterPage/>}/>
        <Route path='/About' element={<AboutPage/>}/>
        <Route path='/Error' element={<ErrorPage/>}/>

        <Route path='/ServicesApplications/cleo/' element={<CleoPage/>}/>
      </Routes>
      </Router>  
  );
}

export default App;
