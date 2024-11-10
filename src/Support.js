import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';
import React from 'react';
import Family from './Utitlies/Family';
import Colors from './Utitlies/Colors';
import {PhoneIcon} from 'react-native-heroicons/solid';

const Help = () => {
  const makeCall = phone => {
    let phoneNumber = '';

    if (Platform.OS === 'android') {
      phoneNumber = `tel:${phone}`;
    } else {
      phoneNumber = `telprompt:${phone}`;
    }

    Linking.openURL(phoneNumber);
  };

  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <Image
        source={require('./../assets/images/customer-service.png')}
        style={{
          width: '100%',
          height: 200,
          resizeMode: 'contain',
          marginVertical: 50,
        }}
      />
      <Text
        style={{fontSize: 20, fontFamily: Family.Medium, color: Colors.gray}}>
        Help & Support
      </Text>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 20,
          backgroundColor: Colors.primary,
          paddingHorizontal: 28,
          paddingVertical: 12,
          borderRadius: 10,
        }}
        onPress={() => makeCall(`+91 7470978479`)}>
        <TouchableOpacity>
          <PhoneIcon color={Colors.light} size={20} />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 16,
            fontFamily: Family.Medium,
            color: Colors.light,
            marginLeft: 10,
          }}>
          +91 74709 78479
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Help;

const styles = StyleSheet.create({});
