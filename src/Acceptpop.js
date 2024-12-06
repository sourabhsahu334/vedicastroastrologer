import { View, Text, TouchableOpacity, StyleSheet, Image, ActivityIndicator, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { globalStyles } from './utils/GlobalStyles'
import theme from './utils/theme'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Global from './Utitlies/Global'
import messaging from '@react-native-firebase/messaging';
import { RenderIcon } from './component/RenderIcon'

import firestore from '@react-native-firebase/firestore';


export const sendNotification = async (token,roomid,astrologerId,logerToken,type,docid,name) => {
  try {
    // Fetch access token from your endpoint
    const access = await axios.get("https://radicalone.co.in/vedicastro/token.php");
    const access_token = access?.data?.access_token;
    console.log(access_token);

    // Notification payload
    const notification = {
      title: 'Request',
      body: `Astrologer ${name} has accepted for ${type}`,
    };

    // Data payload
    const data = {
      message: {
        token: token,
        notification: notification,
        data: {
          roomId:roomid,
        astrologerId:astrologerId,
        logerToken:logerToken,
        id:docid,
        type:type
        },
      },
    };

    // HTTP request headers
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${access_token}`,
    };

    // Send HTTP POST request to FCM endpoint
    const response = await axios.post('https://fcm.googleapis.com/v1/projects/astro-d96c1/messages:send', data, { headers });
    console.log('Notification sent successfully:', response.data);
  } catch (error) {
    console.error('Error sending notification:', error.response ? error.response.data?.error?.details : error.message);
  }
};

const Acceptpop = ({route,navigation}) => {
    const userid = route?.params?.userId;
    const type = route?.params?.type;
    const token = route?.params?.token;
    const roomid = route?.params?.roomId;
    console.log(route?.params,"datax");
    const docid = route?.params?.docid
    const [ id, setId]=useState();
    const [ loading,setLoading]=useState(route?.params?.loading||false)
    const [ myData,setMyData]=useState();
    const [ myOwnTokecn,setMyOwnerToken]=useState();
    const [ valid,setValid]=useState(false)
    const [ astrologerId,setastrologerId]=useState();

  

    const getData = async () => {
    try {
      try {
        // setLoading(true)
        setValid(true)
        const token = await AsyncStorage.getItem('token');
        setMyOwnerToken(token);
        setValid(false)
      } catch (error) {
        // setLoading(false)
        setValid(false)
      }
         console.log('s')  
      const userid = await AsyncStorage.getItem('userId')
      console.log(userid);
      setastrologerId(userid)
      const {data} = await axios.get(
        Global.BASE_URL + `myProfiles&astrologerId=${userid}`,
      );
      // const result = await response.json();
      setMyData(data.response);
      console.log(data,"sd")
    } catch (error) {
      console.log(error)
    }
    };

    const acceptbyastrologer=async()=>{
      try {
        // const createdChatStaus = await fetch(
        //   GLOBAL.BASE_URL +
        //     `createChat&userId=${userid}&astrologerId=${astrologerId}&roomId=${roomid}&status=ongoing`,
        // );
        firestore().collection('chat').doc(docid).update({
          status: 'accepted by Astrologer',
          createdAt: firestore.FieldValue.serverTimestamp(),
        });
        if(type=='call'){
          navigation.reset({
            index: 0,
            routes: [{ name: 'CallScreen', params: { RoomId: roomid } }],
          });
                }    
        if(type=='video'){
          navigation.reset({
            index: 0,
            routes: [{ name: 'VideoScreen', params: { RoomId: roomid } }],
          });
                }    
        if(type=="chat"){
          navigation.replace("ChatScreen",{RoomId:roomid}); 
  
        } // Y
        sendNotification(token, roomid,astrologerId,myOwnTokecn,type,docid,myData.name);
            setLoading(true)
      } catch (error) {
        console.log(error)
      }
    }


    console.log(token,roomid)
    const [ user , setUser]=useState();
    const fetch = async()=>{
    try {
      const id =await AsyncStorage.getItem('userId');
      setId(id)
        const {data}= await axios.get(`https://www.radicalone.co.in/vedicastro/activity.php?method=myProfile&userId=${userid}`)
        console.log(data,"s")
        setUser(data?.response);  
    } catch (error) {
        console.log(error,'err');
    }
    }

    useEffect(()=>{
   if(userid){
    fetch()
   }

    },[userid])

    useEffect(()=>{
      getData()
    },[])


  return (
    <View style={[globalStyles.container2,{justifyContent:"center",alignItems:"center"}]}>
      {/* <Text>Acceptpop</Text> */}
      
      <View style={{height:250,width:330,borderRadius:20,padding:15,backgroundColor:theme.colors.Yellow,alignItems:"center",justifyContent:"space-around"}}>
        <Text style={[globalStyles.text2,{fontSize:16}]}>{type=='call'?"Call":type=='video'?"Video Call ":"Chat"} Request From User {user?.name||"Test name"}</Text>
        {type=='call'?<Image style={{height:50,width:50}} source={require("../assets/images/telephone.png")}/>:
        type=='video'?<RenderIcon iconColor={"red"} iconName={"video"} iconSize={40} iconfrom={"MaterialCommunityIcons"}/>:
        <Image style={{height:50,width:50}} source={require("../assets/images/chat.png")}/>}
      {loading?
      <View style={{marginVertical:10}}>
        <Text style={[globalStyles.text]}>Waiting for user response</Text>
        <ActivityIndicator size={"large"} style={{marginLeft:"auto",marginRight:"auto"}}/>
      </View>:
        <View style={[globalStyles.rowflex]}>
            <TouchableOpacity onPress={()=>{navigation.replace("Home"); setLoading(false)}}  style={[styles.button,]}><Text style={[globalStyles.text]}>Decline</Text></TouchableOpacity>
            <TouchableOpacity disabled={valid}  onPress={()=>{acceptbyastrologer()
               }} style={[styles.button]}><Text style={[globalStyles.text]}>Accept</Text></TouchableOpacity>
        </View>}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    button:{borderRadius:10,backgroundColor:"white",height:40,width:120,justifyContent:"center",alignItems:"center"}
})

export default Acceptpop