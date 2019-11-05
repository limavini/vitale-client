import React from "react";
import styled from "styled-components";

const Spinner = styled.div`
  border: 12px solid #f3f3f3;
  border-top: 12px solid #FF206E;
  border-radius: 50%;
  width: 90px;
  height: 90px;
  animation: spin 2s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const Loader = () => <Spinner/>;
