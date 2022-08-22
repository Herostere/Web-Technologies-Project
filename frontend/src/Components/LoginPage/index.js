import React, {useState} from 'react'
import axios from 'axios';
import './LoginPage.css'
import { setAuthToken } from '../../Contexts/setAuthToken';

const LoginPage = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const signin = async () => {
        let formField = new FormData()
        formField.append('username', username)
        formField.append('password', password)
        await axios({
            method: 'post',
            url: 'http://herostere.ddns.net:8000/api/login/',
            data: formField
        }).then((response) => {
            console.log(response)
            const token = response.data.data.token
            localStorage.setItem("token", token)
            setAuthToken(token)
            window.location.href= '/'
        }).catch (error => {
            console.log(error)
            window.location.href = "/Error/"
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
                  <input type="text" id="username" name="usernamefield" onChange={(e) =>setUsername(e.target.value)} requiredminlength="4" maxlength="150" size="17"/>
                  <div className='label'>
                      Password
                  </div>
                  <input type="password" id="password" name="passwordfield" onChange={(e) =>setPassword(e.target.value)} requiredminlength="4" maxlength="200" size="17"/>
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