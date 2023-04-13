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

const Accept = ({navigation, route}) => {
  const [Accepted, setAccepted] = useState(false);
  const {userId, astrologerDocumentid, AstrologerId} = route.params;
  const [RoomId, setRoomId] = useState(0);
  const [Data, setData] = useState([]);
  const Navigation = useNavigation();

  const Accept = async () => {
    setAccepted(true);
    const RoomId = 'txn' + Math.floor(Math.random() * 100000000);
    setRoomId(RoomId);
    const response = await fetch(
      `https://sellpe.in/astro/api/astrologer.php?method=chatRequest&userId=${userId}`,
    );
    const collectionset = firestore()
      .collection('user')
      .doc(userId)
      .collection('connection');
    const newRef = collectionset.doc();
    newRef.set({
      userId: userId,
      RoomId: RoomId,
      id: newRef.id,
      astrologerDocumentid: astrologerDocumentid,
      AstrologerId: AstrologerId,
      createdAt: firestore.FieldValue.serverTimestamp(),
    });
  };

  const Reject = () => {
    AsyncStorage.getItem('userId').then(value => {
      firestore()
        .collection('astrologer')
        .doc(AstrologerId)
        .collection('connection')
        .doc(astrologerDocumentid)
        .delete()
        .then(() => {
          navigation.navigate('Home');
        });
    });
  };

  useEffect(() => {
    const unsuscribe = Navigation.addListener('beforeRemove', e => {
      Reject();
    });
    return unsuscribe;
  }, [Navigation]);

  useEffect(() => {
    firestore()
      .collection('Room')
      .doc(RoomId)
      .onSnapshot(doc => {
        if (doc.data() !== undefined) {
          const {RoomId} = doc.data();
          navigation.navigate('ChatScreen', {
            RoomId,
          });
        }
      });
  }, [RoomId]);

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
        <Text style={{fontSize: 20, marginTop: 50, fontFamily: Family.Bold}}>
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
          style={{fontSize: 20, marginTop: 50, fontFamily: Family.SemiBold}}>
          {Accepted ? 'Ringing......' : 'Requested for chat......'}
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: Accepted ? 'center' : 'space-between',
          position: 'absolute',
          bottom: 40,
          width: '100%',
          paddingHorizontal: 50,
        }}>
        <TouchableOpacity onPress={Reject}>
          <Image
            source={require('../assets/images/red-call.png')}
            style={{width: 60, height: 60, transform: [{rotate: '137deg'}]}}
          />
        </TouchableOpacity>
        {Accepted ? null : (
          <TouchableOpacity onPress={Accept}>
            <Image
              source={require('../assets/images/phone-call.png')}
              style={{width: 60, height: 60}}
            />
          </TouchableOpacity>
        )}
      </View>
    </>
  );
};

export default Accept;

const styles = StyleSheet.create({});
