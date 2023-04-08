import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import {PermissionsAndroid} from 'react-native';

export async function requestUserPermission() {
  PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
  const token = await getToken();
  return token;
}

export const getToken = async () => {
  await messaging().registerDeviceForRemoteMessages();
  const token = await messaging().getToken();
  await AsyncStorage.setItem('fcmToken', token);
  return token;
};

export const notificationListener = () => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
  });

  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
      }
    });

  messaging().onMessage(async remoteMessage => {
    console.log(remoteMessage);
  });
};
