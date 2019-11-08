import React, { useState } from "react";
import styled from "styled-components";
import { Button } from "./Button";
import Modal from "react-modal";
import { Input } from "./Input";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

const ADD_PATIENT = gql`
    mutation addPatient($name: String!, $password: String!, $email: String!, $doctor: ID, $type: String!) {
    addUser(name: $name, password: $password, email: $email, doctor: $doctor, type: $type) {
      id
      name
      email
    }
  }
`;

const customStyles = {
  content: {
    top: "35%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "none",
    borderRadius: 5,
    width: 450,
    padding: "30px 75px",
    textAlign: "center"
  }
};

const PanelHeading = styled.h1`
  margin: 0;
`;

const ButtonContainer = styled.div`
  margin-top: 25px;
`;

const PanelButton = styled.div`
  margin-bottom: 20px;
`;

Modal.setAppElement("#root");

export const AddPatient = ({doctor, refetch}) => {
    
  const [openModal, setOpenModal] = useState(false);
  const [user, setUser] = useState({ name: "", password: "", email: "", doctor, type: "Patient" });
  const enabled = user.name && user.password && user.email;

  const [addPatient] = useMutation(ADD_PATIENT);

  const handleChange = event => {
    const { name, value } = event.target;

    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async () => {
    

    await addPatient({
        variables: {
            ...user,
        }
    });

    refetch();
    setOpenModal(false);
    
  };

  return (
    <>
      <Modal
        isOpen={openModal}
        onRequestClose={() => setOpenModal(false)}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <PanelHeading>Novo paciente</PanelHeading>

        <Input
          type="text"
          onChange={handleChange}
          required
          label="Nome"
          name="name"
          value={user.name}
        />
        <Input
          type="text"
          onChange={handleChange}
          required
          label="E-mail"
          name="email"
          value={user.email}
        />
        <Input
          type="text"
          onChange={handleChange}
          required
          label="Senha"
          name="password"
          value={user.password}
        />
        <ButtonContainer>
          <Button
            type="button"
            disabled={!enabled}
            onClick={handleSubmit}
            background="#36C0AE"
            hover="#2A9587"
          >
            Adicionar
          </Button>
        </ButtonContainer>
      </Modal>
      <PanelButton>
        <Button
          background="#FF206E"
          hover="#cc1a55"
          onClick={() => setOpenModal(true)}
        >
          Novo paciente
        </Button>
      </PanelButton>
    </>
  );
};
