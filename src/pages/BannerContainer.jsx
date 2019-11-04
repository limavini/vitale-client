import styled from "styled-components";
import React from "react";
import backgroundImage from "../assets/food.jpg";
import { Homepage}  from "./Homepage";

const BannerContainer = styled.div`
  background-image: url(${backgroundImage});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  height: 100vh;
  width: 100vw;
`;

export const HomepageBackground = ({ children }) => (
  <BannerContainer  imgUrl="../assets/food_max.jpg">
    <Homepage />
  </BannerContainer>
);
