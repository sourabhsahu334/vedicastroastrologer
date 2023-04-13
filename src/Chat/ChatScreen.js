import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useCallback, useEffect, useContext} from 'react';
import {GiftedChat, InputToolbar} from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';
import {UserAuthContext} from '../Context/UserAuthContext';

const ChatScreen = ({navigation, route}) => {
  const [messages, setMessages] = useState([]);
  const {User} = useContext(UserAuthContext);
  const [isInputDisabled, setisInputDisabled] = useState(false);
  const {RoomId} = route.params;

  useEffect(() => {
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

  const onSend = useCallback((messages = []) => {
    firestore()
      .collection('Room')
      .doc(RoomId)
      .collection('Message')
      .add({...messages[0], createdAt: firestore.FieldValue.serverTimestamp()});
  }, []);

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

  const renderInputToolbar = props => {
    const {containerStyle, ...inputToolbarProps} = props;
    return isInputDisabled ? (
      <View
        style={{
          backgroundColor: '#fff',
          borderRadius: 10,
          paddingHorizontal: 10,
        }}>
        <Text style={{color: 'red', textAlign: 'justify', fontSize: 13}}>
          This is an automated messages. Chat has been ended due to Customer
          doesn't have enough balance.
        </Text>
      </View>
    ) : (
      <InputToolbar {...inputToolbarProps} containerStyle={containerStyle} />
    );
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: User,
      }}
      renderInputToolbar={renderInputToolbar}
    />
  );
};

export default ChatScreen;

const styles = StyleSheet.create({});
