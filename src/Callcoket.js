import React, { useEffect, useRef, useState } from 'react';
import { View, Button, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { RTCPeerConnection, RTCSessionDescription, RTCIceCandidate, mediaDevices, RTCView } from 'react-native-webrtc';
import io from 'socket.io-client';
// import { RenderIcon } from '../components/RenderIcon';
import { RenderIcon } from './component/RenderIcon';
// import { globalStyles } from '../utils/GlobalStyles';
import { globalStyles } from './utils/GlobalStyles';
import Global from './Utitlies/Global';

const socket = io('https://astroasocket.onrender.com/');
const ICE_SERVERS = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:stun1.l.google.com:19302' },
    { urls: 'stun:stun2.l.google.com:19302' },
  ],
};

const CallCoket = ({route,navigation}) => {
  const type = route?.params?.type;
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const peerConnection = useRef(new RTCPeerConnection(ICE_SERVERS));
  const roomId = route?.params?.RoomId||"roomid123"
  const [ status,setStatus]=useState();
  const [userdata,setUsetdata]=useState();


  const viewkundli = async () => {
    const response = await fetch(
      Global.BASE_URL + `viewKundli&roomId=${roomId}&type="call`,
    );
    const data = await response.json();
    setUsetdata(data?.response)
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
 
  useEffect(() => {
    socket.on('offer', handleReceiveOffer);
    socket.on('answer', handleReceiveAnswer);
    socket.on('ice-candidate', handleReceiveIceCandidate);

    startLocalStream();

    return () => {
      socket.off('offer', handleReceiveOffer);
      socket.off('answer', handleReceiveAnswer);
      socket.off('ice-candidate', handleReceiveIceCandidate);
    };
  }, []);
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
    navigate('Home')
  };
  const endCall = () => {
    cleanupConnection();  // End call and clean up resources
  };



  const joinRoom = () => {
    socket.emit('join', roomId);
  };

  const leaveRoom = () => {
    socket.emit('leave', roomId);
  };

  const startLocalStream = async () => {
    const constraints = { audio: true, };
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
        setStatus(true)
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
    return () => {
      cleanupConnection();
    };
  }, []);

      
      const [timeLeft, setTimeLeft] = useState(5 * 60); // 5 minutes in seconds

      // useEffect(() => {
      //   if (timeLeft <= 0) {
      //     Alert.alert("Call ended")
      //     navigate('Home'); // Navigate to Home when timer ends
      //     return;
      //   }
    
      //   const interval = setInterval(() => {
      //     setTimeLeft((prevTime) => prevTime - 1);
      //   }, 1000);
    
      //   return () => clearInterval(interval);
      // }, [timeLeft, ]);
    
      const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
      };

  return (
    <View style={[styles.container,{backgroundColor:"black"}]}>
      {/* <Button title="Join Room" onPress={() => joinRoom()} /> */}
      {/* <Button title="Leave Room" onPress={leaveRoom} /> */}
      <View style={{height:45,backgroundColor:'white',paddingHorizontal:10,alignItems:'center',flexDirection:'row',justifyContent:'space-between'}}>
        <Text style={[globalStyles.text]}>{userdata?.name}</Text>
        <View style={{marginLeft:10}}><Button title="View kundli" onPress={viewkundli} /></View>

      </View>
    <View style={{flexDirection:'row',marginLeft:"auto",marginTop:15,marginRight:20}}>
    {/* <Button style={{backgroundColor:'green'}} title="Call Accept"  /> */}
    {/* <TouchableOpacity onPress={() => callUser('targetUserId')} style={{paddingHorizontal:10,paddingVertical:3,borderRadius:5,backgroundColor:'green',justifyContent:'center',alignItems:'center'}}>
        <Text style={[globalStyles.text,{color:'white'}]}>{remoteStream?"Connected":"Start Call"}</Text>
      </TouchableOpacity> */}
    </View>

      {/* <Text style={[globalStyles.text,{color:"white"}]}>{formatTime(timeLeft)}</Text> */}
      {/* <Text style={[globalStyles.text,{color:"white"}]}>{roomId}</Text> */}


      {/* <TextInput color={"white"} value={roomId}  onChangeText={(e)=>setRoomId(e)}/> */}
      {/* {localStream && <RTCView streamURL={localStream.toURL()} style={{height:100,width:100,position:'absolute',top:10,left:10}} />}
      {remoteStream && <RTCView streamURL={remoteStream.toURL()} style={styles.rtcView} />} */}
      <TouchableOpacity onPress={endCall} style={{height:60, justifyContent:"center",alignItems:'center',width:60,backgroundColor:"red",borderRadius:50,marginTop:'auto',opacity:.8,marginBottom:20,marginRight:'auto',marginLeft:'auto'}}>
      <RenderIcon iconColor={"black"} iconfrom={"MaterialCommunityIcons"} iconSize={30} iconName={'phone'}/>

      </TouchableOpacity>
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
    marginTop:70,
    // position:"absolute",
    backgroundColor: 'black',
  },
});

export default CallCoket;