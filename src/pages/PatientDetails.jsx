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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getActiveDiet = (dietID, removing) => {
    
    if (data) {
      let { diets } = data.user;

      if (diets.length && dietID && !removing) {
        return diets.filter(diet => diet.id === dietID)[0];
      } else if (removing && diets.length) {
        return diets.filter(diet => diet.id !== dietID)[0];
      } else if (diets.length) {
        return diets[0]
      }
    }
    return false;
  };

  const [activeIndex, setActiveIndex] = useState(null);

  const { loading, data, refetch } = useQuery(GET_USER, {
    variables: {
      userID
    }
  });

  if (activeIndex === null && activeIndex !== false && data) {
    setActiveIndex(getActiveDiet());
  }

  // React.useEffect(() =>  setActiveIndex(getActiveDiet()), [getActiveDiet])


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
              refetch={(id) => {
                setActiveIndex(getActiveDiet(id, true));
                refetch();
              }}
              userID={data.user.id}
              diet={activeIndex}
            />
          </DietsContainer>
          <InfoContainer>
            <InfoList
              setActiveIndex={index => {
                setActiveIndex(getActiveDiet(index));
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
