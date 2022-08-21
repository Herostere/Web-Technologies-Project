import React, { useContext } from 'react'
import { LoginContext } from '../../Contexts/GlobalState';
import { Nav, NavLink } from './NavBarElements';

const NavBar = () => {
   const {loggedIn, setLoggedIn} = useContext(LoginContext)
   const logout = () => {
        console.log('loggingoff')
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
            {!loggedIn ? 
                <NavLink to="/Login" activeStyle>
                    Login
                </NavLink>
                : null}
            {!loggedIn ? 
                <NavLink to="/Register" activeStyle>
                    Register
                </NavLink>
                : null}
            {loggedIn ? 
                <button class='logout' type='button' onClick={logout}>
                    Logout
                </button>
                : null}
            
        </Nav>
    </>
  );
};

export default NavBar