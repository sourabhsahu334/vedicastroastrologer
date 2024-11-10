import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../Utitlies/Colors'
import { ArrowRightIcon} from "react-native-heroicons/solid";
import Family from '../Utitlies/Family';

const Button = ({name, action }) => {
    return (
        <TouchableOpacity style={{backgroundColor:"#874827", paddingVertical:15,paddingHorizontal:20,borderRadius:5,  width:"100%", flexDirection:"row" ,alignItems:"center", justifyContent:"center"}} onPress={action} >
           <Text style={{fontSize:15,fontFamily:Family.Medium,color:Colors.light}}>{name}</Text>
           <ArrowRightIcon color={Colors.light}  size={18} style={{marginLeft:10,marginBottom:3}}/>
        </TouchableOpacity>
    )
}

export default Button

const styles = StyleSheet.create({})