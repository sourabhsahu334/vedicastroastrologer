import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import database from '@react-native-firebase/database';

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // setMessages([
    //   {
    //     _id: '1909c917-f3a2-4b60-b3b9-7f05aadf11cb',
    //     text: 'hello vivek',
    //     createdAt: new Date(),
    //     user: {
    //       _id: 1,
    //     },
    //   },
    // ]);
    database()
      .ref('/users/215-209')
      .on('value', snapshot => {
        let Arr = [];
        snapshot.forEach(value => {
          console.log(value);
          Arr.push({
            _id: value._id,
            text: 'text',
            createdAt: new Date(),
            user: {
              _id: 1,
            },
          });
        });
        setMessages(Arr);
      });
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
    const {_id, createdAt, text, user} = messages[0];
    const newReference = database().ref('/users/215-209').push();
    newReference.set({
      _id: _id,
      text: text,
      createdAt: createdAt,
      user: user,
    });
  }, []);

  return (
    <View style={{flex: 1}}>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({});
