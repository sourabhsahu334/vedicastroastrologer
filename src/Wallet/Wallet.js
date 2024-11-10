import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Modal,
  TextInput,
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import Colors from '../Utitlies/Colors';
import Family from '../Utitlies/Family';
import WalletItem from './WalletItem';
import Global from '../Utitlies/Global';
import {UserAuthContext} from '../Context/UserAuthContext';
import Loader from '../component/Loader';
import Nodatafound from '../component/Nodatafound';

const Wallet = ({navigation}) => {
  const [Data, setData] = useState([]);
  const [Balance, setBalance] = useState('');
  const [Loading, setLoading] = useState(false);
  const [modal, setmodal] = useState(false);
  const {User} = useContext(UserAuthContext);
  const getWalletHistory = async () => {
    setLoading(true);
    const response = await fetch(
      Global.BASE_URL + `astrologerWallet&astrologerId=${User}`,
    );
    const data = await response.json();
    setBalance(data.balance);
    setData(data.trans);
    setLoading(false);
  };
  useEffect(() => {
    getWalletHistory();
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
        <View>
          <View
            style={{
              backgroundColor: Colors.primary,
              width: '95%',
              borderRadius: 10,
              alignSelf: 'center',
              marginTop: 10,
              paddingHorizontal: 15,
              paddingVertical: 15,
              height: 150,
            }}>
            <Text
              style={{
                fontSize: 14,
                fontFamily: Family.Medium,
                color: Colors.light,
              }}>
              Your Balance
            </Text>
            <Text
              style={{
                fontSize: 36,
                fontFamily: Family.SemiBold,
                color: Colors.light,
                textAlign: 'left',
              }}>
              ₹ {Balance}
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: Colors.light,
                paddingVertical: 5,
                width: '35%',
                borderRadius: 5,
                marginTop: 5,
              }}
              onPress={() => setmodal(true)}>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: Family.Medium,
                  color: Colors.primary,
                  textAlign: 'center',
                }}>
                Widthraw Now
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{width: '95%', alignSelf: 'center'}}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: Family.Medium,
                color: Colors.gray,
                marginVertical: 10,
              }}>
              Recent Transactions :
            </Text>
            <FlatList
              data={Data}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={<Nodatafound />}
              renderItem={({item, index}) => {
                return (
                  <WalletItem
                    item={item}
                    navigation={navigation}
                    index={index}
                    length={Data.length}
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
                  }}>
                  Enter Amount
                </Text>
                <TextInput
                  placeholder="Enter Amount"
                  placeholderTextColor={Colors.gray}
                  style={{
                    padding: 10,
                    borderWidth: 1,
                    borderColor: Colors.gray,
                    borderRadius: 10,
                    marginVertical: 15,
                  }}
                />
                {Balance > 99 ? null : (
                  <Text
                    style={{
                      fontFamily: Family.Medium,
                      fontSize: 12,
                      color: Colors.primary,
                    }}>
                    Minimum Widthraw Amount is Rs. 100.
                  </Text>
                )}
                <TouchableOpacity
                  style={{
                    backgroundColor:
                      Balance > 99 ? Colors.primary : Colors.lightdark,
                    paddingVertical: 10,
                    width: '40%',
                    borderRadius: 5,
                    marginTop: 5,
                  }}
                  onPress={() => console.log('withdraw')}
                  disabled={Balance > 99 ? false : true}>
                  <Text
                    style={{
                      fontSize: 13,
                      fontFamily: Family.Medium,
                      color: Balance > 99 ? Colors.light : Colors.dark,
                      textAlign: 'center',
                    }}>
                    Widthraw Now
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

export default Wallet;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#000',
    opacity: 0.9,
  },
  modalView: {
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 35,
  },
});
