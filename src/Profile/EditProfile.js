import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useState, useContext, useEffect} from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {UserAuthContext} from '../Context/UserAuthContext';

const EditProfile = () => {
  const [ProfilePhotoUrl, setProfilePhotoUrl] = useState('');

  const User = useContext(UserAuthContext);

  const getUserPorfile = async () => {
    const response = await fetch(
      Global.BASE_URL + `myProfile&astrologerId=${1}`,
    );
    const data = await response.json();
    setData(data.response);
  };

  useEffect(() => {
    getUserPorfile();
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

  return (
    <View style={{flex: 1}}>
      <Image
        source={{uri: ''}}
        style={{
          width: 70,
          height: 70,
          borderRadius: 35,
          resizeMode: 'cover',
        }}
      />
      <TouchableOpacity>
        <Text>Select Photo</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({});
