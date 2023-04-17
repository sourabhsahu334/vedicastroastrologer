import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import Colors from '../Utitlies/Colors';
import Family from '../Utitlies/Family';
import EarningItem from './EarningItem';

const Earning = ({navigation}) => {
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
    <View style={{flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '95%',
          alignSelf: 'center',
          marginVertical: 20,
        }}>
        <View
          style={{
            backgroundColor: Colors.secprimary,
            width: '47%',
            borderRadius: 10,
            height: 150,
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: 24,
              fontFamily: Family.SemiBold,
              textAlign: 'center',
              color: Colors.light,
            }}>
            ₹ 10000
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontFamily: Family.Medium,
              textAlign: 'center',
              color: Colors.light,
            }}>
            Today's Earning
          </Text>
        </View>
        <View
          style={{
            backgroundColor: Colors.primary,
            width: '47%',
            borderRadius: 10,
            height: 150,
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: 24,
              fontFamily: Family.SemiBold,
              textAlign: 'center',
              color: Colors.light,
            }}>
            ₹ 10000
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontFamily: Family.Medium,
              textAlign: 'center',
              color: Colors.light,
            }}>
            Monthly Earning
          </Text>
        </View>
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
              <EarningItem
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

export default Earning;

const styles = StyleSheet.create({});
