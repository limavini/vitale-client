import React from "react";
import styled from "styled-components";
import { useQuery } from "@apollo/react-hooks";
import { Loader } from "../components/Loader";
import { UserBasicInfo } from "../components/UserBasicInfo";
import { DietDetails } from "../components/DietDetails";
import { GET_USER } from "../queries";

const Container = styled.div`
  padding: 60px 120px;
  background-color: #feffd3;
  min-height: 100vh;
  padding-top: 120px;
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 50vh;
  align-items: center;
`;

const GeneralContainer = styled.div`
  display: flex;
`;

const DietsContainer = styled.div`
  border: 1px solid orange;
  width: 100%;
  padding: 40px
  flex: 2;
`;

const InfoContainer = styled.div`
  border: 1px solid blue;
  width: 100%;
  flex: 1;
  padding: 40px;
`;

export const PatientDetails = ({
  match: {
    params: { id: userID }
  }
}) => {
  const { loading, data, refetch } = useQuery(GET_USER, {
    variables: {
      userID
    }
  });

  console.log({ data });

  return (
    <Container>
      {loading && (
        <LoaderContainer>
          <Loader />
        </LoaderContainer>
      )}

      {!loading && (
        <GeneralContainer>
          <DietsContainer>
            <UserBasicInfo user={data.user} />
            <DietDetails refetch={refetch} userID={data.user.id} diet={data.user.diets}/>
          </DietsContainer>
          <InfoContainer>

          </InfoContainer>
        </GeneralContainer>
      )}
    </Container>
  );
};
