import {StyleSheet, Text, View, FlatList, Image} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import {UserAuthContext} from '../Context/UserAuthContext';
import Global from '../Utitlies/Global';
import Family from '../Utitlies/Family';
import Colors from '../Utitlies/Colors';
import Loader from '../component/Loader';
import Nodatafound from '../component/Nodatafound';
import { http } from '../utils/AxiosInstance';

const Followers = () => {
  const [Data, setData] = useState([]);
  const [Loading, setLoading] = useState(false);
  const {User} = useContext(UserAuthContext);
  const getFollowers = async () => {
     try {
      setLoading(true);
      const {data} = await http.get("/",{params:{
        method:"astrologerFollower",
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
    getFollowers();
  }, []);

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
          <FlatList
            data={Data}
            ListEmptyComponent={<Nodatafound />}
            style={{marginTop: 5}}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => {
              return (
                <View
                  style={{
                    backgroundColor: Colors.light,
                    paddingVertical: 10,
                    paddingHorizontal: 15,
                    marginVertical: 5,
                    width: '95%',
                    alignSelf: 'center',
                    borderRadius: 15,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={{uri: item.photo}}
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 35,
                        resizeMode: 'cover',
                      }}
                    />
                    <View style={{marginLeft: 40}}>
                      <Text
                        style={{
                          fontSize: 14,
                          fontFamily: Family.Medium,
                          color: Colors.gray,
                        }}>
                        {item.name}
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          fontFamily: Family.Medium,
                          color: Colors.gray,
                        }}>
                        {item.date}
                      </Text>
                    </View>
                  </View>
                </View>
              );
            }}
          />
        </View>
      )}
    </>
  );
};

export default Followers;

const styles = StyleSheet.create({});
