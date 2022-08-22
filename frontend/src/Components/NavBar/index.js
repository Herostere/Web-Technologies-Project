import React from 'react'
import { Nav, NavLink } from './NavBarElements';
import axios from 'axios';


const NavBar = () => {
   const logout = async () => {
        const token = window.localStorage.getItem("token")
        let formField = new FormData()
        await axios({
            method: 'post',
            url: 'http://herostere.ddns.net:8000/api/logout/',
            headers: {"Authorization": "Token " + token},
            data: formField
        }).then((response) => {
            window.localStorage.removeItem("token")
            window.location.href="/Login"
        }).catch (error => {
            window.location.href = "/Error/"
        })
    }

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