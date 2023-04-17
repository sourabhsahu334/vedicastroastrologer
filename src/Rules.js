import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React from 'react';
import Family from './Utitlies/Family';
import Colors from './Utitlies/Colors';

const Rules = () => {
  const Rules = [
    '1. Never be rude to any customer',
    '2. Never share your personal details with any customer',
    '3. Daily online time must be more than 8 hours, on an average',
    '4. Customer satisfaction score must be more than 60%',
    '5. Never share any internal policies with customers',
    '6. Never defame any Astrologer or Astrotalk anywhere',
    '7. Never reach out to any customer outside the app',
    '8. Never share the private conversation of any customer with other customers or their relatives',
    '9. Never scold or harass any customer just because they gave you a bad rating',
    '1. कभी भी किसी ग्राहक के साथ बदतमीजी न करें',
    '2. अपनी व्यक्तिगत जानकारी कभी भी किसी ग्राहक के साथ साझा न करें',
    '3. दैनिक ऑनलाइन समय औसतन 8 घंटे से अधिक होना चाहिए',
    '4. ग्राहक संतुष्टि स्कोर 60% से अधिक होना चाहिए',
    '5. ग्राहकों के साथ कभी भी कोई आंतरिक नीति साझा न करें',
    '6. कभी भी किसी ज्योतिषी या एस्ट्रोटॉक को कहीं भी बदनाम न करें',
    '7. ऐप के बाहर कभी भी किसी ग्राहक तक न पहुंचें ',
    '8. कभी भी किसी ग्राहक की निजी बातचीत को अन्य ग्राहकों या उनके रिश्तेदारों से साझा न करें',
    '9. कभी भी किसी ग्राहक को सिर्फ इसलिए डांटे या परेशान न करें क्योंकि उसने आपको खराब रेटिंग दी है',
  ];
  return (
    <View style={{flex: 1}}>
      <ScrollView
        style={{width: '90%', alignSelf: 'center', marginVertical: 10}}
        showsVerticalScrollIndicator={false}>
        <Text
          style={{
            fontSize: 16,
            fontFamily: Family.Regular,
            color: Colors.primary,
            marginTop: 5,
            textDecorationLine: 'underline',
          }}>
          Important GuideLines:
        </Text>
        <View>
          {Rules.map(value => {
            return (
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: Family.Regular,
                  marginTop: 5,
                  color: Colors.dark,
                }}>
                {value}
              </Text>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default Rules;

const styles = StyleSheet.create({});
