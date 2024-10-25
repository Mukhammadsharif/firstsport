import React, {useContext, useEffect, useState} from 'react';
import {GlobalContext} from '../components/GlobalContext';
import {useGetRequest} from '../helpers/hooks';
import {BROADCASTS, TRANSLATE} from '../helpers/urls';
import BackgroundImage from '../assets/bg/translation_bg.png';
import {
  Dimensions,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LoadingModal from '../components/LoadingModal';
import Header from '../components/Header';
import {COLORS, FONTS} from '../helpers/colors';

const {width, height} = Dimensions.get('window');

export default function Broadcasts() {
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
        <Header />

        {translations?.length && broadcasts?.length ? (
          <View>
            <Text style={styles.title}>
              {translations.find(item => item?.en === 'Broadcasts')[lang]}
            </Text>

            <View style={styles.main}>
              <ScrollView contentContainerStyle={styles.scrollView}>
                {broadcasts?.map((item, index) => (
                  <View style={styles.broadcast} key={index}>
                    <View>
                      <Text style={styles.liga}>{item?.liga}</Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <Text style={styles.date}>{item?.date}</Text>
                        <Text style={styles.time}>{item?.time}</Text>
                      </View>
                    </View>

                    <View>
                      <Text style={styles.team}>{item?.team1}</Text>
                      <Text style={styles.team}>{item?.team2}</Text>
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
    fontFamily: FONTS.bold,
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  main: {
    width: '100%',
    alignSelf: 'center',
  },
  broadcast: {
    width: '100%',
    backgroundColor: COLORS.yellow,
    borderBottomWidth: 2,
    borderTopWidth: 2,
    borderColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  liga: {
    fontFamily: FONTS.medium,
    fontSize: 17,
    color: '#AC530A',
    textAlign: 'center',
  },
  team: {
    fontFamily: FONTS.medium,
    fontSize: 19,
    color: COLORS.drawerText,
    textAlign: 'center',
  },
  date: {
    fontFamily: FONTS.medium,
    fontSize: 15,
    color: COLORS.black,
    textAlign: 'center',
    marginTop: 10,
    paddingHorizontal: 3,
  },
  time: {
    fontFamily: FONTS.medium,
    fontSize: 15,
    color: COLORS.drawerText,
    textAlign: 'center',
    marginTop: 10,
    paddingHorizontal: 3,
  },
  scrollView: {
    flexGrow: 1,
    paddingBottom: 400,
  },
});
