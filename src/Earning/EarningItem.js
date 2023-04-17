import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Colors from '../Utitlies/Colors';
import Family from '../Utitlies/Family';

const EarningItem = ({item, naviagtion, index, length}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 15,
        marginTop: 10,
        backgroundColor: Colors.light,
        elevation: 5,
        shadowOffset: 2,
        borderRadius: 5,
        marginBottom: length == index + 1 ? 250 : 0,
      }}>
      <View>
        <Text
          style={{
            fontSize: 14,
            fontFamily: Family.Regular,
            color: Colors.gray,
          }}>
          User Name: {item.Name}
        </Text>
        <Text
          style={{
            fontSize: 14,
            fontFamily: Family.Regular,
            color: Colors.gray,
          }}>
          Trans. Id : {item.transId}
        </Text>
      </View>
      <Text
        style={{
          fontSize: 18,
          fontFamily: Family.SemiBold,
          color: Colors.primary,
        }}>
        + ₹ {item.Earning}
      </Text>
    </View>
  );
};

export default EarningItem;

const styles = StyleSheet.create({});
