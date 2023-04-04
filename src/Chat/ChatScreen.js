import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableWithoutFeedback,
  Text,
  Dimensions,
  TouchableOpacity,
  ToastAndroid,
  Pressable,
  Alert,
  Button,
} from 'react-native';
import {FlagIcon, PaperAirplaneIcon} from 'react-native-heroicons/solid';
import database from '@react-native-firebase/database';
import Colors from '../Utitlies/Colors';
import Family from '../Utitlies/Family';

const Chatscreen = () => {
  const [Input_messsage, setInput_messsage] = useState('');
  const [Message, setMessage] = useState([]);
  const [userId, setuserId] = useState(1);
  const [Typing, setTyping] = useState(false);

  const sendMessage = async () => {
    if (Input_messsage.length > 0) {
      const newReference = database().ref('/users/215-209/chat').push();
      newReference
        .set({
          _id: '2',
          text: Input_messsage,
          createdAt: new Date().getTime(),
          sender: '1',
        })
        .then(() => {
          ToastAndroid.show('Mesage Sent', ToastAndroid.SHORT);
        });
      setInput_messsage('');
      typingFalse();
    } else {
      Alert.alert('Please type Message');
    }
  };

  const typingFalse = () => {
    database().ref('/users/215-209').update({
      typing: false,
    });
  };

  const UpdateStatus = text => {
    setInput_messsage(text);
    if (text.length > 0) {
      database().ref('/users/215-209/typing').update({
        typing: true,
      });
    } else {
      database().ref('/users/215-209/typing').update({
        typing: false,
      });
    }
  };

  const getStatus = () => {
    database()
      .ref('/users/215-209/typing')
      .on('value', snapshot => {
        if (snapshot.val() == null) {
          setTyping(false);
        } else if (snapshot.val().typing == true) {
          setTyping(true);
        } else {
          setTyping(false);
        }
      });
  };

  // const sendMessageUser = async () => {
  //   const newReference = database().ref('/users/215-209/chat').push();
  //   newReference.set({
  //     _id: '1',
  //     text: 'from another side',
  //     createdAt: new Date().getTime(),
  //     sender: '2',
  //   });
  //   setInput_messsage('');
  // };

  const getChat = async () => {
    database()
      .ref('/users/215-209/chat')
      .on('value', snapshot => {
        let Arr = [];
        snapshot.forEach(value => {
          const {_id, text, createdAt, sender} = value.val();
          Arr.push({
            _id: _id,
            text: text,
            createdAt: createdAt,
            sender: sender,
          });
        });
        setMessage(Arr);
      });
  };
  useEffect(() => {
    getChat();
    getStatus();
  }, []);

  return (
    <View style={{flex: 1}}>
      <View style={{marginVertical: 10}}>
        <Text style={{textAlign: 'center', fontFamily: Family.Medium}}>
          {Typing ? 'typing.....' : ''}
        </Text>
        <FlatList
          data={Message}
          style={{marginBottom: 70}}
          renderItem={({item}) => {
            return (
              <Pressable>
                <View style={{marginTop: 0, width: '95%', alignSelf: 'center'}}>
                  <View
                    style={{
                      backgroundColor:
                        item.sender == userId ? Colors.primary : Colors.light,
                      maxWidth: Dimensions.get('screen').width * 0.8,
                      paddingVertical: 5,
                      paddingHorizontal: 15,
                      alignSelf:
                        item.sender == userId ? 'flex-end' : 'flex-start',
                      borderRadius: 8,
                      borderBottomLeftRadius: item.sender === userId ? 8 : 0,
                      borderBottomRightRadius: item.sender === userId ? 0 : 8,
                      marginVertical: 5,
                    }}>
                    <Text
                      style={{
                        padding: 5,
                        color:
                          item.sender == userId ? Colors.light : Colors.dark,
                        fontFamily: 'Poppins-Regular',
                      }}>
                      {item.text}
                    </Text>
                  </View>
                </View>
              </Pressable>
            );
          }}
        />
      </View>
      {/* <Button title="Send Message" onPress={sendMessageUser} /> */}
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          justifyContent: 'space-around',
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 15,
          paddingVertical: 7,
          backgroundColor: '#fafafa',
        }}>
        <TextInput
          placeholder="Type your message here"
          style={{flex: 1, fontFamily: 'Poppins-Medium'}}
          onChangeText={text => UpdateStatus(text)}
          value={Input_messsage}
          keyboardType="default"
        />
        <TouchableOpacity onPress={sendMessage}>
          <PaperAirplaneIcon color="#97667C" size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Chatscreen;
