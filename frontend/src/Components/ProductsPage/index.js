import React from 'react'
import './ProductsPage.css'
import axios from 'axios';
const ProductsPage = () => {
  const tryforfree = () => {window.location.href = '/ServicesApplications/cleo/'};
  const download = () => {
    const token = window.localStorage.getItem("token")
    axios.post("http://127.0.0.1:8000/api/download/", {headers: {"Authorization": "Token " + token}}).then(response => {
          console.log(response)
      });
  };
  return (
    <div className='productspage'>
        <div className='title'>
            <h2>Products</h2>
        </div>
        <div className='product-container'>
            <div className='cleo'>
              <h3>CLEO</h3>
              <ul className='list1'>
                <li>Robust analysis of bones from 2D radiographs or 3D scans</li>
                <li>Several parameters of bone density and microarchitecture</li>
                <li>Reconstruction of the 3D bone density and microarchitecture from 2D radiographs</li>
                <li>Efficient bone diagnosis related to osteoporosis diseases</li>
              </ul>
              <div className='buttonlist'>
                <button class='firstbutton' type='button' onClick={tryforfree}>
                  Try for free
                </button>
                <button class='secondbutton' type='button' onClick={download}>
                  Download
                </button>
              </div>
            </div>
            <div className='cles'>
              <h3>CLES</h3>
              <ul className='list2'>
                <li>Three-dimensional spine reconstruction from 2D radiographs</li>
                <li>Fully automatic vertebra detection, segmentation and angular measurement from X-Ray images</li>
                <li>3D vertebra detection and segmentation from MR images</li>
              </ul>
              <div className='buttonlist'>
                <button class='firstbutton' type='button' onClick={tryforfree}>
                  Try for free
                </button>
                <button class='secondbutton' type='button' onClick={download}>
                  Download
                </button>
              </div>
            </div>

        </div>
    </div>
  );
};

export default ProductsPage;