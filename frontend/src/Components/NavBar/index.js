import React, { useContext } from 'react'
import { LoginContext } from '../../Contexts/GlobalState';
import { Nav, NavLink } from './NavBarElements';

const NavBar = () => {
   const {loggedIn, setLoggedIn} = useContext(LoginContext)
   const logout = () => {
        console.log('loggingoff')
        window.localStorage.removeItem("isLoggedIn")
        setLoggedIn(false)
   };
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
            {!window.localStorage.getItem("isLoggedIn") ? 
                <NavLink to="/Login" activeStyle>
                    Login
                </NavLink>
                : null}
            {!window.localStorage.getItem("isLoggedIn") ? 
                <NavLink to="/Register" activeStyle>
                    Register
                </NavLink>
                : null}
            {window.localStorage.getItem("isLoggedIn")? 
                <button class='logout' type='button' onClick={logout}>
                    Logout
                </button>
                : null}
            
        </Nav>
    </>
  );
};

export default NavBar