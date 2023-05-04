import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  BackHandler,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Header from './component/Header';
import Card from './component/Card';
import Colors from './Utitlies/Colors';
import Family from './Utitlies/Family';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';

const Home = ({navigation}) => {
  const Navigation = useNavigation();
  useEffect(() => {
    const unsuscribe = Navigation.addListener('beforeRemove', e => {
      e.preventDefault();
      BackHandler.exitApp();
    });
    return unsuscribe;
  }, [Navigation]);

  const getData = async () => {
    fetch(
      `https://astrowisdom.in/api/astrologer.php?method=checkAvability&astrologerId=1`,
    ).then(response => {
      response.json().then(parsedData => {
        if (parsedData.response.waitTime == 0) {
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
                    userId: userId,
                    astrologerDocumentid: id,
                    AstrologerId: AstrologerId,
                    RoomId: RoomId,
                  });
                }
              });
            });
          });
        }
      });
    });
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    AsyncStorage.getItem('userId').then(val => {
      const now = firestore.Timestamp.now();
      const ts = firestore.Timestamp.fromMillis(now.toMillis() - 30000);
      firestore()
        .collection('call')
        .where('AstrologerId', '==', val)
        .onSnapshot(documentSnapshot => {
          documentSnapshot.docs.map(value => {
            const {userId, id, AstrologerId, RoomId, status, createdAt} =
              value.data();
            if (createdAt > ts) {
              navigation.navigate('CallAccept', {
                userId: userId,
                id: id,
                AstrologerId: AstrologerId,
                RoomId: RoomId,
                status: status,
              });
            }
          });
        });
    });
  }, []);

  return (
    <>
      <Header navigation={navigation} />
      <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
        <View
          style={{
            backgroundColor: Colors.secondary,
            width: '95%',
            alignSelf: 'center',
            marginTop: 10,
            paddingHorizontal: 10,
            borderRadius: 10,
            paddingVertical: 10,
          }}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: Family.Regular,
              color: Colors.light,
              marginTop: 5,
              textDecorationLine: 'underline',
              marginLeft: 10,
            }}>
            Important GuideLines:
          </Text>
          <View style={{width: '95%', alignSelf: 'center', marginTop: 10}}>
            <Text
              style={{
                fontSize: 13,
                fontFamily: Family.Medium,
                color: Colors.light,
              }}>
              1. Never be rude to any customer.
            </Text>
            <Text
              style={{
                fontSize: 13,
                fontFamily: Family.Medium,
                color: Colors.light,
              }}>
              2. Never share your personal details with any customer.
            </Text>
            <Text
              style={{
                fontSize: 13,
                fontFamily: Family.Medium,
                color: Colors.light,
              }}>
              3. Daily online time must be more than 8 hours, on an average,
            </Text>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: Colors.light,
              paddingVertical: 5,
              width: '27%',
              borderRadius: 5,
              marginTop: 15,
              marginLeft: 10,
            }}
            onPress={() => navigation.navigate('Rules')}>
            <Text
              style={{
                fontSize: 12,
                fontFamily: Family.Medium,
                color: Colors.primary,
                textAlign: 'center',
              }}>
              Show More
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: '98%',
            alignSelf: 'center',
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginTop: 10,
          }}>
          <Card
            name={'Call'}
            img={require('../assets/images/telephone.png')}
            action={() => navigation.navigate('CallHistory')}
          />
          <Card
            name={'Chat'}
            img={require('../assets/images/chat.png')}
            action={() => navigation.navigate('ChatHistory')}
          />
          {/* <Card
            name={'Video Call'}
            img={require('../assets/images/video-camera.png')}
            action={() => navigation.navigate('VideoCall')}
          /> */}
          <Card
            name={'Wait List'}
            img={require('../assets/images/waiting.png')}
            action={() => navigation.navigate('Waitlist')}
          />
          {/* <Card
            name={'Earning'}
            img={require('../assets/images/salary.png')}
            action={() => navigation.navigate('Earning')}
          /> */}
          <Card
            name={'Wallet'}
            img={require('../assets/images/wallet.png')}
            action={() => navigation.navigate('Wallet')}
          />
          {/* <Card
            name={'Offers'}
            img={require('../assets/images/gift.png')}
            action={() => navigation.navigate('Offers')}
          />
          <Card
            name={'Reports'}
            img={require('../assets/images/report.png')}
            action={() => navigation.navigate('Report')}
          /> */}
          <Card
            name={'Followers'}
            img={require('../assets/images/followers.png')}
            action={() => navigation.navigate('Followers')}
          />
          <Card
            name={'Review'}
            img={require('../assets/images/rating.png')}
            action={() => navigation.navigate('Review')}
          />
          <Card
            name={'Profile'}
            img={require('../assets/images/man.png')}
            action={() => navigation.navigate('Profile')}
          />
          <Card
            name={'Trainig Videos'}
            img={require('../assets/images/video.png')}
            action={() => navigation.navigate('Trianing')}
          />
        </View>
      </ScrollView>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({});
