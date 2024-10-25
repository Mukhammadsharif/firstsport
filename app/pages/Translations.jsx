import React, {useContext, useEffect, useState} from 'react';
import {GlobalContext} from '../components/GlobalContext';
import {useGetRequest} from '../helpers/hooks';
import {BROADCASTS, TRANSLATE} from '../helpers/urls';
import BackgroundImage from '../images/backgrounds/cart.png';
import {
  Dimensions,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Loading from '../components/Loading';
import Header from '../components/Header';
import {COLORS, FONTS} from '../helpers/colors';

const {width, height} = Dimensions.get('window');

export default function Translations() {
  const {lang} = useContext(GlobalContext);
  const [translations, setTranslations] = useState([]);
  const [broadcasts, setBroadcasts] = useState([]);
  const [loading, setLoading] = useState(false);
  const getLanguagesRequest = useGetRequest({url: TRANSLATE});
  const broadcastsRequest = useGetRequest({url: BROADCASTS});

  const getLanguages = async () => {
    const {response} = await getLanguagesRequest.request();
    if (response?.length) {
      setTranslations(response);
    }
  };

  const getBroadcasts = async () => {
    const {response} = await broadcastsRequest.request();
    if (response?.length) {
      setBroadcasts(response);
    }
  };

  useEffect(() => {
    getLanguages();
    getBroadcasts();
  }, []);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ImageBackground source={BackgroundImage} style={styles.imageBackground}>
        <Header background={COLORS.main} />

        {translations?.length && broadcasts?.length ? (
          <View>
            <Text style={styles.title}>
              {translations.find(item => item?.en === 'Broadcasts')[lang]}
            </Text>

            <View style={styles.main}>
              <ScrollView contentContainerStyle={styles.scrollView}>
                {broadcasts?.map((item, index) => (
                  <View style={styles.broadcast} key={index}>
                    <View style={styles.ligaContainer}>
                      <Text style={styles.liga}>{item?.liga}</Text>
                    </View>

                    <View style={styles.container}>
                      <Text style={styles.team}>
                        {item?.team1} - {item?.team2}
                      </Text>

                      <View style={styles.line} />

                      <Text style={styles.date}>{item?.date}</Text>
                      <Text style={styles.time}>{item?.time}</Text>
                    </View>
                  </View>
                ))}
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
  headerMask: {
    width: '100%',
    objectFit: 'contain',
    marginTop: -20,
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
    fontFamily: FONTS.interBold,
    color: '#FFFFFF',
    fontSize: 25,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  main: {
    width: '100%',
    alignSelf: 'center',
  },
  broadcast: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 15,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  ligaContainer: {
    backgroundColor: COLORS.card,
    width: 80,
    height: 80,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'c',
  },
  liga: {
    fontFamily: FONTS.interBold,
    fontSize: 15,
    color: COLORS.main,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  team: {
    fontFamily: FONTS.interBold,
    fontSize: 20,
    color: COLORS.white,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  date: {
    fontFamily: FONTS.bold,
    fontSize: 18,
    color: COLORS.white,
    textAlign: 'center',
    marginTop: 10,
    paddingHorizontal: 3,
  },
  time: {
    fontFamily: FONTS.bold,
    fontSize: 18,
    color: COLORS.white,
    textAlign: 'center',
    marginTop: 5,
    paddingHorizontal: 3,
  },
  scrollView: {
    flexGrow: 1,
    paddingBottom: 400,
  },
  container: {
    width: '80%',
  },
  line: {
    height: 2,
    width: '70%',
    backgroundColor: COLORS.card,
    alignSelf: 'center',
    marginTop: 10,
  },
});
