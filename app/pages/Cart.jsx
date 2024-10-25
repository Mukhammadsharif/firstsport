import React, {useContext, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {GlobalContext} from '../components/GlobalContext';
import {useGetRequest, usePostRequest} from '../helpers/hooks';
import {ORDER, TRANSLATE} from '../helpers/urls';
import BackgroundImage from '../images/backgrounds/cart.png';
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
import CartItem from '../components/CartItem';
import {currency} from '../helpers/avatars';
import CustomButton from '../components/CustomButton';
import Loading from '../components/Loading';
import CartEmptyIcon from '../images/others/cart_empty.png';
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
      navigation.navigate('CartConfirm', {qrImage: response?.res});
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
        <Header background={COLORS.main} />

        {cart && cart.length && translations?.length ? (
          <View>
            <Text style={styles.title}>
              {translations.find(item => item?.en === 'Cart')[lang]}
            </Text>

            <View style={styles.main}>
              <ScrollView>
                {cart.map((item, index) => (
                  <CartItem item={item} key={index} />
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
              <CustomButton
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

      {!translations?.length || loading ? <Loading /> : ''}
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
  title: {
    fontFamily: FONTS.bold,
    color: '#FFFFFF',
    paddingTop: 50,
    fontSize: 36,
    textAlign: 'center',
    marginBottom: 30,
  },
  main: {
    width: '100%',
    alignSelf: 'center',
    paddingBottom: 40,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignSelf: 'center',
    backgroundColor: '#1854AC',
    paddingHorizontal: 40,
    paddingVertical: 40,
  },
  priceTitle: {
    fontFamily: FONTS.bold,
    color: COLORS.white,
    fontSize: 22,
  },
  price: {
    fontFamily: FONTS.interBold,
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
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
