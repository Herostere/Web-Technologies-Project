import React from 'react'
import './LoginPage.css'

const LoginPage = () => {
    const signin = () => {console.log("signing in...")};
    const lostpassword = () => {console.log("lostpassword")};
    return (
      <div className='loginpage'>
          <div className='logincontainer'>
              <div className='iconfield'>
                
              </div>
              <div className='loginfieldcontainer'>
                  <div className='label'>
                      Username
                  </div>
                  <input type="text" id="username" name="usernamefield" requiredminlength="4" maxlength="15" size="17"/>
                  <div className='label'>
                      Password
                  </div>
                  <input type="text" id="password" name="passwordfield" requiredminlength="4" maxlength="15" size="17"/>
              </div>
              <div className='buttoncontainer'>
                <button class='signin' type='button' onClick={signin}>
                  Sign in
                </button>
                <button class='lostpwd' type='button' onClick={lostpassword}>
                  Lost Password?
                </button>
              </div>
          </div>
      </div>
    );
  };
  
  export default LoginPage;