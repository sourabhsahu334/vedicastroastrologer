import {View} from 'react-native';
import React, {useEffect, useState} from 'react';
import * as Animatable from 'react-native-animatable';
import Colors from '../Utitlies/Colors';
import Loader from '../component/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigationState } from '@react-navigation/native';

const Splash = ({navigation}) => {
  const [isLoading, setisLoading] = useState(true);

  
  // const currentRoute = useNavigationState(state => state.routes[state.index].name);
  // console.log(currentRoute)


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
          source={require('../../assets/images/AstroLogo.jpg')}
          style={{width: 220, height: 220, resizeMode: 'contain',borderRadius:500}}
        />
      </View>
      <View style={{position: 'absolute', bottom: 50, alignSelf: 'center'}}>
        <Loader isLoading={isLoading} />
      </View>
    </>
  );
};

export default Splash;
