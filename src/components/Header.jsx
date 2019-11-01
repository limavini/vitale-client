import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const HeaderContainer = styled.div`
  position: fixed;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: lightred;
  padding: 20px 0;
`;

const HeaderLogo = styled.div`
  width: 50%;
  text-align: center;
`;

const HeaderLinkContainer = styled.div`
  width: 50%;
`;

export const HeaderLink = styled(NavLink)`
  text-transform: uppercase;
  text-decoration: none;
  color: #0C0F0A;
  &:not(:first-child) {
    padding-left: 10px;
  }
`;

export const Header = () => {
  return (
    <HeaderContainer>
      <HeaderLogo>VITALE</HeaderLogo>
      <HeaderLinkContainer>
        <HeaderLink exact to="/" activeClassName="selected">
          Home
        </HeaderLink>
        <HeaderLink exact to="/about" activeClassName="selected">
          Sobre
        </HeaderLink>
        <HeaderLink exact to="/login" activeClassName="selected">
          Entrar
        </HeaderLink>
      </HeaderLinkContainer>
    </HeaderContainer>
  );
};
