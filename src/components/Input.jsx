import React from "react";
import styled from "styled-components";

const Group = styled.div`
  position: relative;
  margin: 25px 0 0 0;
`;

const CustomInput = styled.input`
  width: 100%;
  background: none;
  background-color: white;
  color: #4e504c;
  font-size: 18px;
  padding: 10px 10px 10px 5px;
  display: block;
  width: 100%;
  border: none;
  border-radius: 0;
  border-bottom: 1px solid #ff206e;
  margin: 25px 0 0 0;

  &:focus ~ label {
    top: -14px;
    font-size: 12px;
    color: #ff206e;
  }

  &:focus {
    outline: none;
  }
`;

const Label = styled.label`
  color: ${p => (p.shrink ? "#ff206e" : "#BCBDBC")};
  font-size: ${p => (p.shrink ? 12 : 16)}px;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 5px;
  top: ${p => (p.shrink ? -14 : 15)}px;
  transition: 200ms ease all;
`;

const IconContainer = styled.div`
  position: absolute;
  right: 0;
  bottom: 8px;
  cursor: pointer;
`;

export const Input = ({ label, value, children, ...props }) => {
  
  return (
  <Group>
    <CustomInput value={value} {...props} />
    {label && <Label shrink={value}>{label}</Label>}
    {value && <IconContainer>{children}</IconContainer>}
  </Group>
)};
