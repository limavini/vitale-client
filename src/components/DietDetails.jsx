import React from "react";
import styled from "styled-components";
import { Panel } from "./Panel";
import { Button } from "./Button";
import { NoDiet } from "./NoDiet";

const PanelHeading = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const DietDetails = ({ diet, refetch, userID }) => {
  if (diet && diet[0]) var { id, name } = diet[0];

  return (
    <div>
      {id && (
        <Panel>
          <PanelHeading>
            <h1>{name}</h1>
            <Button background="#FF206E" hover="#cc1a55">
              Nova dieta
            </Button>
          </PanelHeading>
        </Panel>
      )}
      {!id && <NoDiet refetch={refetch} userID={userID} />}
    </div>
  );
};
