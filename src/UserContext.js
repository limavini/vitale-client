import React, { createContext, useState } from "react";

export const UserContext = createContext();

const UserContextProvider = (props) => {
  const [state, setState] = useState({
    user: { name: "guest", password: "123" }
  });

  const changeUser = (newUser) => setState({...state, user: newUser});

  return (
      <UserContext.Provider value={{...state, changeUser}}>
          {props.children}
      </UserContext.Provider>
  )
};

export default UserContextProvider;