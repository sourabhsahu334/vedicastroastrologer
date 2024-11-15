/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App, { navigate } from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
// import { Provider } from 'react-redux';
// import store from './Src/redux/store';
import notifee ,{EventType} from "@notifee/react-native"


async function onMessageReceived(message) {
  // console.log("message",message)
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });
  notifee.displayNotification({title: message?.notification.title,
  body:message.notification.body,
  android: {
    channelId,
    actions: [
      {
        title: 'Yes',
        pressAction: {
          id: 'yes',
          mainComponent: 'Default Channel',
          shouldFireEvent: false, // Do not clear notification upon interaction


        },
      },
      {
        title: 'No',
        pressAction: {
          id: 'no',
          shouldFireEvent: false, // Do not clear notification upon interaction

        },
      },
    ],
  },});
}
notifee.onForegroundEvent(async ({ type, detail }) => {
  if (type === EventType.ACTION_PRESS &&  detail.pressAction.id=="yes") {
   console.log(detail?.pressAction,EventType.ACTION_PRESS,type)
  //  navigate("Profile",{AstrologerId:5})
  }
});
notifee.onBackgroundEvent(async ({ type, detail }) => {
  // if (type === EventType.ACTION_PRESS && detail.pressAction.id) {
   console.log(detail?.notification?.data?.id,detail)
  //  navigate("Profile",{AstrologerId:5,})
  // }
});
messaging().onMessage(onMessageReceived);

messaging().setBackgroundMessageHandler(onMessageReceived);

AppRegistry.registerComponent(appName, () => App);
