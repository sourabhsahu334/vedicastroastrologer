import {StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native';
import React, {useState} from 'react';
import Colors from '../Utitlies/Colors';
import Family from '../Utitlies/Family';
import WalletItem from './WalletItem';

const Wallet = ({navigation}) => {
  const [Data, setData] = useState([
    {
      id: 2,
      Name: 'Vishal Kumar',
      transId: 'txn000' + Math.floor(Math.random() * 100000),
      Earning: 200,
    },
    {
      id: 4,
      Name: 'Vishal Kumar',
      transId: 'txn000' + Math.floor(Math.random() * 100000),
      Earning: 800,
    },
    {
      id: 6,
      Name: 'Vishal Kumar',
      transId: 'txn000' + Math.floor(Math.random() * 100000),
      Earning: 1000,
    },
    {
      id: 8,
      Name: 'Vishal Kumar',
      transId: 'txn000' + Math.floor(Math.random() * 100000),
      Earning: 4200,
    },
    {
      id: 10,
      Name: 'Vishal Kumar',
      transId: 'txn000' + Math.floor(Math.random() * 100000),
      Earning: 20,
    },
    {
      id: 8,
      Name: 'Vishal Kumar',
      transId: 'txn000' + Math.floor(Math.random() * 100000),
      Earning: 4200,
    },
    {
      id: 10,
      Name: 'Vishal Kumar',
      transId: 'txn000' + Math.floor(Math.random() * 100000),
      Earning: 20,
    },
    {
      id: 10,
      Name: 'Vishal Kumar',
      transId: 'txn000' + Math.floor(Math.random() * 100000),
      Earning: 20,
    },
    {
      id: 8,
      Name: 'Vishal Kumar',
      transId: 'txn000' + Math.floor(Math.random() * 100000),
      Earning: 4200,
    },
    {
      id: 10,
      Name: 'Vishal Kumar',
      transId: 'txn000' + Math.floor(Math.random() * 100000),
      Earning: 20,
    },
  ]);
  return (
    <View>
      <View
        style={{
          backgroundColor: Colors.primary,
          width: '95%',
          borderRadius: 10,
          alignSelf: 'center',
          marginTop: 10,
          paddingHorizontal: 15,
          paddingVertical: 15,
          height: 150,
        }}>
        <Text
          style={{
            fontSize: 14,
            fontFamily: Family.Medium,
            color: Colors.light,
          }}>
          Your Balance
        </Text>
        <Text
          style={{
            fontSize: 36,
            fontFamily: Family.SemiBold,
            color: Colors.light,
            textAlign: 'left',
          }}>
          ₹ 10000
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: Colors.light,
            paddingVertical: 5,
            width: '35%',
            borderRadius: 5,
            marginTop: 5,
          }}>
          <Text
            style={{
              fontSize: 12,
              fontFamily: Family.Medium,
              color: Colors.primary,
              textAlign: 'center',
            }}>
            Widthraw Now
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{width: '95%', alignSelf: 'center'}}>
        <Text
          style={{fontSize: 16, fontFamily: Family.Medium, color: Colors.gray}}>
          Recent Transactions :
        </Text>
        <FlatList
          data={Data}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => {
            return (
              <WalletItem
                item={item}
                navigation={navigation}
                index={index}
                length={Data.length}
              />
            );
          }}
        />
      </View>
    </View>
  );
};

export default Wallet;

const styles = StyleSheet.create({});
