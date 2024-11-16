import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Modal,
} from 'react-native';
import React, {useState, useCallback, useEffect, useContext, useRef} from 'react';
import {GiftedChat, InputToolbar, Bubble, Time, Send} from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';
import {UserAuthContext} from '../Context/UserAuthContext';
import Colors from '../Utitlies/Colors';
import {ArrowLeftIcon} from 'react-native-heroicons/solid';
import Family from '../Utitlies/Family';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import Global from '../Utitlies/Global';
import { http } from '../utils/AxiosInstance';
import { RenderIcon } from '../component/RenderIcon';
import theme from '../utils/theme';
import { io } from 'socket.io-client'; // Import socket.io-client

// Create socket instance
const socket = io('https://astroasocket.onrender.com/');

const ChatScreen = ({navigation, route}) => {

  const [messages, setMessages] = useState([]);
  const {User} = useContext(UserAuthContext);
  const [isInputDisabled, setisInputDisabled] = useState(false);
  const [modal, setmodal] = useState(false);
  const userId = route?.params?.userid
  const RoomId = route.params?.RoomId||"roomid123" ;
  const [data,setData]=useState()
  const Navigation = useNavigation();
  const [welcomeMessageSent, setWelcomeMessageSent] = useState(false);
  const typingTimeoutRef = useRef(null);
  const [typing,setTyping]=useState(false)

  useEffect(() => {
    // Connect to the server and join the chat room
    socket.emit('join', RoomId);
    console.log('ssss',RoomId)
    // Listen for typing events
    socket.on('typing', ({ roomId, isTyping }) => {
      if (roomId== roomId) {
        setTyping(isTyping)
        console.log(`${isTyping ? 'typing...' : 'not typing.'}`);
        // You can implement a UI indicator for typing status here
      }
    });

    return () => {
      // Clean up listeners when the component unmounts
      socket.off('typing');
      socket.emit('leave', RoomId);
    };
  }, [RoomId, userId]);

  const handleSend = (newMessages = []) => {
    setMessages((prevMessages) => GiftedChat.append(prevMessages, newMessages));

    // Emit stop-typing when a message is sent
    socket.emit('stop-typing', RoomId, userId);
  };

  const handleTyping = (text) => {
    if (text.length > 0) {
      socket.emit('typing', RoomId,);

      // Clear the timeout if already set
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      // Emit stop-typing after 2 seconds of inactivity
      typingTimeoutRef.current = setTimeout(() => {
        socket.emit('stop-typing',RoomId, );
      }, 2000);
    } else {
      // Emit stop-typing immediately if the input is cleared
      socket.emit('stop-typing', RoomId,);
    }
  };

useEffect(() => {
  getProfile();

  if (!welcomeMessageSent) {
    onSend([{ _id: 1, text: "Welcome to Vedic Astro", createdAt: new Date(), user: { _id: 2, name: "Vedic Astro" } }]);
    setWelcomeMessageSent(true);
  }

  const querySnapshot = firestore()
    .collection('Room')
    .doc(RoomId)
    .collection('Message')
    .orderBy('createdAt', 'desc');
  querySnapshot.onSnapshot(snapshot => {
    const allMessage = [];
    snapshot.docs.map(snap => {
      allMessage.push({...snap.data(), createdAt: new Date()});
    });
    setMessages(allMessage);
  });
}, []);


  useEffect(() => {
    getProfile()
    const querySnapshot = firestore()
      .collection('Room')
      .doc(RoomId)
      .collection('Message')
      .orderBy('createdAt', 'desc');
    querySnapshot.onSnapshot(snapshot => {
      const allMessage = [];
      snapshot.docs.map(snap => {
        allMessage.push({...snap.data(), createdAt: new Date()});
      });
      setMessages(allMessage);
    });
  }, []);

  // useEffect(() => {
  //   const unsuscribe = Navigation.addListener('beforeRemove', e => {
  //     e.preventDefault();
  //   });
  //   return unsuscribe;
  // }, [Navigation]);

  const onSend = useCallback((messages = []) => {
    firestore()
      .collection('Room')
      .doc(RoomId)
      .collection('Message')
      .add({...messages[0], createdAt: firestore.FieldValue.serverTimestamp()});
  }, []);

  useEffect(()=>{
  //  onSend()
  },[RoomId])

  useEffect(() => {
    firestore()
      .collection('Room')
      .doc(RoomId)
      .onSnapshot(documentSnapshot => {
        if (documentSnapshot.data() !== undefined) {
          const {chatStatus} = documentSnapshot.data();
          if (chatStatus == 'completed') {
            setisInputDisabled(true);
          }
        }
      });
  }, []);

  const getProfile = async () => {
   try {
    const {data}= await axios.get(`https://www.radicalone.co.in/vedicastro/activity.php?method=myProfile&userId=${userId||10}`)
    // console.log(data,"s")
    setData(data.response);
    // console.log(data?.response.name)
   } catch (error) {
    console.log(error)
   }
  };

  const viewkundli = async () => {
    try {
     const response = await http.get('/',{params:{
       method:"viewKundli",
       roomId:RoomId
     }})
     const data = response.data;
    //  return console.log(response.data)
     navigation.navigate('ViewKundli', {
       name: data.response.name,
       gender: data.response.gender,
       dob: data.response.dob,
       tob: data.response.tob,
       pob: data.response.pob,
       lat: data.response.lat,
       lon: data.response.lon,
     });
    } catch (error) {
     console.log(error,"kun ivew");
    }
   };
   

  const renderInputToolbar = props => {
    const {containerStyle, ...inputToolbarProps} = props;
    return isInputDisabled ? (
      <View
        style={{
          backgroundColor: '#fff',
          borderRadius: 10,
          paddingHorizontal: 10,
          marginTop: -10,
          padding: 10,
        }}>
        <Text style={{color: 'red', textAlign: 'justify', fontSize: 13}}>
          This is an automated messages. Chat has been ended.
        </Text>
      </View>
    ) : (
      <InputToolbar {...inputToolbarProps} containerStyle={{color:"black",backgroundColor:"white"}} />
    );
  };

  return (
    <>
      <View
        style={{
          backgroundColor: Colors.light,
          padding: 12,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <ArrowLeftIcon color={Colors.dark} size={24} />
          </TouchableOpacity>
         <View style={{marginLeft:12}}>
         <Text
            style={{
              fontSize: 16,
              color: Colors.gray,
              // marginLeft: 10,
              fontFamily: Family.Medium,
            }}>
            {data?.name}
          </Text>
          {typing&&<Text style={{fontSize:11,marginTop:-10}}>'Typing..'</Text>}
         </View>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: Colors.primary,
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 5,
            justifyContent: 'center',
          }}
          onPress={viewkundli}>
          <Text
            style={{
              fontSize: 12,
              textAlign: 'center',
              fontFamily: Family.Medium,
              color: 'black',
            }}>
            View Kundli
          </Text>
        </TouchableOpacity>
      </View>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: User,
        }}
        renderInputToolbar={renderInputToolbar}
        onInputTextChanged={(text)=>handleTyping(text)}
        
        renderSend={(props) => (
          <Send
            {...props}
            containerStyle={{
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 10,
              // backgroundColor: 'yellow', // Yellow background for the send button
              borderRadius: 5, // Optional: round edges for the button
              marginRight: 10, // Optional: spacing to the right
              height: 45, // Adjust height as needed
            }}
          >
            {/* <Text style={{ color: 'black', fontWeight: 'bold' }}>Send</Text> */}
            <RenderIcon iconfrom={"MaterialIcons"} iconName={'send'} iconColor={theme.colors.yellow} iconSize={20}/>
          </Send>
        )}
                renderBubble={props => {
          return (
            <Bubble
              {...props}
              renderTime={timeProps => (
                <Time
                  {...timeProps}
                  timeTextStyle={{
                    right: {
                      color: Colors.white, // Time color for sent messages
                    },
                    left: {
                      color: Colors.dark, // Time color for received messages
                    },
                  }}
                />
              )}
              
              wrapperStyle={{
                right: {
                  backgroundColor: Colors.primary,
                  
                },
                left: {
                  backgroundColor: Colors.light,
                  marginLeft: 10, // Set to 0 to remove any extra space on the left side
  alignSelf: 'flex-start', 
                },
              }}
              textStyle={{
                right: {
                  color: Colors.white, // Change this to your desired text color for sent messages
                },
                }}
            />
          );
        }}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modal}
        onRequestClose={() => {}}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              onPress={() => {
                setmodal(false);
              }}
              style={{position: 'absolute', top: 5, right: 15}}>
              <Text
                style={{
                  color: Colors.gray,
                  fontSize: 20,
                  fontWeight: '700',
                }}>
                x
              </Text>
            </TouchableOpacity>
            <Text
              style={{
                color: Colors.gray,
                fontSize: 12,
                fontWeight: '700',
                marginVertical: 10,
              }}>
              Your Chat Session has been Completed !
            </Text>
            <Image
              source={{
                uri: 'https://images.pexels.com/photos/1557843/pexels-photo-1557843.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
              }}
              style={{width: 70, height: 70, borderRadius: 35}}
            />
            <Text
              style={{
                color: Colors.gray,
                fontSize: 15,
                fontWeight: '700',
                marginVertical: 10,
              }}>
              Ashutosh Tiwari
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Waitlist');
                setmodal(false);
              }}
              style={{
                backgroundColor: Colors.primary,
                width: '100%',
                paddingVertical: 15,
                borderRadius: 30,
                justifyContent: 'center',
                flexDirection: 'row',
              }}>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: '700',
                  color: '#fff',
                }}>
                Check Waitlist
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginHorizontal: 15,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
});
