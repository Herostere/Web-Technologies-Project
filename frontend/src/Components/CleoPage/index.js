import React, { useState } from 'react'
import './CleoPage.css'
import axios from 'axios';
import download from 'downloadjs'

const CleoPage = () => {
    const [state, setState] = useState({selectedFiles: null})
    const onFileChange = event => {
        // Update the state
        setState({ selectedFiles: event.target.files });
      };  
      
    const postinput = () => {
      const formData = new FormData();
      for (let i = 0; i < state.selectedFiles.length; i++) {
        if (i == 0) {
          formData.append("firstFileName", state.selectedFiles[i].name)
          formData.append("firstFile", state.selectedFiles[i]);
        }
        else {
          formData.append("secondFileName", state.selectedFiles[i].name)
          formData.append("secondFile", state.selectedFiles[i]);
        }

      }
      const token = window.localStorage.getItem("token")
      axios.post("http://127.0.0.1:8000/api/cleo/", formData, {
                                                                responseType: 'arraybuffer',
                                                                headers: {"Authorization": "Token " + token},
                                                               })
        .then(response => {
            const content = response.headers['content-type'];
            download(response.data, "results.zip", content);
            console.log(response)
        });
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
                    Bmd & Phantom VALUES: (.txt):
                </div>
                <input type="file" id="myfile2" name="myfile2" onChange={onFileChange} multiple></input>
                <button class='result' type='button' onClick={postinput}>
                    Get your Measures
                </button>
            </div>
        </div>
    </div>
  );
};

export default CleoPage;