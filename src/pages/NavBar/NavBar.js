import styled from 'styled-components'
import {Link as LinkR} from "react-router-dom";


export const Nav = styled.nav`
  background: white;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  position: sticky;
  top: 0;
  z-index: 10;
  
  @media screen and (max-width: 960px) {
    transition: 0.8s all ease;
  }
`

export const NavBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 80px;
  z-index: 10;
  width: 100%;
  padding: 0 24px;
  max-width: 1100px;
`

export const NavLinks = styled(LinkR)`
  color: #282c34;
  font-family: 'Calibri Light', sans-serif;
  justify-self: flex-start;
  cursor: pointer;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  margin-left: 24px;
  font-weight: bold;
  text-decoration: none;
  &:hover {
    color: cadetblue;
  }
    `

export const NavCenter = styled.div`
  display: flex;
  align-items: center;
  list-style: none;
  text-align: center;
  justify-content: center;
  flex: 6;
`

export const NavRight = styled.div`
  flex: 3;
  display: flex;
  align-items: center;
  list-style: none;
  text-align: center;
  justify-content: right;
`

export const NavLeft = styled.div`
  flex: 3;
  display: flex;
  align-items: center;
  list-style: none;
  text-align: center;
  margin-right: 10px;
  justify-content: left;
`

export const User = styled.img`
  max-width: 10%;
  height: auto;
`