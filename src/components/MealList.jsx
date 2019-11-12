import React from "react";
import styled from "styled-components";
import format from "date-fns/format";
import addHours from "date-fns/addHours";
import { ptBR } from "date-fns/locale";
import { ReactComponent as Bin } from "../assets/bin.svg";
import { REMOVE_MEAL } from "../queries";
import { useMutation } from "@apollo/react-hooks";

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

const Header = styled.div`
  display: flex;
  justify-content: space-between;

  & svg:hover {
    fill: #a5abb0;
    cursor: pointer;
  }
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

export const MealList = ({ meals, refetch }) => {
  const [removeMeal] = useMutation(REMOVE_MEAL);
  const remove = async id => {
    await removeMeal({
      variables: {
        id
      }
    });

    refetch();
  };

  return (
    <List>
      {meals.map(meal => (
        <Item key={meal.id}>
          <Header>
            <ItemHead>
              <Schedule>
                {format(
                  addHours(new Date(parseInt(meal.schedule)), 1),
                  "HH:mm",
                  {
                    locale: ptBR
                  }
                )}
              </Schedule>
              -<Name>{meal.name}</Name>
            </ItemHead>
            <Bin
              onClick={() => remove(meal.id)}
              height={15}
              width={15}
              fill="#d0d4d8"
            />
          </Header>
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
