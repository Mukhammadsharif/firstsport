import React, {useContext, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {GlobalContext} from '../components/GlobalContext';
import {useGetRequest, usePostRequest} from '../helpers/hooks';
import {ORDER, TRANSLATE} from '../helpers/urls';
import BackgroundImage from '../assets/bg/cart_bg.png';
import {
  Dimensions,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CartCard from '../components/CartCard';
import {currency} from '../helpers/avatars';
import ButtonLight from '../components/ButtonLight';
import LoadingModal from '../components/LoadingModal';
import CartEmptyIcon from '../assets/images/cart_sad.png';
import Header from '../components/Header';
import {COLORS, FONTS} from '../helpers/colors';

const {width, height} = Dimensions.get('window');

export default function Cart() {
  const navigation = useNavigation();
  const {lang, refresh, setRefresh} = useContext(GlobalContext);
  const [translations, setTranslations] = useState([]);
  const [cart, setCart] = useState([]);
  const [price, setPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const getLanguagesRequest = useGetRequest({url: TRANSLATE});
  const orderRequest = usePostRequest({url: ORDER});

  const getLanguages = async () => {
    const {response} = await getLanguagesRequest.request();
    if (response?.length) {
      setTranslations(response);
    }
  };

  const order = async () => {
    setLoading(true);
    const {response} = await orderRequest.request();
    if (response) {
      await AsyncStorage.setItem('cartList', '');
      navigation.navigate('Order', {qrImage: response?.res});
      setLoading(false);
      setRefresh(!refresh);
    }
  };

  useEffect(() => {
    getLanguages();
  }, []);

  useEffect(() => {
    const getCart = async () => {
      const list = await AsyncStorage.getItem('cartList');
      if (list?.length) {
        setCart(JSON.parse(list));
      } else {
        setCart(null);
      }
    };

    getCart();
  }, [refresh]);

  useEffect(() => {
    if (cart?.length) {
      let sum = 0;
      cart.forEach(product => {
        sum += product.price * product.count;
      });

      setPrice(sum);
    }
  }, [cart, refresh]);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ImageBackground source={BackgroundImage} style={styles.imageBackground}>
        <Header />

        {cart && cart.length && translations?.length ? (
          <View>
            <Text style={styles.title}>
              {translations.find(item => item?.en === 'Cart')[lang]}
            </Text>

            <View style={styles.main}>
              <ScrollView>
                {cart.map((item, index) => (
                  <CartCard item={item} key={index} />
                ))}

                <View style={styles.row}>
                  <Text style={styles.priceTitle}>
                    {
                      translations.find(item => item?.en === 'Total Amount')[
                        lang
                      ]
                    }
                    :
                  </Text>

                  <View style={styles.currency}>
                    <Text style={styles.currencyText}>
                      <Text style={styles.price}>
                        {price} {currency}
                      </Text>
                    </Text>
                  </View>
                </View>
              </ScrollView>
            </View>

            <View style={{marginTop: 50}}>
              <ButtonLight
                text={
                  translations.find(item => item?.en === 'Place Order')[lang]
                }
                onPress={() => order()}
              />
            </View>
          </View>
        ) : translations?.length ? (
          <View>
            <Image source={CartEmptyIcon} style={styles.cartEmptyIcon} />

            <Text style={[styles.title, {textAlign: 'center'}]}>
              {
                translations.find(item => item?.en === 'Your cart is empty')[
                  lang
                ]
              }
            </Text>

            <View style={styles.line} />
          </View>
        ) : (
          ''
        )}
      </ImageBackground>

      {!translations?.length || loading ? <LoadingModal /> : ''}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    width: '100%',
    flex: 1,
  },
  imageBackground: {
    width: width,
    height: height,
  },
  headerMask: {
    width: '100%',
    objectFit: 'contain',
    marginTop: -20,
  },
  scrollView: {
    padding: 20,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  backIcon: {
    width: 25,
    height: 25,
    objectFit: 'contain',
  },
  title: {
    fontFamily: FONTS.extraBold,
    color: '#FFFFFF',
    paddingTop: 50,
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 30,
  },
  main: {
    width: '100%',
    backgroundColor: COLORS.yellow,
    alignSelf: 'center',
    paddingVertical: 40,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '70%',
    marginTop: 40,
    alignSelf: 'center',
  },
  priceTitle: {
    fontFamily: FONTS.extraBold,
    color: COLORS.drawerText,
    fontSize: 18,
  },
  price: {
    fontFamily: FONTS.extraBold,
    color: COLORS.drawerText,
    fontSize: 18,
  },
  cartEmptyIcon: {
    alignSelf: 'center',
    width: width / 3,
    height: width / 3,
    marginTop: width / 3,
  },
  line: {
    height: 2,
    backgroundColor: 'white',
    width: width / 5,
    alignSelf: 'center',
  },
});
