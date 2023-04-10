import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './src/Home';
import Splash from './src/MainScreen/Splash';
import Login from './src/MainScreen/Login';
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

const App = () => {
  // OneSignal Initialization
  OneSignal.setAppId('f3156d4f-7de2-4c6b-8aaf-79894c9b3f59');

  // promptForPushNotificationsWithUserResponse will show the native iOS or Android notification permission prompt.
  // We recommend removing the following code and instead using an In-App Message to prompt for notification permission (See step 8)
  OneSignal.promptForPushNotificationsWithUserResponse(response => {
    console.log(response);
  });

  //Method for handling notifications received while app in foreground
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
  return (
    <UserAuthContextProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Splash"
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
            name="Splash"
            component={Splash}
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
          <Stack.Screen name="ChatScreen" component={ChatScreen} />
          <Stack.Screen name="VideoCall" component={VideoCall} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserAuthContextProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
