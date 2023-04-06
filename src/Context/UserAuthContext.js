import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Apicalls} from '../Utitlies/Apicalls';
import Global from '../Utitlies/Global';
const UserAuthContext = React.createContext();

const UserAuthContextProvider = ({children}) => {
  function userLogin(mobile, password) {
    return Apicalls(
      Global.BASE_URL + `login&mobile=${mobile}&password=${password}`,
    );
  }
  return (
    <UserAuthContext.Provider value={{userLogin}}>
      {children}
    </UserAuthContext.Provider>
  );
};

export {UserAuthContext, UserAuthContextProvider};
