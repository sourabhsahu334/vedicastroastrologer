import { View, Text,TouchableOpacity ,StyleSheet} from 'react-native'
import React from 'react'
import { QuestionMarkCircleIcon } from 'react-native-heroicons/solid'
import Colors from '../Utitlies/Colors'
import Family from '../Utitlies/Family'

const Header = ({navigation}) => {
  return (
    <View style={{flexDirection:"row" ,justifyContent:"space-between", alignItems:"center",paddingHorizontal:15, paddingVertical:14, backgroundColor:Colors.light , shadowOffset:5 , elevation:10}}>
         <Text style={{fontSize:16,fontFamily:Family.Medium,color:Colors.dark}}>VA Astrologer</Text>
        <TouchableOpacity onPress={()=>navigation.navigate('Support')}>
            <QuestionMarkCircleIcon color={Colors.primary} size={25} />
         </TouchableOpacity>
        </View>
  )
}

export default Header

const styles = StyleSheet.create({})