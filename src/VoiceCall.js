import {StyleSheet, Text, View, ImageBackground} from 'react-native';
import React, {useEffect} from 'react';
import ZegoUIKitPrebuiltLiveAudioRoom, {
  HOST_DEFAULT_CONFIG,
  ZegoLiveAudioRoomLayoutAlignment,
} from '@zegocloud/zego-uikit-prebuilt-live-audio-room-rn';
import {useNavigation} from '@react-navigation/native';

const VoiceCall = ({navigation, route}) => {
  // const {RoomId, userId, name} = route.params;
  const image = {
    uri: 'https://images.unsplash.com/photo-1620055374842-145f66ec4652?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
  };

  const Navigation = useNavigation();
  useEffect(() => {
    const unsuscribe = Navigation.addListener('beforeRemove', e => {
      Navigation.navigate('Home');
      BackHandler.exitApp();
    });
    return unsuscribe;
  }, [Navigation]);

  const background = () => {
    return (
      <View style={styles.backgroundView}>
        <ImageBackground source={image} style={styles.image}>
          <View style={styles.titleBar}>
            <Text style={styles.title}>A Live Audio Room</Text>
            <Text style={styles.id}>ID:{RoomId}</Text>
          </View>
        </ImageBackground>
      </View>
    );
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ZegoUIKitPrebuiltLiveAudioRoom
        appID={158492876}
        appSign={
          '71371c39c64e83dcd661099713c5db6fda00a41366158f0253f6abbca5b044cf'
        }
        userID={'1'} // userID can be something like a phone number or the user id on your own user system.
        userName={'Vishal'}
        roomID={'txn585'}
        config={{
          ...HOST_DEFAULT_CONFIG,
          onSeatsClosed: () => {},
          onSeatsOpened: () => {
            console.log('HELLO');
          },
          layoutConfig: {
            rowConfigs: [
              {
                count: 1,
                alignment: ZegoLiveAudioRoomLayoutAlignment.center,
              },
            ],
          },
          takeSeatIndexWhenJoining: 0,
          hostSeatIndexes: [0],
        }}
      />
    </View>
  );
};

export default VoiceCall;

const styles = StyleSheet.create({
  backgroundView: {
    zIndex: -1,
    width: '100%',
    height: '100%',
  },
  titleBar: {
    position: 'absolute',
    top: 55,
    paddingLeft: 18,
    width: '100%',
    height: 54,
  },
  title: {
    fontSize: 16,
    lineHeight: 33,
    color: '#1B1B1B',
  },
  id: {
    fontSize: 10,
    color: '#606060',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});
