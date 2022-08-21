import React, {useState} from 'react'
import axios from 'axios';
import './LoginPage.css'

const LoginPage = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")


    const signin = async () => {
        let formField = new FormData()
        formField.append('username', username)
        formField.append('password', password)
        await axios({
            method: 'post',
            url: 'http://localhost:8000/api/login/',
            data: formField
        }).then((response) => {
            console.log(response.data)
        })
    }
    const lostpassword = () => {console.log("lostpassword")};
    return (
      <div className='loginpage'>
          <div className='logincontainer'>
              <div className='iconfield'>
                
              </div>
              <div className='loginfieldcontainer'>
                  <div className='label'>
                      Email
                  </div>
                  <input type="text" id="username" name="usernamefield" onChange={(e) =>setUsername(e.target.value)} requiredminlength="4" maxlength="15" size="17"/>
                  <div className='label'>
                      Password
                  </div>
                  <input type="text" id="password" name="passwordfield" onChange={(e) =>setPassword(e.target.value)} requiredminlength="4" maxlength="15" size="17"/>
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