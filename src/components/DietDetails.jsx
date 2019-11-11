import React from "react";
import styled from "styled-components";
import { Panel } from "./Panel";
import { MealList } from "./MealList";
import { NoDiet } from "./NoDiet";
import format from "date-fns/format";
import { ptBR } from "date-fns/locale";
import { AddMeal } from "./AddMeal";

const PanelHeading = styled.div`
  display: flex;
  justify-content: space-between;
 
`;

const DietName = styled.h2`
  margin: 0;
`;

const DietDate = styled.span``;

export const DietDetails = ({ diet, refetch, userID }) => {
  if (diet && diet[0]) var { id, name, createdAt } = diet[0];

  return (
    <div>
      {id && (
        <Panel>
          <PanelHeading>
            <div>
              <DietName>{name}</DietName>
              <DietDate>
                {format(
                  new Date(parseInt(createdAt)),
                  "d 'de' MMMM 'de' yyyy",
                  { locale: ptBR }
                )}
              </DietDate>
            </div>
            <AddMeal dietID={id} refetch={refetch}/>
          </PanelHeading>
          <MealList meals={diet[0].meals}/>
        </Panel>
      )}
      {!id && <NoDiet refetch={refetch} userID={userID} />}
    </div>
  );
};
