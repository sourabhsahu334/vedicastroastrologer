import React, {useState, useEffect} from 'react';
import {Apicalls} from '../Utitlies/Apicalls';
import Global from '../Utitlies/Global';
const UserAuthContext = React.createContext();
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserAuthContextProvider = ({children}) => {
  const [User, setUser] = useState('');

  useEffect(() => {
    getUser();
  }, []);

  function userLogin(mobile, password) {
    return Apicalls(
      Global.BASE_URL + `login&mobile=${mobile}&password=${password}`,
    );
  }
  function getUser() {
    AsyncStorage.getItem('userId').then(value => {
      setUser(value);
    });
  }
  return (
    <UserAuthContext.Provider value={{userLogin, User}}>
      {children}
    </UserAuthContext.Provider>
  );
};

export {UserAuthContext, UserAuthContextProvider};
