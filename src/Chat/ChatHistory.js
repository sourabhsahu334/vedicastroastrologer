import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useState, useContext, useEffect} from 'react';
import ChatItem from './ChatItem';
import Global from '../Utitlies/Global';
import {UserAuthContext} from '../Context/UserAuthContext';
import Nodatafound from '../component/Nodatafound';
import Loader from '../component/Loader';
import { http } from '../utils/AxiosInstance';

const ChatHistory = ({navigation}) => {
  const {User} = useContext(UserAuthContext);
  const [Loading, setLoading] = useState(false);

  const getChatHistory = async () => {
    try {
      setLoading(true);
      const {data} = await http.get("/",{params:{
        method:"chatHistory",
        astrologerId:User
      }}
      // `astrologerFollower&astrologerId=1`,
      );
      console.log(data,"data")
      // const data = await response?.data;
      setData(data.response);
      setLoading(false);
     } catch (error) {
      console.log(error,'e')
     }
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
          {/* <Loader isLoading={Loading} /> */}
          <Text style={{color:"black"}}>No data found</Text>
        </View>
      ) : (
        <View style={{flex: 1}}>
          <View style={{width: '95%', alignSelf: 'center', marginVertical: 0}}>
            <FlatList
              data={Data}
              inverted={true}
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
