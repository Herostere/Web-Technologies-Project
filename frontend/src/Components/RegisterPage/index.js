import React, { useState } from 'react'
import axios from 'axios'
import './RegisterPage.css'

const RegisterPage = () => {
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [title, setTitle] = useState("")
    const [zipcode, setZipcode] = useState("")
    const [adress, setAdress] = useState("")
    const [company, setCompany] = useState("")

    const RegisterPageInfo = async () => {
        let formField = new FormData()
        formField.append('first_name', firstname)
        formField.append('last_name', lastname)
        formField.append('email', username)
        formField.append('password', password)
        formField.append('title', title)
        formField.append('zip_code', zipcode)
        formField.append('address', adress)
        formField.append('company', company)
        await axios({
            method: 'post',
            url: 'http://localhost:8000/api/create/',
            data: formField
        }).then((response) => {
            console.log(response.data)
        })
    }
    return (
    
      <div className='registerpage'>
          <div className='registercontainer'>
              <div className='iconfield'>               
              </div>
              <div className='registerfieldcontainer'>
                  <div className='label'>
                      First Name
                  </div>
                  <input type="text" id="firstname" name="firstnamefield"  onChange={(e) => setFirstname(e.target.value)} requiredminlength="4" maxlength="15" size="17"/>

                  <div className='label'>
                      Last Name
                  </div>
                  <input type="text" id="lastname" name="lastnamefield" onChange={(e) => setLastname(e.target.value)} requiredminlength="4" maxlength="15" size="17"/>

                  <div className='label'>
                      Email
                  </div>
                  <input type="text" id="username" name="usernamefield" onChange={(e) => setUsername(e.target.value)} requiredminlength="4" maxlength="15" size="17"/>

                  <div className='label'>
                      Password
                  </div>
                  <input type="text" id="password" name="passwordfield" onChange={(e) => setPassword(e.target.value)} requiredminlength="4" maxlength="15" size="17"/>

                  <div className='label'>
                    <label for="title">Title</label>
                  </div>
                  <select name="titles" id="title" onChange={(e) => setTitle(e.target.value)}>
                    <option value="">--Please choose your title--</option>
                    <option value="MR">Man</option>
                    <option value="MS">Female</option>

                  </select>


                  <div className='label'>
                      Zip code
                  </div>
                  <input type="text" id="zipcode" name="zipcodefield" onChange={(e) => setZipcode(e.target.value)} requiredminlength="4" maxlength="10" size="12"/>

                  <div className='label'>
                      Adress
                  </div>
                  <input type="text" id="adress" name="adressfield" onChange={(e) => setAdress(e.target.value)} requiredminlength="4" maxlength="15" size="17"/>

                  <div className='label'>
                      Company
                  </div>
                  <input type="text" id="company" name="companyfield" onChange={(e) => setCompany(e.target.value)} requiredminlength="4" maxlength="15" size="17"/>
              </div>
              <div className='buttoncontainer'>
                <button class='register' type='button' onClick={RegisterPageInfo}>
                  Register
                </button>
              </div>
          </div>
      </div>
    );
  };
  
  export default RegisterPage;