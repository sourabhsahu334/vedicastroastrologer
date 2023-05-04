import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useContext, useState} from 'react';
import Global from '../Utitlies/Global';
import {UserAuthContext} from '../Context/UserAuthContext';
import Colors from '../Utitlies/Colors';
import Family from '../Utitlies/Family';
import {PencilSquareIcon} from 'react-native-heroicons/solid';
import Loader from '../component/Loader';

const Profile = ({navigation}) => {
  const [Data, setData] = useState({});
  const [Loading, setLoading] = useState(false);
  const {User} = useContext(UserAuthContext);

  const getData = async () => {
    setLoading(true);
    const response = await fetch(
      Global.BASE_URL + `myProfiles&astrologerId=${User}`,
    );
    const result = await response.json();
    setData(result.response);
    setLoading(false);
  };

  useEffect(() => {
    getData();
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
        <ScrollView style={{flex: 1}}>
          <View
            style={{
              flexDirection: 'row',
              padding: 15,
              alignItems: 'center',
              backgroundColor: Colors.light,
              width: '95%',
              alignSelf: 'center',
              marginTop: 10,
              borderRadius: 10,
            }}>
            <TouchableOpacity
              style={{position: 'absolute', top: 10, right: 15}}
              onPress={() => navigation.navigate('EditProfile')}>
              <PencilSquareIcon color={Colors.primary} size={24} />
            </TouchableOpacity>
            {Data.photo == null ? null : (
              <Image
                source={{uri: Data.photo}}
                style={{
                  width: 70,
                  height: 70,
                  borderRadius: 35,
                  resizeMode: 'cover',
                }}
              />
            )}
            <View style={{marginLeft: 20}}>
              <Text
                style={{
                  color: Colors.dark,
                  fontFamily: Family.Medium,
                  fontSize: 14,
                }}>
                {Data.name}
              </Text>

              <Text
                style={{
                  color: Colors.dark,
                  fontFamily: Family.SemiBold,
                  fontSize: 12,
                }}>
                Expertise: {Data.expertise}
              </Text>

              <Text
                style={{
                  color: Colors.dark,
                  fontFamily: Family.SemiBold,
                  fontSize: 12,
                }}>
                Profile Name : {Data.profileName}
              </Text>
            </View>
          </View>
          <View
            style={{
              width: '95%',
              alignSelf: 'center',
              marginTop: 10,
              backgroundColor: Colors.light,
              padding: 20,
              borderRadius: 10,
              marginBottom: 20,
            }}>
            <Text
              style={{
                color: Colors.gray,
                fontFamily: Family.SemiBold,
                textDecorationLine: 'underline',
              }}>
              Profile Details:
            </Text>
            <View style={{marginVertical: 10}}>
              <Text style={{color: Colors.gray, fontFamily: Family.SemiBold}}>
                Language:
              </Text>
              <Text style={{color: Colors.gray, fontFamily: Family.Regular}}>
                {Data.language}
              </Text>
            </View>

            <View style={{marginVertical: 10}}>
              <Text style={{color: Colors.gray, fontFamily: Family.SemiBold}}>
                Language:
              </Text>
              <Text style={{color: Colors.gray, fontFamily: Family.Regular}}>
                {Data.language}
              </Text>
            </View>

            <View style={{marginVertical: 10}}>
              <Text style={{color: Colors.gray, fontFamily: Family.SemiBold}}>
                Experience :
              </Text>
              <Text style={{color: Colors.gray, fontFamily: Family.Regular}}>
                {Data.expirence} Years
              </Text>
            </View>

            <View style={{marginVertical: 10}}>
              <Text style={{color: Colors.gray, fontFamily: Family.SemiBold}}>
                Contact Number :
              </Text>
              <Text style={{color: Colors.gray, fontFamily: Family.Regular}}>
                {Data.mobile}
              </Text>
            </View>

            <View style={{marginVertical: 10}}>
              <Text style={{color: Colors.gray, fontFamily: Family.SemiBold}}>
                Description :
              </Text>
              <Text style={{color: Colors.gray, fontFamily: Family.Regular}}>
                {Data.description}
              </Text>
            </View>

            <View style={{marginVertical: 10}}>
              <Text style={{color: Colors.gray, fontFamily: Family.SemiBold}}>
                Education :
              </Text>
              <Text style={{color: Colors.gray, fontFamily: Family.Regular}}>
                {Data.education == '' ? 'Data not found' : Data.education}
              </Text>
            </View>

            <View style={{marginVertical: 10}}>
              <Text style={{color: Colors.gray, fontFamily: Family.SemiBold}}>
                University / School :
              </Text>
              <Text style={{color: Colors.gray, fontFamily: Family.Regular}}>
                {Data.university == '' ? 'Data not found' : Data.university}
              </Text>
            </View>

            <View style={{marginVertical: 10}}>
              <Text style={{color: Colors.gray, fontFamily: Family.SemiBold}}>
                Website :
              </Text>
              <Text style={{color: Colors.gray, fontFamily: Family.Regular}}>
                {Data.website == '' ? 'Link not found' : Data.website}
              </Text>
            </View>

            <View style={{marginVertical: 10}}>
              <Text style={{color: Colors.gray, fontFamily: Family.SemiBold}}>
                Youtube :
              </Text>
              <Text style={{color: Colors.gray, fontFamily: Family.Regular}}>
                {Data.youtube == '' ? 'Link not found' : Data.youtube}
              </Text>
            </View>

            <View style={{marginVertical: 10}}>
              <Text style={{color: Colors.gray, fontFamily: Family.SemiBold}}>
                Instagram :
              </Text>
              <Text style={{color: Colors.gray, fontFamily: Family.Regular}}>
                {Data.instagram == '' ? 'Link not found' : Data.instagram}
              </Text>
            </View>
          </View>
        </ScrollView>
      )}
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({});
