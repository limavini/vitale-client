import React from "react";
import styled from "styled-components";
import format from "date-fns/format";
import addHours from "date-fns/addHours";
import { ptBR } from "date-fns/locale";

const List = styled.ul`
  margin: 0;
  padding-left: 0;
  list-style: none;
  margin-top: 30px;
`;

const Item = styled.li``;

export const MealList = ({ meals }) => {
  return (
    <List>
      {meals.map(meal => (
        <Item key={Math.random()}>{format(
            addHours(new Date(parseInt(meal.schedule)), 1),
            "HH:mm",
            { locale: ptBR }
          )}</Item>
      ))}
    </List>
  );
};
