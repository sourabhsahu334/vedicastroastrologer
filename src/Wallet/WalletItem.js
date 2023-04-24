import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Colors from '../Utitlies/Colors';
import Family from '../Utitlies/Family';

const WalletItem = ({item, naviagtion, index, length}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 15,
        backgroundColor: Colors.light,
        elevation: 5,
        shadowOffset: 2,
        borderRadius: 5,
        marginBottom: length == index + 1 ? 400 : 0,
      }}>
      <View>
        <Text
          style={{
            fontSize: 14,
            fontFamily: Family.Medium,
            color: Colors.primary,
          }}>
          {item.remark}
        </Text>
        <Text
          style={{
            fontSize: 14,
            fontFamily: Family.Medium,
            color: Colors.gray,
          }}>
          Date : {item.date}
        </Text>
        <Text
          style={{
            fontSize: 14,
            fontFamily: Family.Regular,
            color: Colors.gray,
          }}>
          Trans. Id : {item.tnx}
        </Text>
      </View>
      <Text
        style={{
          fontSize: 16,
          fontFamily: Family.Medium,
          color: Colors.secprimary,
        }}>
        {item.type == 'credit' ? '+ ' : ' -'} ₹ {item.amount}
      </Text>
    </View>
  );
};

export default WalletItem;

const styles = StyleSheet.create({});
