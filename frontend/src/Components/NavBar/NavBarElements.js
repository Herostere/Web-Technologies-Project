import styled from 'styled-components'
import { NavLink as Link } from 'react-router-dom'


export const Nav = styled.nav`
    position:fixed;
    background: #144a61;
    height: 60px;
    width: 100%;
    display: flex;
    padding: 0rem calc((100vw - 700px) / 2);
    z-index: 10;
`
export const NavLink = styled(Link)`
    color: #fff;
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0 1rem;
    height: 100%;
    cursor: pointer;
    &.active {
        background: #1d6888;
    }
`