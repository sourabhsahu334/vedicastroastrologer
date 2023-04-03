import { StyleSheet, Text, View,TouchableOpacity,Image } from 'react-native'
import React from 'react'
import Colors from '../Utitlies/Colors'
import { PhoneIcon } from 'react-native-heroicons/solid'
import Family from '../Utitlies/Family'




const Card = ({name,img,action}) => {
  return (
    <TouchableOpacity style={{backgroundColor:Colors.light, width:"30%", borderRadius:5,height:120,elevation:10,shadowOffset:5, justifyContent:"center",marginHorizontal:"1.5%" ,marginVertical:10}} onPress={action}>
       <Image source={img}  style={{width:40, height:40, resizeMode:"contain" ,alignSelf:"center"}}/>
      <Text style={{fontSize:12 ,marginTop:20,textAlign:"center",fontFamily:Family.Medium}}>{name}</Text>
    </TouchableOpacity>
  )
}

export default Card

const styles = StyleSheet.create({})