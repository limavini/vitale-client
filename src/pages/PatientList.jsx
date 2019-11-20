import React, { useContext } from "react";
import { UserContext } from "../UserContext";
import styled from "styled-components";
import { useQuery } from "@apollo/react-hooks";
import { Panel } from "../components/Panel";
import { Loader } from "../components/Loader";
import { useHistory } from "react-router-dom";
import { AddPatient } from "../components/AddPatient";
import { GET_PATIENTS } from "../queries";
import { NoPatients } from "../components/NoPatients";

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

const EmptyState = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const PatientList = () => {
  const userCtx = useContext(UserContext);
  if (userCtx.user)
    var {
      user: { _id: doctor }
    } = userCtx;
  const { loading, data, refetch } = useQuery(GET_PATIENTS, {
    variables: {
      doctor
    },
    fetchPolicy: "no-cache"
  });

  const history = useHistory();

  const redirect = id => history.push(`/patients/${id}`);
  return (
    <Container>
      <Panel>
        {loading && (
          <LoaderContainer>
            <Loader />
          </LoaderContainer>
        )}

        {!loading &&  data && data.users.length > 0 && data.users && (
          <>
            <AddPatient doctor={doctor} refetch={refetch} />
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
          </>
        )}

        {!loading && data && !data.users.length && (
          <EmptyState>
            <NoPatients /> <AddPatient doctor={doctor} refetch={refetch} label="ADICIONAR PACIENTE" />
          </EmptyState>
        )}
      </Panel>
    </Container>
  );
};
