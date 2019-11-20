import React, { useContext } from "react";
import styled from "styled-components";
import { NavLink, useHistory } from "react-router-dom";
import { UserContext } from "../UserContext";
import { ReactComponent as Logo } from "../assets/apple.svg";
const HeaderContainer = styled.div`
  position: fixed;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: lightred;
  text-align: right;
  background-color: ${p => (p.isHomepage ? "transparent" : "#ffeb7c")};
  padding: 20px 60px;
  z-index: 999;
  webkit-box-shadow: ${p =>
    p.isHomepage ? "" : "0 3px 5px rgba(0, 0, 0, 0.3)"};
  -moz-box-shadow: ${p => (p.isHomepage ? "" : "0 3px 5px rgba(0, 0, 0, 0.3)")};
  box-shadow: ${p => (p.isHomepage ? "" : "0 3px 5px rgba(0, 0, 0, 0.3)")};
`;

const HeaderLogo = styled.div`
  width: 50%;
  text-align: left;
  display: flex;
  align-items: center;
  font-size: 20px;
  color: #ff206e;
  font-weight: 600;
  position: relative;
  visibility: ${p => (p.isHomepage ? "hidden" : "inherit")};
`;

const HeaderLinkContainer = styled.div`
  width: 50%;
`;

export const HeaderLink = styled(NavLink)`
  text-transform: uppercase;
  text-decoration: none;
  color: #0c0f0a;
  &:not(:first-child) {
    padding-left: 10px;
  }
`;

const LogoContainer = styled.div`
  position: absolute;
  left: 70px;
  top: 2px;
`;

export const Header = () => {
  const { user, logOut } = useContext(UserContext);
  const history = useHistory();
  const isHomepage = history.location.pathname === "/";

  return (
    <HeaderContainer isHomepage={isHomepage}>
      <HeaderLogo isHomepage={isHomepage}>
        VITALE{" "}
        <LogoContainer>
          <Logo fill="#ff206e" height={20} width={20} />
        </LogoContainer>
      </HeaderLogo>
      <HeaderLinkContainer>
        {!isHomepage && user && user.type === "Doctor" && (
          <HeaderLink exact to="/" activeClassName="selected">
            Home
          </HeaderLink>
        )}
        {user && (
          <HeaderLink onClick={logOut} exact to="/" activeClassName="selected">
            Sair
          </HeaderLink>
        )}
      </HeaderLinkContainer>
    </HeaderContainer>
  );
};
