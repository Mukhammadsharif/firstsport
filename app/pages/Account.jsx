import React, {useContext, useEffect, useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {GlobalContext} from '../components/GlobalContext';
import {
  Dimensions,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useGetRequest} from '../helpers/hooks';
import {TRANSLATE} from '../helpers/urls';
import Loading from '../components/Loading';
import BackgroundImage from '../images/backgrounds/account.png';
import AvatarIcon from '../images/others/empty_ava.png';
import Avatars from '../components/Avatars';
import {avatars} from '../helpers/avatars';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../components/Header';
import {COLORS, FONTS} from '../helpers/colors';

const {width, height} = Dimensions.get('window');

export default function Account() {
  const navigation = useNavigation();
  const {lang, avatar, name, setName, setLang} = useContext(GlobalContext);
  const [translations, setTranslations] = useState([]);
  const [avatarModal, setAvatarModal] = useState(false);
  const [language, setLanguage] = useState(false);
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

  const setNewLanguage = value => {
    setLang(value);
    AsyncStorage.setItem('language', value);
    setLanguage(false);
  };

  const inputRef = useRef(null);

  // Function to focus the TextInput
  const handleFocusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ImageBackground source={BackgroundImage} style={styles.imageBackground}>
        {translations?.length ? (
          <View>
            <Header background={COLORS.main} />

            <ScrollView
              contentContainerStyle={styles.scrollView}
              nestedScrollEnabled={true}>
              <TouchableOpacity onPress={() => setAvatarModal(true)}>
                <Image
                  source={
                    avatar
                      ? avatars.find(item => item?.name === avatar)?.image
                      : AvatarIcon
                  }
                  style={styles.avatarImage}
                />

                <View style={{marginTop: -30}}>
                  <View style={styles.editButton}>
                    <Text style={styles.editButtonText}>
                      {
                        translations.find(item => item?.en === 'Change avatar')[
                          lang
                        ]
                      }
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>

              <TextInput
                ref={inputRef}
                style={styles.textInput}
                placeholder={
                  translations.find(item => item?.en === 'Your Name')[lang]
                }
                placeholderTextColor={COLORS.black}
                value={name}
                onChangeText={value => {
                  setName(value);
                  AsyncStorage.setItem('name', value);
                }}
              />

              <View style={{marginTop: -10, marginRight: '-50%'}}>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={handleFocusInput}>
                  <Text style={styles.editButtonText}>
                    {translations.find(item => item?.en === 'Change')[lang]}
                  </Text>
                </TouchableOpacity>
              </View>

              {!language ? (
                <TouchableOpacity
                  style={styles.languagesInputContainer}
                  onPress={() => setLanguage(true)}>
                  <View style={styles.languageInput}>
                    <Text style={styles.languageText}>
                      {
                        translations.find(
                          item => item?.en === 'Choose Language',
                        )[lang]
                      }
                    </Text>
                  </View>
                </TouchableOpacity>
              ) : (
                <View style={styles.content}>
                  <ScrollView>
                    <TouchableOpacity
                      style={
                        lang === 'ru' ? styles.activeButtonFirst : styles.button
                      }
                      onPress={() => setNewLanguage('ru')}>
                      <Text style={styles.buttonText}>Русский</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={
                        lang === 'en' ? styles.activeButton : styles.button
                      }
                      onPress={() => setNewLanguage('en')}>
                      <Text style={styles.buttonText}>English</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={
                        lang === 'es' ? styles.activeButton : styles.button
                      }
                      onPress={() => setNewLanguage('es')}>
                      <Text style={styles.buttonText}>Español</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={
                        lang === 'it' ? styles.activeButton : styles.button
                      }
                      onPress={() => setNewLanguage('it')}>
                      <Text style={styles.buttonText}>Italiano</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={
                        lang === 'de' ? styles.activeButton : styles.button
                      }
                      onPress={() => setNewLanguage('de')}>
                      <Text style={styles.buttonText}>Deutsch</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={
                        lang === 'fr' ? styles.activeButton : styles.button
                      }
                      onPress={() => setNewLanguage('fr')}>
                      <Text style={styles.buttonText}>Français</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={
                        lang === 'sw' ? styles.activeButton : styles.button
                      }
                      onPress={() => setNewLanguage('sw')}>
                      <Text style={styles.buttonText}>Schweizerisch</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={
                        lang === 'pl' ? styles.activeButtonLast : styles.button
                      }
                      onPress={() => setNewLanguage('pl')}>
                      <Text style={styles.buttonText}>Polski</Text>
                    </TouchableOpacity>
                  </ScrollView>
                </View>
              )}
            </ScrollView>
          </View>
        ) : (
          <Loading />
        )}

        {avatarModal ? (
          <Avatars
            modalVisible={avatarModal}
            setModalVisible={setAvatarModal}
          />
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
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  backIcon: {
    width: 25,
    height: 25,
    objectFit: 'contain',
  },
  headerText: {
    color: '#FFFFFF',
    fontFamily: 'Jura-SemiBold',
    fontSize: 30,
    marginLeft: -10,
  },
  avatarImage: {
    alignSelf: 'center',
    width: width * 0.5,
    height: width * 0.5,
    objectFit: 'contain',
    marginLeft: 15,
  },
  scrollView: {
    height: height,
    paddingTop: 80,
  },
  textInput: {
    width: width * 0.8,
    alignSelf: 'center',
    height: 50,
    marginTop: 30,
    backgroundColor: COLORS.white,
    textAlign: 'left',
    fontFamily: FONTS.bold,
    fontSize: 20,
    borderRadius: 25,
    paddingLeft: 20,
  },
  languagesInputContainer: {
    width: '100%',
    marginTop: 20,
    position: 'relative',
  },
  languageInput: {
    width: width * 0.8,
    alignSelf: 'center',
    height: 50,
    marginTop: 30,
    backgroundColor: COLORS.white,
    fontFamily: FONTS.bold,
    fontSize: 20,
    borderRadius: 25,
    paddingLeft: 20,
    justifyContent: 'center',
    position: 'absolute',
    bottom: -(height / 3),
  },
  polygon: {
    width: 20,
    height: 20,
    objectFit: 'contain',
    position: 'absolute',
    zIndex: 101,
    top: -35,
    right: width / 6,
  },
  content: {
    width: '80%',
    height: '40%',
    alignSelf: 'center',
    backgroundColor: COLORS.card,
    zIndex: 101,
    borderRadius: 20,
    borderColor: COLORS.black,
    borderWidth: 2,
    marginTop: 20,
  },
  activeButtonFirst: {
    paddingHorizontal: 20,
    height: (height * 0.4) / 8,
    borderBottomWidth: 2,
    borderColor: COLORS.black,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.inputBackground,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  activeButton: {
    paddingHorizontal: 20,
    height: (height * 0.4) / 8,
    borderBottomWidth: 2,
    borderColor: COLORS.black,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.inputBackground,
  },
  activeButtonLast: {
    paddingHorizontal: 20,
    height: (height * 0.4) / 8,
    borderBottomWidth: 2,
    borderColor: COLORS.black,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.inputBackground,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  button: {
    paddingHorizontal: 20,
    height: (height * 0.4) / 8,
    borderBottomWidth: 2,
    borderColor: COLORS.black,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: FONTS.bold,
    fontSize: 17,
    fontWeight: '900',
    color: COLORS.black,
  },
  languageText: {
    textAlign: 'left',
    fontFamily: FONTS.bold,
    fontSize: 20,
    fontWeight: '900',
    color: COLORS.black,
  },
  editButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: '#1854AC',
    alignSelf: 'center',
  },
  editButtonText: {
    color: COLORS.white,
    fontSize: 14,
    fontFamily: FONTS.bold,
    fontWeight: 'bold',
  },
});
