import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useState, useContext, useEffect} from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {UserAuthContext} from '../Context/UserAuthContext';
import Global from '../Utitlies/Global';
import Family from '../Utitlies/Family';
import Colors from '../Utitlies/Colors';
import Button from '../component/Button';
import Loader from '../component/Loader';

const EditProfile = () => {
  const [ProfilePhotoUrl, setProfilePhotoUrl] = useState('');
  const [Education, setEducation] = useState('');
  const [Website, setWebsite] = useState('');
  const [Youtube, setYoutube] = useState('');
  const [Instagram, setInstagram] = useState('');
  const [University, setUniversity] = useState('');
  const [Description, setDescription] = useState('');
  const {User} = useContext(UserAuthContext);
  const [Loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    const response = await fetch(
      Global.BASE_URL + `myProfiles&astrologerId=${User}`,
    );
    const data = await response.json();
    setProfilePhotoUrl(data.response.photo);
    setEducation(data.response.education);
    setUniversity(data.response.university);
    setWebsite(data.response.website);
    setInstagram(data.response.instagram);
    setYoutube(data.response.youtube);
    setDescription(data.response.description);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const ProfileImagePicker = async () => {
    let options = {
      saveToPhotos: true,
      mediaType: 'photo',
    };

    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      const result = await launchImageLibrary(options);
      setProfilePhotoUrl(result.assets[0].uri);
    }
  };
  const Submit = async () => {
    const response = await fetch(
      Global.BASE_URL +
        `updateProfile&education=${Education}&university=${University}&youtube=${Youtube}&instagram=${Instagram}&website=${Website}&astrologerId=${User}&description=${Description}`,
    );
    const data = await response.json();
    Alert.alert(data.message);
  };

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
        <ScrollView ScrollView style={{flex: 1}}>
          {/* {ProfilePhotoUrl == '' ? null : (
            <Image
              source={{uri: ProfilePhotoUrl}}
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                resizeMode: 'cover',
                alignSelf: 'center',
                marginTop: 10,
              }}
            />
          )}
          <TouchableOpacity onPress={ProfileImagePicker}>
            <Text
              style={{
                textAlign: 'center',
                marginTop: 5,
                fontFamily: Family.Medium,
                color: Colors.gray,
              }}>
              Select Photo
            </Text>
          </TouchableOpacity> */}

          <View
            style={{
              backgroundColor: Colors.light,
              padding: 15,
              borderRadius: 10,
              width: '95%',
              alignSelf: 'center',
              marginVertical: 15,
            }}>
            <View>
              <Text
                style={{
                  marginVertical: 5,
                  fontFamily: Family.Medium,
                  color: Colors.gray,
                }}>
                Education
              </Text>
              <TextInput
                placeholder="Enter your Qualification"
                style={{
                  borderWidth: 1,
                  fontSize: 14,
                  color: Colors.gray,
                  borderRadius: 5,
                  paddingHorizontal: 15,
                }}
                value={Education}
                onChangeText={setEducation}
                placeholderTextColor={Colors.gray}
              />
            </View>
            <View>
              <Text
                style={{
                  marginVertical: 5,
                  fontFamily: Family.Medium,
                  color: Colors.gray,
                }}>
                University
              </Text>
              <TextInput
                placeholder="Enter your name of University"
                style={{
                  borderWidth: 1,
                  fontSize: 14,
                  color: Colors.gray,
                  borderRadius: 5,
                  paddingHorizontal: 15,
                }}
                value={University}
                onChangeText={setUniversity}
                placeholderTextColor={Colors.gray}
              />
            </View>
            <View>
              <Text
                style={{
                  marginVertical: 5,
                  fontFamily: Family.Medium,
                  color: Colors.gray,
                }}>
                Website
              </Text>
              <TextInput
                placeholder="Enter your website Link"
                style={{
                  borderWidth: 1,
                  fontSize: 14,
                  color: Colors.gray,
                  borderRadius: 5,
                  paddingHorizontal: 15,
                }}
                value={Website}
                onChangeText={setWebsite}
                placeholderTextColor={Colors.gray}
              />
            </View>
            <View>
              <Text
                style={{
                  marginVertical: 5,
                  fontFamily: Family.Medium,
                  color: Colors.gray,
                }}>
                Youtube
              </Text>
              <TextInput
                placeholder="Enter your youtube Link"
                style={{
                  borderWidth: 1,
                  fontSize: 14,
                  color: Colors.gray,
                  borderRadius: 5,
                  paddingHorizontal: 15,
                }}
                value={Youtube}
                onChangeText={setYoutube}
                placeholderTextColor={Colors.gray}
              />
            </View>
            <View>
              <Text
                style={{
                  marginVertical: 5,
                  fontFamily: Family.Medium,
                  color: Colors.gray,
                }}>
                Instagram
              </Text>
              <TextInput
                placeholder="Enter your Instagram Link"
                style={{
                  borderWidth: 1,
                  fontSize: 14,
                  color: Colors.gray,
                  borderRadius: 5,
                  paddingHorizontal: 15,
                }}
                placeholderTextColor={Colors.gray}
                onChangeText={setInstagram}
                value={Instagram}
              />
            </View>
            <View>
              <Text
                style={{
                  marginVertical: 5,
                  fontFamily: Family.Medium,
                  color: Colors.gray,
                }}>
                Description
              </Text>
              <View style={{borderWidth: 1, borderRadius: 5, minHeight: 100}}>
                <TextInput
                  placeholder="Write about your self .........."
                  style={{
                    fontSize: 14,
                    color: Colors.gray,
                    paddingHorizontal: 15,
                  }}
                  placeholderTextColor={Colors.gray}
                  onChangeText={setDescription}
                  value={Description}
                />
              </View>
            </View>
            <View style={{marginTop: 20}}>
              <Button action={Submit} name={'Update Profile'} />
            </View>
          </View>
        </ScrollView>
      )}
    </>
  );
};

export default EditProfile;

const styles = StyleSheet.create({});
