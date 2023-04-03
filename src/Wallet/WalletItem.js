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
        marginTop: 10,
        backgroundColor: Colors.light,
        elevation: 5,
        shadowOffset: 2,
        borderRadius: 5,
        marginBottom: length == index + 1 ? 400 : 0,
      }}>
      <View>
        <Text style={{fontSize: 14, fontFamily: Family.Regular}}>
          User Name: {item.Name}
        </Text>
        <Text style={{fontSize: 14, fontFamily: Family.Regular}}>
          Trans. Id : {item.transId}
        </Text>
      </View>
      <Text
        style={{
          fontSize: 16,
          fontFamily: Family.Medium,
          color: Colors.secprimary,
        }}>
        - ₹ {item.Earning}
      </Text>
    </View>
  );
};

export default WalletItem;

const styles = StyleSheet.create({});
