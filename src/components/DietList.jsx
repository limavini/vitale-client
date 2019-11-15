import React from "react";
import styled from "styled-components";

const Diet = styled.li`
    padding: 10px 5px;

    border-bottom: 2px solid #f3f3f3;

    &:hover {
        background-color: #f3f3f3;
        cursor: pointer;
    }
  
    &:last-child {
      border-bottom: none;
    }
`;


export const DietList = ({diets, setActiveIndex}) => {
    return diets.length ? diets.map((diet, index) => <Diet onClick={() => setActiveIndex(diet.id)} key={diet.id}>{diet.name}</Diet>) : <Diet style={{textAlign: "center"}}>Nenhuma dieta criada :(</Diet>
}