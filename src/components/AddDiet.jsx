import React, { useState } from "react";
import { Button } from "./Button";
import { Input } from "./Input";
import Modal from "react-modal";
import { modalStyles } from "../styles/general";
import { useMutation } from "@apollo/react-hooks";
import { ADD_DIET } from "../queries";
import { ModalHeading, ButtonContainer } from "../styles/ModalForm.styles";

export const AddDiet = ({refetch, userID}) => {
  const [openModal, setOpenModal] = useState(false);
  const [diet, setDiet] = useState({ name: "" });
  const [addDiet] = useMutation(ADD_DIET);

  const submitDiet = async () => {

    const newDiet = await addDiet({
        variables: {
            name: diet.name,
            user: userID
        }
    });  
    setOpenModal(false);
    await refetch(newDiet.data.addDiet.id);
    
  };

  const handleChange = event => {
    const { value } = event.target;

    setDiet({name: value});
  };

  return (
    <>
      <Modal
        isOpen={openModal}
        onRequestClose={() => setOpenModal(false)}
        style={modalStyles}
        contentLabel="Example Modal"
      >
        <ModalHeading>Nova dieta</ModalHeading>
        <form>
          <Input
            type="text"
            required
            onChange={handleChange}
            label="Nome"
            name="name"
            value={diet.name}
          />
          <ButtonContainer>
            <Button
              type="button"
              onClick={submitDiet}
              background="#F28A3C"
              hover="#EF6C37"
            >
              Criar
            </Button>
          </ButtonContainer>
        </form>
      </Modal>
      <Button
        onClick={() => setOpenModal(true)}
        background="#F28A3C"
              hover="#EF6C37"
      >
        Nova Dieta
      </Button>
    </>
  );
};
