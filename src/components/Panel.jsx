import React from "react";
import styled from "styled-components";

const Container = styled.div`
  background-color: #fff;
  width: 100%;
  border-radius: 2px;
  padding: 20px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
`;

export const Panel = ({ children }) => <Container>{children}</Container>;
