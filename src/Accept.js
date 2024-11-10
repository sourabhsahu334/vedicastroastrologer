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

const Accept = ({navigation, route}) => {
  const [Accepted, setAccepted] = useState(false);
  const {userId, astrologerDocumentid, AstrologerId, RoomId} = route.params;
  console.log(route.params,"datax");
  const [Declined, setDeclined] = useState(false);
  const [Data, setData] = useState([]);
  const Navigation = useNavigation();

  const Accept = async () => {
    setAccepted(true);
    const response = await fetch(
      `https://www.radicalone.co.in/vedicastro/astrologer.php?method=chatRequest&userId=${userId}`,
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
    console.log('12n');
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
          const {RoomId, AstrologerId, userId, chatStatus} = doc.data();
          navigation.navigate('ChatScreen', {
            chatStatus: chatStatus,
            RoomId: RoomId,
            AstrologerId: AstrologerId,
            userId: userId,
          });
        }
      });
  }, [RoomId]);

  const getProfile = async () => {
    const response = await fetch(
      `https://www.radicalone.co.in/vedicastro/astrologer.php?method=myProfile&userId=${userId}`,
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
            fontFamily: Family.Bold,
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

export default Accept;

const styles = StyleSheet.create({});
