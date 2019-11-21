import React, { useState } from "react";
import styled from "styled-components";
import { Button } from "./Button";
import { Input } from "./Input";
import Modal from "react-modal";
import { modalStyles } from "../styles/general";
import { useMutation } from "@apollo/react-hooks";
import { ADD_MEAL } from "../queries";
import { ModalHeading, ButtonContainer } from "../styles/ModalForm.styles";
import { ReactComponent as AddIcon } from "../assets/add-icon.svg";

const FoodList = styled.ul`
  text-align: left;
  margin: 0;
  padding: 20px;
`;

const Food = styled.li``;

export const AddMeal = ({refetch, diet}) => {
  const { id: dietID } = diet;
  const [openModal, setOpenModal] = useState(false);
  const [meal, setMeal] = useState({ schedule: "00:00", food: "", foods: [], name: "" });
  const [addMeal] = useMutation(ADD_MEAL);

  const handleChange = event => {
    const { name, value } = event.target;

    setMeal({ ...meal, [name]: value });
  };

  const submitMeal = async () => {
    
    await addMeal({variables: {
      diet: dietID,
      foods: meal.foods,
      schedule: meal.schedule,
      name: meal.name
    }});
    setOpenModal(false);
    refetch(dietID);
    setMeal({ schedule: "00:00", food: "", foods: [], name: "" });
  };

  const addFood = () => {

    setMeal({...meal, food: "", foods: [...meal.foods, meal.food]})
  }

  return (
    <>
      <Modal
        isOpen={openModal}
        onRequestClose={() => setOpenModal(false)}
        style={modalStyles}
        contentLabel="Example Modal"
      >
        <ModalHeading>Nova Refeição</ModalHeading>
        <form>
        <Input
            type="text"
            required
            onChange={handleChange}
            label="Nome"
            name="name"
            value={meal.name}
          />
          <Input
            type="time"
            required
            onChange={handleChange}
            label="Horário"
            name="schedule"
            value={meal.schedule}
          />
          <Input type="text" onChange={handleChange} label="Alimento" name="food" value={meal.food}>
            <AddIcon onClick={addFood} width={18} height={18} fill="red" />
          </Input>
          <FoodList>
            {meal.foods.map(food => <Food key={Math.random()}>{food}</Food>)}
          </FoodList>
          <ButtonContainer>
            <Button
              type="button"
              onClick={submitMeal}
              background="#FF206E"
              hover="#cc1a55"
            >
              Criar
            </Button>
          </ButtonContainer>
        </form>
      </Modal>
      <Button
        onClick={() => setOpenModal(true)}
        background="#FF206E"
        hover="#cc1a55"
      >
        Nova refeição
      </Button>
    </>
  );
};
