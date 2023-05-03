import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Modal,
} from 'react-native';
import React, {useState, useCallback, useEffect, useContext} from 'react';
import {GiftedChat, InputToolbar, Bubble} from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';
import {UserAuthContext} from '../Context/UserAuthContext';
import Colors from '../Utitlies/Colors';
import {ArrowLeftIcon} from 'react-native-heroicons/solid';
import Family from '../Utitlies/Family';
import {useNavigation} from '@react-navigation/native';

const ChatScreen = ({navigation, route}) => {
  const [messages, setMessages] = useState([]);
  const {User} = useContext(UserAuthContext);
  const [isInputDisabled, setisInputDisabled] = useState(false);
  const [modal, setmodal] = useState(false);
  const {RoomId} = route.params;
  const Navigation = useNavigation();

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

  const viewkundli = async () => {
    const response = await fetch(
      `https://astrowisdom.in/api/astrologer.php?method=viewKundli&roomId=${RoomId}`,
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
          This is an automated messages. Chat has been ended due to Customer
          doesn't have enough balance.
        </Text>
      </View>
    ) : (
      <InputToolbar {...inputToolbarProps} containerStyle={containerStyle} />
    );
  };

  return (
    <>
      <View
        style={{
          backgroundColor: Colors.light,
          padding: 10,
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
          <Text
            style={{
              fontSize: 16,
              color: Colors.gray,
              marginLeft: 10,
              fontFamily: Family.Medium,
            }}>
            ChatScreen
          </Text>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: Colors.primary,
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 15,
            justifyContent: 'center',
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
      </View>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: User,
        }}
        renderInputToolbar={renderInputToolbar}
        renderBubble={props => {
          return (
            <Bubble
              {...props}
              wrapperStyle={{
                right: {
                  backgroundColor: Colors.primary,
                },
                left: {
                  backgroundColor: Colors.light,
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
