import React, {useContext, useEffect, useState} from 'react';
import BackgroundImage from '../images/backgrounds/cart.png';
import {
  Dimensions,
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
} from 'react-native';
import {GlobalContext} from '../components/GlobalContext';
import {useGetRequest} from '../helpers/hooks';
import {TRANSLATE} from '../helpers/urls';
import BookConfirmIcon from '../images/others/reserve_icon.png';
import Header from '../components/Header';
import {COLORS, FONTS} from '../helpers/colors';

const {width, height} = Dimensions.get('window');

export default function ReserveConfirm() {
  const {lang} = useContext(GlobalContext);
  const [translations, setTranslations] = useState([]);
  const getLanguagesRequest = useGetRequest({url: TRANSLATE});

  const getLanguages = async () => {
    const {response} = await getLanguagesRequest.request();
    if (response?.length) {
      setTranslations(response);
    }
  };

  useEffect(() => {
    getLanguages();
  }, []);
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ImageBackground source={BackgroundImage} style={styles.imageBackground}>
        <Header background={COLORS.main} />

        <Image source={BookConfirmIcon} style={styles.qrImage} />

        {translations?.length ? (
          <Text style={styles.text}>
            {
              translations.find(
                item => item?.en === 'Your table has been successfully booked!',
              )[lang]
            }
          </Text>
        ) : (
          ''
        )}
      </ImageBackground>
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
  qrImage: {
    width: width / 2,
    height: width / 2,
    alignSelf: 'center',
    marginTop: height / 3.5,
  },
  text: {
    color: '#FFFFFF',
    fontFamily: FONTS.interBold,
    fontSize: 18,
    textAlign: 'center',
    paddingHorizontal: 20,
    marginTop: 30,
    fontWeight: 'bold',
  },
});
