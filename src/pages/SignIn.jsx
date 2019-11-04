import React, { useState } from "react";
import styled from "styled-components";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Panel } from "../components/Panel";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

const Container = styled.div`
  padding: 60px 120px;
  border: 1px solid blue;
  background-color: #fdff93;
  min-height: 100vh;
  padding-top: 120px;
`;

const PanelContainer = styled.div`
  display: flex;
`;

const InputContainer = styled.div`
  width: 50%;
  padding: 20px 40px 0px 40px;
`;

const PanelHeading = styled.p`
  margin: 0;
  padding: 0;
  text-align: center;
  font-size: 24px;
`;

const ButtonContainer = styled.div`
  text-align: right;
  padding: 20px 40px 0 20px;
`;

const ADD_USER = gql`
  mutation SignIn($name: String!, $password: String!, $email: String!) {
    addUser(name: $name, password: $password, email: $email) {
      id
      name
      password
    }
  }
`;

export const SignIn = () => {
  const [user, setUser] = useState({
    name: "",
    password: "",
    email: "",
    confirmationPassword: ""
  });

  
  const [addUser, { data }] = useMutation(ADD_USER);
  console.log({data});
  const enabled =
    user.name && user.password && user.email && user.confirmationPassword;

  const handleChange = event => {
    const { name, value } = event.target;

    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async () => {
    if (user.confirmationPassword !== user.password) {
      alert("As senhas estão diferentes");
      return;
    }

    try {
      const test = await addUser({
        variables: { ...user }
      });

      console.log({test})
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <Panel>
        <PanelHeading>Comece a sua dieta agora</PanelHeading>
        <PanelContainer>
          <InputContainer>
            <Input
              type="text"
              onChange={handleChange}
              required
              label="Nome"
              name="name"
              value={user.name}
            />
          </InputContainer>
          <InputContainer>
            <Input
              type="text"
              onChange={handleChange}
              required
              label="E-mail"
              name="email"
              value={user.email}
            />
          </InputContainer>
        </PanelContainer>
        <PanelContainer>
          <InputContainer>
            <Input
              type="password"
              onChange={handleChange}
              required
              label="Senha"
              name="password"
              value={user.password}
            />
          </InputContainer>
          <InputContainer>
            <Input
              type="password"
              label="Confirmar a senha"
              name="confirmationPassword"
              value={user.confirmationPassword}
              required
              onChange={handleChange}
            />
          </InputContainer>
        </PanelContainer>
        <ButtonContainer>
          <Button
            disabled={!enabled}
            type="button"
            background="#FF206E"
            onClick={handleSubmit}
          >
            ENTRAR
          </Button>
        </ButtonContainer>
      </Panel>
    </Container>
  );
};
