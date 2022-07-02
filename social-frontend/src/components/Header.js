import React from "react";
import styled from "styled-components";

const Header = () => {
  return (
    <HeaderContainer>
      <HeaderLogo>
        <p>Social Chat App by Wasim27</p>
      </HeaderLogo>
    </HeaderContainer>
  )
};

const HeaderContainer = styled.div`
  display: flex;
  position: fixed;
  width: 100%;
  background-color: #302f2b;
  justify-content: center;
  align-items: center;
  color: white;
  padding: 10px;
`

const HeaderLogo = styled.div`
`

export default Header;
