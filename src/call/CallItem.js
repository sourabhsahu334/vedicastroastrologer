import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Colors from '../Utitlies/Colors';
import Family from '../Utitlies/Family';

const CallItem = ({item, navigation}) => {
  return (
    <View
      style={{
        backgroundColor: Colors.light,
        borderRadius: 5,
        padding: 10,
        shadowOffset: 5,
        elevation: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
      }}>
      <View>
        <Text
          style={{fontSize: 14, fontFamily: Family.Medium, color: Colors.gray}}>
          Name: {item.name}
        </Text>
        <Text
          style={{fontSize: 14, fontFamily: Family.Medium, color: Colors.gray}}>
          Order Id : {item.orderId}
        </Text>
        <Text
          style={{fontSize: 14, fontFamily: Family.Medium, color: Colors.gray}}>
          Time : {item.time}
        </Text>
        <Text
          style={{fontSize: 14, fontFamily: Family.Medium, color: Colors.gray}}>
          Call Id : {item.callId}
        </Text>
        <Text
          style={{fontSize: 14, fontFamily: Family.Medium, color: Colors.gray}}>
          Status : Complete
        </Text>
      </View>
      <Text
        style={{
          fontSize: 20,
          fontFamily: Family.Medium,
          color: Colors.gray,
          color: Colors.primary,
          position: 'relative',
          top: 10,
          right: 30,
        }}>
        ₹ {item.total}
      </Text>
    </View>
  );
};

export default CallItem;

const styles = StyleSheet.create({});
