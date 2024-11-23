import React, { useEffect } from 'react';
import {StyleSheet, Text, View, PermissionsAndroid} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './src/Home';
import Splash from './src/MainScreen/Splash';
import Login from './src/MainScreen/Login';
import messaging from '@react-native-firebase/messaging';

import Onboarding from './src/MainScreen/Onboarding';
import Support from './src/Support';
import CallHistory from './src/call/CallHistory';
import ChatHistory from './src/Chat/ChatHistory';
import Waitlist from './src/Waitlist/Waitlist';
import Earning from './src/Earning/Earning';
import Wallet from './src/Wallet/Wallet';
import Offers from './src/Offers/Offers';
import Report from './src/Report/Report';
import Followers from './src/Followers/Followers';
import Review from './src/Rating/Review';
import Profile from './src/Profile/Profile';
import Trianing from './src/Training/Training';
import Rules from './src/Rules';
import ChatScreen from './src/Chat/ChatScreen';
import VideoCall from './src/Videocall/VideoCall';
import Colors from './src/Utitlies/Colors';
import Family from './src/Utitlies/Family';
import {UserAuthContextProvider} from './src/Context/UserAuthContext';
import OneSignal from 'react-native-onesignal';
import Accept from './src/Accept';
import EditProfile from './src/Profile/EditProfile';
import ViewKundli from './src/ViewKundli';
import VoiceCall from './src/VoiceCall';
import CallAccept from './src/CallAccept';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Acceptpop from './src/Acceptpop';
import CallCoket from './src/Callcoket';
import VideoSocket from './src/Sockerio';
export const navigationRef = React.createRef();

