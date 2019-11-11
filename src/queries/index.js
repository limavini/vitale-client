import gql from "graphql-tag";

export const ADD_PATIENT = gql`
    mutation addPatient($name: String!, $password: String!, $email: String!, $doctor: ID, $type: String!) {
    addUser(name: $name, password: $password, email: $email, doctor: $doctor, type: $type) {
      id
      name
      email
    }
  }
`;

export const ADD_DIET = gql`
  mutation addDiet($user: ID!, $name: String!) {
    addDiet (user: $user, name: $name) {
      id
      name
      createdAt
    }
  }
`;

export const GET_USER = gql`
  query userQuery($userID: ID!) {
    user(id: $userID) {
      id
      name
      email
      type
      diets {
        id
        name
        createdAt
        meals {
          name
          foods
          schedule
        }
      }
    }
  }
`;

export const ADD_MEAL = gql`
  mutation addMeal($diet: ID!, $foods: [String]!, $schedule: String!, $name: String!) {
    addMeal(diet: $diet, foods: $foods, schedule: $schedule, name: $name) {
      id
    }
  }
`;