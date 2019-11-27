import React from "react";
import format from "date-fns/format";
import addHours from "date-fns/addHours";
import { ptBR } from "date-fns/locale";
import { ReactComponent as Bin } from "../assets/bin.svg";
import { REMOVE_MEAL } from "../queries";
import { useMutation } from "@apollo/react-hooks";
import {
  List,
  Item,
  ItemHead,
  Header,
  Schedule,
  Name,
  FoodList,
  Food
} from "../styles/MealList.styles";

export const MealList = ({ meals, refetch, isDoctor }) => {
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
                  addHours(new Date(parseInt(meal.schedule)), 3),
                  "HH:mm",
                  {
                    locale: ptBR
                  }
                )}
              </Schedule>
              -<Name>{meal.name}</Name>
            </ItemHead>
            {isDoctor && (
              <Bin
                onClick={() => remove(meal.id)}
                height={15}
                width={15}
                fill="#d0d4d8"
              />
            )}
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
