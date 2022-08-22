import React, {useState, useContext} from 'react'
import axios from 'axios';
import './LoginPage.css'
import { LoginContext } from '../../Contexts/GlobalState';
import { setAuthToken } from '../../Contexts/setAuthToken';

const LoginPage = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const {loggedIn, setLoggedIn} = useContext(LoginContext)
    const signin = async () => {
        let formField = new FormData()
        formField.append('username', username)
        formField.append('password', password)
        await axios({
            method: 'post',
            url: 'http://localhost:8000/api/login/',
            data: formField
        }).then((response) => {
            const token = response.data.data.token
            localStorage.setItem("token", token)
            setAuthToken(token)
            window.location.href= '/'
            
        }).catch(
          err => {
            console.log(err)
            window.location.reload()
          }
        )
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