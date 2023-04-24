import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Modal,
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import WaitItem from './WaitItem';
import Global from '../Utitlies/Global';
import {UserAuthContext} from '../Context/UserAuthContext';
import Loader from '../component/Loader';
import Family from '../Utitlies/Family';
import Colors from '../Utitlies/Colors';
import firestore from '@react-native-firebase/firestore';
import Nodatafound from '../component/Nodatafound';

const Waitlist = ({navigation}) => {
  const [Loading, setLoading] = useState(false);
  const [modal, setmodal] = useState(false);
  const [RoomId, setRoomId] = useState('');
  const {User} = useContext(UserAuthContext);
  const [Data, setData] = useState([]);

  const getWaitList = async () => {
    setLoading(true);
    const response = await fetch(
      Global.BASE_URL + `astrologerWaitList&astrologerId=${User}`,
    );
    const data = await response.json();
    setData(data.response);
    setLoading(false);
  };
  useEffect(() => {
    getWaitList();
  }, []);

  const getDoucumentId = async userId => {
    setmodal(true);
    firestore()
      .collection('astrologer')
      .doc(User)
      .collection('connection')
      .where('userId', '==', userId)
      .get()
      .then(documentSnapshot => {
        documentSnapshot.docs.map(async data => {
          const {AstrologerId, userId, id} = data.data();
          const RoomId = 'txn' + Math.floor(Math.random() * 100000000);
          setRoomId(RoomId);
          const response = await fetch(
            `https://sellpe.in/astro/api/astrologer.php?method=chatRequest&userId=${userId}`,
          );
          const collectionset = firestore()
            .collection('user')
            .doc(userId)
            .collection('connection');
          const newRef = collectionset.doc();
          newRef.set({
            userId: userId,
            RoomId: RoomId,
            id: newRef.id,
            astrologerDocumentid: id,
            AstrologerId: AstrologerId,
            createdAt: firestore.FieldValue.serverTimestamp(),
          });
        });
      });
  };

  useEffect(() => {
    firestore()
      .collection('Room')
      .doc(RoomId)
      .onSnapshot(doc => {
        if (doc.data() !== undefined) {
          const {RoomId, AstrologerId, userId, chatStatus} = doc.data();
          navigation.navigate('ChatScreen', {
            chatStatus: chatStatus,
            RoomId: RoomId,
            AstrologerId: AstrologerId,
            userId: userId,
          });
        }
      });
  }, [RoomId]);

  return (
    <>
      {Loading ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Loader isLoading={Loading} />
        </View>
      ) : (
        <View style={{flex: 1}}>
          <View style={{width: '95%', alignSelf: 'center', marginVertical: 5}}>
            <FlatList
              ListEmptyComponent={<Nodatafound />}
              data={Data}
              renderItem={({item, index}) => {
                return (
                  <WaitItem
                    item={item}
                    navigation={navigation}
                    getDoucumentId={getDoucumentId}
                    getWaitList={getWaitList}
                  />
                );
              }}
            />
          </View>

          <Modal
            animationType="slide"
            transparent={true}
            visible={modal}
            onRequestClose={() => {
              setmodal(!modal);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: Family.Medium,
                    color: Colors.gray,
                    textAlign: 'center',
                  }}>
                  Wait for Response
                </Text>
                <Image
                  source={{
                    uri: 'https://cdn3.vectorstock.com/i/1000x1000/23/22/new-woman-avatar-icon-flat-vector-19152322.jpg',
                  }}
                  style={{
                    width: 70,
                    height: 70,
                    borderRadius: 35,
                    resizeMode: 'cover',
                    alignSelf: 'center',
                    marginVertical: 10,
                  }}
                />
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: Family.SemiBold,
                    color: Colors.gray,
                    textAlign: 'center',
                    marginVertical: 10,
                  }}>
                  Priyanshu Raghuvanshi
                </Text>
                <TouchableOpacity
                  style={{
                    backgroundColor: Colors.primary,
                    paddingVertical: 8,
                    width: '40%',
                    borderRadius: 5,
                    marginTop: 5,
                    alignSelf: 'center',
                  }}
                  onPress={() => setmodal(false)}>
                  <Text
                    style={{
                      fontSize: 11,
                      fontFamily: Family.Medium,
                      color: Colors.light,
                      textAlign: 'center',
                    }}>
                    Okay
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      )}
    </>
  );
};

export default Waitlist;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    // backgroundColor: '#FFF',
    // opacity: 0.5,
  },
  modalView: {
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 35,
  },
});
