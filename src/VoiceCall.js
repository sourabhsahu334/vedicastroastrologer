import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  ZegoUIKitPrebuiltCall,
  ONE_ON_ONE_VOICE_CALL_CONFIG,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';

const VoiceCall = ({navigation, route}) => {
  const {RoomId, userId, name} = route.params;

  // useEffect(() => {
  //   setTimeout(() => {
  //     ZegoUIKit.leaveRoom();
  //   }, 30000);
  // }, []);
  return (
    <View style={styles.container}>
      <ZegoUIKitPrebuiltCall
        appID={158492876}
        appSign={
          '71371c39c64e83dcd661099713c5db6fda00a41366158f0253f6abbca5b044cf'
        }
        userID={userId}
        userName={name}
        callID={RoomId}
        config={{
          ...ONE_ON_ONE_VOICE_CALL_CONFIG,
          onOnlySelfInRoom: () => {
            navigation.navigate('Home');
          },
          onHangUp: () => {
            navigation.navigate('Home');
          },
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default VoiceCall;
