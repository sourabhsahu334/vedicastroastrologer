import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import React from 'react';
import Colors from '../Utitlies/Colors';
import Family from '../Utitlies/Family';

const WaitItem = ({item, navigation}) => {
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
      }}>
      <View>
        <Text style={{fontSize: 14, fontFamily: Family.Medium}}>
          Name: {item.name}
        </Text>
        <Text style={{fontSize: 14, fontFamily: Family.Medium}}>
          Order Id : {item.OrderId}
        </Text>
        <Text style={{fontSize: 14, fontFamily: Family.Medium}}>
          Time : {item.Time}
        </Text>
        <Text style={{fontSize: 14, fontFamily: Family.Medium}}>
          Rate : ₹ {item.rate}/ minute
        </Text>
        <Text style={{fontSize: 14, fontFamily: Family.Medium}}>
          Status : {item.Status}
        </Text>
        <View
          style={{
            position: 'absolute',
            top: 10,
            right: 30,
          }}>
          <Image
            source={require('../../assets/images/sand-clock.png')}
            style={{
              width: 30,
              height: 30,
              resizeMode: 'contain',
            }}
          />
        </View>
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
            onPress={() => navigation.navigate('ChatScreen')}>
            <Text
              style={{
                fontSize: 14,
                fontFamily: Family.Medium,
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
            onPress={() => navigation.navigate('ChatScreen')}>
            <Text
              style={{
                fontSize: 14,
                fontFamily: Family.Medium,
                color: Colors.light,
                textAlign: 'center',
              }}>
              Start
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default WaitItem;

const styles = StyleSheet.create({});
