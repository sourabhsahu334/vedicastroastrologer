import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  BackHandler,
  TouchableOpacity,
  Switch,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Header from './component/Header';
import Card from './component/Card';
import Colors from './Utitlies/Colors';
import Family from './Utitlies/Family';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import Global from './Utitlies/Global';
import theme from './utils/theme';
import { sendNotification } from './Acceptpop';

const Home = ({navigation}) => {
  const [isVoice, setisVoice] = useState(false);
  const [isChat, setisChat] = useState(false);
  const [userId, setuserId] = useState(false);
  const [Data, setData] = useState({});
  const [Rate, setRate] = useState('');
  useEffect(()=>{
    console.log('sdf')
  //  sendNotification('crPWf1-CRhaB4FJZviiB-h:APA91bG6mcs29paKg4DhYrkixCr2T89S0ckPxmH2wvVAIKkzG-vXi1r-PLDzt6CB2SijCj_2edwfBVgIRHGOS1BznlfQlcrPst19yz0TzGcUaGfWxRwhV4s','','','','','',)
  },[])
  const toggleChat = () => {
    fetch(
      Global.BASE_URL +
        `onlineStatus&status=chat_status&type=${
          isChat ? 'offline' : 'online'
        }&astrologerId=${userId}`,
    );
    setisChat(previousState => !previousState);
  };

  const toggleVoice = () => {
    fetch(
      Global.BASE_URL +
        `onlineStatus&status=call_status&type=${
          isVoice ? 'offline' : 'online'
        }&astrologerId=${userId}`,
    );
    setisVoice(previousState => !previousState);
  };

  const [ isVideo,setIsVideo]=useState(false)
  const toggleVedio = () => {
    fetch(
      Global.BASE_URL +
        `onlineStatus&status=video_status&type=${
          isVideo ? 'offline' : 'online'
        }&astrologerId=${userId}`,
    ).then((res)=>console.log(res?.data)).catch((re)=>console.log(re))
    setIsVideo(previousState => !previousState);
  };

  const Navigation = useNavigation();
  useEffect(() => {
    const unsuscribe = Navigation.addListener('beforeRemove', e => {
      e.preventDefault();
      BackHandler.exitApp();
    });
    return unsuscribe;
  }, [Navigation]);
  
  const getData = async () => {
    // console.log('sss')
    AsyncStorage.getItem('userId').then(val => {
      setuserId(val);
      // console.log(val)
      const now = firestore.Timestamp.now();
      const ts = firestore.Timestamp.fromMillis(now.toMillis() - 30000);
      const querySnapshot = firestore()
        .collection('astrologer')
        .doc(val)
        .collection('connection')
        .where('createdAt', '>', ts);
      // console.log(querySnapshot?.onSnapshot);
      querySnapshot.onSnapshot(querySnapshot => {
        querySnapshot.forEach(doc => {
          console.log('Document data:', doc.data());
        });
      }, error => {
        console.error('Error fetching documents: ', error);
      });
      
      querySnapshot.onSnapshot(snapshot => {
        snapshot?.docs.map(value => {
          const {userId, id, AstrologerId, RoomId} = value.data();
          console.log(value.data(),"sd")
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
  };

  const getRate = () => {
    AsyncStorage.getItem('userId').then(val => {
      fetch(Global.BASE_URL + `homeStatus&astrologerId=${val}`).then(res => {
        res.json().then(data => {
          console.log(data);
          setRate(data.response.rate);
          setisChat(data.response.chat == 'offline' ? false : true);
          setisVoice(data.response.call == 'offline' ? false : true);
          setIsVideo(data.response.video == 'offline' ? false : true)

        });
      });
    });
  };

  useEffect(() => {
    getData();
    getRate();
  }, []);

  useEffect(() => {
    AsyncStorage.getItem('userId').then(val => {
      const now = firestore.Timestamp.now();
      const ts = firestore.Timestamp.fromMillis(now.toMillis() - 30000);
      firestore()
        .collection('call')
        .where('AstrologerId', '==', val)
        .onSnapshot(documentSnapshot => {
          documentSnapshot?.docs.map(value => {
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
            backgroundColor: "#874827",
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
                color: "black",
                textAlign: 'center',
              }}>
              Show More
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            backgroundColor: Colors.light,
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
              color: theme.colors.background,
              marginTop: 5,
              textDecorationLine: 'underline',
              marginLeft: 10,
            }}>
            Online Controls:
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '95%',
              alignSelf: 'center',
              marginVertical: 10,
            }}>
            <Text
              style={{
                fontSize: 14,
                fontFamily: Family.Medium,
                color: Colors.gray,
              }}>
              Chat (₹ {Rate}/min)
            </Text>
            <Switch
              trackColor={{false: '#767577', true: '#009378'}}
              thumbColor={'#FFFFFF'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleChat}
              value={isChat}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '95%',
              alignSelf: 'center',
              marginVertical: 10,
            }}>
            <Text
              style={{
                fontSize: 14,
                fontFamily: Family.Medium,
                color: Colors.gray,
              }}>
              Voice Call (₹ {Rate}/min)
            </Text>
            <Switch
              trackColor={{false: '#767577', true: '#009378'}}
              thumbColor={'#FFFFFF'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleVoice}
              value={isVoice}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '95%',
              alignSelf: 'center',
              marginVertical: 10,
            }}>
            <Text
              style={{
                fontSize: 14,
                fontFamily: Family.Medium,
                color: Colors.gray,
              }}>
              Video Call (₹ {Rate}/min)
            </Text>
            <Switch
              trackColor={{false: '#767577', true: '#009378'}}
              thumbColor={'#FFFFFF'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleVedio}
              value={isVideo}
            />
          </View>
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
