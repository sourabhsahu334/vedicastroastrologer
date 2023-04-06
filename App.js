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

const App = () => {
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
