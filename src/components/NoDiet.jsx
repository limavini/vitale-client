import React from "react";
import styled from "styled-components";
import { ReactComponent as Logo } from "../assets/working_out.svg";
import { AddDiet } from "./AddDiet";

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


export const NoDiet = ({refetch, userID, isDoctor}) => (
  <EmptyState>
    <Text>Esse paciente ainda não tem nenhuma dieta. Vamos lá?</Text>

    <Logo height={300} style={{ width: 400 }} />

    {isDoctor && <AddDiet refetch={refetch} userID={userID}/>}
  </EmptyState>
);
