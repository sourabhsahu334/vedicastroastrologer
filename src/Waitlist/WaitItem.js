import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ToastAndroid,
} from 'react-native';
import React, {useContext} from 'react';
import Colors from '../Utitlies/Colors';
import Family from '../Utitlies/Family';
import Global from '../Utitlies/Global';
import {UserAuthContext} from '../Context/UserAuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';

const WaitItem = ({item, navigation, getDoucumentId, getWaitList}) => {
  const {User} = useContext(UserAuthContext);

  const Reject = async chatId => {
    const response = await fetch(
      Global.BASE_URL + `rejectWaitlist&chatId=${chatId}&astrologerId=${User}`,
    );
    const data = await response.json();
    if (data.response.status == 1) {
      ToastAndroid.show('Request has been declined.', ToastAndroid.SHORT);
    }
    getWaitList();
  };

  // const onaccept = value => {
  //   AsyncStorage.getItem('userId').then(val => {
  //     const now = firestore.Timestamp.now();
  //     const ts = firestore.Timestamp.fromMillis(now.toMillis() - 30000);
  //     const querySnapshot = firestore()
  //       .collection('astrologer')
  //       .doc(val)
  //       .collection('connection')
  //       .where('createdAt', '>', ts);
  //     querySnapshot.onSnapshot(snapshot => {
  //       snapshot.docs.map(value => {
  //         const {userId, id, AstrologerId, RoomId} = value.data();
  //         if (value.data() !== null) {
  //           navigation.navigate('Accept', {
  //             userId: value,
  //             astrologerDocumentid: id,
  //             AstrologerId: AstrologerId,
  //             RoomId: RoomId,
  //           });
  //         }
  //       });
  //     });
  //   });
  // };

  return (
    <View
      style={{
        backgroundColor: Colors.light,
        borderRadius: 5,
        padding: 10,
        shadowOffset: 5,
        elevation: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 5,
      }}>
      <View>
        <Text
          style={{fontSize: 14, fontFamily: Family.Medium, color: Colors.gray}}>
          Name: {item.name}
        </Text>
        <Text
          style={{fontSize: 14, fontFamily: Family.Medium, color: Colors.gray}}>
          Time : {item.date}
        </Text>
        <Text
          style={{fontSize: 14, fontFamily: Family.Medium, color: Colors.gray}}>
          Status : {item.status}
        </Text>
        <View
          style={{
            position: 'absolute',
            top: 10,
            right: 30,
          }}>
          <Image
            source={require('../../assets/images/sand-clock.png')}
            style={{
              width: 30,
              height: 30,
              resizeMode: 'contain',
            }}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '95%',
          }}>
          <TouchableOpacity
            style={{
              backgroundColor: Colors.secprimary,
              paddingVertical: 5,
              width: '45%',
              borderRadius: 5,
              marginTop: 15,
            }}
            onPress={() => Reject(item.chatId)}>
            <Text
              style={{
                fontSize: 14,
                fontFamily: Family.Medium,
                color: Colors.gray,
                color: Colors.light,
                textAlign: 'center',
              }}>
              Decline
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: Colors.primary,
              paddingVertical: 5,
              width: '45%',
              borderRadius: 5,
              marginTop: 15,
            }}
            onPress={() => {
              getDoucumentId(item.userId);
              // onaccept(item.userId);
            }}>
            <Text
              style={{
                fontSize: 14,
                fontFamily: Family.Medium,
                color: Colors.gray,
                color: Colors.light,
                textAlign: 'center',
              }}>
              Start
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default WaitItem;

const styles = StyleSheet.create({});
