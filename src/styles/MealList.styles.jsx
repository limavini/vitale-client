import styled from "styled-components";

export const List = styled.ul`
  margin: 0;
  padding-left: 0;
  list-style: none;
  margin-top: 30px;
`;

export const Item = styled.li`
  padding: 15px 0;
  border-bottom: 2px solid #f3f3f3;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    border-bottom: none;
  }
`;

export const ItemHead = styled.div`
  display: flex;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;

  & svg:hover {
    fill: #a5abb0;
    cursor: pointer;
  }
`;

export const Schedule = styled.h3`
  padding-right: 5px;
  margin: 0;
  padding-bottom: 10px;
`;

export const Name = styled.h3`
  padding-left: 5px;
  margin: 0;
`;

export const FoodList = styled.ul`
  padding: 0;
  padding-left: 20px;
  margin: 0;
  columns: 2;
  -webkit-columns: 2;
  -moz-columns: 2;
`;

export const Food = styled.li``;