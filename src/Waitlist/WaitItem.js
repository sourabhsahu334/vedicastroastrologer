import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ToastAndroid,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import Colors from '../Utitlies/Colors';
import Family from '../Utitlies/Family';
import Global from '../Utitlies/Global';
import {UserAuthContext} from '../Context/UserAuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import theme from '../utils/theme';
import { globalStyles } from '../utils/GlobalStyles';
import { http } from '../utils/AxiosInstance';
import { sendNotification } from '../Acceptpop';
import axios from 'axios';

const WaitItem = ({item, navigation, getDoucumentId, getWaitList}) => {
  const {User} = useContext(UserAuthContext);
  const [data,setData]=useState();
  const fetch = async()=>{
    try {
      const {data} = await axios.get(
        Global.BASE_URL + `myProfiles&astrologerId=${User}`,
      );
      // const result = await response.json();
      setData(data.response);
    } catch (error) {
      cons
    }
  }
  useEffect(()=>{
  
  },[])
  // console.log(item?.roomId)

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

  const onaccept = value => {
    AsyncStorage.getItem('userId').then(val => {
      const now = firestore.Timestamp.now();
      const ts = firestore.Timestamp.fromMillis(now.toMillis() - 30000);
      const querySnapshot = firestore()
        .collection('astrologer')
        .doc(val)
        .collection('connection')
        .where('createdAt', '>', ts);
      querySnapshot.onSnapshot(snapshot => {
        snapshot.docs.map(value => {
          const {userId, id, AstrologerId, RoomId} = value.data();
          if (value.data() !== null) {
            navigation.navigate('Accept', {
              userId: value,
              astrologerDocumentid: id,
              AstrologerId: AstrologerId,
              RoomId: RoomId,
            });
          }
        });
      });
    });
  };
  const viewkundli = async () => {
   try {
    const response = await http.get('/',{params:{
      method:"viewKundli",
      roomId:item.roomId
    }})
    const data = response.data;
    console.log(response.data)
    navigation.navigate('ViewKundli', {
      name: data.response.name,
      gender: data.response.gender,
      dob: data.response.dob,
      tob: data.response.tob,
      pob: data.response.pob,
      lat: data.response.lat,
      lon: data.response.lon,
    });
   } catch (error) {
    console.log(error,"kun ivew");
   }
  };

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
        <Text
          style={{fontSize: 14, fontFamily: Family.Medium, color: Colors.gray}}>
          Type : {item.type}
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
              // getDoucumentId(item.userId);
              navigation.navigate('AcceptPop',{loading:true})
              sendNotification(item.userToken, item.roomId,User,item.astrologerToken,item.type||'call',null,data?.name);
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
        <TouchableOpacity onPress={()=>viewkundli()} style={{width:"95%",backgroundColor:theme.colors.Yellow,justifyContent:'center',alignItems:'center',paddingVertical:5,marginTop:10,borderRadius:5}}>
          <Text style={[globalStyles.text2]}>View Kundali</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WaitItem;

const styles = StyleSheet.create({});
