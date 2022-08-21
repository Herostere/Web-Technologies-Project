import React, { useContext } from 'react'
import { LoginContext } from '../../Contexts/GlobalState';
import { Nav, NavLink } from './NavBarElements';


const NavBar = () => {
   const logout = () => {
        console.log('loggingoff')
        window.localStorage.removeItem("token")
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
            {!hasJWT() ? 
                <button class='logout' type='button' onClick={logout}>
                    Logout
                </button>
                : null}
            
        </Nav>
    </>
  );
};

export default NavBar