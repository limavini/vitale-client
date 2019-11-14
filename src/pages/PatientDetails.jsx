import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Loader } from "../components/Loader";
import { UserBasicInfo } from "../components/UserBasicInfo";
import { DietDetails } from "../components/DietDetails";
import { InfoList } from "../components/InfoList";
import { GET_USER } from "../queries";
import {
  Container,
  LoaderContainer,
  GeneralContainer,
  DietsContainer,
  InfoContainer
} from "../styles/PatientDetails.styles";

export const PatientDetails = ({
  match: {
    params: { id: userID }
  }
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const { loading, data, refetch } = useQuery(GET_USER, {
    variables: {
      userID
    }
  });

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
            <DietDetails
              refetch={refetch}
              userID={data.user.id}
              diet={data.user.diets[activeIndex]}
            />
          </DietsContainer>
          <InfoContainer>
            <InfoList
              setActiveIndex={index => {
                if (index !== activeIndex) setActiveIndex(index);
              }}
              diets={data.user.diets}
              userID={data.user.id}
              refetch={refetch}
            />
          </InfoContainer>
        </GeneralContainer>
      )}
    </Container>
  );
};
