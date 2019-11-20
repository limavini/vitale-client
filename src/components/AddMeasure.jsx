import React, { useState } from "react";
import { Input } from "./Input";
import Modal from "react-modal";
import { modalStyles } from "../styles/general";
import { useMutation } from "@apollo/react-hooks";
import { ADD_MEASURE } from "../queries";
import { ModalHeading, ButtonContainer } from "../styles/ModalForm.styles";
import { Button } from "./Button";

export const AddMeasure = ({ userID: user, activeDiet, refetch }) => {
  const [openModal, setOpenModal] = useState(false);
  const [measure, setMeasure] = useState({ height: "", weight: "", waist: "", hip: "" });
  const [addMeasure] = useMutation(ADD_MEASURE);

  const handleChange = event => {
    const { name, value } = event.target;

    setMeasure({ ...measure, [name]: value });
  };

  const submitMeasure = async () => {
    let { height, weight, waist, hip } = measure;

    await addMeasure({
      variables: {
        weight: parseInt(weight),
        height: parseInt(height),
        waist: parseInt(waist),
        hip: parseInt(hip),
        user
      }
    });

    refetch(activeDiet.id);
    setOpenModal(false);
  };

  return (
    <>
      <Modal
        isOpen={openModal}
        onRequestClose={() => setOpenModal(false)}
        style={modalStyles}
        contentLabel="Example Modal"
      >
        <ModalHeading>Nova Medida</ModalHeading>
        <form>
          <Input
            type="number"
            required
            onChange={handleChange}
            label="Altura (cm)"
            name="height"
            value={measure.height}
          />
          <Input
            type="number"
            required
            onChange={handleChange}
            label="Massa (kg)"
            name="weight"
            value={measure.weight}
          />
          <Input
            type="number"
            required
            onChange={handleChange}
            label="Cintura (cm)"
            name="waist"
            value={measure.waist}
          />
          <Input
            type="number"
            required
            onChange={handleChange}
            label="Quadril (cm)"
            name="hip"
            value={measure.hip}
          />
          <ButtonContainer>
            <Button
              type="button"
              onClick={submitMeasure}
              background="#9ACB39"
              hover="#7DA12C"
            >
              Criar
            </Button>
          </ButtonContainer>
        </form>
      </Modal>
      <Button
        onClick={() => setOpenModal(true)}
        background="#9ACB39"
        hover="#7DA12C"
      >
        Nova Medida
      </Button>
    </>
  );
};
