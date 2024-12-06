import { AppRegistry, AppState } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance, EventType } from '@notifee/react-native';

// Track app state
let currentAppState = 'active';
AppState.addEventListener('change', (nextAppState) => {
  currentAppState = nextAppState;
});

// Function to handle notifications
async function onMessageReceived(message) {
  if (currentAppState === 'active') {
    // If the app is open, do not display the notification
    console.log('Notification suppressed as app is in foreground:', message);
    return;
  }

  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
    sound: 'sound', // Name of the sound file (without the file extension)
    importance: AndroidImportance.HIGH, // Importance level
  });

  await notifee.displayNotification({
    title: message?.notification?.title || 'Default Title',
    body: message?.notification?.body || 'Default Body',
    android: {
      channelId,
      sound: 'sound', // Name of the sound file (without the file extension)
      importance: AndroidImportance.HIGH,
      bypassDnd: true, // Allow to bypass DND
    },
  });
}

// Handle foreground events (e.g., notification actions)
notifee.onForegroundEvent(async ({ type, detail }) => {
  if (type === EventType.ACTION_PRESS) {
    if (detail?.pressAction?.id === 'yes') {
      console.log('Yes action pressed', detail);
      // Perform navigation or other actions here
    }
  }
});

// Handle background notification events
notifee.onBackgroundEvent(async ({ type, detail }) => {
  console.log('Background event detail:', detail);
  if (type === EventType.ACTION_PRESS && detail?.pressAction?.id === 'yes') {
    // Perform navigation or other background actions here
  }
});

// Firebase message handlers
messaging().onMessage(onMessageReceived);
messaging().setBackgroundMessageHandler(onMessageReceived);

AppRegistry.registerComponent(appName, () => App);
