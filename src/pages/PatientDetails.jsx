import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { Loader } from "../components/Loader";
import { UserBasicInfo } from "../components/UserBasicInfo";
import { DietDetails } from "../components/DietDetails";
import { GET_USER } from "../queries";
import { Container, LoaderContainer, GeneralContainer, DietsContainer, InfoContainer } from "../styles/PatientDetails.styles";

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
