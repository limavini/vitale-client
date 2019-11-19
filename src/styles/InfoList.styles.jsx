import styled from "styled-components";

export const Menu = styled.div`
  display: flex;
  justify-content: space-around;
`;

export const Item = styled.div`
  width: 50%;
  text-align: center;
  cursor: pointer;
  padding-bottom: 15px;

  &.diet.active {
    border-bottom: 2px solid #f28a3c;
    color: #f28a3c;
  }

  &.measure.active {
    border-bottom: 2px solid #9acb39;
    color: #9acb39;
  }
`;

export const List = styled.ul`
  list-style: none;
  padding: 0;
`;

export const ButtonsContainer = styled.div`
  padding-top: 30px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
`;