export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}
const App = () => {
  OneSignal.setAppId('f3156d4f-7de2-4c6b-8aaf-79894c9b3f59');

  OneSignal.promptForPushNotificationsWithUserResponse(response => {
    console.log(response);
  });

  
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  // useEffect(()=>{
  //   const fet=async()=>{

  //   try {
  //     const serverKey = 'AAAAR18Kj9s:APA91bGkbFCP3r-NegKWvEph0mRtZJ3yANwXPw-TMIWFWSGmkloX7CGbR9GwjSjWgOtQpCieHKIpX416vmiXmjqZ_NTcwi1lhPIT48Nq5hNOEGwtApxqPiZh0QZWUvpxLQaHWsYChxT7';

  //     const notification = {
  //       title: 'Your notification title',
  //       body: 'Your notification body',
  //       data:{id:1}
  //     };
      
  //     // Device token or topic (to send to multiple devices)
  //     const recipient = 'evJz7eSwR0OD3YHDd_MpJu:APA91bHIcShsNbpOcviYJoKz-lVo4GZUPQkgPkc8mtBgqQM7FovHA56GEL_ufd3DsGEeeahYgHKCxLa--6MtsGdAgxRqklxkSvFYvGd9uLKM7fltH5OamRhS1AZ-nWSH5SJlywjw1srC';
      
  //     // HTTP request headers
  //     const headers = {
  //       'Content-Type': 'application/json',
  //       'Authorization': `key=${serverKey}`,
  //     };
      
  //     // HTTP request body
  //     const data = {
  //       to: recipient,
  //       notification: notification,
  //     };
      
  //     // Send HTTP POST request to FCM endpoint
  //     axios.post('https://fcm.googleapis.com/fcm/send', data, { headers })
  //       .then(response => {
  //         console.log('Notification sent successfully:', response.data);
  //       })
  //       .catch(error => {
  //         console.error('Error sending notification:', error);
  //       });
  //   } catch (error) {
  //     console.log("eer",error)
  //   }
  //   }
  //   fet()
  // },[])


  useEffect(() => {
    // notifee.onForegroundEvent(async ({ type, detail }) => {
    //   // if (type === EventType.ACTION_PRESS && detail.pressAction.id) {
    //    console.log('ssss')
    //   // }
    // });
    messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', remoteMessage);
      AsyncStorage.setItem(remoteMessage?.data?.roomId,JSON.stringify(remoteMessage?.data))
      navigate('AcceptPop',{docid:remoteMessage?.data?.id,userId:remoteMessage?.data?.userId,roomId:remoteMessage?.data?.roomId,token:remoteMessage?.data?.myToken,type:remoteMessage?.data?.type})
      // You can show an alert or process the message here
    });
    messaging().onNotificationOpenedApp(remoteMessage => {
      // navigate("Profile")
      AsyncStorage.setItem(remoteMessage?.data?.roomId,JSON.stringify(remoteMessage?.data))

      console.log('Notification caused app to open from background state',remoteMessage);
      navigate('AcceptPop',{docid:remoteMessage?.data?.id,userId:remoteMessage?.data?.userId,roomId:remoteMessage?.data?.roomId,token:remoteMessage?.data?.myToken,type:remoteMessage?.data?.type})
      // alert('new meeage');
    });

          messaging().setBackgroundMessageHandler(async remoteMessage => {
            AsyncStorage.setItem(remoteMessage?.data?.roomId,JSON.stringify(remoteMessage?.data))

            navigate('AcceptPop',{docid:remoteMessage?.data?.id,userId:remoteMessage?.data?.userId,roomId:remoteMessage?.data?.roomId,token:remoteMessage?.data?.myToken,type:remoteMessage?.data?.type})

      });
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          // alert(`quite mode message ${JSON.stringify(remoteMessage)}`);
          navigate('AcceptPop',{docid:remoteMessage?.data?.id,userId:remoteMessage?.data?.userId,roomId:remoteMessage?.data?.roomId,token:remoteMessage?.data?.myToken,type:remoteMessage?.data?.type})
          navigate('AcceptPop',{docid:remoteMessage?.data?.id,userId:remoteMessage?.data?.userId,roomId:remoteMessage?.data?.roomId,token:remoteMessage?.data?.myToken,type:remoteMessage?.data?.type})

          // navigate("Profile")
          // alert('new');
        }
        // setLoading(false);
      });

    const fetch = async () => {
      console.log('ffff')
      // console.log("fes")

  

      const oldtoken = await AsyncStorage.getItem('token');
      // console.log("token",oldtoken)
      if (!oldtoken) {
        const fcmtoekn = await messaging().getToken();
        if (fcmtoekn) {
          try {
            console.log('token..................', fcmtoekn);
            AsyncStorage.setItem('token', fcmtoekn);

            // const db = getDatabase();
            // const userdeviceidRef = ref(db, `devicesid/`);
            // console.log(userdeviceidRef);
            // try {
            //   push(userdeviceidRef, fcmtoekn)
            //   .then((newRef) => {
            //     console.log('String pushed successfully with key:', newRef.key);
            //   })
            //   .catch((error) => {
            //     alert("Restart the App and Clear the Cache")
            //   });
            // } catch (error) {
            //   console.error('Error pushing string:', error);
            // }
          } catch (error) {
            alert(error);
          }
        }
      } else {
        // dispactch(setFcmToken(oldtoken));
        console.log(
          'oldtoken.........................................................................',
          oldtoken,
          // currentroute,
        );
      }
    };
    requestUserPermission();
    fetch();
  }, []);

  OneSignal.setNotificationWillShowInForegroundHandler(
    notificationReceivedEvent => {
      console.log(
        'OneSignal: notification will show in foreground:',
        notificationReceivedEvent,
      );
      let notification = notificationReceivedEvent.getNotification();
      console.log('notification: ', notification);
      const data = notification.additionalData;
      console.log('additionalData: ', data);
      // Complete with null means don't show a notification.
      notificationReceivedEvent.complete(notification);
    },
  );

  //Method for handling notifications opened
  OneSignal.setNotificationOpenedHandler(notification => {
    console.log('OneSignal: notification opened:', notification);
  });
  const Stack = createNativeStackNavigator();

  const granted = PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.CAMERA,
    PermissionsAndroid.RECORD_AUDIO,
  );
  granted
    .then(data => {
      if (!data) {
        const permissions = [
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          PermissionsAndroid.PERMISSIONS.CAMERA,
        ];
        PermissionsAndroid.requestMultiple(permissions);
      }
    })
    .catch(err => {
      console.log(err.toString());
    });
    useEffect(()=>{
      const fetch = async()=>{
         try {
          const data = await AsyncStorage.getItem('token')
          console.log(data,'token')
         } catch (error) {
          console.log(error)
         }
      }
      fetch()
    },[])

  return (
    <UserAuthContextProvider>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerTitleStyle: {
              fontSize: 16,
              fontFamily: Family.Medium,
              color: Colors.dark,
            },
            headerTintColor: Colors.primary,
          }}>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="VoiceCall"
            component={VoiceCall}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="CallAccept"
            component={CallAccept}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Splash"
            component={Splash}
            options={{headerShown: false}}
          />
                      <Stack.Screen
            name="CallScreen"
            component={CallCoket}
            options={{headerShown: false}}
          />
                 <Stack.Screen
            name="VideoScreen"
            component={VideoSocket}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Accept"
            component={Accept}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
           <Stack.Screen
            name="AcceptPop"
            component={Acceptpop}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Onboarding"
            component={Onboarding}
            options={{headerShown: false}}
          />
          <Stack.Screen name="Support" component={Support} />
          <Stack.Screen name="ChatHistory" component={ChatHistory} />
          <Stack.Screen name="CallHistory" component={CallHistory} />
          <Stack.Screen name="Earning" component={Earning} />
          <Stack.Screen name="Waitlist" component={Waitlist} />
          <Stack.Screen name="Offers" component={Offers} />
          <Stack.Screen name="Report" component={Report} />
          <Stack.Screen name="Followers" component={Followers} />
          <Stack.Screen name="Review" component={Review} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Wallet" component={Wallet} />
          <Stack.Screen name="Trianing" component={Trianing} />
          <Stack.Screen name="Rules" component={Rules} />
          <Stack.Screen name="EditProfile" component={EditProfile} />
          <Stack.Screen name="ViewKundli" options={{headerShown: false}} component={ViewKundli} />
          <Stack.Screen
            name="ChatScreen"
            component={ChatScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen name="VideoCall" component={VideoCall} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserAuthContextProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
