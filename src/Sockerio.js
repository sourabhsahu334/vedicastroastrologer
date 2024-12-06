

import React, { useEffect, useRef, useState } from 'react';
import { View, Button, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import { RTCPeerConnection, RTCSessionDescription, RTCIceCandidate, mediaDevices, RTCView } from 'react-native-webrtc';
import io from 'socket.io-client';
import { RenderIcon } from './component/RenderIcon';
import { navigate } from '../App';
import Global from './Utitlies/Global';
import Header from './component/Header';
import { globalStyles } from './utils/GlobalStyles';
import InCallManager from 'react-native-incall-manager'; // Import InCallManager


const socket = io('https://astroasocket.onrender.com');
const ICE_SERVERS = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:stun1.l.google.com:19302' },
    { urls: 'stun:stun2.l.google.com:19302' },
  ],
};

const VideoSocket = ({ route,navigation }) => {
  const type = route?.params?.type;
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const peerConnection = useRef(new RTCPeerConnection(ICE_SERVERS));
  const roomId = route?.params?.RoomId || 'roomid123';
  const [isSpeakerOn, setIsSpeakerOn] = useState(false); // State for speaker toggle

  const [status, setStatus] = useState(false);
  const [data,setData]=useState();
   const [userdata,setUsetdata]=useState();
  // const getProfile = async () => {
  //   const response = await fetch(
  //     `https://www.radicalone.co.in/vaidicastro/activity.php?method=myProfile&userId=${userId}`,
  //   );
  //   const data = await response.json();
  //   setData(data.response);
  // };

  const viewkundli = async () => {
    const response = await fetch(
      Global.BASE_URL + `viewKundli&roomId=${roomId}&type="call`,
    );
    const data = await response.json();
    setUsetdata(data.response);
    console.log(data)
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
  // useEffect(()=>{
  //   if(roomId){
  //     viewkundli()
  //   }
  // },[roomId])

  useEffect(() => {
    socket.on('offer', handleReceiveOffer);
    socket.on('answer', handleReceiveAnswer);
    socket.on('ice-candidate', handleReceiveIceCandidate);
    socket.on('user-left', handleUserLeft);
    startLocalStream();

    return () => {
      socket.off('offer', handleReceiveOffer);
      socket.off('answer', handleReceiveAnswer);
      socket.off('ice-candidate', handleReceiveIceCandidate);
      socket.off('user-left', handleUserLeft);
      // cleanupConnection();  // Ensure we clean up on unmount

    };
  }, []);

  const handleUserLeft=async()=>{
    try {
      Alert.alert('User has been ended a call')
      cleanupConnection()
    } catch (error) {
      
    }
  }

  const cleanupConnection = () => {
    // Close the peer connection
    if (peerConnection.current) {
      peerConnection.current.close();
    }
    
    // Stop local stream tracks
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
    }

    // Leave the socket room
    leaveRoom();
    navigation.replace('Home')
  };

  const joinRoom = () => {
    socket.emit('join', roomId);
  };

  const leaveRoom = () => {
    // socket.emit('user-left', roomId);
    socket.emit('leave', roomId);
    socket.disconnect();
  };

  const startLocalStream = async () => {
    const constraints = { audio: true, video: true };
    const stream = await mediaDevices.getUserMedia(constraints);
    setLocalStream(stream);
    stream.getTracks().forEach(track => {
      peerConnection.current.addTrack(track, stream);
    });
  };

  const callUser = async (userId) => {
    const offer = await peerConnection.current.createOffer();
    await peerConnection.current.setLocalDescription(new RTCSessionDescription(offer));
    socket.emit('offer', { roomId, target: userId, callerId: socket.id, offer });

    peerConnection.current.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit('ice-candidate', { roomId, target: userId, candidate: event.candidate });
      }
    };

    peerConnection.current.ontrack = (event) => {
      if (event.streams && event.streams[0]) {
        setStatus(true);
        setRemoteStream(event.streams[0]);
      }
    };
  };

  const handleReceiveOffer = async (data) => {
    await peerConnection.current.setRemoteDescription(new RTCSessionDescription(data.offer));
    const answer = await peerConnection.current.createAnswer();
    await peerConnection.current.setLocalDescription(new RTCSessionDescription(answer));
    socket.emit('answer', { roomId, target: data.callerId, answer });
  };

  const handleReceiveAnswer = async (data) => {
    await peerConnection.current.setRemoteDescription(new RTCSessionDescription(data.answer));
  };

  const handleReceiveIceCandidate = (data) => {
    const candidate = new RTCIceCandidate(data.candidate);
    peerConnection.current.addIceCandidate(candidate);
  };

  const toggleSpeaker = () => {
    setIsSpeakerOn(!isSpeakerOn);
    InCallManager.setSpeakerphoneOn(!isSpeakerOn);
  };

  const endCall = () => {
    cleanupConnection();  // End call and clean up resources
  };

  useEffect(() => {
    // Create an async function for the effect
    const initiateCalls = async () => {
      joinRoom();
      await callUser(); // Ensure the first call completes
      setTimeout(() => {
        callUser(); 
        setTimeout(() => {
          callUser(); // Make the second call after 1 second
        }, 2000);// Make the second call after 1 second
      }, 2000);
    };

    initiateCalls();

    // Cleanup on component unmount
 
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: 'black' }]}>
      <View style={{height:45,backgroundColor:'white',paddingHorizontal:10,alignItems:'center',flexDirection:'row',justifyContent:'space-between'}}>
        <Text style={[globalStyles.text]}>{userdata?.name}</Text>
        <View style={{marginLeft:10}}><Button title="View kundli" onPress={viewkundli} /></View>
      </View>
    <View style={{flexDirection:'row',marginLeft:"auto",marginTop:15,marginRight:20}}>
    {/* <Button style={{backgroundColor:'green'}} title="Call Accept"  /> */}
      {/* <TouchableOpacity onPress={() => callUser('targetUserId')} style={{paddingHorizontal:10,paddingVertical:3,borderRadius:5,backgroundColor:'green',justifyContent:'center',alignItems:'center'}}>
        <Text style={[globalStyles.text,{color:'white'}]}>Start Call</Text>
      </TouchableOpacity> */}
    </View>

      {localStream && (
        <RTCView streamURL={localStream.toURL()} style={{ height: 100, width: 100, position: 'absolute', top: 60,left:0 }} />
      )}
      
      {remoteStream && 
      <View>
        {/* <Text style={[globalStyles.text,{color:'white'}]}>Connected</Text> */}
        <RTCView streamURL={remoteStream.toURL()} style={styles.rtcView} /></View>}
      <TouchableOpacity onPress={endCall} style={styles.endCallButton}>
            <RenderIcon iconColor={"black"} iconfrom={"MaterialCommunityIcons"} iconSize={30} iconName={'phone'}/>

      </TouchableOpacity>
      <View style={{ }}>
        <TouchableOpacity
          onPress={toggleSpeaker}
          style={{
            paddingHorizontal: 10,
            paddingVertical: 3,
            borderRadius: 5,
            backgroundColor: isSpeakerOn ? 'orange' : 'grey',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={[globalStyles.text, { color: 'white' }]}>
            {isSpeakerOn ? 'Speaker On' : 'Speaker Off'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  rtcView: {
    width: 350,
    height: 500,
    marginTop: 70,
    backgroundColor: 'black',
  },
  endCallButton: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    backgroundColor: 'red',
    borderRadius: 50,
    marginTop: 'auto',
    opacity: 0.8,
    marginBottom: 20,
    marginRight:'auto',marginLeft:'auto'
  },
});

export default VideoSocket;
