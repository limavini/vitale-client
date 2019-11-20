import React, { useState, useContext } from "react";
import { UserContext } from "../UserContext";
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
  const [activeIndex, setActiveIndex] = useState(null);
  let activeDiet = null;
  const { loading, data, refetch } = useQuery(GET_USER, {
    variables: {
      userID
    }
  });
  const userCtx = useContext(UserContext);
  const isDoctor = userCtx && userCtx.user && userCtx.user.type === "Doctor";
  console.log({userCtx});

  if (!loading && data) {
    let { diets } = data.user;

    if (diets.length) {
      if (activeIndex)
        activeDiet = diets.filter(diet => diet.id === activeIndex)[0];
      else activeDiet = diets[0];
    } else {
      activeDiet = null;
    }
  }

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
            <UserBasicInfo isDoctor={isDoctor} user={data.user} refetch={refetch}/>
            <DietDetails
              refetch={async id => {
                await refetch();
                setActiveIndex(id);
              }}
              userID={data.user.id}
              diet={activeDiet}
              setActiveIndex={id => setActiveIndex(id)}
              isDoctor={isDoctor}
            />
          </DietsContainer>
          <InfoContainer style={{marginTop: isDoctor ? 0 : 90}}>
            <InfoList
            isDoctor={isDoctor}
              setActiveIndex={index => {
                setActiveIndex(index);
              }}
              diets={data.user.diets}
              meals={data.user.meals}
              measures={data.user.measures}
              userID={data.user.id}
              activeDiet={activeDiet}
              refetch={async id => {
                await refetch();

                if (id) setActiveIndex(id);
              }}
            />
          </InfoContainer>
        </GeneralContainer>
      )}
    </Container>
  );
};
