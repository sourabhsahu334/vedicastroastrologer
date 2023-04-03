import { StyleSheet, Text, View, Image, Dimensions, TextInput } from 'react-native'
import React, { useState } from 'react'
import * as Animatable from 'react-native-animatable';
import Family from '../Utitlies/Family';
import Colors from '../Utitlies/Colors';
import Button from '../component/Button';


const Login = ({navigation}) => {
  const [Mobile, setMobile] = useState('')
  const [Password, setPassword] = useState('')


  const Login = () => {
    navigation.navigate('Home')
  }

  
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <Animatable.Image animation="bounceInDown" duration={3000} source={require('../../assets/images/logo.png')} style={{ width: "80%", height: 160, resizeMode: "contain", alignSelf: "center" }} />
      <View style={{ width: "90%", alignSelf: "center" }}>
        <Text style={{ textAlign: "center", marginVertical: 30, fontSize: 16, fontFamily: Family.Regular }}>Sign into your account</Text>
        <View style={{ marginVertical: 5 }}>
          <Text style={{ fontSize: 13, fontFamily: Family.Regular }}>Mobile Number</Text>
          <View style={{ borderBottomColor: Colors.primary, borderBottomWidth: 1, flexDirection: "row", alignItems: "center" }} >
            <Text>+91 </Text>
            <TextInput placeholder='Enter your Mobile Number' value={Mobile} onChangeText={setMobile} keyboardType='number-pad' />
          </View>
        </View>
        <View style={{ marginVertical: 5 }}>
          <Text style={{ fontSize: 13, fontFamily: Family.Regular }}>Password</Text>
          <TextInput style={{ paddingVertical: 10, borderBottomColor: Colors.primary, borderBottomWidth: 1 }} placeholder='Enter your Mobile Number' value={Password} onChangeText={setPassword} />
        </View>
        <View style={{ marginVertical: 20 }}>
          <Button action={Login} name={'Login'} />
        </View>
      </View>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({})