import React, { useState, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import { UserContext } from "../UserContext";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Panel } from "../components/Panel";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

const Container = styled.div`
  padding: 60px 120px;
  background-color: #fff7c9;
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
  mutation SignIn(
    $name: String!
    $password: String!
    $email: String!
    $type: String!
  ) {
    addUser(name: $name, password: $password, email: $email, type: $type) {
      id
      name
      password
      email
    }
  }
`;

export const SignIn = ({ history }) => {
  const [user, setUser] = useState({
    name: "",
    password: "",
    email: "",
    crn: "",
    type: "Doctor"
  });

  const { changeUser } = useContext(UserContext);
  const [addUser] = useMutation(ADD_USER);
  const enabled = user.name && user.password && user.email && user.crn;

  const handleChange = event => {
    const { name, value } = event.target;

    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await addUser({
        variables: { ...user }
      });

      const { email, password } = response.data.addUser;

      const login = await axios({
        method: "post",
        url: "https://vitale-server.herokuapp.com/auth/login",
        data: {
          email,
          password
        }
      });

      if (login.status === 200) {
        await changeUser({ ...login.data });
        history.push("/patients");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <Panel>
        <PanelHeading>Comece a atender seus pacientes agora</PanelHeading>
        <form>
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
                type="email"
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
                type="text"
                onChange={handleChange}
                required
                label="CRN"
                name="crn"
                value={user.crn}
              />
            </InputContainer>
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
          </PanelContainer>
          <ButtonContainer>
            <Button
              disabled={!enabled}
              type="button"
              background="#FF206E"
              hover="#cc1a55"
              onClick={handleSubmit}
            >
              ENTRAR
            </Button>
          </ButtonContainer>
        </form>
      </Panel>
    </Container>
  );
};
