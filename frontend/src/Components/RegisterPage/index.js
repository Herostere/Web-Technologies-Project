import React from 'react'
import './RegisterPage.css'

const RegisterPage = () => {
    const register = () => {console.log("registering in...")};
    return (
      <div className='registerpage'>
          <div className='registercontainer'>
              <div className='iconfield'>               
              </div>
              <div className='registerfieldcontainer'>
                  <div className='label'>
                      Username
                  </div>
                  <input type="text" id="username" name="usernamefield" requiredminlength="4" maxlength="15" size="17"/>
                  <div className='label'>
                      Password
                  </div>
                  <input type="text" id="password" name="passwordfield" requiredminlength="4" maxlength="15" size="17"/>
                  <div className='label'>
                      Email
                  </div>
                  <input type="text" id="lastname" name="lastnamefield" requiredminlength="4" maxlength="15" size="17"/>
                  <div className='label'>
                      Surname
                  </div>
                  <input type="text" id="surname" name="surnamefield" requiredminlength="4" maxlength="15" size="17"/>
                  <div className='label'>
                      Adress
                  </div>
                  <input type="text" id="adress" name="adressfield" requiredminlength="4" maxlength="15" size="17"/>
              </div>
              <div className='buttoncontainer'>
                <button class='register' type='button' onClick={register}>
                  Register
                </button>
              </div>
          </div>
      </div>
    );
  };
  
  export default RegisterPage;