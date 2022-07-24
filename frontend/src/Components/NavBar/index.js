import React from 'react'
import { Nav, NavLink } from './NavBarElements';

const NavBar = () => {
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
            <NavLink to="/Login" activeStyle>
                Login
            </NavLink>
        </Nav>
    </>
  );
};

export default NavBar