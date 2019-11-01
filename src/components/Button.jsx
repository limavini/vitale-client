import React from "react";
import styled from "styled-components";

const CustomButton = styled.button`
    background-color: #FF206E;
    border: none;
    color: white;
    text-transform: uppercase;
    padding: 10px 15px;
    border-radius: 2px;
    cursor: pointer;

    &:hover {
        background-color: #cc1a55;
    }
`;

export const Button = props => (
  <CustomButton {...props}>{props.children}</CustomButton>
);
