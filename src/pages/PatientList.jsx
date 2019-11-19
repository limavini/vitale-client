import React, { useContext } from "react";
import { UserContext } from "../UserContext";
import styled from "styled-components";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { Panel } from "../components/Panel";
import { Loader } from "../components/Loader";
import { useHistory } from "react-router-dom";
import { AddPatient } from "../components/AddPatient";

const GET_PATIENTS = gql`
  query User($doctor: ID) {
    users(doctor: $doctor) {
      id
      name
      email
    }
  }
`;

const Container = styled.div`
  padding: 60px 120px;
  background-color: #fff7c9;
  min-height: 100vh;
  padding-top: 120px;
`;

const UsersTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.thead``;

const TableHead = styled.th`
  padding: 15px 0;
  font-weight: 600;
  border-bottom: 2px solid #dee2e6;
`;

const TableBody = styled.tbody``;

const TableBodyRow = styled.tr`
  border-top: 1px solid #dee2e6;
  cursor: pointer;

  &:not(:last-child) {
    border-bottom: 1px solid #dee2e6;
  }

  &:nth-child(even) {
    background-color: #edeeef;
  }

  &:hover {
    color: #ff206e;
  }
`;

const TableHeadRow = styled.tr``;

const TableData = styled.td`
  text-align: center;
  width: 50%;
  padding: 15px 0;
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const PatientList = () => {
  const userCtx = useContext(UserContext);
  if (userCtx.user)
  var { user: { _id: doctor}} = userCtx;
  const { loading, data, refetch } = useQuery(GET_PATIENTS, {
    variables: {
      doctor
    },
  });

  const history = useHistory();

  const redirect = id => history.push(`/patients/${id}`);
  return (
    <Container>
      <Panel>
        <AddPatient doctor={doctor} refetch={refetch} />
        {loading && (
          <LoaderContainer>
            <Loader />
          </LoaderContainer>
        )}

        {!loading && 
         data.users && (
          <UsersTable>
            <TableHeader>
              <TableHeadRow>
                <TableHead>NOME</TableHead>
                <TableHead>EMAIL</TableHead>
              </TableHeadRow>
            </TableHeader>
            <TableBody>
              {data.users.map(({ id, name, email }) => (
                <TableBodyRow onClick={() => redirect(id)} key={id}>
                  <TableData>{name}</TableData>

                  <TableData>{email}</TableData>
                </TableBodyRow>
              ))}
            </TableBody>
          </UsersTable>
        )}
      </Panel>
    </Container>
  );
};
