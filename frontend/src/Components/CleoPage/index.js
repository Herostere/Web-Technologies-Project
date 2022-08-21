import React, { useState } from 'react'
import './CleoPage.css'
import axios from 'axios';

const CleoPage = () => {
    const [state, setState] = useState({selectedFile: null})
    const onFileChange = event => {
    
        // Update the state
        setState({ selectedFile: event.target.files[0] });
      
      };  
      
    const postinput = () => {
      const formData = new FormData();
      var firstFile = document.querySelector('#myfile2')
      console.log(state.selectedFile)
      formData.append("fileName", 'BMDvalues.txt')
      formData.append("myFile", state.selectedFile);
      const token = window.localStorage.getItem("token")
      console.log(formData.get("myFile"))
      axios.post("http://127.0.0.1:8000/api/cleo/", formData, {headers: {"Authorization": "Token " + token}});
  }
  return (
    <div className='cleopage'>
        <div className='cleopagetitle'>
            <h2>Bone analysis : DICOM scanner</h2>
            
        </div>
        <div className='applicationfield'>
            <div className='firstcontainer'> 
                <div className='descriptionfield'>
                    <h1>
                        Application Description
                    </h1>
                    <p>
                        An Extractiong and calculating different density and microarchitecture metrics (bone minerai density (BMD), volume fraction, trabecular thickness, trabecular separation, etc). The BMD value was calculated within a Phantom that we know in advance its density values (of several points within the Phantom). A calibration is applied in order to estimate the density of each point within the 3D volume. As result, we obtained a value representing the bone minerai density of the whole 3D volume.
                    </p>
                    <ul>
                        <li>
                            Load your Dicom volume
                        </li>
                        <li>
                            Get your Density and microarchitecture Measures
                        </li>
                    </ul>
                </div>
                <div className='imagefield'>

                </div>
            </div>
            <div className='inputfield'>
                <div className='label'>
                    Input: (Dicom, Tif, ...):
                </div>
                <input type="file" id="myfile1" name="myfile1" onChange={onFileChange}></input>
                <div className='label'>
                    Bmd VALUES: (.txt):
                </div>
                <input type="file" id="myfile2" name="myfile2" onChange={onFileChange}></input>
                <div className='label'>
                    Phantom VALUES: (.txt):
                </div>
                <input type="file" id="myfile3" name="myfile3" onChange={onFileChange}></input>
                <button class='result' type='button' onClick={postinput}>
                    Get your Measures
                </button>
            </div>
        </div>
    </div>
  );
};

export default CleoPage;