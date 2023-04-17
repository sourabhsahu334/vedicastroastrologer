import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Alert,
  BackHandler,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Family from '../Utitlies/Family';
import Colors from '../Utitlies/Colors';
import WaitItem from './WaitItem';

const Waitlist = ({navigation}) => {
  const [Data, setData] = useState([
    {
      name: 'Vishal',
      id: 2,
      Time: '03/04/2022',
      OrderId: 'txn000' + Math.floor(Math.random() * 100000),
      rate: '6.60',
      Status: 'Progress',
      totalAmout: 50,
    },
  ]);

  return (
    <View style={{flex: 1}}>
      <View style={{width: '95%', alignSelf: 'center', marginVertical: 10}}>
        <FlatList
          data={Data}
          renderItem={({item, index}) => {
            return <WaitItem item={item} navigation={navigation} />;
          }}
        />
      </View>
    </View>
  );
};

export default Waitlist;

const styles = StyleSheet.create({});
