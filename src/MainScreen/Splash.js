import {View} from 'react-native';
import React, {useEffect, useState} from 'react';
import * as Animatable from 'react-native-animatable';
import Colors from '../Utitlies/Colors';
import Loader from '../component/Loader';

const Splash = ({navigation}) => {
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Onboarding');
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
