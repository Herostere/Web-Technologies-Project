import React, { useContext } from 'react'
import { LoginContext } from '../../Contexts/GlobalState';
import { Nav, NavLink } from './NavBarElements';
import axios from 'axios';


const NavBar = () => {
   const logout = () => {
        console.log('loggingoff')
        const token = window.localStorage.getItem("token")
        axios.post("http://127.0.0.1:8000/api/logout/", {headers: {"Authorization": "Token ${token}"}});
        window.localStorage.removeItem("token")
        window.location.href="/Login"
   };

   function hasJWT() {
    let flag = false;

    //check user has JWT token
    localStorage.getItem("token") ? flag=true : flag=false
   
    return flag
}
  return (
    <>
        <Nav>
            <NavLink to="/" activeStyle>
                Home
            </NavLink>
            <NavLink to="/About" activeStyle>
                About us
            </NavLink>
            <NavLink to="/Products" activeStyle>
                Products
            </NavLink>
            <NavLink to="/ServicesApplications" activeStyle>
                Services & Applications
            </NavLink>
            <NavLink to="/Contact" activeStyle>
                Contact
            </NavLink>
            <NavLink to="/Contact" activeStyle>
                Contact
            </NavLink>
            {!hasJWT() ? 
                <NavLink to="/Login" activeStyle>
                    Login
                </NavLink>
                : null}
            {!hasJWT() ? 
                <NavLink to="/Register" activeStyle>
                    Register
                </NavLink>
                : null}
            {hasJWT() ?
                <button class='logout' type='button' onClick={logout}>
                    Logout
                </button>
                : null}
            
        </Nav>
    </>
  );
};

export default NavBar