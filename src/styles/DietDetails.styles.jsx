import styled from "styled-components";

export const PanelHeading = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const HeadFirstline = styled.div`
  display: flex;
  align-items: baseline;

  & svg {
    margin-left: 20px;
    margin-right: 10px;

    &:last-child {
      margin-left: 10px;
    }

    &:hover {
      fill: #a5abb0;
      cursor: pointer;
    }
  }
`;

export const DietName = styled.h2`
  margin: 0;
`;

export const DietDate = styled.span``;
