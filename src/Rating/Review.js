import {StyleSheet, Text, View, FlatList, Image} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import {UserAuthContext} from '../Context/UserAuthContext';
import Global from '../Utitlies/Global';
import Family from '../Utitlies/Family';
import Colors from '../Utitlies/Colors';
import {StarIcon} from 'react-native-heroicons/solid';
import Loader from '../component/Loader';
import Nodatafound from '../component/Nodatafound';

const Review = () => {
  const [Data, setData] = useState([]);
  const [Loading, setLoading] = useState(false);
  const {User} = useContext(UserAuthContext);
  const getReview = async () => {
    setLoading(true);
    const response = await fetch(
      Global.BASE_URL + `astrologerReview&astrologerId=${User}`,
    );
    const data = await response.json();
    setData(data.response);
    setLoading(false);
  };
  useEffect(() => {
    getReview();
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
                      <View
                        style={{
                          width: '40%',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}>
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
                            fontSize: 12,
                            fontFamily: Family.Medium,
                            color: Colors.gray,
                          }}>
                          {item.date}
                        </Text>
                      </View>
                      <View style={{flexDirection: 'row'}}>
                        <StarIcon
                          color={item.star >= 1 ? Colors.primary : Colors.gray}
                          size={12}
                        />
                        <StarIcon
                          color={item.star >= 2 ? Colors.primary : Colors.gray}
                          size={12}
                        />
                        <StarIcon
                          color={item.star >= 3 ? Colors.primary : Colors.gray}
                          size={12}
                        />
                        <StarIcon
                          color={item.star >= 4 ? Colors.primary : Colors.gray}
                          size={12}
                        />
                        <StarIcon
                          color={item.star >= 5 ? Colors.primary : Colors.gray}
                          size={12}
                        />
                      </View>
                      <Text
                        style={{
                          width: '45%',
                          fontSize: 12,
                          fontFamily: Family.Medium,
                          color: Colors.gray,
                        }}>
                        {item.review}
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

export default Review;

const styles = StyleSheet.create({});
