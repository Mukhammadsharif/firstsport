import React, {useContext, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {GlobalContext} from '../components/GlobalContext';
import {useGetRequest, usePostRequest} from '../helpers/hooks';
import {BOOKING, TRANSLATE} from '../helpers/urls';
import BackgroundImage from '../images/backgrounds/cart.png';
import {
  Dimensions,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import CustomButton from '../components/CustomButton';
import Loading from '../components/Loading';
import Header from '../components/Header';
import {COLORS, FONTS} from '../helpers/colors';

const {width, height} = Dimensions.get('window');

export default function Reserve() {
  const navigation = useNavigation();
  const {lang} = useContext(GlobalContext);
  const [translations, setTranslations] = useState([]);
  const [loading, setLoading] = useState(false);
  const getLanguagesRequest = useGetRequest({url: TRANSLATE});
  const bookingRequest = usePostRequest({url: BOOKING});

  const getLanguages = async () => {
    const {response} = await getLanguagesRequest.request();
    if (response?.length) {
      setTranslations(response);
    }
  };

  const booking = async () => {
    setLoading(true);
    const {response} = await bookingRequest.request();
    if (response) {
      navigation.navigate('ReserveConfirm');
      setLoading(false);
    }
  };

  useEffect(() => {
    getLanguages();
  }, []);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ImageBackground source={BackgroundImage} style={styles.imageBackground}>
        <Header background={COLORS.main} />

        {translations?.length ? (
          <View>
            <Text style={styles.title}>
              {translations.find(item => item?.en === 'Booking')[lang]}
            </Text>

            <View style={styles.main}>
              <ScrollView>
                <TextInput
                  style={styles.textInput}
                  placeholderTextColor={COLORS.placeholder}
                  placeholder={
                    translations.find(item => item?.en === 'Your Name')[lang]
                  }
                />

                <TextInput
                  style={styles.textInput}
                  placeholderTextColor={COLORS.placeholder}
                  placeholder={
                    translations.find(item => item?.en === 'E-mail')[lang]
                  }
                />

                <TextInput
                  style={styles.textInput}
                  placeholderTextColor={COLORS.placeholder}
                  placeholder={
                    translations.find(item => item?.en === 'Your phone')[lang]
                  }
                />

                <TextInput
                  style={styles.textInput}
                  placeholderTextColor={COLORS.placeholder}
                  placeholder={
                    translations.find(item => item?.en === 'Select time')[lang]
                  }
                />

                <TextInput
                  style={styles.textInput}
                  placeholderTextColor={COLORS.placeholder}
                  placeholder={
                    translations.find(item => item?.en === 'Select date')[lang]
                  }
                />
              </ScrollView>

              <View style={{marginTop: 50}}>
                <CustomButton
                  text={
                    translations.find(item => item?.en === 'Book now')[lang]
                  }
                  onPress={() => booking()}
                />
              </View>
            </View>
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
  scrollView: {
    padding: 20,
  },
  title: {
    fontFamily: FONTS.bold,
    color: '#FFFFFF',
    padding: 50,
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  main: {
    width: '100%',
    backgroundColor: COLORS.card,
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  textInput: {
    height: 45,
    backgroundColor: COLORS.white,
    width: '90%',
    alignSelf: 'center',
    marginTop: 10,
    borderRadius: 25,
    paddingLeft: 20,
    fontSize: 15,
    fontFamily: FONTS.interMedium,
    marginBottom: 10,
  },
});
