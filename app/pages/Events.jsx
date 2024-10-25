import React, {useContext, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {GlobalContext} from '../components/GlobalContext';
import {useGetRequest} from '../helpers/hooks';
import {TRANSLATE} from '../helpers/urls';
import BackgroundImage from '../assets/bg/event_bg.png';
import {
  Dimensions,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LoadingModal from '../components/LoadingModal';
import Header from '../components/Header';
import {COLORS, FONTS} from '../helpers/colors';
import CardBg from '../assets/bg/card_bg.png';

const {width, height} = Dimensions.get('window');

export default function Events() {
  const navigation = useNavigation();
  const {lang} = useContext(GlobalContext);
  const [translations, setTranslations] = useState([]);
  const [loading, setLoading] = useState(false);
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
        <Header />

        {translations?.length ? (
          <View>
            <Text style={styles.title}>
              {translations.find(item => item?.en === 'Events')[lang]}
            </Text>

            <View style={styles.main}>
              <ScrollView contentContainerStyle={styles.scrollView}>
                <TouchableOpacity
                  style={styles.broadcast}
                  onPress={() => navigation.navigate('Grill')}>
                  <ImageBackground source={CardBg} style={styles.bgImage}>
                    <Text style={styles.liga}>
                      {
                        translations.find(
                          item => item.en === 'Grill on the terrace',
                        )[lang]
                      }
                    </Text>

                    <View
                      style={{
                        flexDirection: 'row',
                        width: '40%',
                        justifyContent: 'space-between',
                        alignSelf: 'center',
                      }}>
                      <Text style={styles.team}>27/10</Text>
                      <Text style={styles.team}>17:00</Text>
                    </View>
                  </ImageBackground>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.broadcast}
                  onPress={() => navigation.navigate('Travel')}>
                  <ImageBackground source={CardBg} style={styles.bgImage}>
                    <Text style={styles.liga}>
                      {
                        translations.find(
                          item => item.en === 'Travel to Italy',
                        )[lang]
                      }
                    </Text>

                    <View
                      style={{
                        flexDirection: 'row',
                        width: '40%',
                        justifyContent: 'space-between',
                        alignSelf: 'center',
                      }}>
                      <Text style={styles.team}>28/10</Text>
                      <Text style={styles.team}>14:00</Text>
                    </View>
                  </ImageBackground>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.broadcast}
                  onPress={() => navigation.navigate('Grill')}>
                  <ImageBackground source={CardBg} style={styles.bgImage}>
                    <Text style={styles.liga}>
                      {
                        translations.find(
                          item => item.en === 'Golf competition',
                        )[lang]
                      }
                    </Text>

                    <View
                      style={{
                        flexDirection: 'row',
                        width: '40%',
                        justifyContent: 'space-between',
                        alignSelf: 'center',
                      }}>
                      <Text style={styles.team}>28/10</Text>
                      <Text style={styles.team}>22:00</Text>
                    </View>
                  </ImageBackground>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.broadcast}
                  onPress={() => navigation.navigate('Lunch')}>
                  <ImageBackground source={CardBg} style={styles.bgImage}>
                    <Text style={styles.liga}>
                      {
                        translations.find(item => item.en === 'Autumn Lunch')[
                          lang
                        ]
                      }
                    </Text>

                    <View
                      style={{
                        flexDirection: 'row',
                        width: '40%',
                        justifyContent: 'space-between',
                        alignSelf: 'center',
                      }}>
                      <Text style={styles.team}>29/10</Text>
                      <Text style={styles.team}>19:00</Text>
                    </View>
                  </ImageBackground>
                </TouchableOpacity>
              </ScrollView>
            </View>
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
  bgImage: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontFamily: FONTS.bold,
    color: '#FFFFFF',
    fontSize: 24,
    textAlign: 'center',
  },
  main: {
    width: '100%',
    alignSelf: 'center',
  },
  broadcast: {
    width: '100%',
    backgroundColor: '#870C9D',
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: 30,
    height: 120,
  },
  liga: {
    fontFamily: FONTS.bold,
    fontSize: 19,
    color: COLORS.black,
    textAlign: 'center',
    marginTop: 10,
  },
  team: {
    marginTop: 10,
    fontFamily: FONTS.medium,
    fontSize: 19,
    color: COLORS.drawerText,
    textAlign: 'center',
  },
  date: {
    fontFamily: 'Jura-Bold',
    fontSize: 15,
    color: '#FF3FDC',
    textAlign: 'center',
    marginTop: 10,
    paddingHorizontal: 3,
  },
  time: {
    fontFamily: 'Jura-Bold',
    fontSize: 15,
    color: 'white',
    textAlign: 'center',
    marginTop: 10,
    paddingHorizontal: 3,
  },
  scrollView: {
    flexGrow: 1,
    paddingBottom: 400,
  },
  description: {
    fontFamily: 'Jura-Bold',
    fontSize: 15,
    color: 'white',
    opacity: 0.8,
  },
});
