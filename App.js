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

const App = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
