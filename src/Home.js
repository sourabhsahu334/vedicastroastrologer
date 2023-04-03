import {StyleSheet, Text, View, ScrollView, BackHandler} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import Header from './component/Header';
import Card from './component/Card';
import Colors from './Utitlies/Colors';

const Home = ({navigation}) => {
  const Navigation = useNavigation();

  useEffect(() => {
    const unsuscribe = Navigation.addListener('beforeRemove', e => {
      e.preventDefault();
      BackHandler.exitApp();
    });
    return unsuscribe;
  }, [Navigation]);

  return (
    <>
      <Header navigation={navigation} />
      <ScrollView style={{flex: 1}}>
        <View style={{backgroundColor: Colors.lightdark}}>
          <Text>Important GuideLines</Text>
        </View>
        <View
          style={{
            width: '95%',
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
          <Card
            name={'Wait List'}
            img={require('../assets/images/waiting.png')}
            action={() => navigation.navigate('Waitlist')}
          />
          <Card
            name={'Earning'}
            img={require('../assets/images/salary.png')}
            action={() => navigation.navigate('Earning')}
          />
          <Card
            name={'Wallet'}
            img={require('../assets/images/wallet.png')}
            action={() => navigation.navigate('Wallet')}
          />
          <Card
            name={'Offers'}
            img={require('../assets/images/gift.png')}
            action={() => navigation.navigate('Offers')}
          />
          <Card
            name={'Reports'}
            img={require('../assets/images/report.png')}
            action={() => navigation.navigate('Report')}
          />
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
