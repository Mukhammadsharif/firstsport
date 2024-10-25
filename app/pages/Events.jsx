import React, {useContext, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {GlobalContext} from '../components/GlobalContext';
import {useGetRequest} from '../helpers/hooks';
import {TRANSLATE} from '../helpers/urls';
import BackgroundImage from '../images/backgrounds/cart.png';
import {
  Dimensions,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Loading from '../components/Loading';
import Header from '../components/Header';
import {COLORS, FONTS} from '../helpers/colors';

const {width, height} = Dimensions.get('window');

const eventLanguage = {
  homeStyleTasty: {
    de: 'Lecker wie zu Hause',
    en: 'Home-style Delicious',
    es: 'Sabor casero delicioso',
    fr: 'Délicieux fait maison',
    it: 'Gustoso come a casa',
    pl: 'Smacznie jak w domu',
    ru: 'Вкусно по-домашнему',
    sw: 'Hemlagat god',
  },
  sweetMasterClass: {
    de: 'Süßer Meisterkurs',
    en: 'Sweet Master Class',
    es: 'Clase maestra de dulces',
    fr: 'Atelier de douceurs',
    it: 'Masterclass dolce',
    pl: 'Słodki kurs mistrzowski',
    ru: 'Сладкий мастер-класс',
    sw: 'Sött mästerklass',
  },
  youthFootballLeague: {
    de: 'Jugendliga Fußball. Die besten Spiele 2024',
    en: 'Youth Football League. Best Matches 2024',
    es: 'Liga Juvenil de Fútbol. Mejores partidos 2024',
    fr: 'Ligue de football jeunesse. Meilleurs matchs 2024',
    it: 'Lega Giovanile di Calcio. Migliori partite 2024',
    pl: 'Młodzieżowa Liga Piłkarska. Najlepsze mecze 2024',
    ru: 'Юношеская футбольная лига. Лучшие матчи 2024',
    sw: 'Ungdoms fotbollsliga. Bästa matcherna 2024',
  },
  basketballQuiz: {
    de: 'Basketball-Quiz',
    en: 'Basketball Quiz',
    es: 'Concurso de baloncesto',
    fr: 'Quiz de basket-ball',
    it: 'Quiz di basket',
    pl: 'Quiz koszykarski',
    ru: 'Баскетбольный квиз',
    sw: 'Basketfrågesport',
  },
};

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
        <Header background={COLORS.main} />

        {translations?.length ? (
          <View>
            <Text style={styles.title}>
              {translations.find(item => item?.en === 'Events')[lang]}
            </Text>

            <View style={styles.main}>
              <ScrollView contentContainerStyle={styles.scrollView}>
                <TouchableOpacity
                  style={styles.broadcast}
                  onPress={() => navigation.navigate('Meal')}>
                  <Text style={styles.liga}>
                    {eventLanguage.homeStyleTasty[lang]}
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
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.broadcast}
                  onPress={() => navigation.navigate('Ice')}>
                  <Text style={styles.liga}>
                    {eventLanguage.sweetMasterClass[lang]}
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
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.broadcast}
                  onPress={() => navigation.navigate('Football')}>
                  <Text style={styles.liga}>
                    {eventLanguage.youthFootballLeague[lang]}
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
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.broadcast}
                  onPress={() => navigation.navigate('Basketball')}>
                  <Text style={styles.liga}>
                    {eventLanguage.basketballQuiz[lang]}
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
                </TouchableOpacity>
              </ScrollView>
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
  bgImage: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontFamily: FONTS.bold,
    color: '#FFFFFF',
    fontSize: 30,
    textAlign: 'center',
    marginTop: 30,
  },
  main: {
    width: '100%',
    alignSelf: 'center',
  },
  broadcast: {
    width: '100%',
    backgroundColor: '#071D36',
    flexDirection: 'column',
    marginTop: 30,
    height: 120,
  },
  liga: {
    fontFamily: FONTS.bold,
    fontSize: 22,
    color: COLORS.white,
    textAlign: 'center',
    marginTop: 10,
    borderBottomWidth: 1,
    borderColor: COLORS.card,
    paddingBottom: 10,
    width: '80%',
    alignSelf: 'center',
  },
  team: {
    marginTop: 10,
    fontFamily: FONTS.bold,
    fontSize: 19,
    color: COLORS.white,
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
