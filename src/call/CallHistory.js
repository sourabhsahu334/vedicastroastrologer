import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import Family from '../Utitlies/Family';
import Colors from '../Utitlies/Colors';
import CallItem from './CallItem';
import Global from '../Utitlies/Global';
import {UserAuthContext} from '../Context/UserAuthContext';

const CallHistory = ({navigation}) => {
  const {User} = useContext(UserAuthContext);
  const [Data, setData] = useState([]);

  const getCallHistory = async () => {
    const response = await fetch(
      Global.BASE_URL + `viewCallHistory&astrologerId=${User}`,
    );
    const result = await response.json();
    setData(result.response);
  };

  useEffect(() => {
    getCallHistory();
  }, []);

  return (
    <View style={{flex: 1}}>
      <View style={{width: '95%', alignSelf: 'center', marginVertical: 10}}>
        <FlatList
          data={Data}
          renderItem={({item, index}) => {
            return <CallItem item={item} navigation={navigation} />;
          }}
        />
      </View>
    </View>
  );
};

export default CallHistory;

const styles = StyleSheet.create({});
