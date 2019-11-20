import React from "react";
import { ReactComponent as Bin } from "../assets/bin.svg";
import { ReactComponent as Pencil } from "../assets/pencil.svg";
import { useMutation } from "@apollo/react-hooks";
import { Panel } from "./Panel";
import { MealList } from "./MealList";
import { NoDiet } from "./NoDiet";
import format from "date-fns/format";
import { ptBR } from "date-fns/locale";
import { AddMeal } from "./AddMeal";
import { EditDiet } from "./EditDiet";
import { REMOVE_DIET } from "../queries";

import {
  PanelHeading,
  HeadFirstline,
  DietDate,
  DietName
} from "../styles/DietDetails.styles";

export const DietDetails = ({ diet, refetch, userID, isDoctor }) => {
  if (diet) var { id, name, createdAt } = diet;

  const [removeDiet] = useMutation(REMOVE_DIET);

  const remove = async () => {
    await removeDiet({
      variables: {
        diet: diet.id
      }
    });

    refetch(null);
  };

  return (
    <div>
      {id && (
        <Panel>
          <PanelHeading>
            <div>
              <HeadFirstline>
                <DietName>{name}</DietName>
                {isDoctor && (
                  <>
                    <EditDiet
                      dietName={diet.name}
                      dietID={diet.id}
                      refetch={refetch}
                    >
                      <Pencil height={15} width={15} fill="#d0d4d8" />
                    </EditDiet>
                    <Bin
                      onClick={remove}
                      height={15}
                      width={15}
                      fill="#d0d4d8"
                    />
                  </>
                )}
              </HeadFirstline>
              <DietDate>
                {format(
                  new Date(parseInt(createdAt)),
                  "d 'de' MMMM 'de' yyyy",
                  { locale: ptBR }
                )}
              </DietDate>
            </div>
            {isDoctor && <AddMeal diet={diet} refetch={refetch} />}
          </PanelHeading>
          <MealList meals={diet.meals} refetch={refetch} isDoctor={isDoctor}/>
        </Panel>
      )}
      {!id && <NoDiet refetch={refetch} isDoctor={isDoctor} userID={userID} />}
    </div>
  );
};
