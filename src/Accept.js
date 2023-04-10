import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import database from '@react-native-firebase/database';
import Colors from './Utitlies/Colors';
import Family from './Utitlies/Family';

const Accept = ({navigation, route}) => {
  const {userId} = route.params;
  const [RoomId, setRoomId] = useState(0);

  const Accept = async () => {
    const response = await fetch(
      `https://sellpe.in/astro/api/astrologer.php?method=chatRequest&userId=${userId}`,
    );
    const RoomId = 'txn' + Math.floor(Math.random() * 100000000);
    console.log(RoomId);
    setRoomId(RoomId);
    database().ref(`/users/${userId}`).set({
      userId: userId,
      RoomId: RoomId,
    });
  };

  useEffect(() => {
    database()
      .ref(`/Room/${RoomId}/`)
      .on('value', snapshot => {
        if (snapshot.val() !== null) {
          navigation.navigate('ChatScreen', {
            RoomId: RoomId,
          });
        }
      });
  }, [RoomId]);

  return (
    <>
      <View
        style={{flex: 1, alignItems: 'center', backgroundColor: Colors.light}}>
        <Text style={{fontSize: 20, marginTop: 50, fontFamily: Family.Bold}}>
          {' '}
          Shristi Deshmukh
        </Text>
        <View>
          <Image
            source={{
              uri: 'https://images.pexels.com/photos/1446161/pexels-photo-1446161.jpeg?auto=compress&cs=tinysrgb&w=600',
            }}
            style={{
              width: 150,
              marginTop: 50,
              height: 150,
              borderRadius: 75,
              resizeMode: 'contain',
            }}
          />
        </View>
        <Text
          style={{fontSize: 20, marginTop: 50, fontFamily: Family.SemiBold}}>
          {' '}
          Calling you......
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          position: 'absolute',
          bottom: 20,
          width: '100%',
          paddingHorizontal: 25,
        }}>
        <TouchableOpacity
          onPress={Accept}
          style={{
            paddingHorizontal: 50,
            paddingVertical: 15,
            backgroundColor: 'red',
          }}>
          <Text
            style={{
              color: Colors.light,
              fontSize: 18,
              fontFamily: Family.Regular,
            }}>
            Reject
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={Accept}
          style={{
            paddingHorizontal: 50,
            paddingVertical: 15,
            backgroundColor: 'green',
          }}>
          <Text
            style={{
              color: Colors.light,
              fontSize: 18,
              fontFamily: Family.Regular,
            }}>
            Accept
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Accept;

const styles = StyleSheet.create({});
