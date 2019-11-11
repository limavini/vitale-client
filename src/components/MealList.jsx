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

const Item = styled.li`
    padding: 15px 0;
    border-bottom: 2px solid #f3f3f3;

    &:first-child {
        padding-top: 0;
    }

    &:last-child {
        border-bottom: none;
    }

    
`;

const ItemHead = styled.div`
  display: flex;
`;

const Schedule = styled.h3`
  padding-right: 5px;
  margin: 0;
  padding-bottom: 10px;
`;

const Name = styled.h3`
  padding-left: 5px;
  margin: 0;
`;

const FoodList = styled.ul`
  padding: 0;
  padding-left: 20px;
  margin: 0;
  columns: 2;
  -webkit-columns: 2;
  -moz-columns: 2;
`;

const Food = styled.li``;

export const MealList = ({ meals }) => {
  return (
    <List>
      {meals.map(meal => (
        <Item key={Math.random()}>
          <ItemHead>
            <Schedule>
              {format(addHours(new Date(parseInt(meal.schedule)), 1), "HH:mm", {
                locale: ptBR
              })}
            </Schedule>
            -
            <Name>{meal.name}</Name>
          </ItemHead>
          <FoodList>
            {meal.foods.map(food => (
              <Food key={Math.random()}>{food}</Food>
            ))}
          </FoodList>
        </Item>
      ))}
    </List>
  );
};
