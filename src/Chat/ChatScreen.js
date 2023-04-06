import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useCallback, useEffect} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import database from '@react-native-firebase/database';

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    database()
      .ref('/Room/10')
      .orderByChild('_id', 'dsc')
      .on('value', snapshot => {
        let Arr = [];
        snapshot.forEach(value => {
          Arr.push(value.val());
        });
        setMessages(Arr);
      });
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
    const {_id, text, createdAt, user} = messages[0];
    console.log(_id, text, createdAt, user);
    database()
      .ref('/Room/10')
      .push({
        _id,
        text,
        createdAt: createdAt,
        user,
      })
      .then(() => console.log('Data set.'));
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 20,
      }}
    />
  );
};

export default ChatScreen;

const styles = StyleSheet.create({});
