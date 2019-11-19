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
  const [activeIndex, setActiveIndex] = useState(null);
  let activeDiet = null;
  const { loading, data, refetch } = useQuery(GET_USER, {
    variables: {
      userID
    }
  });

  console.log({data});

  if (!loading && data) {
    let { diets } = data.user;
  
    if (diets.length) {
      if (activeIndex)
        activeDiet = diets.filter(diet => diet.id === activeIndex)[0];
      else
        activeDiet = diets[0];
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
            <UserBasicInfo user={data.user} />
            <DietDetails
              refetch={async (id) => {
                console.log({id});
                

                await refetch();
                  setActiveIndex(id);
              }}
              userID={data.user.id}
              diet={activeDiet}
              setActiveIndex={id => setActiveIndex(id)}
            />
          </DietsContainer>
          <InfoContainer>
            <InfoList
              setActiveIndex={index => {
                setActiveIndex(index);
              }}
              diets={data.user.diets}
              meals={data.user.meals}
              userID={data.user.id}
              activeDiet={activeDiet}
              refetch={async (id) => {
                console.log({id});
                

                 await refetch();

                 if (id)
                setActiveIndex(id);
                
              }}
            />
          </InfoContainer>
        </GeneralContainer>
      )}
    </Container>
  );
};
