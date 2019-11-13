import React from "react";
import styled from "styled-components";

export const DietList = ({diets}) => {
    return diets.map(diet => <li key={diet.id}>{diet.name}</li>)
}