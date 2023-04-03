import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '../Utitlies/Colors'

const Loader = ({isLoading}) => {
  return (
    <View>
      <ActivityIndicator animate={isLoading} size={30} color={Colors.primary} />
    </View>
  )
}

export default Loader

const styles = StyleSheet.create({})