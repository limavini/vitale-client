import React from "react";
import styled from "styled-components";
import { useMutation } from "@apollo/react-hooks";
import { REMOVE_USER, GET_PATIENTS } from "../queries";
import { ReactComponent as Bin } from "../assets/bin.svg";
import { useHistory } from "react-router-dom";

const BasicInfoContainer = styled.div`
  margin-bottom: 25px;
`;
const UserName = styled.h1`
  margin-top: 0;
  margin-bottom: 5px;
  margin-right: 5px;
`;

const Head = styled.div`
  display: flex;
  align-items: baseline;

  & svg:hover {
    fill: #a5abb0;
    cursor: pointer;
  }
`;

export const UserBasicInfo = ({ user: { name, email, id }, isDoctor }) => {
  const [removeUser] = useMutation(REMOVE_USER);
  const history = useHistory();

  const remove = async id => {
    await removeUser({
      variables: {
        id
      },
      refetchQueries: [{ query: GET_PATIENTS }]
    });

    history.push("/");
  };

  return (
    <BasicInfoContainer>
      <Head>
        <UserName>{name}</UserName>
        {isDoctor && (
          <Bin
            onClick={() => remove(id)}
            height={15}
            width={15}
            fill="#d0d4d8"
          />
        )}
      </Head>
      <span>{email}</span>
    </BasicInfoContainer>
  );
};
