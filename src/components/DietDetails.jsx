import React from "react";
import { ReactComponent as Bin } from "../assets/bin.svg";
import { ReactComponent as Pencil } from "../assets/pencil.svg";
import { Panel } from "./Panel";
import { MealList } from "./MealList";
import { NoDiet } from "./NoDiet";
import format from "date-fns/format";
import { ptBR } from "date-fns/locale";
import { AddMeal } from "./AddMeal";
import { PanelHeading, HeadFirstline, DietDate, DietName } from "../styles/DietDetails.styles"

export const DietDetails = ({ diet, refetch, userID }) => {
  if (diet) var { id, name, createdAt } = diet;

  return (
    <div>
      {id && (
        <Panel>
          <PanelHeading>
            <div>
              <HeadFirstline>
                <DietName>{name}</DietName>
                <Pencil height={15} width={15} fill="#d0d4d8" />
                <Bin height={15} width={15} fill="#d0d4d8" />
              </HeadFirstline>
              <DietDate>
                {format(
                  new Date(parseInt(createdAt)),
                  "d 'de' MMMM 'de' yyyy",
                  { locale: ptBR }
                )}
              </DietDate>
            </div>
            <AddMeal dietID={id} refetch={refetch} />
          </PanelHeading>
          <MealList meals={diet.meals} refetch={refetch} />
        </Panel>
      )}
      {!id && <NoDiet refetch={refetch} userID={userID} />}
    </div>
  );
};
