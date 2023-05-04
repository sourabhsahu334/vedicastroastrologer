import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useState, useContext, useEffect} from 'react';
import ChatItem from './ChatItem';
import Global from '../Utitlies/Global';
import {UserAuthContext} from '../Context/UserAuthContext';
import Nodatafound from '../component/Nodatafound';
import Loader from '../component/Loader';

const ChatHistory = ({navigation}) => {
  const {User} = useContext(UserAuthContext);
  const [Loading, setLoading] = useState(false);

  const getChatHistory = async () => {
    setLoading(true);
    const response = await fetch(
      Global.BASE_URL + `chatHistory&astrologerId=${User}`,
    );
    const data = await response.json();
    setData(data.response);
    setLoading(false);
  };

  useEffect(() => {
    getChatHistory();
  }, []);

  const [Data, setData] = useState([]);
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
          <View style={{width: '95%', alignSelf: 'center', marginVertical: 0}}>
            <FlatList
              data={Data}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={<Nodatafound />}
              renderItem={({item, index}) => {
                return <ChatItem item={item} navigation={navigation} />;
              }}
            />
          </View>
        </View>
      )}
    </>
  );
};

export default ChatHistory;

const styles = StyleSheet.create({});
