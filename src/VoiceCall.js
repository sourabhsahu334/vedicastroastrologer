import React, {useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {
  ZegoUIKitPrebuiltCall,
  ONE_ON_ONE_VOICE_CALL_CONFIG,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {ArrowLeftIcon} from 'react-native-heroicons/solid';
import Global from './Utitlies/Global';
import Family from './Utitlies/Family';

const VoiceCall = ({navigation, route}) => {
  const {RoomId, userId, name} = route.params;

  console.log(RoomId);
  const viewkundli = async () => {
    const response = await fetch(
      Global.BASE_URL + `viewKundli&roomId=${RoomId}&type="call`,
    );
    const data = await response.json();
    navigation.navigate('ViewKundli', {
      name: data.response.name,
      gender: data.response.gender,
      dob: data.response.dob,
      tob: data.response.tob,
      pob: data.response.pob,
      lat: data.response.lat,
      lon: data.response.lon,
    });
  };
  return (
    <>
      <TouchableOpacity
        style={{
          backgroundColor: 'orange',
          paddingHorizontal: 10,
          paddingVertical: 5,
          borderRadius: 15,
          justifyContent: 'center',
          position: 'relative',
          top: 0,
          right: 10,
          width: 100,
          alignSelf: 'flex-end',
          marginVertical: 10,
        }}
        onPress={viewkundli}>
        <Text
          style={{
            fontSize: 12,
            textAlign: 'center',
            fontFamily: Family.Medium,
            color: Colors.light,
          }}>
          View Kundli
        </Text>
      </TouchableOpacity>
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
    </>
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
