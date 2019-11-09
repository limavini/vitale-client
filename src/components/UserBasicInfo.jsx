import React from "react";
import styled from "styled-components";

const BasicInfoContainer = styled.div`
    margin-bottom: 25px;
`;
const UserName = styled.h1`
    margin-top: 0;
    margin-bottom: 5px;
`;

export const UserBasicInfo = ({user: { name, email }}) => (
    <BasicInfoContainer>
        <UserName>{name}</UserName>
        <span>{email}</span>
    </BasicInfoContainer>
)