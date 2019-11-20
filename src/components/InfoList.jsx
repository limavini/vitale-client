import React, { useState } from "react";
import { Panel } from "../components/Panel";
import { DietList } from "../components/DietList";
import { MeasureList } from "../components/MeasureList";
import { AddDiet } from "../components/AddDiet";
import { AddMeasure } from "../components/AddMeasure";
import { ButtonsContainer, Menu, Item, List } from "../styles/InfoList.styles";

export const InfoList = ({
  diets,
  measures,
  userID,
  refetch,
  setActiveIndex,
  activeDiet,
  isDoctor
}) => {
  const [activeList, setActiveList] = useState("diet");
  const isDiet = activeList === "diet";
  return (
    <>
      {isDoctor && (
        <ButtonsContainer>
          <AddDiet userID={userID} refetch={refetch} />
          <AddMeasure
            userID={userID}
            refetch={refetch}
            activeDiet={activeDiet}
          />
        </ButtonsContainer>
      )}
      <Panel>
        <Menu>
          <Item
            onClick={() => setActiveList("diet")}
            className={`${isDiet ? "active" : ""} diet`}
          >
            Dieta
          </Item>
          <Item
            onClick={() => setActiveList("measure")}
            className={`${!isDiet ? "active" : ""} measure`}
          >
            Medida
          </Item>
        </Menu>
        <List>
          {isDiet ? (
            <DietList diets={diets} setActiveIndex={setActiveIndex} />
          ) : (
            <MeasureList
              refetch={refetch}
              measures={measures}
              isDoctor={isDoctor}
              activeDiet={activeDiet}
            />
          )}
        </List>
      </Panel>
    </>
  );
};
