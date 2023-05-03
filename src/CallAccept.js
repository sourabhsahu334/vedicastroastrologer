import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Colors from './Utitlies/Colors';
import Family from './Utitlies/Family';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import Global from './Utitlies/Global';

const CallAccept = ({navigation, route}) => {
  const [Accepted, setAccepted] = useState(false);
  const {userId, id, RoomId, status} = route.params;
  const [Data, setData] = useState([]);

  useEffect(() => {
    firestore()
      .collection('call')
      .where('id', '==', id)
      .onSnapshot(documentSnapshot => {
        documentSnapshot.docs.map(value => {
          const {userId, id, AstrologerId, RoomId, status} = value.data();
          if (status == 'declined') {
            navigation.navigate('Home');
          }
        });
      });
  }, []);

  const Accept = () => {
    firestore()
      .collection('call')
      .doc(id)
      .update({
        status: 'accepted',
      })
      .then(() => {
        navigation.navigate('VoiceCall', {
          RoomId,
          userId,
          name: Data.name,
        });
      });
  };

  const Reject = () => {
    firestore()
      .collection('call')
      .doc(id)
      .update({
        status: 'declined',
      })
      .then(() => {
        navigation.goBack();
      });
  };

  const getProfile = async () => {
    const response = await fetch(
      `https://sellpe.in/astro/api/activity.php?method=myProfile&userId=${userId}`,
    );
    const data = await response.json();
    setData(data.response);
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <>
      <View
        style={{flex: 1, alignItems: 'center', backgroundColor: Colors.light}}>
        <Text
          style={{
            fontSize: 20,
            marginTop: 50,
            fontFamily: Family.SemiBold,
            color: Colors.gray,
          }}>
          {Data.name}
        </Text>
        <View>
          <Image
            source={{
              uri:
                Data.photo == null
                  ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTElwewMRorrdl7m4am3aRv2_fBdBb8CbgfgMYMjBM&s'
                  : Data.photo,
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
          style={{
            fontSize: 20,
            marginTop: 50,
            fontFamily: Family.SemiBold,
            color: Colors.gray,
          }}>
          {Accepted
            ? 'Ringing......'
              ? Declined
              : 'Call Declined'
            : 'Incoming Chat Request'}
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: Accepted ? 'center' : 'space-between',
          position: 'absolute',
          bottom: 40,
          width: '100%',
          paddingHorizontal: 30,
        }}>
        <TouchableOpacity
          onPress={Reject}
          style={{
            backgroundColor: 'red',
            paddingVertical: 15,
            paddingHorizontal: 35,
            borderRadius: 35,
          }}>
          <Text style={{color: '#fff', fontSize: 14, fontWeight: '600'}}>
            Decline
          </Text>
        </TouchableOpacity>
        {Accepted ? null : (
          <TouchableOpacity
            onPress={Accept}
            style={{
              backgroundColor: 'green',
              paddingVertical: 15,
              paddingHorizontal: 35,
              borderRadius: 35,
            }}>
            <Text style={{color: '#fff', fontSize: 14, fontWeight: '600'}}>
              Accept
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </>
  );
};

export default CallAccept;

const styles = StyleSheet.create({});
