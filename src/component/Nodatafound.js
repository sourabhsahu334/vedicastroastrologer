import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Family from '../Utitlies/Family';
import Colors from '../Utitlies/Colors';

const Nodatafound = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text
        style={{
          fontSize: 16,
          fontFamily: Family.Medium,
          color: Colors.gray,
          marginTop: 50,
        }}>
        No Data Found
      </Text>
    </View>
  );
};

export default Nodatafound;

const styles = StyleSheet.create({});
