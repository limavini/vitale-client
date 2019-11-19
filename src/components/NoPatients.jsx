import React from "react";
import styled from "styled-components";
import { ReactComponent as Logo } from "../assets/community.svg";

const EmptyState = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  margin-top: 60px;
`;

const Text = styled.p`
  margin: 0;
  font-size: 18px;
`;

export const NoPatients = () => (
  <EmptyState>
    <Text>Ainda não há pacientes cadastrados. Que tal começar agora?</Text>

    <Logo height={300} style={{ width: 400 }} />
  </EmptyState>
);
