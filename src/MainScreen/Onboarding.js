import { BackHandler, StyleSheet, Text, View, Alert } from 'react-native'
import React, { useEffect } from 'react'
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import Colors from '../Utitlies/Colors';
import Button from '../component/Button';
import Family from '../Utitlies/Family';


const Onboarding = ({ navigation }) => {
  const Navigation = useNavigation()


  useEffect(() => {
    const unsuscribe = Navigation.addListener('beforeRemove', e => {
      e.preventDefault();
      BackHandler.exitApp()
    });
    return unsuscribe;
  }, [Navigation]);

  const navigateScreen = () => {
    return navigation.navigate('Login')
  }

  return (
    <>
      <View style={{ flex: 1, backgroundColor: Colors.light, justifyContent: "space-around", alignItems: "center" }}>
        <Animatable.Text animation="fadeInDown" duration={1000} style={{ fontSize: 36, fontFamily: Family.SemiBold, color: Colors.primary }}>AW Astrolger</Animatable.Text>
        <View style={{ width: "80%" }}>
          <Animatable.Image animation="zoomIn" duration={2000} source={require('../../assets/images/bg1.png')} style={{ width: 200, height: 350, resizeMode: "cover", alignSelf: "center" }} />
          <Animatable.Text animation="zoomInUp" duration={1000} style={{ fontSize: 13, fontFamily: Family.Regular, color: Colors.dark, textAlign: "center" }}>Unlock the secrets of the universe and gain a deeper understanding of yourself and those around you with the timeless wisdom of astrology+</Animatable.Text>
        </View>
        <Animatable.View animation="fadeInUp" duration={1000} style={{ alignSelf: "center", width: "80%", }}>
          <Button name={"Start Now"} action={navigateScreen} />
        </Animatable.View>
      </View>
    </>
  )
}

export default Onboarding

const styles = StyleSheet.create({})