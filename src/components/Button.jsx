import React from "react";
import styled from "styled-components";

const CustomButton = styled.button`
    background-color: ${p => p.background};
    border: none;
    color: white;
    text-transform: uppercase;
    padding: 10px 15px;
    border-radius: 2px;
    cursor: ${p => p.disabled ? "not-allowed" : "pointer"};

    &:hover {
        background-color: ${p => p.disabled ? p.background : "#cc1a55"} ;
    }
`;

export const Button = props => (
  <CustomButton {...props}>{props.children}</CustomButton>
);
