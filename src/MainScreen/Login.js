import {StyleSheet, Text, View, TextInput, Alert} from 'react-native';
import React, {useContext, useState} from 'react';
import * as Animatable from 'react-native-animatable';
import Family from '../Utitlies/Family';
import Colors from '../Utitlies/Colors';
import Button from '../component/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UserAuthContext} from '../Context/UserAuthContext';
import {requestUserPermission} from '../firebase_notification';
import {getUniqueId} from 'react-native-device-info';
import OneSignal from 'react-native-onesignal';
import Loader from '../component/Loader';

const Login = ({navigation}) => {
  const [Mobile, setMobile] = useState('');
  const [Password, setPassword] = useState('');
  const [Laoding, setLaoding] = useState(false);
  const {userLogin} = useContext(UserAuthContext);

  const Login = async () => {
    if (Mobile.length < 10) {
      Alert.alert('Please Enter Valid Number');
    } else if (Password.length < 6) {
      Alert.alert('Password should be minimum 6 character');
    } else {
      setLaoding(true);
      // const data = await OneSignal.getDeviceState();
      const player_id = await AsyncStorage.getItem('token')
      
      const result = await userLogin(Mobile, Password, player_id);
      if (result.response.status === 1) {
        navigation.navigate('Home');
        AsyncStorage.setItem('userId', result.response.astrologerId);
      } else {
        Alert.alert(result.response.message);
      }
      setLaoding(false);
    }
  };

  return (
    <>
      {Laoding ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Loader isLoading={Laoding} />
        </View>
      ) : (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Animatable.Image
            animation="bounceIn"
            duration={3000}
            source={require('../../assets/images/AstroLogo.jpg')}
            style={{
              width: 150,
              height: 150,
              // resizeMode: 'contain',
              borderRadius:200,
              alignSelf: 'center',
            }}
          />
          <View style={{width: '90%', alignSelf: 'center',marginTop:50}}>
            <Text
              style={{
                textAlign: 'center',
                marginVertical: 30,
                fontSize: 16,
                fontFamily: Family.Regular,
                color: Colors.gray,
              }}>
              Sign into your account
            </Text>
            <View style={{marginVertical: 5}}>
              <Text
                style={{
                  fontSize: 13,
                  fontFamily: Family.Regular,
                  color: Colors.gray,
                }}>
                Mobile Number
              </Text>
              <View
                style={{
                  borderBottomColor: Colors.primary,
                  borderBottomWidth: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text style={{color: Colors.gray}}>+91 </Text>
                <TextInput
                  placeholder="Enter your Mobile Number"
                  value={Mobile}
                  onChangeText={setMobile}
                  keyboardType="number-pad"
                  style={{color: Colors.gray}}
                  placeholderTextColor={Colors.gray}
                  maxLength={10}
                />
              </View>
            </View>
            <View style={{marginVertical: 5}}>
              <Text
                style={{
                  fontSize: 13,
                  fontFamily: Family.Regular,
                  color: Colors.gray,
                }}>
                Password
              </Text>
              <TextInput
                style={{
                  paddingVertical: 10,
                  borderBottomColor: Colors.primary,
                  borderBottomWidth: 1,
                  color: Colors.gray,
                }}
                placeholder="Enter your Password"
                value={Password}
                onChangeText={setPassword}
                placeholderTextColor={Colors.gray}
              />
            </View>
            <View style={{marginVertical: 20}}>
              <Button action={Login} name={'Login'} />
            </View>
          </View>
        </View>
      )}
    </>
  );
};

export default Login;

const styles = StyleSheet.create({});
