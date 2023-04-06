import {View} from 'react-native';
import React, {useEffect, useState} from 'react';
import * as Animatable from 'react-native-animatable';
import Colors from '../Utitlies/Colors';
import Loader from '../component/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = ({navigation}) => {
  const [isLoading, setisLoading] = useState(true);

  const checkUser = () => {
    AsyncStorage.getItem('userId').then(value => {
      if (value == null) {
        navigation.navigate('Onboarding');
      } else {
        navigation.navigate('Home');
      }
    });
  };

  useEffect(() => {
    setTimeout(() => {
      checkUser();
    }, 3000);
  }, []);

  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.light,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Animatable.Image
          animation="bounceIn"
          duration={5000}
          source={require('../../assets/images/logo.png')}
          style={{width: '80%', height: 200, resizeMode: 'contain'}}
        />
      </View>
      <View style={{position: 'absolute', bottom: 50, alignSelf: 'center'}}>
        <Loader isLoading={isLoading} />
      </View>
    </>
  );
};

export default Splash;
