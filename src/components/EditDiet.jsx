import React, { useState } from "react";
import { Button } from "./Button";
import { Input } from "./Input";
import Modal from "react-modal";
import { modalStyles } from "../styles/general";
import { useMutation } from "@apollo/react-hooks";
import { EDIT_DIET } from "../queries";
import { ModalHeading, ButtonContainer } from "../styles/ModalForm.styles";

export const EditDiet = ({refetch, dietID, dietName, children}) => {
  const [openModal, setOpenModal] = useState(false);
  const [diet, setDiet] = useState({ name: dietName });
  const [editDiet] = useMutation(EDIT_DIET);

  const submitDiet = async () => {

    await editDiet({
        variables: {
            name: diet.name,
            diet: dietID
        }
    })

    refetch();
    setOpenModal(false);
    
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
        <ModalHeading>Editar dieta</ModalHeading>
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
              background="#FF206E"
              hover="#cc1a55"
            >
              Editar
            </Button>
          </ButtonContainer>
        </form>
      </Modal>
      <div onClick={() => setOpenModal(true)}>{children}</div>
    </>
  );
};
