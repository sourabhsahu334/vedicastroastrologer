import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Colors from '../Utitlies/Colors';
import Family from '../Utitlies/Family';

const ChatItem = ({item, navigation}) => {
  return (
    <View
      style={{
        backgroundColor: Colors.light,
        borderRadius: 5,
        padding: 10,
        shadowOffset: 5,
        elevation: 5,
        flexDirection: 'row',
        marginVertical: 10,
        justifyContent: 'space-between',
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
          Rate : ₹ {item.rate}/ minute
        </Text>
        <Text
          style={{fontSize: 14, fontFamily: Family.Medium, color: Colors.gray}}>
          Status : {item.status}
        </Text>
        <Text
          style={{
            fontSize: 20,
            fontFamily: Family.Medium,
            color: Colors.gray,
            color: Colors.primary,
            position: 'absolute',
            top: 10,
            right: 30,
          }}>
          ₹ {item.total}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '95%',
          }}>
          <TouchableOpacity
            style={{
              backgroundColor: Colors.secprimary,
              paddingVertical: 5,
              width: '45%',
              borderRadius: 5,
              marginTop: 15,
            }}
            onPress={() =>
              navigation.navigate('ChatScreen', {
                RoomId: item.roomId,
              })
            }>
            <Text
              style={{
                fontSize: 14,
                fontFamily: Family.Medium,
                color: Colors.gray,
                color: Colors.light,
                textAlign: 'center',
              }}>
              Open Kundli
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: Colors.primary,
              paddingVertical: 5,
              width: '45%',
              borderRadius: 5,
              marginTop: 15,
            }}
            onPress={() =>
              navigation.navigate('ChatScreen', {
                RoomId: item.roomId,
              })
            }>
            <Text
              style={{
                fontSize: 14,
                fontFamily: Family.Medium,
                color: Colors.gray,
                color: Colors.light,
                textAlign: 'center',
              }}>
              View Messages
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ChatItem;

const styles = StyleSheet.create({});
