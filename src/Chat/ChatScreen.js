import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useCallback, useEffect, useContext} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';
import {UserAuthContext} from '../Context/UserAuthContext';

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const {User} = useContext(UserAuthContext);
  useEffect(() => {
    const querySnapshot = firestore()
      .collection('Room')
      .doc('10')
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
      .doc('10')
      .collection('Message')
      .add({...messages[0], createdAt: firestore.FieldValue.serverTimestamp()});
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: User,
      }}
    />
  );
};

export default ChatScreen;

const styles = StyleSheet.create({});
