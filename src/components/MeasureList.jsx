import React from "react";
import styled from "styled-components";
import format from "date-fns/format";
import addHours from "date-fns/addHours";
import { ptBR } from "date-fns/locale";
import { REMOVE_MEASURE } from "../queries";
import { useMutation } from "@apollo/react-hooks";
import { ReactComponent as Bin } from "../assets/bin.svg";

const Measure = styled.li`
  padding: 10px 5px;
  display: flex;
  flex-wrap: wrap;
  border-bottom: 2px solid #f3f3f3;

  &:hover {
    background-color: #f3f3f3;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const Item = styled.span`
  width: 50%;
  padding: 5px 0;
`;

const Label = styled.span`
  font-size: 14px;
`;

const Value = styled.span`
  font-size: 14px;
`;

const CreatedAt = styled.div`
  font-size: 16px;
  font-weight: 700;
`;

const Head = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  & svg:hover {
    fill: #a5abb0;
    cursor: pointer;
  }
`;

export const MeasureList = ({ measures, refetch, isDoctor }) => {
  const [removeMeasure] = useMutation(REMOVE_MEASURE);

  const remove = async id => {
    await removeMeasure({
      variables: {
        id
      }
    });

    refetch();
  };

  return measures.length ? measures.map(measure => {
    measure.date = format(
      addHours(new Date(parseInt(measure.createdAt)), 0),
      " d 'de' MMMM 'de' yyyy",
      {
        locale: ptBR
      }
    );

    return (
      <Measure key={measure.id}>
        <Head>
          <CreatedAt>{measure.date}</CreatedAt>
          {isDoctor && (
            <Bin
              onClick={() => remove(measure.id)}
              height={15}
              width={15}
              fill="#d0d4d8"
            />
          )}
        </Head>
        <Item>
          <Label>Altura: </Label>
          <Value>{measure.height}cm</Value>
        </Item>
        <Item>
          <Label>Massa: </Label>
          <Value>{measure.weight}kg</Value>
        </Item>
        <Item>
          <Label>Cintura: </Label>
          <Value>{measure.waist}cm</Value>
        </Item>
        <Item>
          <Label>Quadril: </Label>
          <Value>{measure.hip}cm</Value>
        </Item>
      </Measure>
    );
  }) : <Measure style={{display: "flex", justifyContent: "center"}}>Nenhuma medida criada :(</Measure>;
};
